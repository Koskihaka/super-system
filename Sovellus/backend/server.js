const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Middleware JSON-pyyntöjen käsittelyyn
app.use(express.json());

// Palvellaan staattiset tiedostot "public" -kansiosta
app.use(express.static(path.join(__dirname, 'public')));

// Yhdistä SQLite-tietokantaan
const db = new sqlite3.Database('./library.db', (err) => {
  if (err) {
    console.error('Tietokantavirhe:', err.message);
  } else {
    console.log('Yhteys kirjaston tietokantaan onnistui.');
  }
});

// Luo "books" -taulu, jos sitä ei ole olemassa
db.run(`CREATE TABLE IF NOT EXISTS books (
  book_id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  author TEXT,
  year_published INTEGER,
  available BOOLEAN DEFAULT 1
)`);

//  Palauta etusivuksi `index.html`
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//  Hae kaikki kirjat (Read)
app.get('/books', (req, res) => {
  db.all('SELECT * FROM books', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

//  Lisää uusi kirja (Create)
app.post('/books', (req, res) => {
  const { title, author, year_published } = req.body;
  if (!title || !author || !year_published) {
    return res.status(400).json({ error: 'Nimi, kirjailija ja julkaisuvuosi vaaditaan' });
  }

  const query = `INSERT INTO books (title, author, year_published, available) VALUES (?, ?, ?, 1)`;
  db.run(query, [title, author, year_published], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ book_id: this.lastID, title, author, year_published, available: 1 });
  });
});

// Päivitä kirjan saatavuus (lainaus tai palautus)
app.put('/books/:book_id', (req, res) => {
  const { book_id } = req.params;
  const { available } = req.body;

  db.run(`UPDATE books SET available = ? WHERE book_id = ?`, [available, book_id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Kirjaa ei löytynyt' });
    }
    res.json({ message: 'Kirjan saatavuus päivitetty', book_id, available });
  });
});

// Poista kirja (Delete)
app.delete('/books/:book_id', (req, res) => {
  const { book_id } = req.params;

  db.run(`DELETE FROM books WHERE book_id = ?`, book_id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Kirjaa ei löytynyt' });
    }
    res.json({ message: 'Kirja poistettu', book_id });
  });
});

// Käynnistä palvelin
app.listen(port, () => {
  console.log(`Palvelin käynnissä osoitteessa http://localhost:${port}`);
});