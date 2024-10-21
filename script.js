const booksContainer = document.querySelector(".books-container");
const addBookButton = document.querySelector(".add-book-btn");
const confirmButton = document.querySelector(".confirm-btn");
const cancelButton = document.querySelector(".cancel-btn");
const titleInput = document.querySelector("#book-title");
const authorInput = document.querySelector("#book-author");
const numberOfPagesInput = document.querySelector("#number-of-pages");
const hasReadSelect = document.querySelector("#has-read");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");

const library = [];

function Book(title, author, numberOfPages, hasRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.hasRead = hasRead;
}

function addBookToLibrary(title, author, numberOfPages, hasRead) {
  const book = new Book(title, author, numberOfPages, hasRead);
  library.push(book);
  displayBooks();
}

function removeBookFromLibrary(index) {
  library.splice(index, 1);
  displayBooks();
}

Book.prototype.changeHasReadStatus = function (book) {
  if (book.hasRead === "Not read") {
    book.hasRead = "Read";
  } else {
    book.hasRead = "Not read";
  }
  displayBooks();
};

addBookButton.addEventListener("click", () => {
  dialog.showModal();
});

confirmButton.addEventListener("click", () => {
  if (!form.checkValidity()) {
    return;
  } else {
    const bookTitle = titleInput.value;
    const bookAuthor = authorInput.value;
    const bookNumberOfPages = numberOfPagesInput.value;
    const bookHasRead = hasReadSelect.value;

    dialog.close();
    addBookToLibrary(bookTitle, bookAuthor, bookNumberOfPages, bookHasRead);

    titleInput.value = "";
    authorInput.value = "";
    numberOfPagesInput.value = "";
    hasReadSelect.value = "";
  }
});

cancelButton.addEventListener("click", () => {
  dialog.close();
});

function displayBooks() {
  booksContainer.replaceChildren();
  library.forEach((book, index) => {
    const newBook = document.createElement("div");
    newBook.classList.add("book");
    booksContainer.appendChild(newBook);

    const newBookTitle = document.createElement("p");
    newBookTitle.textContent = book.title;
    newBookTitle.classList.add("book-title");
    newBook.appendChild(newBookTitle);

    const newBookAuthor = document.createElement("p");
    newBookAuthor.textContent = book.author;
    newBookAuthor.classList.add("book-author");
    newBook.appendChild(newBookAuthor);

    const newBookNumberOfPages = document.createElement("p");
    newBookNumberOfPages.textContent = book.numberOfPages + " pages";
    newBookNumberOfPages.classList.add("book-number-of-pages");
    newBook.appendChild(newBookNumberOfPages);

    const actionsContainer = document.createElement("div");
    actionsContainer.classList.add("book-actions");
    newBook.appendChild(actionsContainer);

    const changeHasReadBtn = document.createElement("button");
    changeHasReadBtn.classList.add("has-read-btn");
    changeHasReadBtn.classList.toggle(
      book.hasRead === "Not read" ? "red-btn" : "green-btn"
    );
    actionsContainer.appendChild(changeHasReadBtn);
    changeHasReadBtn.addEventListener("click", () => {
      book.changeHasReadStatus(book);
    });

    const changeHasReadBtnText = document.createElement("span");
    changeHasReadBtnText.textContent = book.hasRead;
    actionsContainer.classList.add("btn-text");
    changeHasReadBtn.appendChild(changeHasReadBtnText);

    const hasReadIcon = document.createElement("span");
    hasReadIcon.classList.add("material-symbols-outlined");
    hasReadIcon.classList.add("btn-icon");
    hasReadIcon.textContent = "cached";
    changeHasReadBtn.appendChild(hasReadIcon);

    const removeBookBtn = document.createElement("button");
    removeBookBtn.textContent = "Remove book";
    removeBookBtn.classList.add("remove-book-btn");
    actionsContainer.appendChild(removeBookBtn);
    removeBookBtn.addEventListener("click", () => removeBookFromLibrary(index));
  });
}

addBookToLibrary("Flowers For Algernon", "Daniel Keyes", 122, "Read");
addBookToLibrary(
  "All Tomorrows: The Myriad Species and Mixed Fortunes of Man",
  "Nemo Ramjet",
  111,
  "Read"
);
addBookToLibrary(
  "Sapiens: A Brief History of Humankind",
  "Yuval Noah Harari",
  512,
  "Not read"
);
addBookToLibrary(
  "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
  "James Clear",
  319,
  "Not read"
);

displayBooks();
