let refNotValid = true;

// Vérifie si l'adresse email est une adresse valide.
function atCheckRegister() {
    let emailInput = document.getElementById("refEmail").value;
    if (emailInput.includes("@") && emailInput !== "") {
        refNotValid = false;
    } else {
        refNotValid = true;
    }
}

// Vérifie si l'utilisateur a sélectionné assez de savoirs-être pour continuer.
function checkVerifier() {
    let checkboxes = document.querySelectorAll("input.savoirs");
    let checked = 0;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checked++;
        }
    });
    if (checked > 4 || checked === 0) {
        refNotValid = true;
    } else {
        refNotValid = false;
    }
}

// Charge les références sans prendre en compte du statut de la référence.
function loadRefs() {
    document.getElementById("pendingRefs").innerHTML = "<div id=\"pendingMessage\">Recherche de références en cours...</div>"
    const xhttp = new XMLHttpRequest();
    let username = window.location.search.split("=")[1];
    getUser(username);
    setTimeout(() => {
        let user = userRes;
        if (user !== undefined) {
            xhttp.open("GET", `/printRefs.php?refs=${JSON.stringify(user.refs)}`);
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    if (this.responseText !== "") {
                        document.getElementById("pendingRefs").innerHTML = this.responseText;
                    } else {
                        return;
                    }
                }
            };
            xhttp.send();
        }
    }, 1000)
}

// Charge les références validées.
function loadValidRefs() {
    document.getElementById("validRefs").innerHTML = "<div id=\"pendingMessage\">Recherche de références validées en cours...</div>"
    const xhttp = new XMLHttpRequest();
    let username = window.location.search.split("=")[1];
    getUser(username);
    setTimeout(() => {
        let user = userRes;
        if (user !== undefined) {
            xhttp.open("GET", `/printValidRefs.php?refs=${JSON.stringify(user.refs)}`);
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    if (this.responseText !== "") {
                        document.getElementById("validRefs").innerHTML = this.responseText;
                    } else {
                        return;
                    }
                }
            };
            xhttp.send();
        }
    }, 1000)
}

// Charge les données de l'utilisateur et les insert dans les zones de texte appropriées.
function loadData() {
    getUser(window.location.search.split("=")[1]);
    setTimeout(() => {
        let user = userRes;
        document.getElementById("userFirstName").value = user.prenom;
        document.getElementById("userLastName").value = user.nom;
        document.getElementById("userBirthDate").value = user.jour + "/" + user.mois + "/" + user.annee;
        document.getElementById("userEmail").value = user.email;
    }, 500)
}

// Vérifie si l'utilisateur a été inactif pendant plus d'une heure, puis charge les données de l'utilisateur et les insert dans les zones de texte appropriées.  
window.onload = () => {
    if (window.location.search.split("=")[1] === undefined) return window.location = "/auth.html";
    loadRefs();
    getUser(window.location.search.split("=")[1]);
    setTimeout(() => {
        let user = userRes;
        console.log(user);
        if (Date.now() - user.lastOnline > 3600000) {
            alert("Vous avez été déconnecté. Veuillez vous reconnecter.")
            window.location = `/auth.html`
            return
        } else {
            user.lastOnline = Date.now();
            const xhttp = new XMLHttpRequest();
            let query = user;
            xhttp.open("GET", "modifyUser.php?query=" + JSON.stringify(query));
            xhttp.send();
        }
        document.getElementById("userFirstName").value = user.prenom;
        document.getElementById("userLastName").value = user.nom;
        document.getElementById("userBirthDate").value = user.jour + "/" + user.mois + "/" + user.annee;
        document.getElementById("userEmail").value = user.email;
    }, 500)
}

// Bascule entre le mode "Affichage des références", "Affichage des références validées" et "Envoi de références". 
function change(option) {
    if (option === undefined) {
        let doc = document.getElementById("pendingRefs").className;
        if (doc.includes("show")) {
            document.getElementById("pendingRefs").classList = "hidden";
            loadData();
            document.getElementById("newRef").classList = "show";
            document.getElementById("se").classList = "show";
            document.getElementById("createRef").value = "Voir ses reférences";
        } else {
            document.getElementById("pendingRefs").classList = "show";
            document.getElementById("newRef").classList = "hidden";
            document.getElementById("se").classList = "hidden";
            document.getElementById("sendRefs").classList = "show";
            document.getElementById("validRefs").classList = "hidden";
            document.getElementById("createRef").value = "Soumettre une référence";
            loadRefs();
        }
    } else {
        let doc = document.getElementById("validRefs").className;
        if (doc.includes("show")) {
            document.getElementById("pendingRefs").classList = "show";
            document.getElementById("newRef").classList = "hidden";
            document.getElementById("se").classList = "hidden";
            document.getElementById("validRefs").classList = "hidden";
            loadRefs();
        } else {
            document.getElementById("pendingRefs").classList = "hidden";
            document.getElementById("newRef").classList = "hidden";
            document.getElementById("se").classList = "hidden";
            document.getElementById("validRefs").classList = "show";
            document.getElementById("sendRefs").classList = "hidden";
            document.getElementById("createRef").value = "Voir ses reférences";
            loadValidRefs();
        }
    }
}

