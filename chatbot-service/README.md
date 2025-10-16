# 🤖 CommunityHub Chatbot Service

AI-powered chatbot service for CommunityHub platform that helps users find services, make bookings, and get information about available categories and activities.

## 📋 Features

### ✅ Core Capabilities
- **Service Discovery** - Help users find services based on categories, locations, and needs
- **Booking Assistance** - Guide users through the booking process
- **Information Retrieval** - Answer questions about services, pricing, locations
- **Multi-language Support** - Support for English, French, Arabic, Thai
- **Real-time Chat** - WebSocket-based instant messaging
- **Context Awareness** - Maintains conversation context across sessions
- **Quick Replies** - Suggested actions for faster interaction
- **Database Integration** - Connected to CommunityHub database via Prisma

### 🎯 Intent Recognition
- Greetings
- Service inquiries
- Category browsing
- Location queries
- Booking requests
- Pricing information
- Help requests
- Contact information

## 🏗️ Architecture

```
chatbot-service/
├── index.js                # Main server entry point
├── package.json            # Dependencies
├── .env.example            # Environment variables template
├── services/
│   ├── database.js         # Database service (Prisma)
│   └── chatbot.js          # Chatbot logic and intent processing
└── routes/
    └── chatbot.js          # API routes
```

## 🚀 Installation

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (same as main app)
- Main CommunityHub app running on port 3000

### Step 1: Install Dependencies

```bash
cd chatbot-service
npm install
```

### Step 2: Configure Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env`:

```env
CHATBOT_PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
DATABASE_URL="postgresql://user:password@localhost:5432/communityhub"
```

### Step 3: Setup Database

The chatbot uses the same database as the main app. Run migrations:

```bash
# From the main app directory
cd /Users/richard/justrichard
npx prisma migrate dev
```

This will create the required tables:
- `ChatMessage` - Store chat history
- `BookingIntent` - Track booking intentions

### Step 4: Start the Chatbot Service

```bash
npm run dev
```

The chatbot service will start on `http://localhost:3001`

You should see:

```
✅ Database connected
🤖 Chatbot service running on port 3001
📡 WebSocket server ready
🌐 Frontend URL: http://localhost:3000
```

### Step 5: Test the Integration

1. Open `http://localhost:3000/en` in your browser
2. Look for the chat bubble icon in the bottom-right corner
3. Click to open the chatbot
4. Start chatting!

## 📡 API Endpoints

### POST `/api/chatbot/message`
Send a message to the chatbot

**Request:**
```json
{
  "message": "Show me available services",
  "sessionId": "session-123",
  "userId": "user-456" // optional
}
```

**Response:**
```json
{
  "success": true,
  "response": {
    "message": "Here are the services I found...",
    "type": "services",
    "data": [...],
    "quickReplies": [...]
  },
  "timestamp": "2025-10-12T19:00:00.000Z"
}
```

### GET `/api/chatbot/history/:sessionId`
Get chat history for a session

**Response:**
```json
{
  "success": true,
  "history": [
    {
      "id": "msg-1",
      "message": "Hello",
      "isBot": false,
      "timestamp": "..."
    },
    {
      "id": "msg-2",
      "message": "Hi! How can I help?",
      "isBot": true,
      "timestamp": "..."
    }
  ],
  "count": 2
}
```

### GET `/api/chatbot/suggestions`
Get quick action suggestions

**Response:**
```json
{
  "success": true,
  "suggestions": [
    {
      "text": "🔍 Find Services",
      "message": "Show me available services",
      "icon": "🔍"
    }
  ]
}
```

### GET `/health`
Health check endpoint

**Response:**
```json
{
  "status": "ok",
  "service": "CommunityHub Chatbot",
  "version": "1.0.0",
  "timestamp": "..."
}
```

## 🔌 WebSocket Events

### Client → Server

**Event:** `chat-message`
```javascript
socket.emit('chat-message', {
  message: 'What services do you offer?',
  userId: 'user-123',
  sessionId: 'session-456'
});
```

### Server → Client

**Event:** `bot-response`
```javascript
socket.on('bot-response', (response) => {
  console.log(response.message);
  console.log(response.quickReplies);
});
```

**Event:** `bot-error`
```javascript
socket.on('bot-error', (error) => {
  console.error(error.error);
});
```

## 💬 Example Conversations

### Service Discovery
```
User: "What services do you offer?"
Bot: "We offer services in these categories:
     1. Home Services 🏠
     2. Vehicle Rental 🚗
     3. Real Estate 🏢
     ..."
```

### Booking
```
User: "I want to book a car rental"
Bot: "Great! I can help you book a vehicle.
     📍 Which city are you in?
     📅 When do you need it?"
```

