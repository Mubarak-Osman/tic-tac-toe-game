$(document).ready(function () {
    showBooks();
    bindAddBookClick();
});

function bindAddBookClick() {
    $(".button--add").click(function (event) {
        event.preventDefault();
        addBook();
    });
}

function bindDeleteButtonClick() {
    $(".button--delete").click(function (event) {
        deleteBook(event);
    });
}

function showBooks() {
    fetchBooks()
        .done(data => {
            injectMarkup(data)
            bindDeleteButtonClick();
        }).fail(() => {
            showErrorMessage();
        });
}

function addBook() {
    fetchBooks()
        .done(data => {
            const numberOfBooks = data.length;
            const newBook = createNewBook(numberOfBooks)
            if (isInvalidBook(newBook)) {
                alert("it looks like your comment is too short or contains a invalid link");
                return;
            }
            postNewBook(newBook);
        }).fail(() => {
            showErrorMessage();
        });
}

function deleteBook(event) {
    const bookId = event.target.dataset.bookid;
    const idOfBook = {
        id: `${bookId}`
    };

    $.ajax({
        url: "https://booklist-endpoint.herokuapp.com/booklist",
        method: "DELETE",
        data: idOfBook
    }).done(() => {
        showBooks();
    }).fail(() => {
        showErrorMessage();
    });
}

function injectMarkup(books) {
    let booksToInject = "";
    for (const book of books) {
        if (book.titel !== undefined) {
            booksToInject += insertBookDataIntoBooks(book);
        }
    }
    $(".booklist").html(booksToInject);
}

function fetchBooks() {
    return $.ajax({
        url: "https://booklist-endpoint.herokuapp.com/booklist",
        method: "GET"
    });
}

function showErrorMessage() {
    $(".booklist").html("Sorry the request failed. Please try again later!");
}

function insertBookDataIntoBooks(book) {
    return `<div class="card">
                <img class="card__image" src="${book.url}"/> 
                <div class="card__container">
                    <div class="card__title">Title</div> 
                    <h8 class="card__book-title">${book.titel}</h8>
                    <div class="card__author">Author</div> 
                    <div class="card__book-author">${book.autor}</div>
                    <button class="button button--delete" data-bookid="${book.id}">Delete</button>
                </div>
            </div>`;
}

function postNewBook(newBook) {
    $.ajax({
        url: "https://booklist-endpoint.herokuapp.com/booklist",
        method: "POST",
        data: newBook
    }).done(() => {
        $(".book-form")[0].reset();
        showBooks();
    }).fail(() => {
        showErrorMessage();
    });
}

function createNewBook(numberOfBooks) {
    return {
        autor: $(".autor").val(),
        titel: $(".titel").val(),
        id: `${numberOfBooks}`,
        url: $(".url").val()
    };
}

function isInvalidBook(newBook) {
    return (newBook.autor.length < 3 || newBook.titel.length < 3 || !newBook.url.startsWith("https://"));
}
