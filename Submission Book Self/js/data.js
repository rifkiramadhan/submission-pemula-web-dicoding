let dataBook = [];

const checkStorage = () => {
    if(typeof(Storage) !== undefined) {
        return true;
    }
    return false;
}

const saveData = () => {
    const parsed = JSON.stringify(dataBook);
    localStorage.setItem('datas_of_book', parsed);
    document.dispatchEvent(new Event("onSaveDatas"));
}

const getDataInStorage = () => {
    const dataInStorage = localStorage.getItem('datas_of_book');

    let datas = JSON.parse(dataInStorage);

    if(datas !== null) { dataBook = datas; }

    document.dispatchEvent(new Event('onLoadDatas'));
}

const updateDataBook = () => {
    if(checkStorage()) { saveData(); }
}
  
const composeBookObject = (title, author, year, isRead) => {
    return {
        id: new Date().getTime(),
        title,
        author,
        year,
        isRead
    };
}
  
const findBook = (bookId) => {
    for(book of dataBook){
        if(book.id === bookId) { return book; }
    }
    return null;
}
  
  
const findBookIndex = (bookId) => {
    let index = 0;
    for (book of dataBook) {
        if(book.id === bookId) { return index; }
        index++;
    }
    return -1;
}

const refreshData = () => {
    const listUnRead = document.getElementById('bodyUnComplete');
    let listRead = document.getElementById('bodyComplete');
  
    for(itemBook of dataBook){
        const book = makeBook(itemBook.title, itemBook.author, itemBook.year, itemBook.isRead);
        book['bookId'] = itemBook.id;
        
        if(itemBook.isRead){
            listRead.append(book);
        } else {
            listUnRead.append(book);
        }
    }
 }