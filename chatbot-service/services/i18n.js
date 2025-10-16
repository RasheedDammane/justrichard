// Multilingual support for chatbot

const translations = {
  en: {
    greeting: [
      "Hello! 👋 Welcome to CommunityHub! I'm here to help you find and book professional services.",
      "Hi there! 😊 How can I assist you today? I can help you find services, check availability, or answer questions.",
      "Welcome! 🌟 I'm your CommunityHub assistant. What service are you looking for?",
    ],
    servicesNotFound: "I couldn't find any services matching your request. Here are our popular categories:",
    servicesFound: "Here are the services I found:",
    moreDetails: "Would you like more details about any of these?",
    categoriesTitle: "We offer services in these categories:",
    categoryQuestion: "Which category interests you?",
    locationsTitle: "We're available in these locations:",
    locationQuestion: "Which city are you interested in?",
    bookingHelp: "I'd be happy to help you make a booking! Please tell me:",
    bookingSteps: "1. What service are you looking for?\n2. In which city?\n3. Preferred date (if any)",
    pricingInfo: "Our pricing varies by service and location. Here's what you can do:",
    helpMessage: "I'm here to help! Here's what I can do:",
    contactInfo: "📞 **Contact CommunityHub**",
    unknownMessage: "I'm not sure I understood that. Could you rephrase? Or choose one of these options:",
    quickReplies: {
      findServices: "🔍 Find Services",
      viewLocations: "📍 View Locations",
      makeBooking: "📅 Make Booking",
      getHelp: "❓ Get Help",
      contactUs: "📞 Contact Us",
    },
  },
  fr: {
    greeting: [
      "Bonjour ! 👋 Bienvenue sur CommunityHub ! Je suis là pour vous aider à trouver et réserver des services professionnels.",
      "Salut ! 😊 Comment puis-je vous aider aujourd'hui ? Je peux vous aider à trouver des services, vérifier la disponibilité ou répondre à vos questions.",
      "Bienvenue ! 🌟 Je suis votre assistant CommunityHub. Quel service recherchez-vous ?",
    ],
    servicesNotFound: "Je n'ai trouvé aucun service correspondant à votre demande. Voici nos catégories populaires :",
    servicesFound: "Voici les services que j'ai trouvés :",
    moreDetails: "Souhaitez-vous plus de détails sur l'un d'entre eux ?",
    categoriesTitle: "Nous proposons des services dans ces catégories :",
    categoryQuestion: "Quelle catégorie vous intéresse ?",
    locationsTitle: "Nous sommes disponibles dans ces emplacements :",
    locationQuestion: "Quelle ville vous intéresse ?",
    bookingHelp: "Je serais ravi de vous aider à faire une réservation ! Dites-moi :",
    bookingSteps: "1. Quel service recherchez-vous ?\n2. Dans quelle ville ?\n3. Date préférée (si applicable)",
    pricingInfo: "Nos prix varient selon le service et l'emplacement. Voici ce que vous pouvez faire :",
    helpMessage: "Je suis là pour vous aider ! Voici ce que je peux faire :",
    contactInfo: "📞 **Contacter CommunityHub**",
    unknownMessage: "Je ne suis pas sûr d'avoir compris. Pourriez-vous reformuler ? Ou choisissez l'une de ces options :",
    quickReplies: {
      findServices: "🔍 Trouver des Services",
      viewLocations: "📍 Voir les Emplacements",
      makeBooking: "📅 Faire une Réservation",
      getHelp: "❓ Obtenir de l'Aide",
      contactUs: "📞 Nous Contacter",
    },
  },
  ar: {
    greeting: [
      "مرحبا! 👋 مرحبا بك في CommunityHub! أنا هنا لمساعدتك في العثور على الخدمات المهنية وحجزها.",
      "أهلا! 😊 كيف يمكنني مساعدتك اليوم؟ يمكنني مساعدتك في العثور على الخدمات أو التحقق من التوفر أو الإجابة على الأسئلة.",
      "مرحبا! 🌟 أنا مساعد CommunityHub الخاص بك. ما الخدمة التي تبحث عنها؟",
    ],
    servicesNotFound: "لم أتمكن من العثور على أي خدمات تطابق طلبك. إليك فئاتنا الشائعة:",
    servicesFound: "إليك الخدمات التي وجدتها:",
    moreDetails: "هل تريد المزيد من التفاصيل حول أي منها؟",
    categoriesTitle: "نقدم خدمات في هذه الفئات:",
    categoryQuestion: "أي فئة تهمك؟",
    locationsTitle: "نحن متاحون في هذه المواقع:",
    locationQuestion: "أي مدينة تهمك؟",
    bookingHelp: "سأكون سعيدا لمساعدتك في إجراء الحجز! من فضلك أخبرني:",
    bookingSteps: "1. ما الخدمة التي تبحث عنها؟\n2. في أي مدينة؟\n3. التاريخ المفضل (إن وجد)",
    pricingInfo: "تختلف أسعارنا حسب الخدمة والموقع. إليك ما يمكنك فعله:",
    helpMessage: "أنا هنا للمساعدة! إليك ما يمكنني فعله:",
    contactInfo: "📞 **اتصل بـ CommunityHub**",
    unknownMessage: "لست متأكدا من أنني فهمت ذلك. هل يمكنك إعادة الصياغة؟ أو اختر أحد هذه الخيارات:",
    quickReplies: {
      findServices: "🔍 البحث عن الخدمات",
      viewLocations: "📍 عرض المواقع",
      makeBooking: "📅 إجراء حجز",
      getHelp: "❓ الحصول على المساعدة",
      contactUs: "📞 اتصل بنا",
    },
  },
  th: {
    greeting: [
      "สวัสดี! 👋 ยินดีต้อนรับสู่ CommunityHub! ฉันพร้อมช่วยคุณค้นหาและจองบริการมอ professionals",
      "สวัสดี! 😊 ฉันจะช่วยอะไรคุณได้บ้างวันนี้? ฉันสามารถช่วยคุณค้นหาบริการ ตรวจสอบความพร้อม หรือตอบคำถาม",
      "ยินดีต้อนรับ! 🌟 ฉันคือผู้ช่วยของ CommunityHub คุณกำลังมองหาบริการอะไร?",
    ],
    servicesNotFound: "ฉันไม่พบบริการที่ตรงกับคำขอของคุณ นี่คือหมวดหมู่ยอดนิยมของเรา:",
    servicesFound: "นี่คือบริการที่ฉันพบ:",
    moreDetails: "คุณต้องการรายละเอียดเพิ่มเติมเกี่ยวกับบริการใดบริการหนึ่งหรือไม่?",
    categoriesTitle: "เรามีบริการในหมวดหมู่เหล่านี้:",
    categoryQuestion: "คุณสนใจหมวดหมู่ไหน?",
    locationsTitle: "เรามีบริการในสถานที่เหล่านี้:",
    locationQuestion: "คุณสนใจเมืองไหน?",
    bookingHelp: "ฉันยินดีช่วยคุณทำการจอง! กรุณาบอกฉัน:",
    bookingSteps: "1. คุณกำลังมองหาบริการอะไร?\n2. ในเมืองไหน?\n3. วันที่ต้องการ (ถ้ามี)",
    pricingInfo: "ราคาของเราแตกต่างกันไปตามบริการและสถานที่ นี่คือสิ่งที่คุณทำได้:",
    helpMessage: "ฉันพร้อมช่วยเหลือ! นี่คือสิ่งที่ฉันทำได้:",
    contactInfo: "📞 **ติดต่อ CommunityHub**",
    unknownMessage: "ฉันไม่แน่ใจว่าเข้าใจถูกต้องหรือไม่ คุณช่วยพูดใหม่ได้ไหม? หรือเลือกหนึ่งในตัวเลือกเหล่านี้:",
    quickReplies: {
      findServices: "🔍 ค้นหาบริการ",
      viewLocations: "📍 ดูสถานที่",
      makeBooking: "📅 ทำการจอง",
      getHelp: "❓ ขอความช่วยเหลือ",
      contactUs: "📞 ติดต่อเรา",
    },
  },
};

function getTranslation(locale, key, defaultValue = '') {
  const lang = translations[locale] || translations.en;
  
  const keys = key.split('.');
  let value = lang;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return defaultValue || translations.en[key] || key;
    }
  }
  
  return value;
}

function getRandomGreeting(locale) {
  const greetings = getTranslation(locale, 'greeting', translations.en.greeting);
  return Array.isArray(greetings) 
    ? greetings[Math.floor(Math.random() * greetings.length)]
    : greetings;
}

module.exports = {
  translations,
  getTranslation,
  getRandomGreeting,
};
