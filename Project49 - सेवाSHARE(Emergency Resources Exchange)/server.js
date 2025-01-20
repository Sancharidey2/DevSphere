const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware to handle JSON and CORS
app.use(express.json());
app.use(cors());  // Allow all requests from any origin

// Connect to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'sevaDB'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the MySQL database');
  }
});

// Route to handle registration form submission
app.post('/register', (req, res) => {
  console.log(req.body);  // Log received data to check if it's coming through

  const { first_name, last_name, email, phone } = req.body;

  const sql = `INSERT INTO users (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)`;
  db.execute(sql, [first_name, last_name, email, phone], (err, results) => {
    if (err) {
      console.error('Error inserting user:', err);  // Log error details
      return res.status(500).json({ message: 'Error inserting user', error: err });
    }
    res.status(200).json({ message: 'User registered successfully!', userId: results.insertId });
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
