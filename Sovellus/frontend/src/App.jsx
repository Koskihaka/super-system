import { useState, useEffect } from "react";
import axios from "axios";
import AddBook from "./components/AddBook";
import ReadBooks from "./components/ReadBooks";

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/books");
      if (response.data && Array.isArray(response.data)) { 
        setBooks(response.data);
      } else {
        console.error("Virhe: Odotettiin taulukkoa, mutta saatiin", response.data);
      }
    } catch (error) {
      console.error("Virhe haettaessa kirjoja:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="main-container">
      <h1>Kirjaston hallinta</h1>
      <AddBook fetchBooks={fetchBooks} />
      <ReadBooks books={books} fetchBooks={fetchBooks} />
    </div>
  );
}

export default App;
