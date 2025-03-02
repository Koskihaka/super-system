const http = require("http");
const fs = require("fs");
const path = require("path");

// Luo palvelin
const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
        // Määritetään tiedostopolku
        const filePath = path.join(__dirname, "kaikkiyhdes.html");

        // Luetaan HTML-tiedosto
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Palvelinvirhe");
            } else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Sivua ei löydy");
    }
});

// Käynnistä palvelin
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Palvelin toimii osoitteessa http://localhost:${PORT}`);
});
