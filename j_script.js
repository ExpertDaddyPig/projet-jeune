let refNotValid = true;

function atCheckRegister() {
    let emailInput = document.getElementById("refEmail").value;
    if (emailInput.includes("@") && emailInput !== "") {
        refNotValid = false;
    } else {
        refNotValid = true;
    }
}

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

function loadRefs() {
    document.getElementById("pending").innerHTML = "Recherche de références en cours..."
    const xhttp = new XMLHttpRequest();
    let username = window.location.search.split("=")[1];
    getUser(username);
    setTimeout(() => {
        let user = userRes;
        if (user === undefined) {
            alert("No user found with that username : " + username);
        } else {
            xhttp.open("GET", `/printRefs.php?refs=${JSON.stringify(user.refs)}`);
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    if (this.responseText !== "") {
                        document.getElementById("pending").innerHTML = this.responseText;
                    } else {
                        return;
                    }
                }
            };
            if (xhttp.status !== 0) {
                alert("weird thing happened");
            } else {
                xhttp.send();
            }
        }
    }, 1000)
}

function loadValidRefs() {
    document.getElementById("sendRef").innerHTML = "Recherche de références validées en cours..."
    const xhttp = new XMLHttpRequest();
    let username = window.location.search.split("=")[1];
    getUser(username);
    setTimeout(() => {
        let user = userRes;
        if (user === undefined) {
            alert("No user found with that username : " + username);
        } else {
            xhttp.open("GET", `/printValidRefs.php?refs=${JSON.stringify(user.refs)}`);
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    if (this.responseText !== "") {
                        document.getElementById("sendRef").innerHTML = this.responseText;
                    } else {
                        return;
                    }
                }
            };
            if (xhttp.status !== 0) {
                alert("weird thing happened");
            } else {
                xhttp.send();
            }
        }
    }, 1000)
}



window.onload = () => {
    loadRefs();
    setTimeout(() => {
        document.getElementById("userFirstName").value = userRes.prenom;
        document.getElementById("userLastName").value = userRes.nom;
        document.getElementById("userBirthDate").value = userRes.jour+"/"+userRes.mois+"/"+userRes.annee;
        document.getElementById("userEmail").value = userRes.email;
    }, 500)
}

function change(option) {
    if (option === undefined) {
        let doc = document.getElementById("pending").className;
        if (doc.includes("show")) {
            document.getElementById("pending").classList = "hidden";
            document.getElementById("newRef").classList = "show";
            document.getElementById("createRef").value = "Voir ses reférences";
        } else {
            document.getElementById("pending").classList = "show";
            document.getElementById("newRef").classList = "hidden";
            document.getElementById("sendRefs").classList = "show";
            document.getElementById("sendRef").classList = "hidden";
            document.getElementById("createRef").value = "Soumettre une référence";
            loadRefs();
        }
    } else {
        let doc = document.getElementById("sendRef").className;
        if (doc.includes("show")) {
            document.getElementById("pending").classList = "show";
            document.getElementById("newRef").classList = "hidden";
            document.getElementById("sendRef").classList = "hidden";
            loadRefs();
        } else {
            document.getElementById("pending").classList = "hidden";
            document.getElementById("newRef").classList = "hidden";
            document.getElementById("sendRef").classList = "show";
            document.getElementById("sendRefs").classList = "hidden";
            document.getElementById("createRef").value = "Voir ses reférences";
            loadValidRefs();
        }
    }
}


function addRef() {
    atCheckRegister();
    if (refNotValid) return alert("Entrées erronées (check if email is true email)");
    checkVerifier();
    if (refNotValid) return alert("Vous avez sélectionné trop de savoir être, choisissez en 4 maximum.");
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseText === "") {
                alert("already there")
            }
            alert(this.responseText);
        }
    };
    let checkboxes = document.querySelectorAll("input.savoirs");
    let se = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            se.push(checkbox.id);
        }
    });
    let uniqueID = Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2)
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
    let infos = { id: uniqueID, userEmail: userEmail, userFirstName: userFirstName, userLastName: userLastName, date: birthDate, refFirstName: refFirstName, refLastName: refLastName, refEmail: refEmail, socials: socials, place: place, engagement: {title: title, desc: desc}, se: se, valid: "pending", confirm: []};
    let object = JSON.stringify(infos);
    xhttp.open("GET", "addRef.php?object=" + object + "&username=" + username);
    if (xhttp.status !== 0) {
        alert("weird thing happened");
    } else {
        xhttp.send();
    }
}

function goToModif() {
    let username = window.location.search.split("=")[1];
    getUser(username);
    setTimeout(() => {
        let user = userRes;
        if (user === undefined) {
            alert("No user found with that username : " + username);
        } else  {
            window.location = `/modif.html?query=${user.username}`
        }
    }, 200)
}