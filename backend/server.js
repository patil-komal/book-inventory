const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

let books = require("./db.json").books;

// GET all books
app.get("/books", (req, res) => res.json(books));

// GET book by id
app.get("/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  res.json(book);
});

// POST add book
app.post("/books", (req, res) => {
  const newBook = { id: Date.now(), ...req.body };
  books.push(newBook);
  res.json(newBook);
});

// PUT update book
app.put("/books/:id", (req, res) => {
  books = books.map(b => b.id === parseInt(req.params.id) ? { ...b, ...req.body } : b);
  res.json(books.find(b => b.id === parseInt(req.params.id)));
});

// DELETE book
app.delete("/books/:id", (req, res) => {
  books = books.filter(b => b.id !== parseInt(req.params.id));
  res.json({ message: "Deleted" });
});

app.listen(process.env.PORT || 3001, () => console.log("API running..."));
