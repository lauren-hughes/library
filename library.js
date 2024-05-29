function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function displayLibrary() {
    const bookDisplay = document.querySelector(".bookCardDisplay");

    library.forEach((book) => {
        let bookInfo = document.createElement("p");
        bookInfo.textContent = book.showInfo();

        let bookCard = document.createElement("div");
        bookCard.classList.add("bookCard");
        bookCard.appendChild(bookInfo);

        bookDisplay.appendChild(bookCard);
    });
}

// Adding methods to the prototype is more memory efficient than adding them to the constructor
Book.prototype.showInfo = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ` + (this.read ? "read" : "not read yet");
};

const library = [];

let hobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);
let frankenstein = new Book("Frankenstein", "Mary Shelley", 280, true);
let mockingbird = new Book("To Kill a Mockingbird", "Harper Lee", 384, true);

library.push(hobbit, frankenstein, mockingbird);

displayLibrary();