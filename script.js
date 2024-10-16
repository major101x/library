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
