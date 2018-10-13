'use strict'

function init() {
    createBooks();
    renderBooks();
}

function renderBooks() {
    var books = getBooks();
    var strHtmls = books.map(function (book) {
        return `
        <tr>
            <th scope="row">${book.id}</th>
            <td ><img src="${book.img}" alt="pic" width="170px" height="200px" ></td>
            <td >${book.title}</td>
            <td class="num">${book.price}</td>
            <td><button type="button" class="btn btn-primary" onclick="onReadBook(${book.id})">Read</button></td>
            <td><button type="button" class="btn btn-warning" onclick="readAndAddNewBook(${book.id})">Update</button></td>
            <td><button type="button" class="btn btn-danger" onclick="onDeleteBook(${book.id})">Delete</button></td>
          </tr>
          `
    });
    $('.book-list').html(strHtmls.join(''));
}

function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderBooks();
}

function readAndAddNewBook(bookId) {
    var $newBookEl = $('#read-and-add-new-book');
    if (bookId) {
        var book = getBookById(bookId);
        $('#book-modal').text('Update Book');
        $('#book-title').val(book.title).prop('disabled', true);
        $('#book-price').val(book.price).prop('disabled', false);
        $('#book-img-div').hide();
        $('#update-btn').data('id', bookId);
    }
    else {
        $('#book-modal').text('Add New Book');
        $('#book-title').val('').prop('disabled', false);
        $('#book-price').val('').prop('disabled', false);
        $('#book-img').val('');
        $('#book-img-div').show();
        $('#update-btn').data('id', '');
    }
    $('#read-book-img').hide();
    $('#book-rating').hide();
    $newBookEl.modal('show');
    renderBooks();
}

function onUpdateBook() {
    var $id = $('#update-btn').data('id');

    if ($id) {
        var $price = $('#book-price').val();
        updateBook($id, $price);
    }
    else {
        var $title = $('#book-title').val();
        var $price = $('#book-price').val();
        var $img = $('#book-img').val();
        if ($img === '') $img = '.img/image.svg'
        addBook($title, $price, $img);
    }
}

function onReadBook(bookId) {
    var $newBookEl = $('#read-and-add-new-book');
    var book = getBookById(bookId);
    $('#book-modal').text('Book Details');
    $('#book-title').val(book.title).prop('disabled', true);
    $('#book-price').val(book.price).prop('disabled', true);
    $('#book-img-div').hide();
    $('#read-book-img').val(book.img).show();
    $('#read-img').attr('src',book.img);
    $('#update-btn').data('id', bookId);
    $('#curr-rate').text(book.rating);
    $newBookEl.modal('show');
}

function onLowerRate(){
    var $id = $('#update-btn').data('id');
    $('#curr-rate').text(lowerRate($id));
    renderBooks();
}

function onHigherRate(){
    var $id = $('#update-btn').data('id');
    $('#curr-rate').text(higherRate($id));
    renderBooks();
}

$("#main-form").submit(function (e) {
    e.preventDefault();
});