// API REST simple 
const books = [ 
    { id: 1, title: 'Node.js in Action' }, 
    { id: 2, title: 'Express.js Guide' }, 
]; 

const express = require("express");
const app = express();
const port =3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 

// Obtenir tous les livres 
app.get('/api/books', (req, res) => { 
    res.json(books); 
}); 

// Obtenir un livre par ID 
app.get('/api/books/:id', (req, res) => { 
    const book = books.find(b => b.id === parseInt(req.params.id)); 
    if (!book) return res.status(404).send('Book not found'); 
    res.json(book); 
}); 

// Ajouter un nouveau livre 
app.post('/api/books', (req, res) => { 
    const book = { id: books.length + 1, title: req.body.title }; 
    books.push(book); 
    res.json(book); 
});

// Mettre à jour un livre par ID 
app.put('/api/books/:id', (req, res) => { 
    const book = books.find(b => b.id === parseInt(req.params.id)); 
    if (!book) return res.status(404).send('Book not found'); 
    book.title = req.body.title; 
    res.json(book); 
}); 

// Supprimer un livre par ID 
app.delete('/api/books/:id', (req, res) => { 
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id)); 
    if (bookIndex === -1) return res.status(404).send('Book not found'); 
    const deletedBook = books.splice(bookIndex, 1); 
    res.json(deletedBook[0]); 
}); 

app.listen(3000, () => {
    console.log(`Serveur demarré http:localhost:${port}`);
});