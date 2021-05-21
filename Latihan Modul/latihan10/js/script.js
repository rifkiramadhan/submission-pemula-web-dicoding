const sessionStorageKey
= "PRESS_FREQUENCY";

// pengecekan apakah data sessionStorage dengan key count tersedia atau belum
   if (typeof(Storage) !== "undefined") {


       if (sessionStorage.getItem(sessionStorageKey
       ) === null) {
               // Jika item pada local storage belum ada 
               // maka akan atur dengan nilai awal yakni 0
               sessionStorage.setItem(sessionStorageKey
               , 0);
           }

       const Incrementbutton = document.querySelector("#incrementButton");
       const clearButton = document.querySelector("#clear");
       const countDisplay = document.querySelector("#count");
       
       // memberikan nilai item dari local storage
       countDisplay.innerText = sessionStorage.getItem(sessionStorageKey
       );

       // mengupdate nilai dari item local storage jika tombol ditekan
       Incrementbutton.addEventListener('click', function() {
           let count = sessionStorage.getItem(sessionStorageKey
           );
           count++;
           sessionStorage.setItem(sessionStorageKey
           , count);
           countDisplay.innerText = sessionStorage.getItem(sessionStorageKey
           );
       })

       // memberikan nilai 0 ke tampilan karena di-reset dan menghapus item
       clearButton.addEventListener('click', function(){
           sessionStorage.removeItem(sessionStorageKey
           );
           countDisplay.innerText = 0;
       })
    } else {
       alert("Browser yang Anda gunakan tidak mendukung Web Storage");
    }