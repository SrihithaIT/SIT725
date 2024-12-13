const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, maxlength: 500 }, // Added a length limit for description
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
