const { 
  getCategories, 
  getServices, 
  getServiceById, 
  getCities,
  saveChatMessage,
  getChatHistory,
  createBookingIntent
} = require('./database');
const { getTranslation, getRandomGreeting } = require('./i18n');

const intentPatterns = {
  greeting: /^(hi|hello|hey|bonjour|salut|مرحبا)/i,
  booking: /(book|reserve|réserver|حجز|make appointment|schedule)/i,
  services: /(service|what do you offer|available|quels services|خدمات)/i,
  categories: /(categor|type|kind of service|catégories|فئات)/i,
  location: /(city|cities|where|location|ville|أين|مدينة)/i,
  pricing: /(price|cost|how much|combien|سعر)/i,
  help: /(help|aide|مساعدة|support)/i,
  contact: /(contact|phone|email|reach|contacter|اتصل)/i,
};

class ChatbotService {
  constructor() {
    this.sessions = new Map(); // Store session context
  }

  async processMessage(message, userId = null, sessionId, locale = 'en') {
    try {
      // Save user message
      await saveChatMessage(message, userId, sessionId, false);

      // Get session context
      const context = this.getSessionContext(sessionId);
      
      // Store locale in context
      context.locale = locale;
      
      // Detect intent
      const intent = this.detectIntent(message);
      
      // Generate response based on intent
      const response = await this.generateResponse(intent, message, context, userId, sessionId, locale);
      
      // Update session context
      this.updateSessionContext(sessionId, { lastIntent: intent, lastMessage: message, locale });
      
      // Save bot response
      await saveChatMessage(response.message, userId, sessionId, true);
      
      return response;
    } catch (error) {
      console.error('Error processing message:', error);
      return {
        message: "I'm sorry, I encountered an error. Please try again or contact our support team.",
        type: 'error',
      };
    }
  }

  detectIntent(message) {
    const msg = message.toLowerCase();
    
    for (const [intent, pattern] of Object.entries(intentPatterns)) {
      if (pattern.test(msg)) {
        return intent;
      }
    }
    
    // Default intent
    return 'unknown';
  }

  async generateResponse(intent, message, context, userId, sessionId, locale = 'en') {
    switch (intent) {
      case 'greeting':
        return this.handleGreeting(locale);
      
      case 'services':
        return await this.handleServicesInquiry(message, locale);
      
      case 'categories':
        return await this.handleCategoriesInquiry(locale);
      
      case 'location':
        return await this.handleLocationInquiry(locale);
      
      case 'booking':
        return await this.handleBookingIntent(message, context, userId, sessionId, locale);
      
      case 'pricing':
        return await this.handlePricingInquiry(message, locale);
      
      case 'help':
        return this.handleHelpRequest(locale);
      
      case 'contact':
        return this.handleContactInquiry(locale);
      
      default:
        return this.handleUnknownIntent(message, locale);
    }
  }

  handleGreeting(locale = 'en') {
    return {
      message: getRandomGreeting(locale),
      type: 'greeting',
      quickReplies: [
        { text: getTranslation(locale, 'quickReplies.findServices'), action: 'services' },
        { text: getTranslation(locale, 'quickReplies.viewLocations'), action: 'locations' },
        { text: getTranslation(locale, 'quickReplies.makeBooking'), action: 'booking' },
        { text: getTranslation(locale, 'quickReplies.getHelp'), action: 'help' },
      ],
    };
  }

  async handleServicesInquiry(message) {
    try {
      // Extract search terms from message
      const searchTerm = this.extractSearchTerm(message);
      
      const services = await getServices({ 
        search: searchTerm,
        limit: 5 
      });
      
      if (services.length === 0) {
        return {
          message: "I couldn't find any services matching your request. Here are our popular categories:",
          type: 'services',
          data: await this.getCategoryList(),
        };
      }
      
      const serviceList = services.map((s, i) => 
        `${i + 1}. **${s.name}** - ${s.category.name}\n   📍 ${s.city.name}, ${s.city.country.name}\n   💰 From $${s.price || 'Contact for pricing'}`
      ).join('\n\n');
      
      return {
        message: `Here are the services I found:\n\n${serviceList}\n\nWould you like more details about any of these?`,
        type: 'services',
        data: services,
        quickReplies: services.slice(0, 3).map(s => ({
          text: `📖 ${s.name}`,
          action: 'service_details',
          data: { serviceId: s.id },
        })),
      };
    } catch (error) {
      console.error('Error handling services inquiry:', error);
      return {
        message: "Sorry, I had trouble fetching services. Please try again.",
        type: 'error',
      };
    }
  }

  async handleCategoriesInquiry() {
    try {
      const categories = await getCategories();
      
      const categoryList = categories.map((c, i) => 
        `${i + 1}. **${c.name}** ${c.icon || ''}${c.services.length > 0 ? ` (${c.services.length}+ services)` : ''}`
      ).join('\n');
      
      return {
        message: `We offer services in these categories:\n\n${categoryList}\n\nWhich category interests you?`,
        type: 'categories',
        data: categories,
        quickReplies: categories.slice(0, 4).map(c => ({
          text: `${c.icon || '📂'} ${c.name}`,
          action: 'category_services',
          data: { categoryId: c.id },
        })),
      };
    } catch (error) {
      console.error('Error handling categories inquiry:', error);
      return {
        message: "Sorry, I had trouble fetching categories.",
        type: 'error',
      };
    }
  }

