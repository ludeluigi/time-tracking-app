const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Conexão com o banco SQLite
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS checkins (id INTEGER PRIMARY KEY AUTOINCREMENT, employeeId TEXT, checkinTime TEXT)");
});

// Endpoint para registrar ponto
app.post('/checkin', (req, res) => {
  const { employeeId } = req.body;
  const checkinTime = new Date().toISOString();
  db.run("INSERT INTO checkins (employeeId, checkinTime) VALUES (?, ?)", [employeeId, checkinTime], function(err) {
    if (err) return res.status(500).send(err.message);
    res.status(201).send({ id: this.lastID, employeeId, checkinTime });
  });
});

// Endpoint para listar pontos
app.get('/checkins', (req, res) => {
  db.all("SELECT * FROM checkins", [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
})
