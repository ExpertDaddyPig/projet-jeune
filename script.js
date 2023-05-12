let notValid = true;
let userRes;

function atCheck() {
    let emailInput = document.getElementById("email").value;
    if (emailInput.includes("@") && emailInput !== "") {
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
    if (notValid) return alert("Entrées erronées (check if email is true email.)");
    let username = document.getElementById("username").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let birthDay = document.getElementById("birthDay").value;
    let birthMonth = document.getElementById("birthMonth").value;
    let birthYear = document.getElementById("birthYear").value;
    let socials = document.getElementById("socials").value;
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
    getUser(username)
    setTimeout(() => {
        let user = userRes;
        if (user === undefined) {
            getUser(email)
            setTimeout(() => {
                let user = userRes;
                if (user === undefined) {
                    alert("No user found with that email : " + email + ", and with that username : " + username);
                } else if (user.password !== pass) {
                    alert("Wrong password")
                } else {
                    alert("Access granted")
                }
            }, 200)
            return;
        }
        if (user === undefined) {
            alert("No user found with that username : " + username);
        } else if (user.password !== pass) {
            alert("Wrong password")
        } else {
            alert("Access granted")
        }
    }, 200)
    atCheck();
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
