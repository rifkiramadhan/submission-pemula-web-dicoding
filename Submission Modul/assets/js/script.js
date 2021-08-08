document.addEventListener("DOMContentLoaded", () => {

    const submitBook/* HTMLFormElement */ = document.getElementById("inputBook");
    const searchBook = document.getElementById("searchBook");

    submitBook.addEventListener("submit", (event) => {
        event.preventDefault();
        addBook();
    });

    searchBook.addEventListener("submit", (event) => {
        event.preventDefault();
        searchTheBook();
    });

    if(localStorageExist()) {
        loadBookFromStorage ();
    };

});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.")
});
document.addEventListener("ondataloaded", () => {
   refreshBookData();
});
