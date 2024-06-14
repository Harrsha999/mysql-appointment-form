const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Set up body-parser middleware
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Asdfghjkl@#3700', // Update with your MySQL root password
    database: 'appointments'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('MySQL connected...');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, age, email, date, time } = req.body;
    const query = 'INSERT INTO appointments (name, age, email, date, time) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, age, email, date, time], (err, result) => {
        if (err) {
            res.status(500).send('Failed to book appointment.');
            throw err;
        }
        res.send('Appointment booked successfully!');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
