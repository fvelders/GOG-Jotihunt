const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // serveer statische bestanden uit de 'public' map

// Simpele gebruikersdatabase (voor demonstratiedoeleinden)
const users = [
  { username: 'admin', password: 'admin', role: 'admin' },
  { username: 'user', password: 'user', role: 'user' }
];

// Inlogroute
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true, role: user.role });
  } else {
    res.json({ success: false });
  }
});

// Start de server
const port = 3000;
app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`);
});
