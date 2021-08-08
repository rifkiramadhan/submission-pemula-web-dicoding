const searchTheBook =  () => {
    let search = document.getElementById('searchBookTitle').value;

    let bookCard = document.getElementsByClassName('book-item');

    for (bookItem of bookCard) {
        let bookTitle = bookItem.innerText.toUpperCase();
        let searchBook = bookTitle.search(search.toUpperCase());

        if(searchBook != -1) {
            bookItem.style.display = ""
        } else { 
            bookItem.style.display = "none";
            console.log(searchBook);
        };
    } 
};