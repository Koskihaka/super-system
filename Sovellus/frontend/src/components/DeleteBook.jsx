import axios from "axios";

const DeleteBook = ({ bookId, fetchBooks }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/books/${bookId}`);
      fetchBooks();
    } catch (error) {
      console.error("Virhe kirjan poistamisessa:", error);
    }
  };

  return (
    <button className="btn btn-danger btn-sm" onClick={handleDelete}>
      Poista
    </button>
  );
};

export default DeleteBook;