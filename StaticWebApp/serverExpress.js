const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Palvellaan kaikki staattiset tiedostot nykyisestä hakemistosta
app.use(express.static(__dirname));

// Käynnistetään palvelin
app.listen(PORT, () => {
    console.log(`Palvelin toimii osoitteessa http://localhost:${PORT}`);
});
