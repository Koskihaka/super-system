import { useEffect } from "react";
import UpdateBook from "./UpdateBook";
import DeleteBook from "./DeleteBook";

const ReadBooks = ({ books, fetchBooks }) => {
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Kirjalista</h2>

      {books.length === 0 ? (
        <p className="text-center text-muted">Ei kirjoja saatavilla.</p>
      ) : (
        <ul className="list-group">
          {books.map((book) => (
            <li key={book.book_id} className="list-group-item d-flex justify-content-between align-items-center">
              <div className="flex-grow-1">
                <span>
                  {book.title} - {book.author} ({book.year_published})
                </span>
              </div>
              <span className={`badge ${book.available ? "bg-success" : "bg-danger"} text-uppercase`}>
                {book.available ? "Saatavilla" : "Lainassa"}
              </span>
              <div className="d-flex gap-2">
                <UpdateBook book={book} fetchBooks={fetchBooks} />
                <DeleteBook bookId={book.book_id} fetchBooks={fetchBooks} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReadBooks;