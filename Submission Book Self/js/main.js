let book = {
    id: 0,
    title: "",
    author: "",
    year: 0,
    isComplete: false,
};
  
const dataBooks = JSON.parse(localStorage.getItem("books"));
let books = [];
  
const inputBookTitle = document.getElementById("inputBookTitle");
const inputBookAuthor = document.getElementById("inputBookAuthor");
const inputBookYear = document.getElementById("inputBookYear");
const inputBookIsComplete = document.getElementById("inputBookIsComplete");
const inputBook = document.getElementById("inputBook");
const completeBookshelfList = document.getElementById("completeBookshelfList");
const incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
  
function myFunction() {
  var x = document.getElementById("searchBookTitle").placeholder;
  document.getElementById("searchBookTitle").innerHTML = x;

  console.log(alert('Maaf, saat ini button cari tidak dapat berfungsi!'));

}

const bookCard = (cardParam) => {
    return `
      <article id=${cardParam.id} class="book_item">
          <h3>${cardParam.title}</h3>
          <h4>${cardParam.id}</h4>
          <p>Penulis: ${cardParam.author}</p>
          <p>Tahun: ${cardParam.year}</p>
          <div class="action">
              <button onclick="bookStatus(this.parentNode.parentNode)" class="green">${
                cardParam.isComplete ? "Dibaca" : "Selesai"
              }</button>
              <button type="button" onclick="bookDelete (this.parentNode.parentNode)" class="red">Hapus</button>
          </div>
          <br><hr>
      </article>
    `;
};

const bookChange = (e) => {
    switch (e.target.name) {
      case "year":
        book = { ...book, [e.target.name]: parseInt(e.target.value) };
        break;
      case "isComplete":
        book = { ...book, isComplete: !book.isComplete };
        break;
      default:
        book = { ...book, [e.target.name]: e.target.value };
        break;
    }
};

const bookSubmit = (e) => {
    e.preventDefault();
    let list = document.createElement("li");
    book = { ...book, id: Date.now() };
  
    if (books.some((item) => item === null)) {
      let done = false;
      let i = 0;
      do {
        if (books[i] === null) {
          books[i] = book;
          list.innerHTML = bookCard(book);
          done = true;
        }
        i++;
      } while (!done);
    } else {
      books.push(book);
      list.innerHTML = bookCard(book);
    }
    localStorage.setItem("books", JSON.stringify(books));
    console.log("submit", books);
    book.isComplete
      ? completeBookshelfList.appendChild(list)
      : incompleteBookshelfList.appendChild(list);
};
  
const bookStatus = (node) => {
    let list = document.createElement("li");
    console.log("update", node);
    for (const item of books) {
      if (item !== null) {
        if (item.id == node.id) {
          item.isComplete = !item.isComplete;
          list.innerHTML = bookCard(item);
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
  
const bookDelete = (node) => {
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
  
inputBookTitle.addEventListener("change", bookChange);
inputBookAuthor.addEventListener("change", bookChange);
inputBookYear.addEventListener("change", bookChange);
inputBookIsComplete.addEventListener("change", bookChange);
inputBook.addEventListener("submit", bookSubmit);
  
const loadData = () => {
    dataBooks && books.push(...dataBooks);
    if (books) {
      for (let i = 0; i < books.length; i++) {
        if (books[i] !== null && books[i].id) {
          let list = document.createElement("li");
          list.innerHTML = bookCard(books[i]);
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