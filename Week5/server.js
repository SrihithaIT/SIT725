const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importing cors module
const mongoose = require('mongoose');
const router = require('./routers/router');
const databaseConnection = require('./databaseConnection');

const app = express();
const PORT = 3000;

// Debug Statement to Verify cors
console.log(typeof cors); // Should print "function"

// Middleware
app.use(cors()); // Using CORS middleware
app.use(bodyParser.json());

// Connect to the database
databaseConnection.connect();

// Use the router
app.use('/api', router);

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
