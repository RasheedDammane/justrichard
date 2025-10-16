'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Users, TrendingUp, Search, Filter, X, Send } from 'lucide-react';

interface ChatSession {
  sessionId: string;
  userId?: string;
  userName?: string;
  lastMessage: string;
  messageCount: number;
  unreadCount: number;
  lastActivity: string;
  status: 'active' | 'waiting' | 'resolved';
  locale: string;
}

interface ChatMessage {
  id: string;
  message: string;
  isBot: boolean;
  timestamp: string;
  intent?: string;
}

export default function AdminChatbotPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [replyMessage, setReplyMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [stats, setStats] = useState({
    totalSessions: 0,
    activeSessions: 0,
    avgResponseTime: '0s',
    satisfactionRate: 0,
  });

  useEffect(() => {
    fetchSessions();
    fetchStats();
    
    // Poll for new messages every 5 seconds
    const interval = setInterval(() => {
      if (selectedSession) {
        fetchMessages(selectedSession);
      }
      fetchSessions();
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedSession]);

  const fetchSessions = async () => {
    try {
      // TODO: Replace with actual API call
      const mockSessions: ChatSession[] = [
        {
          sessionId: 'session-1',
          userId: 'user-123',
          userName: 'John Doe',
          lastMessage: 'I need help with booking a service',
          messageCount: 5,
          unreadCount: 2,
          lastActivity: '2 min ago',
          status: 'waiting',
          locale: 'en',
        },
        {
          sessionId: 'session-2',
          userId: 'user-456',
          userName: 'Marie Dupont',
          lastMessage: 'Merci pour votre aide!',
          messageCount: 8,
          unreadCount: 0,
          lastActivity: '15 min ago',
          status: 'resolved',
          locale: 'fr',
        },
        {
          sessionId: 'session-3',
          lastMessage: 'What services do you offer?',
          messageCount: 3,
          unreadCount: 1,
          lastActivity: '5 min ago',
          status: 'active',
          locale: 'en',
        },
      ];
      setSessions(mockSessions);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const fetchMessages = async (sessionId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_CHATBOT_URL || 'http://localhost:3001'}/api/chatbot/history/${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data.history || []);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchStats = async () => {
    // TODO: Replace with actual API call
    setStats({
      totalSessions: 47,
      activeSessions: 12,
      avgResponseTime: '2.5s',
      satisfactionRate: 94,
    });
  };

  const handleSessionClick = (sessionId: string) => {
    setSelectedSession(sessionId);
    fetchMessages(sessionId);
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim() || !selectedSession) return;

    try {
      // TODO: Send admin reply via API
      const newMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        message: replyMessage,
        isBot: false,
        timestamp: new Date().toISOString(),
      };
      
      setMessages([...messages, newMessage]);
      setReplyMessage('');
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || session.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Chatbot Management</h1>
          <p className="text-gray-600">Manage and respond to customer conversations</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSessions}</p>
              </div>
              <MessageCircle className="w-10 h-10 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Now</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeSessions}</p>
              </div>
              <Users className="w-10 h-10 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Response</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgResponseTime}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Satisfaction</p>
                <p className="text-2xl font-bold text-gray-900">{stats.satisfactionRate}%</p>
              </div>
              <MessageCircle className="w-10 h-10 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sessions List */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1 rounded-full text-sm ${filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterStatus('active')}
                  className={`px-3 py-1 rounded-full text-sm ${filterStatus === 'active' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilterStatus('waiting')}
                  className={`px-3 py-1 rounded-full text-sm ${filterStatus === 'waiting' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Waiting
                </button>
              </div>
            </div>

            <div className="overflow-y-auto" style={{ maxHeight: '600px' }}>
              {filteredSessions.map((session) => (
                <div
                  key={session.sessionId}
                  onClick={() => handleSessionClick(session.sessionId)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedSession === session.sessionId ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">
                          {session.userName || 'Anonymous'}
                        </h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                          {session.locale.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate mt-1">{session.lastMessage}</p>
                    </div>
                    {session.unreadCount > 0 && (
                      <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {session.unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{session.lastActivity}</span>
                    <span className={`px-2 py-1 rounded-full ${
                      session.status === 'active' ? 'bg-green-100 text-green-700' :
                      session.status === 'waiting' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {session.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat View */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm flex flex-col" style={{ height: '700px' }}>
            {selectedSession ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {sessions.find(s => s.sessionId === selectedSession)?.userName || 'Anonymous'}
                    </h2>
                    <p className="text-sm text-gray-600">Session: {selectedSession}</p>
                  </div>
                  <button
                    onClick={() => setSelectedSession(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          msg.isBot
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </p>
                        {msg.intent && (
                          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded mt-1 inline-block">
                            Intent: {msg.intent}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Input */}
                <div className="p-4 border-t">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                    <p className="text-sm text-yellow-800">
                      <strong>Admin Reply:</strong> Your message will be sent as a manual response from the admin team.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendReply()}
                      placeholder="Type your reply..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleSendReply}
                      disabled={!replyMessage.trim()}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium">Select a conversation</p>
                  <p className="text-sm">Choose a session from the left to view messages</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
