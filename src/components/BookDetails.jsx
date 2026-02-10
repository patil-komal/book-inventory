import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBook } from "../services/api";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const res = await getBook(id);
      setBook(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Publisher:</strong> {book.publisher}</p>
      <p><strong>Published Date:</strong> {book.published_date}</p>
      <p><strong>Overview:</strong> {book.overview}</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
