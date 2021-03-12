// Dependencies

const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars tables (DATA)

const tables = [];
const waitlist = [];

// Routes

// Basic route that sends the user first to the AJAX Page+git pull
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'view.html')));
app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')));
app.get('/reserve', (req, res) => res.sendFile(path.join(__dirname, 'reserve.html')));

// Displays all tables
app.get('/api/tables', (req, res) => res.json(tables));

// Displays a single character, or returns false
app.get('/api/tables/:reservation', (req, res) => {
  const chosen = req.params.waitlist;

  console.log(chosen);

  /* Check each character routeName and see if the same as "chosen"
   If the statement is true, send the character back as JSON,
   otherwise tell the user no character was found */

  for (let i = 0; i < tables.length; i++) {
    if (chosen === tables[i].routeName) {
      return res.json(tables[i]);
    }
  }

  return res.json(false);
});

// Create New tables - takes in JSON input
app.post('/api/tables', (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newTable = req.body;

  // Using a RegEx Pattern to remove spaces from newTable
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newTable.routeName = newTable.name.replace(/\s+/g, '').toLowerCase();
  console.log(newTable);

  tables.push(newTable);
  res.json(newTable);
});

// Starts the server to begin listening


// Routes

// Basic route that sends the user first to the AJAX Page+git pull
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'view.html')));
app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')));
app.get('/reserve', (req, res) => res.sendFile(path.join(__dirname, 'reserve.html')));

// Displays all reservations
app.get('/api/reservations', (req, res) => res.json(reservations));

// Displays a single character, or returns false
app.get('/api/reservations/:reservation', (req, res) => {
  const chosen = req.params.reservation;

  console.log(chosen);

  /* Check each character routeName and see if the same as "chosen"
   If the statement is true, send the character back as JSON,
   otherwise tell the user no character was found */

  for (let i = 0; i < reservations.length; i++) {
    if (chosen === reservations[i].routeName) {
      return res.json(reservations[i]);
    }
  }

  return res.json(false);
});

// Create New reservations - takes in JSON input
app.post('/api/reservations', (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newreservation
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservation.routeName = newReservation.name.replace(/\s+/g, '').toLowerCase();
  console.log(newreservation);

  reservations.push(newReservation);
  res.json(newReservation);
});



console.log(__dirname)

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
