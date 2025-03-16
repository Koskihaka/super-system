import { useState } from "react";
import axios from "axios";

const UpdateBook = ({ book, fetchBooks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(book.title);
  const [newAuthor, setNewAuthor] = useState(book.author);
  const [newYear, setNewYear] = useState(book.year_published);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/books/${book.book_id}`, {
        title: newTitle,
        author: newAuthor,
        year_published: parseInt(newYear),
        available: book.available, // Pitää saatavuuden samana
      });

      fetchBooks(); // ✅ Päivitetään kirjalista
      setIsEditing(false); // ✅ Suljetaan muokkaustila
    } catch (error) {
      console.error("Virhe kirjan päivittämisessä:", error);
    }
  };

  const handleToggleAvailability = async () => {
    try {
      await axios.put(`http://localhost:3000/books/${book.book_id}`, {
        available: !book.available,
        title: book.title, 
        author: book.author,
        year_published: book.year_published,
      });

      fetchBooks();
    } catch (error) {
      console.error("Virhe saatavuuden päivittämisessä:", error);
    }
  };

  return (
    <div className="d-flex gap-2 align-items-center">
      {isEditing ? (
        <div className="d-flex flex-column gap-2">
          <input
            type="text"
            className="form-control"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Kirjan nimi"
          />
          <input
            type="text"
            className="form-control"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            placeholder="Kirjailija"
          />
          <input
            type="number"
            className="form-control"
            value={newYear}
            onChange={(e) => setNewYear(e.target.value)}
            placeholder="Julkaisuvuosi"
          />
          <div className="d-flex gap-2">
            <button className="btn btn-success btn-sm" onClick={handleUpdate}>
              Tallenna
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => setIsEditing(false)}>
              Peruuta
            </button>
          </div>
        </div>
      ) : (
        <>
          <button 
            className={`btn ${book.available ? "btn-warning" : "btn-success"} btn-sm`} 
            onClick={handleToggleAvailability}
          >
            {book.available ? "Lainaa" : "Palauta"}
          </button>

          <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(true)}>
            Muokkaa
          </button>
        </>
      )}
    </div>
  );
};

export default UpdateBook;
