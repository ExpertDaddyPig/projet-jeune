function svg() {
    const xhttp = new XMLHttpRequest(); 
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("test").innerHTML = this.responseText;
        }
    };
    let img = document.createElement("img");
    img.src = "./logoprojetjeunes6_4/logo_full.png";
    xhttp.send(img);
}