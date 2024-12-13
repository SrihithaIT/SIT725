const express = require('express');
const { getEvents, createEvent } = require('../controllers/controller');

const router = express.Router();

// Route to fetch all events
router.get('/events', getEvents);

// Route to create a new event
router.post('/events', createEvent);

module.exports = router;
