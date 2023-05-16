let notValid = true;
let userRes;

function reveal() {
    let type = document.getElementById("password").type;
    if (type === "password") {
        document.getElementById("password").type = "text";
    } else {
        document.getElementById("password").type = "password";
    }
}

function register() {
    let login = document.getElementById("login").className;
    if (login.includes("show")) {
        document.getElementById("login").classList = "hidden";
        document.getElementById("register").classList = "show";
        document.getElementById("switch").value = "Login";
    } else {
        document.getElementById("login").classList = "show";
        document.getElementById("register").classList = "hidden";
        document.getElementById("switch").value = "Register";
    }
}
function atCheckRegister() {
    let emailInput = document.getElementById("email2").value;
    if (emailInput.includes("@") && emailInput !== "") {
        notValid = false;
    } else {
        notValid = true;
    }
}

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
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let birthDay = document.getElementById("birthDay").value;
    let birthMonth = document.getElementById("birthMonth").value;
    let birthYear = document.getElementById("birthYear").value;
    let email = document.getElementById("email2").value;
    let pass = document.getElementById("password2").value;
    let infos = { username: username, email: email, password: pass, prenom: firstName, nom: lastName, jour: birthDay, mois: birthMonth, annee: birthYear };
    let object = JSON.stringify(infos);
    xhttp.open("GET", "addUser.php?object=" + object);
    if (xhttp.status !== 0) {
        alert("weird thing happened");
    } else {
        xhttp.send();
    }
}



function getUser(user) {
    const xhttp = new XMLHttpRequest()
    let query = { username: user, email: user };
    xhttp.open("GET", "getUser.php?query=" + JSON.stringify(query));
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseText !== "") {
                userRes = JSON.parse(this.responseText);
                return;
            } else {
                alert("Nobody found")
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

function modUser() {
    atCheckRegister();
    if (notValid) return alert("Entrées erronées (check if email is true email.)");
    let username = document.getElementById("username").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let birthDay = document.getElementById("birthDay").value;
    let birthMonth = document.getElementById("birthMonth").value;
    let birthYear = document.getElementById("birthYear").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseText !== "") {
                let user = JSON.parse(this.responseText)
                alert("New user :" + user.username + " Email: " + user.email + " Password: " + user.password)
            } else {
                alert("Error while modifying")
                return;
            }
        }
    };
    let query = { username: username, email: email, password: pass, prenom: firstName, nom: lastName, jour: birthDay, mois: birthMonth, annee: birthYear };
    xhttp.open("GET", "modifyUser.php?query=" + JSON.stringify(query));
    if (xhttp.status !== 0) {
        alert("weird thing happened");
    } else {
        xhttp.send();
    }
}

function login() {
    let username = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    getUser(username)
    setTimeout(() => {
        let user = userRes;
        if (user === undefined) {
            alert("No user found with that username : " + username);
        } else if (user.password !== pass) {
            alert("Wrong password")
        } else {
            window.location = `/jeune.html?query=${user.username}`
        }
    }, 200)
}

function send() {
    let user = document.getElementById("username").value;
    if (user === undefined) {
        user = document.getElementById("email").value;
    }
    console.log(user)
    getUser(user)
    setTimeout(() => {
        let user = userRes;
        let message = document.getElementById("message").value;
        let subject = document.getElementById("subject").value;
        const xml = new XMLHttpRequest();
        xml.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                alert("Email sent to " + user.email)
            }
        }
        xml.open("GET", "sendMail.php?msg=" + message + "&sbj=" + subject + "&email="+ user.email);
        xml.send()
    }, 200)

}