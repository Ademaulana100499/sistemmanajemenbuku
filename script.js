class Book {
    constructor(title, isbn) {
        this.title = title;
        this.isbn = isbn;
    }
}

class Author {
    constructor(name) {
        this.name = name;
        this.books = [];
    }

    addBook(title, isbn) {
        const book = new Book(title, isbn);
        this.books.push(book);
    }

    getBooks() {
        return this.books;
    }
}

class BookManagementSystem {
    constructor() {
        this.authors = [];
        this.authorSelect = document.getElementById("author-select");
        this.authorsList = document.getElementById("authors-list");

        document.getElementById("add-author-btn").addEventListener("click", () => this.addAuthor());
        document.getElementById("add-book-btn").addEventListener("click", () => this.addBook());
    }

    addAuthor() {
        const authorName = document.getElementById("author-name").value.trim();
        if (authorName) {
            const author = new Author(authorName);
            this.authors.push(author);
            this.updateAuthorSelect();
            this.renderAuthors();
            document.getElementById("author-name").value = "";
        }
    }

    addBook() {
        const bookTitle = document.getElementById("book-title").value.trim();
        const bookIsbn = document.getElementById("book-isbn").value.trim();
        const authorIndex = this.authorSelect.value;

        if (bookTitle && bookIsbn && authorIndex !== "") {
            this.authors[authorIndex].addBook(bookTitle, bookIsbn);
            this.renderAuthors();
            document.getElementById("book-title").value = "";
            document.getElementById("book-isbn").value = "";
        }
    }

    updateAuthorSelect() {
        this.authorSelect.innerHTML = `<option value="">Select Author</option>`;
        this.authors.forEach((author, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = author.name;
            this.authorSelect.appendChild(option);
        });
    }

    renderAuthors() {
        this.authorsList.innerHTML = "";
        this.authors.forEach(author => {
            const authorItem = document.createElement("li");
            authorItem.innerHTML = `<h3>${author.name}</h3>`;
            author.getBooks().forEach(book => {
                const bookItem = document.createElement("p");
                bookItem.textContent = `${book.title} (ISBN: ${book.isbn})`;
                authorItem.appendChild(bookItem);
            });
            this.authorsList.appendChild(authorItem);
        });
    }
}

const system = new BookManagementSystem();
