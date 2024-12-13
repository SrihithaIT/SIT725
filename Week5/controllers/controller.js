const Event = require('../models/model');

// Fetch all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events. Please try again later.', details: err.message });
  }
};

// Create a new event
const createEvent = async (req, res) => {
  try {
    const { name, date, location, description } = req.body;

    if (!name || !date || !location) {
      return res.status(400).json({ error: 'Missing required fields: name, date, or location.' });
    }

    const newEvent = new Event({ name, date, location, description });
    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully!', event: newEvent });
  } catch (err) {
    res.status(400).json({ error: 'Failed to create event. Please check the input data.', details: err.message });
  }
};

module.exports = { getEvents, createEvent };
