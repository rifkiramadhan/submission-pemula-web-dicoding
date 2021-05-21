const gambar = document.getElementById("gambar");
const buttons = document.querySelectorAll(".button");
const playButton = buttons[3];
const playButtonElement = playButton.childNodes[0];
const links = document.getElementById("links");
const dicoding = document.getElementById("dicodingLink");
const google = document.getElementById("googleLink");
const buttons = document.getElementsByClassName("button")


gambar.setAttribute("width", "300");
gambar.setAttribute("height", "215");
playButtonElement.setAttribute("disabled", "disabled");

button.childNodes[0].style.borderRadius = "4px"

dicoding.innerHTML = "<i>Belajar Programming di Dicoding</i>";
google.innerHTML = "<i>Mencari sesuatu di Google</i>";