import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * @swagger
 * /api/chatbot/message:
 *   post:
 *     summary: Send a message to the chatbot
 *     tags: [Chatbot]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               sessionId:
 *                 type: string
 *               locale:
 *                 type: string
 *                 default: en
 *     responses:
 *       200:
 *         description: Bot response
 */
export async function POST(request: NextRequest) {
  try {
    const { message, sessionId, userId, locale = 'en' } = await request.json();

    if (!message || !sessionId) {
      return NextResponse.json(
        { error: 'Message and sessionId are required' },
        { status: 400 }
      );
    }

    // Save user message
    await prisma.chatMessage.create({
      data: {
        sessionId,
        userId,
        message,
        isBot: false,
        timestamp: new Date(),
      },
    });

    // Simple intent detection
    const intent = detectIntent(message);
    
    // Generate response based on intent and locale
    const response = await generateResponse(intent, message, locale, sessionId);

    // Save bot response
    await prisma.chatMessage.create({
      data: {
        sessionId,
        userId,
        message: response.message,
        isBot: true,
        intent,
        timestamp: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function detectIntent(message: string): string {
  const msg = message.toLowerCase();
  
  if (/^(hi|hello|hey|bonjour|salut|مرحبا)/.test(msg)) return 'greeting';
  if (/(book|reserve|réserver|حجز)/.test(msg)) return 'booking';
  if (/(service|what do you offer|available|quels services|خدمات)/.test(msg)) return 'services';
  if (/(categor|type|kind of service|catégories|فئات)/.test(msg)) return 'categories';
  if (/(city|cities|where|location|ville|أين|مدينة)/.test(msg)) return 'location';
  if (/(price|cost|how much|combien|سعر)/.test(msg)) return 'pricing';
  if (/(help|aide|مساعدة|support)/.test(msg)) return 'help';
  if (/(contact|phone|email|reach|contacter|اتصل)/.test(msg)) return 'contact';
  
  return 'unknown';
}

async function generateResponse(intent: string, message: string, locale: string, sessionId: string) {
  const translations: any = {
    en: {
      greeting: "Hello! 👋 Welcome to CommunityHub! How can I help you today?",
      services: "We offer various professional services. What are you looking for?",
      categories: "We have services in: Home Services, Vehicle Rental, Real Estate, Legal, Medical, and more!",
      location: "We're available in UAE (Dubai, Abu Dhabi), Thailand (Bangkok, Pattaya), Saudi Arabia, Qatar, and Vietnam!",
      booking: "I'd be happy to help you book a service! What type of service do you need?",
      pricing: "Pricing varies by service and location. Would you like me to show you specific services?",
      help: "I can help you: 🔍 Find services, 📍 View locations, 📅 Make bookings, or ❓ Answer questions!",
      contact: "📞 Contact us:\n📧 support@communityhub.com\n📱 +971 4 123 4567",
      unknown: "I'm not sure I understood. Could you rephrase? Or ask me about services, locations, or bookings!",
    },
    fr: {
      greeting: "Bonjour ! 👋 Bienvenue sur CommunityHub ! Comment puis-je vous aider aujourd'hui ?",
      services: "Nous proposons divers services professionnels. Que recherchez-vous ?",
      categories: "Nous avons des services dans : Services à domicile, Location de véhicules, Immobilier, Juridique, Médical, et plus encore !",
      location: "Nous sommes disponibles aux EAU (Dubaï, Abu Dhabi), en Thaïlande (Bangkok, Pattaya), en Arabie Saoudite, au Qatar et au Vietnam !",
      booking: "Je serais ravi de vous aider à réserver un service ! Quel type de service vous faut-il ?",
      pricing: "Les prix varient selon le service et l'emplacement. Souhaitez-vous que je vous montre des services spécifiques ?",
      help: "Je peux vous aider à : 🔍 Trouver des services, 📍 Voir les emplacements, 📅 Faire des réservations, ou ❓ Répondre aux questions !",
      contact: "📞 Contactez-nous :\n📧 support@communityhub.com\n📱 +971 4 123 4567",
      unknown: "Je ne suis pas sûr d'avoir compris. Pourriez-vous reformuler ? Ou posez-moi des questions sur les services, les emplacements ou les réservations !",
    },
  };

  const lang = translations[locale] || translations.en;
  const responseMessage = lang[intent] || lang.unknown;

  const quickReplies = [
    { text: locale === 'fr' ? '🔍 Trouver des Services' : '🔍 Find Services', action: 'services' },
    { text: locale === 'fr' ? '📍 Voir les Emplacements' : '📍 View Locations', action: 'locations' },
    { text: locale === 'fr' ? '📅 Faire une Réservation' : '📅 Make Booking', action: 'booking' },
    { text: locale === 'fr' ? '❓ Obtenir de l\'Aide' : '❓ Get Help', action: 'help' },
  ];

  return {
    message: responseMessage,
    type: intent,
    quickReplies,
  };
}
