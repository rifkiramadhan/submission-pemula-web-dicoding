const addBook = () => {
    const id = new Date().getTime();
    
    const bookTitle = document.getElementById("inputBookTitle").value;
    const authorName = document.getElementById("inputBookAuthor").value;
    const yearBook = document.getElementById("inputBookYear").value;
    const isComplete = document.getElementById("bookChecked").checked;
    
    const dataBook = putBook(bookTitle, authorName, yearBook, isComplete);
    let bookshelfName;
    
    const objectBook = composeNewDataBook(bookTitle, authorName, yearBook, isComplete);
    
    dataBook['bookId'] = objectBook.id
    bookshelf.push(objectBook);
    
    if (isComplete) {
       bookshelfName = "completeBookshelfList";
    
    } else {
        bookshelfName = "incompleteBookshelfList";
    }

    document.getElementById(bookshelfName).appendChild(dataBook);
    updateBookToStorage();
};

const putBook = (title, author, year, isComplete) => {
    const bookTitle = document.createElement("h2");
    bookTitle.classList.add("title");
    bookTitle.innerText = title;

    const bookAuthor = document.createElement("h4");
    bookAuthor.innerText = author;

    const bookYear = document.createElement("p");
    bookYear.innerText = year

    const authorLabel = document.createElement("label");
    authorLabel.innerText = "Penulis: ";

    const yearLabel = document.createElement("label");
    yearLabel.innerText = "Tahun: ";

    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");

    editButton.addEventListener("click", () => {
        bookTitle.contentEditable = true;
        bookAuthor.contentEditable = true;
        bookYear.contentEditable = true;
        doneButton.style.display = "inline";
        editButton.style.display = "none";
        bookTitle.style.background = "rgb(221, 209, 255)";
        bookAuthor.style.background = "rgb(221, 209, 255)"
        bookYear.style.background = "rgb(221, 209, 255)";
    }
);
    
const doneButton = document.createElement("button");
doneButton.classList.add("done-button" && "material-icons");
doneButton.innerText = "task_alt";
doneButton.addEventListener("click", () => {
        bookTitle.contentEditable = false;
        bookAuthor.contentEditable = false;
        bookYear.contentEditable = false;
        editButton.style.display = "inline";
        doneButton.style.display = "none";
        bookTitle.style.background = "white";
        bookYear.style.background = "white";
        bookAuthor.style.background = "white";
    } 
);

const authorContainer = document.createElement("div")
authorContainer.classList.add("author-container");
authorContainer.append(authorLabel, bookAuthor);

const yearContainer = document.createElement("div");
yearContainer.classList.add("year-container")
yearContainer.append(yearLabel, bookYear);

const inLineContainer = document.createElement("div");
inLineContainer.classList.add("inline-container");
inLineContainer.append(editButton);

editButton.addEventListener("click", () => {
        inLineContainer.append(doneButton);
    }
);

const textContainer = document.createElement("div");
textContainer.setAttribute('class', 'book-item');
textContainer.append(inLineContainer, bookTitle, authorContainer, yearContainer);
    
const button = document.createElement('div');
button.classList.add('buttons');

    if (isComplete) {
        button.append(
            makeUndoButton(),
            makeRemoveButton(),
        );    
    } else {
        button.append(
            makeFinishButton(),
            makeRemoveButton()
        )
    }
    
    textContainer.appendChild(button);
    return textContainer;
};

const makeUndoButton = () => {
    return createButton("undo-button" && "material-icons", (event) => {
        undoBookFromComplete(event.target.parentElement.parentElement);
    }, "bookmark_border");
};

const makeRemoveButton = () => {
    return createButton("red-button" && "material-icons", (event) => {
        removeBookFromComplete(event.target.parentElement.parentElement);
        swal("Buku Berhasil Dihapus", {
            icon: "success",
        })
        updateBookToStorage()
    }, "delete");
};

const makeFinishButton = () => {
    return createButton("green-button" && "material-icons", (event) => {
         addBookToComplete(event.target.parentElement.parentElement);
        updateBookToStorage()
    }, "bookmark");

};

const createButton = (buttonTypeClass, eventListener, type) => {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = type;
    button.addEventListener("click", (event) => {
        eventListener(event);
        updateBookToStorage()
    });

  return button;
};

const removeBookFromComplete = (bookElement) => {
    const bookPosition = findBookIndex(bookElement["bookId"]);
    bookshelf.splice(bookPosition, 1);
    bookElement.remove();
};

const addBookToComplete = (bookElement) => {
    const bookCompleted = document.getElementById("completeBookshelfList");
    
    const title = bookElement.querySelector(".book-item > h2").innerText;
    const author = bookElement.querySelector(".book-item > .author-container > h4").innerText;
    const year = bookElement.querySelector(".book-item > .year-container > p").innerText;

    const newBook = putBook(title, author, year, true);
    bookCompleted.append(newBook);

    const getBook = findBook(bookElement["bookId"]);
    getBook.isComplete = true;
    newBook["bookId"] = getBook.id;
   
    bookElement.remove();
    updateBookToStorage()
};


const undoBookFromComplete = (bookElement) => {
    const bookIncompleted = document.getElementById("incompleteBookshelfList");
    const title = bookElement.querySelector(".book-item > h2").innerText;
    const author = bookElement.querySelector(".book-item > .author-container > h4").innerText;
    const year = bookElement.querySelector(".book-item > .year-container > p").innerText;
 
    const newBook = putBook(title, author, year, false);
    bookIncompleted.append(newBook);

    const getBook = findBook(bookElement["bookId"]);
    getBook.isComplete = false;
    newBook["bookId"] = getBook.id;
 
    bookElement.remove();

    updateBookToStorage();
};

