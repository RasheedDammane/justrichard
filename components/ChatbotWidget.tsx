'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Send, X, MessageCircle, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  message: string;
  isBot: boolean;
  timestamp: Date;
  type?: string;
  quickReplies?: QuickReply[];
  actions?: Action[];
}

interface QuickReply {
  text: string;
  action: string;
  data?: any;
}

interface Action {
  text: string;
  url?: string;
  action?: string;
  type?: string;
  data?: any;
}

export default function ChatbotWidget() {
  const params = useParams();
  const locale = (params.locale as string) || 'en';
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      sendInitialGreeting();
    }
  }, [isOpen]);

  const sendInitialGreeting = () => {
    addMessage({
      id: 'welcome',
      message: "👋 Hi! I'm your CommunityHub assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
      type: 'greeting',
      quickReplies: [
        { text: '🔍 Browse Services', action: 'services' },
        { text: '📍 View Locations', action: 'locations' },
        { text: '📅 Make a Booking', action: 'booking' },
        { text: '❓ Get Help', action: 'help' },
      ],
    });
  };

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      message: message.trim(),
      isBot: false,
      timestamp: new Date(),
    };
    addMessage(userMessage);
    setInputMessage('');
    setIsLoading(true);

    // Send to chatbot via API
    try {
      const response = await fetch('/api/chatbot/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message.trim(),
          sessionId,
          userId: null, // TODO: Get from auth
          locale,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        addMessage({
          id: `bot-${Date.now()}`,
          message: data.response.message,
          isBot: true,
          timestamp: new Date(),
          type: data.response.type,
          quickReplies: data.response.quickReplies,
          actions: data.response.actions,
        });
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage({
        id: `error-${Date.now()}`,
        message: 'Sorry, I encountered an error. Please try again.',
        isBot: true,
        timestamp: new Date(),
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (reply: QuickReply) => {
    sendMessage(reply.text);
  };

  const handleAction = (action: Action) => {
    if (action.url) {
      window.location.href = action.url;
    } else if (action.action) {
      // Handle custom action
      sendMessage(action.text);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  return (
    <>
      {/* Chatbot Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 z-50"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            1
          </span>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="/chatbot-avatar.png" 
                  alt="AI Assistant"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.classList.add('bg-white');
                  }}
                />
                <MessageCircle className="w-6 h-6 text-blue-600" style={{ display: 'none' }} />
              </div>
              <div>
                <h3 className="font-semibold">CommunityHub Assistant</h3>
                <p className="text-xs text-blue-100">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                  Online • Usually replies instantly
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-blue-700 p-1 rounded transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-2">
                <div
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      msg.isBot
                        ? 'bg-white text-gray-800 shadow-sm'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                {/* Quick Replies */}
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="flex flex-wrap gap-2 pl-4">
                    {msg.quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickReply(reply)}
                        className="bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 px-3 py-2 rounded-full text-sm font-medium transition-colors"
                      >
                        {reply.text}
                      </button>
                    ))}
                  </div>
                )}

                {/* Actions */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="flex flex-col gap-2 pl-4">
                    {msg.actions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAction(action)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          action.type === 'primary'
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300'
                        }`}
                      >
                        {action.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-lg px-4 py-3 shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by CommunityHub AI
            </p>
          </form>
        </div>
      )}
    </>
  );
}
