const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const connect = () => {
  mongoose.connect(
    process.env.MONGO_URI, // Access the variable from .env
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch(err => console.error('MongoDB connection error:', err));
};

module.exports = { connect };
