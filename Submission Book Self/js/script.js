document.addEventListener("DOMContentLoaded", () => {
 
    const submitFormBook = document.getElementById("formBook");
    const submitFormSearch = document.getElementById("formSearch");

    submitFormBook.addEventListener("submit", (event) => {
        event.preventDefault();
        getDataFormBook();
    });

    submitFormSearch.addEventListener("submit", (event) => {
        event.preventDefault();
        getSearchBook();
    });

    if(checkStorage()) {
        getDataInStorage();
    }
});

document.addEventListener("onSaveDatas", () => {
    console.log("Data berhasil disimpan.");
});

document.addEventListener("onLoadDatas", () => {
    refreshData();
});