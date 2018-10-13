'use strict'

function newBookId() {
    return gLastBookId++;
}

function updateBookIds(){
    gLastBookId = 1
    gBooks.forEach(function(book) {
        book.id = gLastBookId++;
    });
}
