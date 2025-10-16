const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const chatbotService = require('../services/chatbot');
const { getChatHistory } = require('../services/database');

// Rate limiting
const { RateLimiterMemory } = require('rate-limiter-flexible');
const rateLimiter = new RateLimiterMemory({
  points: 10, // 10 requests
  duration: 60, // per 60 seconds
});

// Middleware to check rate limit
const rateLimiterMiddleware = async (req, res, next) => {
  try {
    const key = req.ip || req.connection.remoteAddress;
    await rateLimiter.consume(key);
    next();
  } catch (error) {
    res.status(429).json({
      error: 'Too many requests. Please try again later.',
    });
  }
};

// POST /api/chatbot/message - Send a message to the chatbot
router.post(
  '/message',
  rateLimiterMiddleware,
  [
    body('message').trim().notEmpty().withMessage('Message is required'),
    body('sessionId').trim().notEmpty().withMessage('Session ID is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { message, userId, sessionId } = req.body;
      
      const response = await chatbotService.processMessage(message, userId, sessionId);
      
      res.json({
        success: true,
        response,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error processing chatbot message:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to process message',
      });
    }
  }
);

// GET /api/chatbot/history/:sessionId - Get chat history
router.get('/history/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const limit = parseInt(req.query.limit) || 50;
    
    const history = await getChatHistory(sessionId, limit);
    
    res.json({
      success: true,
      history: history.reverse(), // Oldest first
      count: history.length,
    });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch chat history',
    });
  }
});

// GET /api/chatbot/suggestions - Get quick action suggestions
router.get('/suggestions', async (req, res) => {
  try {
    const suggestions = [
      {
        text: '🔍 Find Services',
        message: 'Show me available services',
        icon: '🔍',
      },
      {
        text: '📍 View Locations',
        message: 'What cities are you in?',
        icon: '📍',
      },
      {
        text: '📅 Make a Booking',
        message: 'I want to book a service',
        icon: '📅',
      },
      {
        text: '💬 Popular Categories',
        message: 'Show me service categories',
        icon: '💬',
      },
    ];
    
    res.json({
      success: true,
      suggestions,
    });
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch suggestions',
    });
  }
});

// POST /api/chatbot/feedback - Submit feedback on chatbot response
router.post(
  '/feedback',
  [
    body('sessionId').trim().notEmpty(),
    body('messageId').trim().notEmpty(),
    body('rating').isInt({ min: 1, max: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { sessionId, messageId, rating, comment } = req.body;
      
      // Save feedback to database
      // TODO: Implement feedback storage
      
      res.json({
        success: true,
        message: 'Thank you for your feedback!',
      });
    } catch (error) {
      console.error('Error saving feedback:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to save feedback',
      });
    }
  }
);

module.exports = router;
