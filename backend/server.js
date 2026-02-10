const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = "./books.json";

// Helper functions
const readBooks = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE));
};
const writeBooks = (books) => fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, 2));

// Routes
app.get("/books", (req, res) => {
  const books = readBooks();
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const books = readBooks();
  const book = books.find(b => b.id === req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

app.post("/books", (req, res) => {
  const books = readBooks();
  const newBook = { id: Date.now().toString(), ...req.body };
  books.push(newBook);
  writeBooks(books);
  res.status(201).json(newBook);
});

app.put("/books/:id", (req, res) => {
  const books = readBooks();
  const index = books.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Book not found" });
  books[index] = { id: req.params.id, ...req.body };
  writeBooks(books);
  res.json(books[index]);
});

app.delete("/books/:id", (req, res) => {
  const books = readBooks();
  const filtered = books.filter(b => b.id !== req.params.id);
  writeBooks(filtered);
  res.json({ success: true });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
