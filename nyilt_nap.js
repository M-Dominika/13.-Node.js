//  A szükséges modulok meghívása
const express = require('express');
const mysql = require('mysql2');
const bodyparser = require('body-parser');

//  Az app változóvba tároljuk az express összes modulját
//  a bodyparser pedig az összes adatot json-á fogja átalakítan
const app = express();
app.use(bodyparser.json());

//  A szerver nyitása
const port = 3000;


//  Kapcsolat létrehozása az adatbázissal
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'nyilt_nap'
});

db.connect(err =>{
    if (err) throw err;
    console.log("Sikeresen csatlakozott az adatbázishoz!☆");
});

//  Az összes nyílt nap adatának lekérése
app.get('/nyilt', (req, res) => {
    const query = 'SELECT * FROM nyilt';
    db.query(query, (err, results) =>{
        if (err) throw err;
        res.json(results);
    })
});

//  Új nyílt nap hozzáadása
app.post('/nyilt', (req, res) => {
    const {varos, kar, latogatok} = req.body;
    const query = 'INSERT INTO nyilt (varos, kar, latogatok) VALUES (?, ?, ?)';
    db.query(query, [varos, kar, latogatok], (err, results) =>{
        if (err) throw err;
        res.send("Sikeresen hozzáadta az új nyílt napot!☆");
    })
});

//  Nyílt nap adatainak módosítása
app.put('/nyilt/:id', (req, res) => {
    const {id} = req.params;
    const {varos} = req.body;
    const query = 'UPDATE nyilt SET varos = ? WHERE id = ?';
    db.query(query, [varos, id], (err, results) =>{
        if (err) throw err;
        res.send("Sikeresen módosítottad a nyílt napot!☆");
    })
});

// Nyílt nap adatainak törlése
app.delete('/nyilt/:id', (req, res) => {
    const {id} = req.params;
    const query = 'DELETE FROM nyilt WHERE id = ?';
    db.query(query, [id], (err, results) =>{
        if (err) throw err;
        res.send("Sikeresen törölte a nyílt napot!☆");
    })
});


app.listen(port, () =>{
    console.log(`A szerver fut: http://localhost:${port}`);
});