  async handleLocationInquiry() {
    try {
      const cities = await getCities();
      
      const citiesByCountry = cities.reduce((acc, city) => {
        const country = city.country.name;
        if (!acc[country]) acc[country] = [];
        acc[country].push(city.name);
        return acc;
      }, {});
      
      let locationText = "We're available in these locations:\n\n";
      for (const [country, cityList] of Object.entries(citiesByCountry)) {
        locationText += `**${country}**: ${cityList.join(', ')}\n`;
      }
      
      return {
        message: locationText + "\nWhich city are you interested in?",
        type: 'locations',
        data: cities,
        quickReplies: cities.slice(0, 4).map(c => ({
          text: `📍 ${c.name}`,
          action: 'city_services',
          data: { cityId: c.id },
        })),
      };
    } catch (error) {
      console.error('Error handling location inquiry:', error);
      return {
        message: "Sorry, I had trouble fetching locations.",
        type: 'error',
      };
    }
  }

  async handleBookingIntent(message, context, userId, sessionId) {
    // Extract service ID if mentioned
    const serviceIdMatch = message.match(/service[:\s]+([a-zA-Z0-9-]+)/i);
    
    if (serviceIdMatch) {
      const serviceId = serviceIdMatch[1];
      const service = await getServiceById(serviceId);
      
      if (service) {
        // Create booking intent
        await createBookingIntent({
          serviceId: service.id,
          userId,
          sessionId,
          metadata: { source: 'chatbot' },
        });
        
        return {
          message: `Great! I can help you book **${service.name}**.\n\n📍 Location: ${service.city.name}\n💰 Price: $${service.price || 'Contact for quote'}\n\nPlease click the button below to complete your booking:`,
          type: 'booking',
          data: { service },
          actions: [
            {
              text: '📅 Complete Booking',
              url: `/en/services/${service.id}/book`,
              type: 'primary',
            },
            {
              text: '📞 Contact Provider',
              action: 'contact_provider',
              data: { serviceId: service.id },
            },
          ],
        };
      }
    }
    
    return {
      message: "I'd be happy to help you make a booking! Please tell me:\n\n1. What service are you looking for?\n2. In which city?\n3. Preferred date (if any)",
      type: 'booking',
      quickReplies: [
        { text: '🔍 Browse Services', action: 'services' },
        { text: '📍 Select City', action: 'locations' },
      ],
    };
  }

  async handlePricingInquiry(message) {
    return {
      message: "Our pricing varies by service and location. Here's what you can do:\n\n1. 🔍 Browse our services to see specific prices\n2. 📞 Contact providers directly for quotes\n3. 💬 Tell me what service you need, and I'll show you options\n\nWhat would you like to know more about?",
      type: 'pricing',
      quickReplies: [
        { text: '🔍 Browse Services', action: 'services' },
        { text: '📞 Contact Support', action: 'contact' },
      ],
    };
  }

  handleHelpRequest() {
    return {
      message: "I'm here to help! Here's what I can do:\n\n✅ Help you find services\n✅ Show available locations\n✅ Assist with bookings\n✅ Answer questions about services\n✅ Connect you with providers\n\nJust ask me anything, or use the quick options below:",
      type: 'help',
      quickReplies: [
        { text: '🔍 Find Services', action: 'services' },
        { text: '📍 View Locations', action: 'locations' },
        { text: '📅 Make Booking', action: 'booking' },
        { text: '📞 Contact Us', action: 'contact' },
      ],
    };
  }

  handleContactInquiry() {
    return {
      message: "📞 **Contact CommunityHub**\n\n📧 Email: support@communityhub.com\n📱 Phone: +971 4 123 4567\n💬 Live Chat: Available 24/7\n\nOur support team typically responds within 2 hours. How else can I assist you?",
      type: 'contact',
      quickReplies: [
        { text: '🔍 Browse Services', action: 'services' },
        { text: '❓ Get Help', action: 'help' },
      ],
    };
  }

  handleUnknownIntent(message) {
    return {
      message: "I'm not sure I understood that. Could you rephrase? Or choose one of these options:",
      type: 'unknown',
      quickReplies: [
        { text: '🔍 Find Services', action: 'services' },
        { text: '📍 Locations', action: 'locations' },
        { text: '📅 Book Service', action: 'booking' },
        { text: '❓ Help', action: 'help' },
      ],
    };
  }

  extractSearchTerm(message) {
    // Remove common words and extract key terms
    const stopWords = ['i', 'want', 'need', 'looking', 'for', 'find', 'show', 'me', 'a', 'the'];
    const words = message.toLowerCase().split(/\s+/)
      .filter(w => !stopWords.includes(w) && w.length > 2);
    return words.join(' ');
  }

  async getCategoryList() {
    const categories = await getCategories();
    return categories.map(c => ({ id: c.id, name: c.name, icon: c.icon }));
  }

  getSessionContext(sessionId) {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, {
        startTime: Date.now(),
        messages: [],
      });
    }
    return this.sessions.get(sessionId);
  }

  updateSessionContext(sessionId, data) {
    const context = this.getSessionContext(sessionId);
    this.sessions.set(sessionId, { ...context, ...data });
  }
}

module.exports = new ChatbotService();
