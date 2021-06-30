const getDataFormBook = () => {
  const id = new Date().getTime();
  const title = document.getElementById('bookTitle').value;
  const author = document.getElementById('author').value;
  const year = document.getElementById('year').value;
  const isRead = document.getElementById('read').checked;
  
  const bookData = makeBook(title, author, year, isRead);
  let target;

  const bookObject = composeBookObject(title, author, year, isRead);

  bookData['bookId'] = bookObject.id;
  dataBook.push(bookObject);

  if (isRead) { target = 'bodyComplete'; }
  else { target = 'bodyUnComplete'; }

  document.getElementById(target).appendChild(bookData);
  updateDataBook();
}

const makeBook = (title, author, year, isRead) => {
  const h3 = document.createElement('h3');
  const p = document.createElement('p');

  h3.innerHTML = '<span>' + title + '</span> ( <i>' + year + '</i> ).';
  p.innerHTML = 'Penulis : <i>' + author + '</i>';

  const div = document.createElement('div');
  div.setAttribute('class', 'book');
  div.appendChild(h3);
  div.appendChild(p);
  
  const button = document.createElement('div');
  button.classList.add('bookButton');

  if (isRead) { button.append(createUnReadBtn(), deleteDataBookBtn()); }
  else { button.append(createDoneReadBtn(), deleteDataBookBtn()); }

  div.appendChild(button);
  return div;
}

const createButton = (buttonName, buttonTypeClass , eventListener) => {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.innerText = buttonName;
  button.addEventListener("click", (event) => {
      eventListener(event);
  });
  return button;
}

const createDoneReadBtn = () => {
  return createButton("check_circle","doneReadBtn" && "material-icons", (event) => {
      readCompleted(event.target.parentElement.parentElement);
  });
}

const createUnReadBtn = () => {
  return createButton("chrome_reader_mode","unReadBtn" && "material-icons", (event) => {
      undoFromReadCompleted(event.target.parentElement.parentElement);
  });
}

const deleteDataBookBtn = () => {
  return createButton("delete","deleteBtn" && "material-icons", (event) => {
      deleteDataBook(event.target.parentElement.parentElement);
  });
}

const readCompleted = (taskElement) => {
  const bookcompleted = document.getElementById('bodyComplete');
  
  const title = taskElement.querySelector('h3 span').innerText;
  const author = taskElement.querySelector("p i").innerText;
  const year = taskElement.querySelector("h3 i").innerText;

  const book = makeBook(title, author, year, true);
  bookcompleted.append(book);

  const fineBook = findBook(taskElement['bookId']);
  fineBook.isRead = true;
  book['bookId'] = fineBook.id;
  
  taskElement.remove();
  updateDataBook();
}

const undoFromReadCompleted = (taskElement) => {
  const bookUncompleted = document.getElementById('bodyUnComplete');

  const title = taskElement.querySelector('h3 span').innerText;
  const author = taskElement.querySelector("p i").innerText;
  const year = taskElement.querySelector("h3 i").innerText;

  const book = makeBook(title, author, year, false);
  bookUncompleted.append(book);

  const fineBook = findBook(taskElement['bookId']);
  fineBook.isRead = false;
  book['bookId'] = fineBook.id;
  
  taskElement.remove();
  updateDataBook();
}

const deleteDataBook = (taskElement) => {
  const bookPosition = findBookIndex(taskElement['bookId']);
  dataBook.splice(bookPosition, 1);

  taskElement.remove();
  updateDataBook();
}