function passwordCheck() {
    let password = document.getElementById("password").value;
    if (password&& password !== "") {
        passNotValid = false;
    } else {
        passNotValid = true;
    }
}

function modUser() {
    atCheckRegister();
    if (notValid) return alert("Entrées erronées (entrez une adresse mail valide).");
    getUser(window.location.search.split("=")[1]);
    passwordCheck();
    if (passNotValid) return alert("Mot de passe incorrect");
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
