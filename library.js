function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function updateLibrary() {
    removeCurrentLibrary();
    const bookDisplay = document.querySelector(".bookCardDisplay");

    library.forEach((book, index) => {
        let bookInfo = document.createElement("p");
        bookInfo.textContent = book.showInfo();

        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.setAttribute("data-library-index", index);
        removeButton.addEventListener("click", (event) => {
            let bookIndex = event.target.getAttribute("data-library-index");
            library.splice(bookIndex, 1);
            console.log(library);
            updateLibrary();
        });

        let bookCard = document.createElement("div");
        bookCard.classList.add("bookCard");
        bookCard.appendChild(bookInfo);
        bookCard.appendChild(removeButton);

        bookDisplay.appendChild(bookCard);
    });
}

function removeCurrentLibrary() {
    const bookCards = document.querySelectorAll(".bookCard");
    bookCards.forEach((bookCard) => bookCard.remove());
}

// Adding methods to the prototype is more memory efficient than adding them to the constructor
Book.prototype.showInfo = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ` + (this.read ? "read" : "not read yet");
};

const library = [];

const dialog = document.querySelector("dialog");
const newBookButton = document.querySelector(".newBookButton");
newBookButton.addEventListener("click", () => dialog.showModal());

const closeDialogButton = document.querySelector("dialog > button");
closeDialogButton.addEventListener("click", () => dialog.close());

// Adding the listener to the form instead of the button allows validation to still be carried out
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    let bookInfo = document.querySelectorAll("input");
    let title = bookInfo[0].value;
    let author = bookInfo[1].value;
    let pages = Number(bookInfo[2].value);
    let read = (document.querySelector("select").value === "true");

    library.push(new Book(title, author, pages, read));
    updateLibrary();
    
    // Resets values in case the user wants to add another book
    bookInfo.forEach((info) => info.value = "");
    document.querySelector("select").value = "false";
    dialog.close();
});