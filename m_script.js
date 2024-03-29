let user;
let passNotValid = false;

// Charge les données de l'utilisateur.
window.onload = () => {
    getUser(window.location.search.split("=")[1]);
    getAllUsers();
    setTimeout(() => {
        user = userRes;
        document.getElementById("username").value = user.username;
        document.getElementById("firstName").value = user.prenom;
        document.getElementById("lastName").value = user.nom;
        document.getElementById("email").value = user.email;
    }, 1000)
}

// Redirige l'utilisateur vers la page de consulation des références.
function goBackToJeune() {
    window.location = `/jeune.html?query=${user.username}`
}

// Vérifie si le mot de passe est identique à l'ancien mot de passe.
function passwordCheck() {
    let password = document.getElementById("oldPassword").value;
    if (password !== user.password) {
        passNotValid = true;
    } else {
        passNotValid = false;
    }
}

// Modifie l'utilisateur avec les données modifiées.
function modUser() {
    atCheck();
    if (notValid) return alert("Entrées erronées (entrez une adresse mail valide).");
    passwordCheck();
    if (passNotValid) return alert("Mot de passe incorrect");
    let username = document.getElementById("username").value;
    alreadyUsedUsername(username, user.username);
    if (usernameNotValid) return alert("Nom d'utilisateur indisponible");
    let email = document.getElementById("email").value;
    alreadyUsedEmail(email, user.email);
    if (emailNotValid) return alert("Email déjà enregistré");
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let birthDay = document.getElementById("birthDay").value;
    let birthMonth = document.getElementById("birthMonth").value;
    let birthYear = document.getElementById("birthYear").value;
    let pass = document.getElementById("password").value;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseText !== "") {
                let user = JSON.parse(this.responseText)
                alert("Votre profil a bien été modifié.")
                window.location = `/modif.html?query=${user.username}`;
            } else {
                alert("Il y a eu une erreur lors de la modification de votre profil, veuillez réessayer plus tard.")
            }
        }
    };
    let query = { oldUsername: user.username, oldEmail: user.email, lastOnline: Date.now(), username: username, email: email, password: pass, prenom: firstName, nom: lastName, jour: birthDay, mois: birthMonth, annee: birthYear, refs: userRes.refs };
    xhttp.open("GET", "modifyUser.php?query=" + JSON.stringify(query));
    xhttp.send();
}
