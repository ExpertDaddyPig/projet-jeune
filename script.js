let notValid = true;
let userRes;
let userList;
let usernameNotValid = false;
let emailNotValid = false;


// Cache/Montre les informations du projet avec une animation.
function showInfos() {
    let div = document.getElementById("aboutInfos");
    if (div.className.includes("hidden") || div.className.includes("fancyHidden")) {
        document.getElementById("aboutInfos").className = "fancyShow";
    } else {
        document.getElementById("aboutInfos").className = "fancyHidden";
    }
}

// Vérifie si le nom d'utilisateur donné lors de la modification de l'utilsateur, n'est pas déjà présent dans la base de données.
function alreadyUsedUsername(username, oldUsername) {
    let found;
    userList.forEach(user => {
        if (user.username === username && user.username !== oldUsername) {
            found = user;
        }
    });
    if (found !== undefined) {
        usernameNotValid = true;
    } else {
        usernameNotValid = false;
    }
}

// Vérifie si l'email donné lors de la modification de l'utilsateur, n'est pas déjà présent dans la base de données.
function alreadyUsedEmail(email, oldEmail) {
    let found;
    userList.forEach(user => {
        if (user.email === email && user.email !== oldEmail) {
            found = user;
        }
    });
    if (found !== undefined) {
        emailNotValid = true;
    } else {
        emailNotValid = false;
    }
}

// Cache/Montre le mot de passe lors de la connection/modification du profil.
function reveal() {
    let type = document.getElementById("password").type;
    if (type === "password") {
        document.getElementById("password").type = "text";
        document.getElementById("showButton").style.backgroundImage = "url(\"./logoprojetjeunes6_4/hide_pass.png\")"
    } else {
        document.getElementById("password").type = "password";
        document.getElementById("showButton").style.backgroundImage = "url(\"./logoprojetjeunes6_4/show_pass.png\")"
    }
}

// Cache/Montre le mot de passe lors de la modification du profil.
function revealOld() {
    let type = document.getElementById("oldPassword").type;
    if (type === "password") {
        document.getElementById("oldPassword").type = "text";
        document.getElementById("showButton").style.backgroundImage = "url(\"./logoprojetjeunes6_4/hide_pass.png\")"
    } else {
        document.getElementById("oldPassword").type = "password";
        document.getElementById("showButton").style.backgroundImage = "url(\"./logoprojetjeunes6_4/show_pass.png\")"
    }
}

// Alterne entre l'interface de connection et d'inscription sur la page auth.html
function switchRegisterLogin() {
    let login = document.getElementById("login").className;
    if (login.includes("show")) {
        document.getElementById("login").classList = "hidden";
        document.getElementById("register").classList = "show";
        document.getElementById("switchButton").value = `Connectez-vous ici !`;
        document.getElementById("switchText").innerText = `Vous êtes déjà inscrit ?`;
    } else {
        document.getElementById("login").classList = "show";
        document.getElementById("register").classList = "hidden";
        document.getElementById("switchButton").value = `Inscrivez-vous maintenant !`
        document.getElementById("switchText").innerText = `Vous n'avez pas de compte?`;
    }
}

// Vérifie si l'adresse email est une adresse valide.
function atCheck() {
    let emailInput = document.getElementById("email").value;
    if (emailInput.includes("@") && emailInput !== "") {
        notValid = false;
    } else {
        notValid = true;
    }
}

// Vérifie si l'adresse email est une adresse valide lors de l'inscription.
function atCheckRegister() {
    let emailInput = document.getElementById("email2").value;
    if (emailInput.includes("@") && emailInput !== "") {
        notValid = false;
    } else {
        notValid = true;
    }
}

// Ajoute l'utilisateur à la base de données après avoir vérifié s'il n'y avait aucun problème avec les données.
function addUser() {
    atCheckRegister();
    if (notValid) return alert("Entrées erronées (check if email is true email)");
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseText === "") {
                alert("already there")
            }
            alert(this.responseText);
        }
    };
    let username = document.getElementById("username2").value;
    alreadyUsedUsername(username);
    if (usernameNotValid) return alert("Nom d'utilisateur indisponible");
    let email = document.getElementById("email2").value;
    alreadyUsedEmail(email);
    if (emailNotValid) return alert("Email déjà enregistré");
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let birthDay = document.getElementById("birthDay").value;
    let birthMonth = document.getElementById("birthMonth").value;
    let birthYear = document.getElementById("birthYear").value;
    let pass = document.getElementById("password2").value;
    let infos = { lastOnline: Date.now(), username: username, email: email, password: pass, prenom: firstName, nom: lastName, jour: birthDay, mois: birthMonth, annee: birthYear };
    xhttp.open("GET", "addUser.php?object=" + JSON.stringify(infos));
    xhttp.send();
    window.location = `/jeune.html?query=${infos.username}`
}

// Récupère tout les utilisateurs présent dans la base de données.
function getAllUsers() {
    const xhttp = new XMLHttpRequest()
    xhttp.open("GET", "getAllUsers.php");
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseText !== "") {
                userList = JSON.parse(this.responseText);
                return;
            }
        }
    };
    xhttp.send();
}

// Récupère l'utilisateur demandé dans la base de données.
function getUser(user) {
    const xhttp = new XMLHttpRequest()
    let query = { username: user, email: user };
    xhttp.open("GET", "getUser.php?query=" + JSON.stringify(query));
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseText !== "") {
                userRes = JSON.parse(this.responseText);
                return;
            }
        }
    };
    xhttp.send();
}

// Récupère la référence lié à l'utilisateur grâce à l'id de la référence et le nom d'utilisateur.
function getRef(user, id) {
    const xhttp = new XMLHttpRequest()
    let query = { username: user, id: id };
    xhttp.open("GET", "getRef.php?query=" + JSON.stringify(query));
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseText !== "") {
                refRes = JSON.parse(this.responseText);
                return;
            } else {
                return;
            }
        }
    };
    xhttp.send();
}

// Vérifie si les données de l'utilisateur correspondent avec celles présentes dans la base de données.
function login() {
    let username = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    let user;
    userList.forEach(found => {
        if (found.username === username || found.email === username) {
            user = found;
        }
    })
    if (user === undefined) {
        document.getElementById("loginError").className = "show";
    } else if (user.password !== pass) {
        document.getElementById("loginError").className = "show";
    } else {
        user.lastOnline = Date.now();
        const xhttp = new XMLHttpRequest();
        let query = user;
        xhttp.open("GET", "modifyUser.php?query=" + JSON.stringify(query));
        xhttp.send();
        window.location = `/jeune.html?query=${user.username}`
    }
}