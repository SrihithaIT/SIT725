import express from 'express';
import path from 'path';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

const app = express();

// Middleware to parse incoming JSON (for POST requests)
app.use(express.json());

// Serve static files (CSS, JS, images) from the "public" directory
app.use(express.static(path.join(process.cwd(), 'public')));

// Route for serving the homepage (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

// API routes for Home, About, Prices, and Contact sections
app.get('/api/home', (req, res) => {
  res.json({
    message: "Welcome to Srihitha Event Management! Your one-stop solution to manage events seamlessly."
  });
});

app.get('/api/about', (req, res) => {
  res.json({
    message: "We provide various services to manage events, including event planning, decoration, catering, photography, and more."
  });
});

app.get('/api/prices', (req, res) => {
  res.json({
    eventPrices: [
      { event: "Wedding", price: "$2000" },
      { event: "Birthday", price: "$500" },
      { event: "Gender Reveal", price: "$800" }
    ]
  });
});

app.get('/api/contact', (req, res) => {
  res.json({
    contactInfo: {
      phone: "+123456789",
      email: "info@srihithaevents.com",
      social: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com"
      }
    }
  });
});

// Mock login functionality
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    res.json({
      message: `Login successful for email: ${email}`
    });
  } else {
    res.status(400).json({
      error: "Email and password are required."
    });
  }
});

// ✅ Create HTTP Server
const httpServer = createServer(app);

// ✅ Initialize Socket.IO
const io = new SocketIOServer(httpServer);

// ✅ Handle Socket.IO Connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('chat message', (msg) => {
    console.log('Message received:', msg);
    io.emit('chat message', msg); // Broadcast message to all clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: "404: Page or resource not found"
  });
});

// ✅ Start the Server
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

export default app;