// Ajoute la référence à la liste de référence de l'utilisateur
function addRef() {
    atCheckRegister();
    if (refNotValid) return alert("Entrées erronées, l'email du référent n'est pas valide.");
    checkVerifier();
    if (refNotValid) return alert("Entrées erronées, choisissez entre 1 et 4 savoirs être.");
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseText !== "") {
                alert(this.responseText);
            }
        }
    };
    let checkboxes = document.querySelectorAll("input.savoirs");
    let se = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            se.push(checkbox.id);
        }
    });
    let uniqueID = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
    let username = window.location.search.split("=")[1];
    let userFirstName = document.getElementById("userFirstName").value;
    let userLastName = document.getElementById("userLastName").value;
    let birthDate = document.getElementById("userBirthDate").value;
    let userEmail = document.getElementById("userEmail").value;
    let refFirstName = document.getElementById("refFirstName").value;
    let refLastName = document.getElementById("refLastName").value;
    let refEmail = document.getElementById("refEmail").value;
    let socials = document.getElementById("socials").value;
    let place = document.getElementById("place").value;
    let title = document.getElementById("title").value;
    let desc = document.getElementById("desc").value;
    if (title === "" || desc === "") return alert("Veuillez entrer le nom de votre engagement et une description de ce dernier.")
    let time = document.getElementById("time").value;
    let infos = { id: uniqueID, userEmail: userEmail, userFirstName: userFirstName, userLastName: userLastName, date: birthDate, refFirstName: refFirstName, refLastName: refLastName, refEmail: refEmail, socials: socials, place: place, engagement: { title: title, desc: desc, time: time }, se: se, valid: "pendingRefs", confirm: [] };
    let dest = refEmail;
    let object = JSON.stringify(infos);
    let subject = "Demande de confirmation de référence - " + userLastName.toUpperCase() + " - " + userFirstName;
    let vars = JSON.stringify({userFirstName: userFirstName, username: username, uniqueID: uniqueID})
    sendMail(dest, subject, vars);
    xhttp.open("GET", "addRef.php?object=" + object + "&username=" + username);
    xhttp.send();
}

// Envoie les références selectionnées au consultant.
function sendCons() {
    let checkboxes = document.querySelectorAll("input.validRefs");
    let username = window.location.search.split("=")[1];
    getUser(username);
    let dest = document.getElementById("consEmail").value;
    let subject = "Consultation de référence";
    let refPos = -1;
    setTimeout(() => {
        let user = userRes;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                let refPos = -1;
                for (let i = 0; i < user.refs.length; i++) {
                    const ref = user.refs[i];
                    if (ref.id === checkbox.id) {
                        refPos = i;
                        break;
                    }
                }
                let vars = JSON.stringify({username: username, pos: refPos});
                sendMailCons(dest, subject, vars);
            }
        });
    }, 1000)
}

// Envoie le mail au référent en fonction des paramètres.
function sendMail(dest, subject, vars) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            alert(this.responseText);
        }
    };
    xhttp.open("GET", "sendMail.php?dest=" + dest + "&subject=" + subject + "&vars=" + vars);
    xhttp.send();
}

// Envoie le mail au consultant en fonction des paramètres.
function sendMailCons(dest, subject, vars) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            alert(this.responseText);
        }
    };
    xhttp.open("GET", "sendMailCons.php?dest=" + dest + "&subject=" + subject + "&vars=" + vars);
    xhttp.send();
}

// Rédirige l'utilisateur vers la page de modification d'utilisateur.
function goToModif() {
    let username = window.location.search.split("=")[1];
    getUser(username);
    setTimeout(() => {
        let user = userRes;
        window.location = `/modif.html?query=${user.username}`
    }, 500)
}