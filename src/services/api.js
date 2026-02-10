import axios from "axios";

const API_URL = "https://book-inventory-api-ea1i.onrender.com/books";

export const getBooks = () => axios.get(API_URL);
export const getBook = (id) => axios.get(`${API_URL}/${id}`);
export const addBook = (book) => axios.post(API_URL, book);
export const updateBook = (id, book) => axios.put(`${API_URL}/${id}`, book);
export const deleteBook = (id) => axios.delete(`${API_URL}/${id}`);
