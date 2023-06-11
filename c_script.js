const se_names = [
    "auto", "Autonome",
    "capable", "Capable d'analyse <br>et de synthèse",
    "ecoute", "A l'écoute",
    "orga", "Organisé",
    "passion", "Passionné",
    "fiable", "Fiable",
    "patient", "Patient",
    "reflechi", "Réfléchi",
    "resp", "Responsable",
    "sociable", "Sociable",
    "opti", "Optimiste",
    "ponc", "Ponctualité",
    "conf", "Confiance",
    "seri", "Sérieux",
    "honnete", "Honnêteté",
    "tolerant", "Tolérant",
    "bien", "Bienveillance",
    "respect", "Respect",
    "just", "Juste",
    "imp", "Impartial",
    "travail", "Travail"
]

// Affiche les données de la référence du jeune et du référent.
function consDisplay() {
    let args = window.location.search.split("?")[1];
    let username = args.split("&")[0].split("=")[1];
    let refsPos = parseInt(args.split("&")[1].split("=")[1]);
    getUser(username);
    setTimeout(() => {
        let user = userRes;
        let userRef = user.refs[refsPos];
        let confirmRef = userRef.confirm;
        document.getElementById("userLastName").value = userRef.userLastName;
        document.getElementById("userFirstName").value = userRef.userFirstName;
        document.getElementById("userBirthDate").value = userRef.date;
        document.getElementById("userEmail").value = userRef.userEmail;
        document.getElementById("userSocials").value = userRef.socials;
        document.getElementById("userPlace").value = userRef.place;
        document.getElementById("userTitle").value = userRef.engagement.title;
        document.getElementById("userDesc").value = userRef.engagement.desc;
        document.getElementById("userTime").value = userRef.engagement.time;
        let userDiv = document.getElementById("se-cons")
        userRef.se.forEach(se => {
            let checkbox = document.createElement("input")
            let label = document.createElement("label");
            if (se === "capable") {
                label.setAttribute("class", "capable")
                checkbox.setAttribute("class", "savoirs capable")
                checkbox.setAttribute("id", se)
                checkbox.setAttribute("type", "checkbox")
                checkbox.setAttribute("value", se_names[se_names.indexOf(se) + 1])
                checkbox.setAttribute("checked", true)
            } else {
                checkbox.setAttribute("class", "savoirs")
                checkbox.setAttribute("id", se)
                checkbox.setAttribute("type", "checkbox")
                checkbox.setAttribute("value", se_names[se_names.indexOf(se) + 1])
                checkbox.setAttribute("checked", true)
            }
            let br = document.createElement("br");
            label.setAttribute("for", se);
            label.innerHTML = se_names[se_names.indexOf(se) + 1];
            userDiv.appendChild(checkbox);
            userDiv.appendChild(label);
            userDiv.appendChild(br);
        })
        let confirm = confirmRef[0]
        document.getElementById("refLastName").value = confirm.nom;
        document.getElementById("refFirstName").value = confirm.prenom;
        document.getElementById("refBirthDate").value = confirm.date;
        document.getElementById("refEmail").value = confirm.refEmail;
        document.getElementById("refSocials").value = confirm.socials;
        document.getElementById("refPlace").value = confirm.place;
        document.getElementById("refTitle").value = confirm.engagement.title;
        document.getElementById("refDesc").value = confirm.engagement.desc;
        document.getElementById("refTime").value = confirm.engagement.time;
        let seDiv = document.getElementById("se-conf-cons")
        let refDiv = document.getElementById("se-conf-div")
        confirm.se.forEach(se => {
            let checkbox = document.createElement("input")
            checkbox.setAttribute("class", "confirmations")
            checkbox.setAttribute("id", se)
            checkbox.setAttribute("type", "checkbox")
            checkbox.setAttribute("value", se_names[se_names.indexOf(se) + 1])
            checkbox.setAttribute("checked", true)
            let br = document.createElement("br");
            let label = document.createElement("label", { for: se })
            label.setAttribute("for", se);
            label.innerHTML = se_names[se_names.indexOf(se) + 1];
            seDiv.appendChild(checkbox);
            seDiv.appendChild(label);
            seDiv.appendChild(br);
        })
        let comments = document.createElement("div", { id: "comments" });
        comments.setAttribute("id", "comments-cons")
        let title = document.createElement("div", { id: "comments-title" });
        title.setAttribute("id", "se-confTitle-cons")
        title.innerHTML = "COMMENTAIRES";
        let comment = document.createElement("textarea", { id: "comment", name: "comment" });
        comment.setAttribute("id", "comment-cons")
        comment.setAttribute("name", "comment")
        comment.value = confirm.engagement.comm;
        comments.appendChild(title);
        comments.appendChild(comment);
        refDiv.appendChild(comments);
    }, 1000)
}

window.onload = consDisplay();