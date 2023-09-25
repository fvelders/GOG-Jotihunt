const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'http://192-168-2-23.fvelders.direct.quickconnect.to/phpMyAdmin/index.php',
    user: 'root',
    password: 'RensaFamily2023!',
    database: 'Users'
});

db.connect(err => {
    if (err) throw err;
    console.log('Database verbonden');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Serverfout');
        }
        res.status(201).send('Gebruiker geregistreerd');
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT password FROM users WHERE username = ?';
    db.query(query, [username], async (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Serverfout');
        }

        if (result.length === 0) {
            return res.status(401).send('Onjuiste gebruikersnaam of wachtwoord');
        }

        const hashedPassword = result[0].password;
        const match = await bcrypt.compare(password, hashedPassword);

        if (match) {
            res.status(200).send('Inloggen succesvol');
        } else {
            res.status(401).send('Onjuiste gebruikersnaam of wachtwoord');
        }
    });
});

app.listen(3000, () => {
    console.log('Server draait op http://localhost:3000');
});
