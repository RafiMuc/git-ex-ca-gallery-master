'use strict'
var gLastBookId = 1;
var gBooks


function createBooks() {
    gBooks = [
        createBook('Learn Lavarel', '18.90', 'img/1.jpg'),
        createBook('Begining with Lavarel', '6.65', 'img/2.jpg'),
        createBook('Java for developers', '7.20', 'img/3.jpg'),
        createBook('Learn Lavarel', '18.90', 'img/1.jpg'),
        createBook('Begining with Lavarel', '6.65', 'img/2.jpg'),
        createBook('Java for developers', '7.20', 'img/3.jpg'),
    ];
}


function getBooks() {
    return gBooks;
}


function getBookById(bookId) {
    return gBooks.find(function (book) {
        return book.id === bookId;
    })
}

//CRUD

function createBook(title, price, img) {
    return {
        id: newBookId(),
        title: title,
        price: price,
        img: img,
        rating: 0
    }

}

function lowerRate(id){
    var book = getBookById(id);
    if (book.rating>0) book.rating--;
    return book.rating
}

function higherRate(id){
    var book = getBookById(id);
    if (book.rating<10) book.rating++;
    return book.rating
}

function updateBook(bookId, bookPrice) {
    var currBook = gBooks.find(function (book) {
        return book.id === bookId
    })
    currBook.price = bookPrice;
    renderBooks();
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    gBooks.splice(bookIdx, 1);
    updateBookIds();
}

function addBook(title, price, img) {
    img = img.replace('C:\\fakepath\\', 'img\\');
    gBooks.push(createBook(title, price, img));
    renderBooks();
}