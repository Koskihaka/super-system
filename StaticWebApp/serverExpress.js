const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Palvellaan staattiset tiedostot StaticWebApp-kansiosta
app.use(express.static(path.join(__dirname, 'StaticWebApp')));

// Määritellään reitti etusivulle
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'StaticWebApp', 'index.html'));
});

// Määritellään reitti toiselle HTML-sivulle
app.get('/kaikkiyhdessa', (req, res) => {
    res.sendFile(path.join(__dirname, 'StaticWebApp', 'kaikkiyhdessa.html'));
});

// Käynnistetään palvelin
app.listen(PORT, () => {
    console.log(`Serveri toimii osoitteessa http://localhost:${PORT}`);
});