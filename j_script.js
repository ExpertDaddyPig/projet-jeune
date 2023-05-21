let refNotValid = true;

function atCheckRegister() {
    let emailInput = document.getElementById("refEmail").value;
    if (emailInput.includes("@") && emailInput !== "") {
        refNotValid = false;
    } else {
        refNotValid = true;
    }
}

function loadRefs() {
    document.getElementById("pending").innerHTML = "Recherche de références en cours..."
    const xhttp = new XMLHttpRequest();
    let username = window.location.search.split("=")[1];
    getUser(username);
    setTimeout(() => {
        let user = userRes;
        console.log(userRes)
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

window.onload = () => {
    loadRefs();
    setTimeout(() => {
        document.getElementById("userFirstName").value = userRes.prenom;
        document.getElementById("userLastName").value = userRes.nom;
        document.getElementById("userBirthDate").value = userRes.jour+"/"+userRes.mois+"/"+userRes.annee;
        document.getElementById("userEmail").value = userRes.email;
    }, 500)
}

function change() {
    let doc = document.getElementById("pending").className;
    if (doc.includes("show")) {
        document.getElementById("pending").classList = "hidden";
        document.getElementById("sendRef").classList = "show";
        document.getElementById("createRef").value = "Voir ses reférences";
    } else {
        document.getElementById("pending").classList = "show";
        document.getElementById("sendRef").classList = "hidden";
        loadRefs();
        document.getElementById("createRef").value = "Soumettre une référence";
    }
}


function addRef() {
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
    let infos = { id: uniqueID, userEmail: userEmail, userFirstName: userFirstName, userLastName: userLastName, date: birthDate, refFirstName: refFirstName, refLastName: refLastName, refEmail: refEmail, socials: socials, place: place, engagement: {title: title, desc: desc}, valid: "pending"};
    let object = JSON.stringify(infos);
    xhttp.open("GET", "addRef.php?object=" + object + "&username=" + username);
    if (xhttp.status !== 0) {
        alert("weird thing happened");
    } else {
        xhttp.send();
    }
}