// DEPENDENCIES
const cors = require('cors');
const express = require('express');
const snackController = require('./controllers/snackController');

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// Snack ROUTES
app.use('/snacks', snackController);

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to Snack-A-Log');
});

// Error
app.get('*', (req, res) => {
  res.status(404).send('Page does not exist');
});
// EXPORT
module.exports = app;
