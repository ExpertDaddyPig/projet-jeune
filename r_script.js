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

function loadRef() {
    const xhttp = new XMLHttpRequest();
    let args = window.location.search.split("?")[1];
    let username = args.split("&")[0].split("=")[1];
    let refID = args.split("&")[1].split("=")[1]
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
    }, 500)
}


function modRef() {
    atCheckRegister();
    if (refNotValid) return alert("Entrées erronées (check if email is true email)");
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
    let refFirstName = document.getElementById("refFirstName").value;
    let refLastName = document.getElementById("refLastName").value;
    let birthDate = document.getElementById("refBirthDate").value;
    let refEmail = document.getElementById("refEmail").value;
    let socials = document.getElementById("socials").value;
    let place = document.getElementById("place").value;
    let title = document.getElementById("title").value;
    let desc = document.getElementById("desc").value;
    let infos = { refEmail: refEmail, prenom: refFirstName, nom: refLastName, date: birthDate, refEmail: refEmail, socials: socials, place: place, engagement: {title: title, desc: desc}};
    let object = JSON.stringify(infos);
    console.log(infos)
}