let refNotValid = true;
let refRes;

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
    let checkboxes = document.querySelectorAll("input.confirmations");
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
function loadRef() {
    let args = window.location.search.split("?")[1];
    let username = args.split("&")[0].split("=")[1];
    let refID = args.split("&")[1].split("=")[1];
    getRef(username, refID);
    setTimeout(() => {
        let ref = refRes;
        console.log(refRes)
        if (ref === undefined) {
            alert("Une erreur s'est produite, la référence n'a pas été trouvée, réessayez.");
        } else {
            document.getElementById("loadRefTitle").className = "hidden";
            document.getElementById("checkRef").className = "show";
            document.getElementById("showRef").className = "show";
        }
    }, 1000)
}

// Charge les données de l'utilisateur et de la référence et les insert dans les zones de texte appropriées.  
window.onload = () => {
    loadRef();
    setTimeout(() => {
        document.getElementById("userFirstName").value = refRes.userFirstName
        document.getElementById("userLastName").value = refRes.userLastName
        document.getElementById("userBirthDate").value = refRes.date
        document.getElementById("userEmail").value = refRes.userEmail
        document.getElementById("userRefFirstName").value = refRes.refFirstName
        document.getElementById("userRefLastName").value = refRes.refLastName
        document.getElementById("userRefEmail").value = refRes.refEmail
        document.getElementById("userSocials").value = refRes.socials
        document.getElementById("userPlace").value = refRes.place
        document.getElementById("userTitle").value = refRes.engagement.title
        document.getElementById("userDesc").value = refRes.engagement.desc
        document.getElementById("userTime").value = refRes.engagement.time
        document.getElementById("refLastName").value = refRes.refLastName;
        document.getElementById("refFirstName").value = refRes.refFirstName;
        document.getElementById("refEmail").value = refRes.refEmail;
        document.getElementById("refPlace").value = refRes.place;
    }, 1000)
}

// Cache/Montre les informations de la référence du jeune avec une animation.
function showRef() {
    let div = document.getElementById("jeuneRef");
    if (div.className.includes("hidden") || div.className.includes("fancyHidden")) {
        document.getElementById("jeuneRef").className = "fancyShow";
    } else {
        document.getElementById("jeuneRef").className = "fancyHidden";
    }
}

// Modifie la référence de l'utilisateur en y ajoutant les données du référent et valide la référence.
function modRef() {
    atCheckRegister();
    if (refNotValid) return alert("Entrées erronées, l'email du référent n'est pas valide.");
    checkVerifier();
    if (refNotValid) return alert("Entrées erronées, choisissez entre 1 et 4 savoirs être.");
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseText === "") {
                alert("already there")
            }
            alert(this.responseText);
        }
    };
    let args = window.location.search.split("?")[1];
    let username = args.split("&")[0].split("=")[1];
    let checkboxes = document.querySelectorAll("input.confirmations");
    let se = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            se.push(checkbox.id);
        }
    });
    let refFirstName = document.getElementById("refFirstName").value;
    let refLastName = document.getElementById("refLastName").value;
    let birthDate = document.getElementById("refBirthDay").value + '/' + document.getElementById("refBirthMonth").value + '/' + document.getElementById("refBirthYear").value;
    let refEmail = document.getElementById("refEmail").value;
    let socials = document.getElementById("refSocials").value;
    let place = document.getElementById("refPlace").value;
    let title = document.getElementById("refTitle").value;
    let desc = document.getElementById("refDesc").value;
    let time = document.getElementById("refTime").value;
    let comm = document.getElementById("comment").value;
    let infos = { refEmail: refEmail, prenom: refFirstName, nom: refLastName, date: birthDate, refEmail: refEmail, socials: socials, place: place, engagement: { title: title, desc: desc, comm: comm, time: time }, se: se };
    getUser(username);
    setTimeout(() => {
        const xhttp = new XMLHttpRequest();
        let user = userRes;
        user.refs.forEach(ref => {
            if (ref.id === refRes.id) {
                ref.confirm.push(infos);
                ref.valid = true;
            }
        });

        xhttp.open('GET', `/modifyUser.php?query=${JSON.stringify(user)}`);
        xhttp.send();
        document.getElementById("confirmMessage").innerHTML = "Nous vous remercions du temps que vous avez pris afin de répondre à cette référence.<br>Cette dernière a bien été confimée.";
        document.getElementById("confirmDiv").className = "show";
        document.getElementById("checkRef").className = "hidden";
        document.getElementById("showRef").className = "hidden";
    }, 500)
}

// Modifie la référence de l'utilisateur en y ajoutant les données du référent et refuse la référence.
function cancelRef() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseText === "") {
                alert("already there")
            }
            alert(this.responseText);
        }
    };
    let args = window.location.search.split("?")[1];
    let username = args.split("&")[0].split("=")[1];
    getUser(username);
    setTimeout(() => {
        const xhttp = new XMLHttpRequest();
        let user = userRes;
        user.refs.forEach(ref => {
            if (ref.id === refRes.id) {
                ref.valid = false;
            }
        });
        xhttp.open('GET', `/modifyUser.php?query=${JSON.stringify(user)}`);
        xhttp.send();
        document.getElementById("confirmMessage").innerHTML = "Nous vous remercions du temps que vous avez pris afin de répondre à cette référence.<br>Cette dernière a bien été refusée.";
        document.getElementById("confirmDiv").className = "show";
        document.getElementById("checkRef").className = "hidden";
        document.getElementById("showRef").className = "hidden";
    }, 500)
}