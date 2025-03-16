import { useState } from "react";
import axios from "axios";

const AddBook = ({ fetchBooks }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [yearPublished, setYearPublished] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const newBook = {
      title,
      author,
      year_published: parseInt(yearPublished),
    };

    try {
      await axios.post("http://localhost:3000/books", newBook);
      setMessage(`Kirja lisätty: ${title}`);
      setTitle("");
      setAuthor("");
      setYearPublished("");
      fetchBooks(); // Päivitetään lista automaattisesti
    } catch (error) {
      setMessage("Virhe: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="text-center mb-3">Lisää uusi kirja</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Kirjan nimi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Kirjailija"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Julkaisuvuosi"
              value={yearPublished}
              onChange={(e) => setYearPublished(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Lisää kirja</button>
        </form>
        {message && <p className="text-center mt-3 text-muted">{message}</p>}
      </div>
    </div>
  );
};

export default AddBook;
