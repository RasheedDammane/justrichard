const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { Server } = require('socket.io');
const http = require('http');
require('dotenv').config();

const chatbotRoutes = require('./routes/chatbot');
const { initializeDatabase } = require('./services/database');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'CommunityHub Chatbot',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/chatbot', chatbotRoutes);

// WebSocket for real-time chat
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('chat-message', async (data) => {
    try {
      const { message, userId, sessionId, locale = 'en' } = data;
      
      // Process message with chatbot
      const chatbotService = require('./services/chatbot');
      const response = await chatbotService.processMessage(message, userId, sessionId, locale);
      
      // Send response back to client
      socket.emit('bot-response', response);
      
      // Broadcast to admin dashboard if connected
      io.to('admin-room').emit('new-message', {
        sessionId,
        userId,
        message,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error processing message:', error);
      socket.emit('bot-error', { 
        error: 'Sorry, I encountered an error. Please try again.' 
      });
    }
  });

  // Admin joins room to listen to all conversations
  socket.on('admin-join', () => {
    socket.join('admin-room');
    console.log('Admin joined monitoring room');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

// Initialize database and start server
const PORT = process.env.CHATBOT_PORT || 3001;

async function startServer() {
  try {
    await initializeDatabase();
    console.log('✅ Database connected');
    
    server.listen(PORT, () => {
      console.log(`🤖 Chatbot service running on port ${PORT}`);
      console.log(`📡 WebSocket server ready`);
      console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
