# Library
Library website made with HTML, CSS and JavaScript

## Lessons Learned
I learned about object constructors, object prototypes and prototypal inheritance. \
I also learned about modals and the `<dialog>` element \
I also learned when to choose between declaring methods inside an object constructor and on the object's prototype. \
I faced a problem where I didn't know how to remove books from the page. I solved this after I learned that `forEach` can also return the `index` of each element. I passed the index as an argument to the `confirmDelete` function which would update the `indexToRemove` global variable and pass it as an argument to the `removeBookFromLibrary` function to splice the library array of objects and re-render the page with the book removed.
