let notValid = true;

function atCheck() {
    let emailInput = document.getElementById("email").value;
    if (emailInput.includes("@")) {
        notValid = false;
    } else {
        notValid = true;
    }
}

function addUser() {
    if (notValid) return alert("Entrées erronées (check if email is true email.)");
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseText === "") {
                alert("already there")
            }
            document.getElementById("test").innerHTML = this.responseText;
        }
    };
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    let infos = { username: user, password: pass };
    let object = JSON.stringify(infos);
    xhttp.open("GET", "addUser.php?object=" + object);
    if (xhttp.status !== 0) {
        alert("weird thing happened");
    } else {
        xhttp.send();
    }
    atCheck();
}

function reveal() {
    let type = document.getElementById("password").type;
    if (type === "password") {
        document.getElementById("password").type = "text";
    } else {
        document.getElementById("password").type = "password";
    }
}


function modUser() {
    if (notValid) return alert("Entrées erronées (check if email is true email.)");
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseText !== "") {
                let user = JSON.parse(this.responseText)
                alert("New user :" + user.username + " Email: " + user.email + " Password: "+ user.password)
            } else {
                alert("Error while modifying")
                return;
            }
        }
    };
    let query = { username: username, email: email, password: pass };
    xhttp.open("GET", "modifyUser.php?query=" + JSON.stringify(query));
    if (xhttp.status !== 0) {
        alert("weird thing happened");
    } else {
        xhttp.send();
    }
    atCheck();
}

function login() {
    if (notValid) return alert("Entrées erronées (check if email is true email.)");
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseText !== "") {
                let user = JSON.parse(this.responseText)
                if (user === undefined) {
                    alert("No user found with that username : " + username);
                } else if (user.password !== pass) {
                    alert("Wrong password")
                } else {
                    alert("Access granted")
                }
            } else {
                alert("Nobody found")
                return;
            }
        }
    };
    let query = { username: username, email: email };
    xhttp.open("GET", "getUser.php?query=" + JSON.stringify(query));
    if (xhttp.status !== 0) {
        alert("weird thing happened");
    } else {
        xhttp.send();
    }
    atCheck();
}