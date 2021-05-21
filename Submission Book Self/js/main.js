// variable
let book = {
  id: 0,
  title: "",
  author: "",
  year: 0,
  isComplete: false,
};

const booksLocal = JSON.parse(localStorage.getItem("books"));
let books = [];

const cardStatus = (bookParam) => {
  return `
    <article id=${bookParam.id} class="book_item">
        <h3>${bookParam.title}</h3>
        <h4>${bookParam.id}</h4>
        <p>Penulis: ${bookParam.author}</p>
        <p>Tahun: ${bookParam.year}</p>
        <div class="action">
            <button onclick="updateStatus(this.parentNode.parentNode)" class="green">${
              bookParam.isComplete ? "Belum selesai di Baca" : "selesai di Baca"
            }</button>
            <button type="button" onclick="deleteCard(this.parentNode.parentNode)" class="red">Hapus buku</button>
        </div>
    </article>
    `;
};

// selector
const inputBookTitle = document.getElementById("inputBookTitle");
const inputBookAuthor = document.getElementById("inputBookAuthor");
const inputBookYear = document.getElementById("inputBookYear");
const inputBookIsComplete = document.getElementById("inputBookIsComplete");
const inputBook = document.getElementById("inputBook");
const completeBookshelfList = document.getElementById("completeBookshelfList");
const incompleteBookshelfList = document.getElementById(
  "incompleteBookshelfList"
);

// function handler
const handleChange = (e) => {
  switch (e.target.name) {
    case "year":
      // number
      book = { ...book, [e.target.name]: parseInt(e.target.value) };
      break;
    case "isComplete":
      // boolean
      book = { ...book, isComplete: !book.isComplete };
      break;
    default:
      // string
      book = { ...book, [e.target.name]: e.target.value };
      break;
  }
};
const handleSubmit = (e) => {
  e.preventDefault();
  let list = document.createElement("li");
  book = { ...book, id: Date.now() };

  if (books.some((item) => item === null)) {
    let done = false;
    let i = 0;
    do {
      if (books[i] === null) {
        books[i] = book;
        list.innerHTML = cardStatus(book);
        done = true;
      }
      i++;
    } while (!done);
  } else {
    books.push(book);
    list.innerHTML = cardStatus(book);
  }
  localStorage.setItem("books", JSON.stringify(books));
  console.log("submit", books);
  book.isComplete
    ? completeBookshelfList.appendChild(list)
    : incompleteBookshelfList.appendChild(list);
};

function updateStatus(node) {
  let list = document.createElement("li");
  console.log("update", node);
  for (const item of books) {
    if (item !== null) {
      if (item.id == node.id) {
        item.isComplete = !item.isComplete;
        list.innerHTML = cardStatus(item);
        item.isComplete
          ? completeBookshelfList.appendChild(list)
          : incompleteBookshelfList.appendChild(list);
        node.remove();
        localStorage.setItem("books", JSON.stringify(books));
      }
    } else {
      continue;
    }
  }
}

function deleteCard(node) {
  console.log("handleDelete", node);
  for (let i = 0; i < books.length; i++) {
    if (books[i] !== null && books[i].id !== null && books[i].id == node.id) {
      console.log("node id", node.id);
      console.log("books id", books[i].id);
      books[i] = null;
      localStorage.setItem("books", JSON.stringify(books));
      node.remove();
    }
  }
  if (books.every((item) => item === null)) {
    books = [];
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// eventListerner
inputBookTitle.addEventListener("change", handleChange);
inputBookAuthor.addEventListener("change", handleChange);
inputBookYear.addEventListener("change", handleChange);
inputBookIsComplete.addEventListener("change", handleChange);
inputBook.addEventListener("submit", handleSubmit);

function loadData() {
  booksLocal && books.push(...booksLocal);
  if (books) {
    for (let i = 0; i < books.length; i++) {
      if (books[i] !== null && books[i].id) {
        let list = document.createElement("li");
        list.innerHTML = cardStatus(books[i]);
        books[i].isComplete
          ? completeBookshelfList.appendChild(list)
          : incompleteBookshelfList.appendChild(list);
      } else {
        continue;
      }
    }
  }
}

loadData();