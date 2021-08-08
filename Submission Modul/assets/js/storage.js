let bookshelf = [];

const localStorageExist = () => {
    if (typeof(Storage) === "undefined") {
        alert("Maaf, browser Anda tidak mendukung local storage.");
        return false
    } 
    return true;
};

const saveBookData = () => {
    const stringifyBook = JSON.stringify(bookshelf);
    localStorage.setItem("bookshelf_data", stringifyBook);
    document.dispatchEvent(new Event("ondatasaved"));
};

const loadBookFromStorage = () => {
    const serializedBook = localStorage.getItem("bookshelf_data");

    let book = JSON.parse(serializedBook);

    if (book !== null) {
        bookshelf = book;
    }

    document.dispatchEvent(new Event("ondataloaded"));
};

const updateBookToStorage = () => {
    if (localStorageExist()) {
        saveBookData();
    }
};

const composeNewDataBook = (title, author, year, isComplete) => {
    return {
        id: + new Date(),
        title,
        author,
        year,
        isComplete
    };
};

const findBook = (bookId) => {
    for (book of bookshelf) {
        if (book.id === bookId) {
            return book;
        }
    };
        return null;
};

const findBookIndex = (bookId) => {
    let index = 0
   for (book of bookshelf) {
       if(book.id === bookId)
           return index;
 
       index++;
   }
   return -1;
};

const refreshBookData = () => {
    const incompletedBooks = document.getElementById("incompleteBookshelfList");
    const completedBooks = document.getElementById("completeBookshelfList");

    for(bookslist of bookshelf) {
        const bookArrive = putBook(bookslist.title, bookslist.author, bookslist.year, bookslist.isComplete);
        bookArrive["bookId"] = bookslist.id;

        if(bookslist.isComplete) {
            completedBooks.append(bookArrive);
        } else {
            incompletedBooks.append(bookArrive);
        }
    }
};