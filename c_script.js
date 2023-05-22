function consDisplay() {
    let args = window.location.search.split("?")[1];
    let username = args.split("&")[0].split("=")[1];
    let refID = args.split("&")[1].split("=")[1];
    getUser(username);
    setTimeout(() => {
        let user = userRes;
        let ref;
        let confirmation = "";
        user.refs.forEach(found => {
            if (found.id === refID) {
                ref = found;
            }
        });
        document.getElementById("userRef").innerHTML = ref.engagement.title + "<br>" + ref.engagement.desc;
        ref.confirm.forEach(confirm => {
            confirmation = confirmation + confirm.engagement.title + "<br>" + confirm.engagement.desc + "<br>";
        })
        document.getElementById("confirmRef").innerHTML = confirmation;
    }, 500)
}

window.onload = () => {
    consDisplay();
}