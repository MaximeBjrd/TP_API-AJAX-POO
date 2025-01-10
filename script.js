console.log("########## 1 ##########");
const personne = {
    prenom: "Maxime",
    nom: "Beaujard",
    age: 24,
    presenter: function() {
        console.log(`Bonjour, je m'appelle ${this.prenom} ${this.nom} et j'ai ${this.age} ans.`)
    }
}

personne.presenter();


console.log("########## 2 ##########");
const library = {
    books: [],

    addBook: function(title, author) {
        const book = {
            title,
            author
        };
        this.books.push(book);
    },

    listBooks: function() {
        console.log("Liste de livres:");
        this.books.forEach(book => {
            console.log(`> ${book.title} de ${book.author}`);
        });
    },

    removeBook: function(title) {
        this.books = this.books.filter(book => book.title !== title);
    }
};

library.addBook("1984", "George Orwell");
library.addBook("Brave New World", "Aldous Huxley");
library.listBooks();
library.removeBook("1984");
library.listBooks();


console.log("########## 3 ##########");
class Animal {
    constructor(type, nom) {
        this.type = type;
        this.nom = nom;
    }

    sePresenter() {
        console.log(`Bonjour, je m'appelle ${this.nom} et je suis une ${this.type}.`);
    }
}

const animal = new Animal("tortue", "Franklin");
animal.sePresenter();