document.addEventListener('DOMContentLoaded', function (){
    const inputMaxLengthOnLoad = document.getElementById("inputNamaPanggilan").maxLength;
    document.getElementById("sisaKarakter").innerText = inputMaxLengthOnLoad;
    document.getElementById("notifikasiSisaKarakter").style.visibility = "hidden";
});

document.getElementById("inputNamaPanggilan").addEventListener("input", function(){
    const jumlahKarakterDiketik = document.getElementById("inputNamaPanggilan").value.length;
    const jumlahKarakterMaksimal = document.getElementById("inputNamaPanggilan").maxLength;
    console.log(jumlahKarakterDiketik, jumlahKarakterMaksimal);
    const sisaKarakterUpdate = jumlahKarakterMaksimal - jumlahKarakterDiketik;
    document.getElementById("sisaKarakter").innerText = sisaKarakterUpdate;
    if (sisaKarakterUpdate == 0 ){
        document.getElementById("sisaKarakter").innerText = "batas maksimal tercapai!";
    } else if(sisaKarakterUpdate <= 5){
        document.getElementById("notifikasiSisaKarakter").style.color = "red";
    } else{
        document.getElementById("notifikasiSisaKarakter").style.color = "black";
    }
});

document.getElementById("inputNamaPanggilan").addEventListener("focus", function(){
    document.getElementById("notifikasiSisaKarakter").style.visibility = null;
});

document.getElementById('inputNamaPanggilan').addEventListener('blur', function () {                           
    document.getElementById('notifikasiSisaKarakter').style.visibility = 'hidden';
});

document.getElementById("inputCaptcha").addEventListener("change", function(){
    const inputCaptcha = document.getElementById("inputCaptcha").value;
    const submitButtonStatus = document.getElementById("submitButton");
    if (inputCaptcha == "PRNU"){
        submitButtonStatus.removeAttribute("disabled");
    }
});

document.getElementById("formDataDiri").addEventListener("submit", function(){
    const inputCaptcha = document.getElementById("inputCaptcha").value;
    if (inputCaptcha == "PRNU"){
        event.preventDefault();
        alert("Selamat! Captcha Anda lolos :D");
    } else{
        alert("Captcha Anda belum tepat :(")
        submitButtonStatus.addAttribute("disabled", true);
    }
});

document.getElementById("inputCopy").addEventListener("copy", function(){
    alert("Anda telah men-copy sesuatu...");
});

document.getElementById("inputPaste").addEventListener("paste", function(){
    alert("Anda telah mem-paste sebuah teks...");
});