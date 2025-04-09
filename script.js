// Array of objects containing book instances
const library = [];

// Index used to locate book to be removed
let indexToRemove = 0;

const booksContainer = document.querySelector(".books-container");
const addBookButton = document.querySelector(".add-book-btn");
const confirmButton = document.querySelector(".confirm-btn");
const cancelButton = document.querySelector(".cancel-btn");
const titleInput = document.querySelector("#book-title");
const authorInput = document.querySelector("#book-author");
const numberOfPagesInput = document.querySelector("#number-of-pages");
const hasReadSelect = document.querySelector("#has-read");
const dialog = document.querySelector("dialog");
const removeDialog = document.querySelector(".remove-dialog");
const removeBtn = document.querySelector(".remove-btn");
const cancelRemoveBtn = document.querySelector(".cancel-remove-btn");
const form = document.querySelector("form");
const titleError = document.querySelector(".title-error");
const authorError = document.querySelector(".author-error");
const numberOfPagesError = document.querySelector(".number-of-pages-error");
const hasReadError = document.querySelector(".has-read-error");

// Book constructor
function Book(title, author, numberOfPages, hasRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.hasRead = hasRead;
}

// Book method to change read state and re-render books
Book.prototype.changeHasReadStatus = function (book) {
  // Switches read state
  if (book.hasRead === "Not read") {
    book.hasRead = "Read";
  } else {
    book.hasRead = "Not read";
  }
  displayBooks();
};

// Adds book to library
function addBookToLibrary(title, author, numberOfPages, hasRead) {
  const book = new Book(title, author, numberOfPages, hasRead);
  library.push(book);
  displayBooks();
}

// Removes book from index received from the displayBooks() function
function removeBookFromLibrary(index) {
  library.splice(index, 1);
  displayBooks();
}

// Updates index variable and opens dialog to confirm removal
function confirmDelete(index) {
  // Set variable to current index
  indexToRemove = index;

  removeDialog.showModal();
}

// Clears Inputs
function clearInputs() {
  titleInput.value = "";
  authorInput.value = "";
  numberOfPagesInput.value = "";
  hasReadSelect.value = "";
}

// Removes errors from inputs
function removeErrors() {
  titleError.style.display = "none";
  authorError.style.display = "none";
  numberOfPagesError.style.display = "none";
  hasReadError.style.display = "none";
}

// Shows errors if inputs are invalid
function showErrors() {
  if (titleInput.validity.valueMissing) {
    titleError.style.display = "block";
    titleError.textContent = "Please enter a title";
  }
  if (authorInput.validity.valueMissing) {
    authorError.style.display = "block";
    authorError.textContent = "Please enter an author";
  }
  if (numberOfPagesInput.validity.valueMissing) {
    numberOfPagesError.style.display = "block";
    numberOfPagesError.textContent = "Please enter a number of pages";
  }
  if (hasReadSelect.value === "") {
    hasReadError.style.display = "block";
    hasReadError.textContent = "Please select a read state";
  }
}

// Shows modal on click
addBookButton.addEventListener("click", () => {
  dialog.showModal();
});

// Checks inputs on focus out
function checkInputsOnfocusout() {
  const inputs = [
    { input: titleInput, error: titleError },
    { input: authorInput, error: authorError },
    { input: numberOfPagesInput, error: numberOfPagesError },
    { input: hasReadSelect, error: hasReadError },
  ];

  inputs.forEach(({ input, error }) => {
    input.addEventListener("focusout", () => {
      if (input.validity.valid) {
        error.style.display = "none";
      } else {
        error.style.display = "block";
      }
    });
  });
}
checkInputsOnfocusout();

// Adds book to library and clears inputs if form is valid
confirmButton.addEventListener("click", (event) => {
  // Checks validity of form before proceeding
  if (!form.checkValidity()) {
    showErrors();
    event.preventDefault();
  } else {
    const bookTitle = titleInput.value;
    const bookAuthor = authorInput.value;
    const bookNumberOfPages = numberOfPagesInput.value;
    const bookHasRead = hasReadSelect.value;

    dialog.close();
    addBookToLibrary(bookTitle, bookAuthor, bookNumberOfPages, bookHasRead);
    clearInputs();
  }
});

// Clears inputs and closes dialog
cancelButton.addEventListener("click", () => {
  clearInputs();
  dialog.close();
});

// Removes book from library and closes dialog
removeBtn.addEventListener("click", () => {
  removeBookFromLibrary(indexToRemove);
  removeDialog.close();
});

// Closes remove dialog on cancel
cancelRemoveBtn.addEventListener("click", () => {
  removeDialog.close();
});

// Displays books
function displayBooks() {
  booksContainer.replaceChildren();
  library.forEach((book, index) => {
    // Creates book
    const newBook = document.createElement("div");
    newBook.classList.add("book");
    booksContainer.appendChild(newBook);

    // Creates book title text
    const newBookTitle = document.createElement("p");
    newBookTitle.textContent = book.title;
    newBookTitle.classList.add("book-title");
    newBook.appendChild(newBookTitle);

    // Creates book author text
    const newBookAuthor = document.createElement("p");
    newBookAuthor.textContent = book.author;
    newBookAuthor.classList.add("book-author");
    newBook.appendChild(newBookAuthor);

    // Creates number of pages text
    const newBookNumberOfPages = document.createElement("p");
    newBookNumberOfPages.textContent = book.numberOfPages + " pages";
    newBookNumberOfPages.classList.add("book-number-of-pages");
    newBook.appendChild(newBookNumberOfPages);

    // Creates container for buttons inside book
    const actionsContainer = document.createElement("div");
    actionsContainer.classList.add("book-actions");
    newBook.appendChild(actionsContainer);

    // Creates Button to switch read state
    const changeHasReadBtn = document.createElement("button");
    changeHasReadBtn.classList.add("has-read-btn");
    // Toggles button background color if book exists
    changeHasReadBtn.classList.toggle(
      book.hasRead === "Not read" ? "red-btn" : "green-btn"
    );
    actionsContainer.appendChild(changeHasReadBtn);
    changeHasReadBtn.addEventListener("click", () => {
      book.changeHasReadStatus(book);
    });

    // Creates text inside has read button
    const changeHasReadBtnText = document.createElement("span");
    changeHasReadBtnText.textContent = book.hasRead;
    actionsContainer.classList.add("btn-text");
    changeHasReadBtn.appendChild(changeHasReadBtnText);

    // Creates icon inside has read button
    const hasReadIcon = document.createElement("span");
    hasReadIcon.classList.add("material-symbols-outlined");
    hasReadIcon.classList.add("btn-icon");
    hasReadIcon.textContent = "cached";
    changeHasReadBtn.appendChild(hasReadIcon);

    // Creates button to remove book
    const removeBookBtn = document.createElement("button");
    removeBookBtn.textContent = "Remove book";
    removeBookBtn.classList.add("remove-book-btn");
    actionsContainer.appendChild(removeBookBtn);
    removeBookBtn.addEventListener("click", () => confirmDelete(index));
  });
}

// Add placeholder books to DOM
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

// Displays books on load
displayBooks();