### Location
```
User: "What cities are you in?"
Bot: "We're available in:
     UAE: Dubai, Abu Dhabi, Sharjah
     Thailand: Bangkok, Pattaya, Phuket
     ..."
```

## 🎨 Frontend Widget

The chatbot widget is already integrated in the main app at `/components/ChatbotWidget.tsx`.

### Features:
- ✅ Floating chat button
- ✅ Expandable chat window
- ✅ Real-time messaging
- ✅ Quick reply buttons
- ✅ Action buttons (e.g., "Complete Booking")
- ✅ Typing indicator
- ✅ Message timestamps
- ✅ Responsive design

### Customization:

Edit `/components/ChatbotWidget.tsx` to:
- Change colors
- Modify initial greeting
- Adjust size and position
- Add custom actions

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `CHATBOT_PORT` | Port for chatbot service | 3001 |
| `NODE_ENV` | Environment | development |
| `FRONTEND_URL` | Main app URL (CORS) | http://localhost:3000 |
| `DATABASE_URL` | PostgreSQL connection | - |
| `OPENAI_API_KEY` | OpenAI API key (optional) | - |

### Rate Limiting

Default: 10 requests per 60 seconds per IP

Edit in `/routes/chatbot.js`:
```javascript
const rateLimiter = new RateLimiterMemory({
  points: 10,
  duration: 60,
});
```

## 🧪 Testing

### Manual Testing

1. Start the chatbot service
2. Open browser console on `http://localhost:3000`
3. Test WebSocket connection:

```javascript
const socket = io('http://localhost:3001');
socket.on('connect', () => console.log('Connected!'));
socket.emit('chat-message', {
  message: 'Hello',
  sessionId: 'test-123'
});
socket.on('bot-response', (res) => console.log(res));
```

### API Testing

```bash
# Test message endpoint
curl -X POST http://localhost:3001/api/chatbot/message \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello","sessionId":"test-123"}'

# Test health endpoint
curl http://localhost:3001/health
```

## 📊 Database Schema

### ChatMessage
Stores all chat messages

| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique ID |
| sessionId | String | Chat session ID |
| userId | String? | User ID (optional) |
| message | Text | Message content |
| isBot | Boolean | Bot or user message |
| intent | String? | Detected intent |
| timestamp | DateTime | When sent |

### BookingIntent
Tracks booking intentions

| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique ID |
| sessionId | String | Chat session ID |
| userId | String? | User ID |
| serviceId | String | Service being booked |
| status | Enum | PENDING/CONVERTED/ABANDONED |
| data | JSON | Additional metadata |
| createdAt | DateTime | Created at |
| updatedAt | DateTime | Updated at |

## 🚀 Production Deployment

### Option 1: Separate Server

1. Deploy chatbot service to dedicated server
2. Update `NEXT_PUBLIC_CHATBOT_URL` in main app
3. Configure reverse proxy (nginx)
4. Enable SSL/TLS
5. Set up monitoring

### Option 2: Same Server (Different Port)

1. Run chatbot on port 3001
2. Configure nginx to proxy `/chatbot` → `localhost:3001`
3. Update frontend to use relative URL

### Environment

```env
NODE_ENV=production
CHATBOT_PORT=3001
FRONTEND_URL=https://yourdomain.com
DATABASE_URL=<production_db>
```

### Process Manager

Use PM2 for production:

```bash
pm2 start index.js --name chatbot-service
pm2 save
pm2 startup
```

## 🔐 Security

- ✅ CORS configured
- ✅ Helmet.js for security headers
- ✅ Rate limiting
- ✅ Input validation
- ✅ SQL injection protection (Prisma)
- ⚠️ Add authentication for production
- ⚠️ Implement API key validation

## 📈 Monitoring

### Logs

```bash
# View logs in development
npm run dev

# View logs in production (PM2)
pm2 logs chatbot-service
```

### Metrics to Track

- Messages per minute
- Average response time
- Error rate
- Active sessions
- Conversion rate (chat → booking)

## 🛠️ Troubleshooting

### Chatbot not connecting

1. Check if service is running: `curl http://localhost:3001/health`
2. Check CORS settings in `.env`
3. Check browser console for errors
4. Verify WebSocket connection

### Database errors

1. Check `DATABASE_URL` in `.env`
2. Run migrations: `npx prisma migrate dev`
3. Check database connection
4. Verify Prisma client is generated

### Widget not showing

1. Check if `ChatbotWidget` is imported in layout
2. Check browser console for errors
3. Verify `NEXT_PUBLIC_CHATBOT_URL` is set
4. Clear browser cache

## 📝 License

MIT

## 👥 Support

For issues or questions:
- Email: support@communityhub.com
- Create an issue in the repository

---

**Made with ❤️ for CommunityHub**
