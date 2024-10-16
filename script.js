const booksContainer = document.querySelector(".books-container");
const library = [
  {
    title: "father",
    author: "nigga",
    numberOfPages: 122,
    hasRead: "Want to read",
  },
  {
    title: "mother",
    author: "nigga",
    numberOfPages: 122,
    hasRead: "Want to read",
  },
  {
    title: "sister",
    author: "nigga",
    numberOfPages: 122,
    hasRead: "Want to read",
  },
  {
    title: "brother",
    author: "nigga",
    numberOfPages: 122,
    hasRead: "Want to read",
  },
];

function Book(title, author, numberOfPages, hasRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.hasRead = hasRead;
}

function addBookToLibrary(title, author, numberOfPages, hasRead) {
  const book = new Book(title, author, numberOfPages, hasRead);
  library.push(book);
  console.log(library);
  return library;
}

function displayBooks() {
  library.forEach((book) => {
    const newBook = document.createElement("div");
    booksContainer.appendChild(newBook);
    const newBookTitle = document.createElement("p");
    newBookTitle.textContent = book.title;
    newBook.appendChild(newBookTitle);
    const newBookAuthor = document.createElement("p");
    newBookAuthor.textContent = book.author;
    newBook.appendChild(newBookAuthor);
    const newBookNumberOfPages = document.createElement("p");
    newBookNumberOfPages.textContent = book.numberOfPages;
    newBook.appendChild(newBookNumberOfPages);
    const newBookHasRead = document.createElement("p");
    newBookHasRead.textContent = book.hasRead;
    newBook.appendChild(newBookHasRead);
  });
}

displayBooks();