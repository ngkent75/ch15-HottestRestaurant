// Dependencies

const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const tables = [];
const waitlist = [];

// Routes

// Basic route that sends the user first to the AJAX Page+git pull
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'view.html')));
app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')));
app.get('/reserve', (req, res) => res.sendFile(path.join(__dirname, 'reserve.html')));

// Displays all tables
app.get('/api/tables', (req, res) => res.json(tables));
app.get('/api/waitlist', (req, res) => res.json(waitlist));

app.post('/api/tables', (req, res) => {
  const newTable = req.body;

  newTable.routeName = newTable.name.replace(/\s+/g, '').toLowerCase();
  console.log(newTable);

  tables.push(newTable);
  res.json(newTable);
});

app.post('/api/waitlist', (req, res) => {
  const newerTable = req.body;

  newerTable.routeName = newerTable.name.replace(/\s+/g, '').toLowerCase();
  console.log(newerTable);

  waitlist.push(newerTable);
  res.json(newerTable);
});

app.get('/api/waitlist', (req, res) => res.json(reservations));

app.get('/api/reservations/:reservation', (req, res) => {
  const chosen = req.params.reservation;

  console.log(chosen);


  for (let i = 0; i < reservations.length; i++) {
    if (chosen === reservations[i].routeName) {
      return res.json(reservations[i]);
    }
  }

  return res.json(false);
});

app.post('/api/waitlist', (req, res) => {
  const newReservation = req.body;

  newReservation.routeName = newReservation.name.replace(/\s+/g, '').toLowerCase();
  console.log(newReservation);

  waitlist.push(newReservation);
  res.json(newReservation);
});



console.log(__dirname)

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
