let container_app = document.getElementById("app");
let container_start = document.getElementById("start");
let button_go = document.getElementById("go");
container_app.style.display = "none";
button_go.addEventListener("click", () => {
    container_start.style.display = "none";
    container_app.style.display = "block";


});