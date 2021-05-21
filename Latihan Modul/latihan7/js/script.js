const submitAction = document.getElementById("formDataDiri");
            submitAction.addEventListener("submit", function(){
                const inputNama = document.getElementById("nama").value;
                const inputDomisili = document.getElementById("domisili").value;
                const hiddenMessage = "Halo "+inputNama+" bagaimana cuacanya di "+inputDomisili+"?";
                document.getElementById("messageAfterSubmit").innerText = hiddenMessage;
                event.preventDefault();
            });