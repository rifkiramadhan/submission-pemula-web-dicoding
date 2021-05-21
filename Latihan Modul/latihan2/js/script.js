const newElement = document.createElement("li");
const daftar = document.getElementById("daftar");
const elementAwal = document.createElement("li");
const itemAwal = document.getElementById("awal");

newElement.innerText = "Selamat menikmati!";
elementAwal.innerText = "Hidupkan kompor.";

daftar.appendChild(newElement);
daftar.insertBefore(elementAwal, itemAwal);
