let refNotValid = true;
let refRes;

function atCheckRegister() {
    let emailInput = document.getElementById("refEmail").value;
    if (emailInput.includes("@") && emailInput !== "") {
        refNotValid = false;
    } else {
        refNotValid = true;
    }
}

function checkVerifier() {
    let checkboxes = document.getElementsByClassName("confirmations");
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

function loadRef() {
    let args = window.location.search.split("?")[1];
    let username = args.split("&")[0].split("=")[1];
    let refID = args.split("&")[1].split("=")[1];
    getRef(username, refID);
    setTimeout(() => {
        let ref = refRes;
        console.log(refRes)
        if (ref === undefined) {
            alert("No ref found with that username : " + username);
        }
    }, 500)
}

window.onload = () => {
    loadRef();
    setTimeout(() => {
        document.getElementById("refFirstName").value = refRes.refFirstName;
        document.getElementById("refLastName").value = refRes.refLastName;
        document.getElementById("refEmail").value = refRes.refEmail;
        document.getElementById("place").value = refRes.place;
    }, 500)
}


function modRef() {
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
    let args = window.location.search.split("?")[1];
    let username = args.split("&")[0].split("=")[1];
    let checkboxes = document.getElementsByClassName("confirmations");
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
    let socials = document.getElementById("socials").value;
    let place = document.getElementById("place").value;
    let title = document.getElementById("title").value;
    let desc = document.getElementById("desc").value;
    let infos = { refEmail: refEmail, prenom: refFirstName, nom: refLastName, date: birthDate, refEmail: refEmail, socials: socials, place: place, engagement: {title: title, desc: desc}, se: se};
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
        xhttp.onreadystatechange = () => {
            if (this.readyState === 4 && this.status === 200) {
                if (this.responseText === "") {
                    alert("something went wrong")
                }
                alert(this.responseText);
            }
        }
        xhttp.open('GET', `/modifyUser.php?query=${JSON.stringify(user)}`);
        if (xhttp.status !== 0) {
            alert("weird thing happened");
        } else {
            xhttp.send();
        }
    }, 500)
}

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
        xhttp.onreadystatechange = () => {
            if (this.readyState === 4 && this.status === 200) {
                if (this.responseText === "") {
                    alert("something went wrong")
                }
                alert(this.responseText);
            }
        }
        xhttp.open('GET', `/modifyUser.php?query=${JSON.stringify(user)}`);
        if (xhttp.status !== 0) {
            alert("weird thing happened");
        } else {
            xhttp.send();
        }
    }, 500)
}