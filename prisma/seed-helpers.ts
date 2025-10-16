/**
 * Helper functions for seed data with complete multilingual support
 */

export const ALL_LOCALES = [
  'en',  // English
  'ar',  // Arabic
  'fr',  // French
  'es',  // Spanish
  'de',  // German
  'ru',  // Russian
  'th',  // Thai
  'vi',  // Vietnamese
  'ko',  // Korean
  'tl',  // Tagalog
  'it',  // Italian
  'no',  // Norwegian
  'tr',  // Turkish
  'pt',  // Portuguese
  'af',  // Afrikaans
  'ja',  // Japanese
];

interface TranslationData {
  name: string;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export const CATEGORY_TRANSLATIONS: Record<string, Record<string, TranslationData>> = {
  'home-cleaning': {
    en: {
      name: 'Home Cleaning',
      description: 'Professional home cleaning services',
      seoTitle: 'Home Cleaning Services',
      seoDescription: 'Book professional home cleaning services',
    },
    ar: {
      name: 'تنظيف المنزل',
      description: 'خدمات تنظيف منزلية احترافية',
      seoTitle: 'خدمات تنظيف المنزل',
      seoDescription: 'احجز خدمات تنظيف منزلية احترافية',
    },
    fr: {
      name: 'Nettoyage de maison',
      description: 'Services de nettoyage professionnel',
      seoTitle: 'Services de nettoyage de maison',
      seoDescription: 'Réservez des services de nettoyage professionnel',
    },
    es: {
      name: 'Limpieza del hogar',
      description: 'Servicios profesionales de limpieza del hogar',
      seoTitle: 'Servicios de limpieza del hogar',
      seoDescription: 'Reserve servicios profesionales de limpieza',
    },
    de: {
      name: 'Hausreinigung',
      description: 'Professionelle Hausreinigungsdienste',
      seoTitle: 'Hausreinigungsdienste',
      seoDescription: 'Buchen Sie professionelle Hausreinigungsdienste',
    },
    ru: {
      name: 'Уборка дома',
      description: 'Профессиональные услуги по уборке дома',
      seoTitle: 'Услуги по уборке дома',
      seoDescription: 'Закажите профессиональные услуги по уборке',
    },
    th: {
      name: 'ทำความสะอาดบ้าน',
      description: 'บริการทำความสะอาดบ้านมืออาชีพ',
      seoTitle: 'บริการทำความสะอาดบ้าน',
      seoDescription: 'จองบริการทำความสะอาดมืออาชีพ',
    },
    vi: {
      name: 'Dọn dẹp nhà cửa',
      description: 'Dịch vụ dọn dẹp nhà chuyên nghiệp',
      seoTitle: 'Dịch vụ dọn dẹp nhà',
      seoDescription: 'Đặt dịch vụ dọn dẹp chuyên nghiệp',
    },
    ko: {
      name: '집 청소',
      description: '전문 집 청소 서비스',
      seoTitle: '집 청소 서비스',
      seoDescription: '전문 청소 서비스를 예약하세요',
    },
    tl: {
      name: 'Paglilinis ng bahay',
      description: 'Propesyonal na serbisyo sa paglilinis ng bahay',
      seoTitle: 'Serbisyo sa paglilinis ng bahay',
      seoDescription: 'Mag-book ng propesyonal na serbisyo sa paglilinis',
    },
    it: {
      name: 'Pulizia della casa',
      description: 'Servizi professionali di pulizia domestica',
      seoTitle: 'Servizi di pulizia della casa',
      seoDescription: 'Prenota servizi professionali di pulizia',
    },
    no: {
      name: 'Hjemmerens',
      description: 'Profesjonelle hjemmerengjøringstjenester',
      seoTitle: 'Hjemmerengjøringstjenester',
      seoDescription: 'Bestill profesjonelle rengjøringstjenester',
    },
    tr: {
      name: 'Ev temizliği',
      description: 'Profesyonel ev temizliği hizmetleri',
      seoTitle: 'Ev temizliği hizmetleri',
      seoDescription: 'Profesyonel temizlik hizmetleri rezervasyonu',
    },
    pt: {
      name: 'Limpeza doméstica',
      description: 'Serviços profissionais de limpeza doméstica',
      seoTitle: 'Serviços de limpeza doméstica',
      seoDescription: 'Reserve serviços profissionais de limpeza',
    },
    af: {
      name: 'Huishoudelike skoonmaak',
      description: 'Professionele huishoudelike skoonmaakdienste',
      seoTitle: 'Huishoudelike skoonmaakdienste',
      seoDescription: 'Bespreek professionele skoonmaakdienste',
    },
    ja: {
      name: '家の掃除',
      description: 'プロの家庭清掃サービス',
      seoTitle: '家庭清掃サービス',
      seoDescription: 'プロの清掃サービスを予約',
    },
  },
  'ac-services': {
    en: {
      name: 'AC Services',
      description: 'Air conditioning maintenance and repair',
      seoTitle: 'AC Maintenance Services',
      seoDescription: 'Professional AC maintenance and repair services',
    },
    ar: {
      name: 'خدمات التكييف',
      description: 'صيانة وإصلاح أجهزة التكييف',
      seoTitle: 'خدمات صيانة التكييف',
      seoDescription: 'خدمات صيانة وإصلاح التكييف الاحترافية',
    },
    fr: {
      name: 'Services de climatisation',
      description: 'Entretien et réparation de climatisation',
      seoTitle: 'Services d\'entretien de climatisation',
      seoDescription: 'Services professionnels d\'entretien et de réparation de climatisation',
    },
    es: {
      name: 'Servicios de aire acondicionado',
      description: 'Mantenimiento y reparación de aire acondicionado',
      seoTitle: 'Servicios de mantenimiento de AC',
      seoDescription: 'Servicios profesionales de mantenimiento y reparación de AC',
    },
    de: {
      name: 'Klimaanlagen-Service',
      description: 'Wartung und Reparatur von Klimaanlagen',
      seoTitle: 'Klimaanlagen-Wartungsdienste',
      seoDescription: 'Professionelle Klimaanlagen-Wartung und Reparatur',
    },
    ru: {
      name: 'Услуги кондиционирования',
      description: 'Обслуживание и ремонт кондиционеров',
      seoTitle: 'Услуги по обслуживанию кондиционеров',
      seoDescription: 'Профессиональное обслуживание и ремонт кондиционеров',
    },
    th: {
      name: 'บริการเครื่องปรับอากาศ',
      description: 'บำรุงรักษาและซ่อมแซมเครื่องปรับอากาศ',
      seoTitle: 'บริการบำรุงรักษาเครื่องปรับอากาศ',
      seoDescription: 'บริการบำรุงรักษาและซ่อมแซมเครื่องปรับอากาศมืออาชีพ',
    },
    vi: {
      name: 'Dịch vụ điều hòa',
      description: 'Bảo trì và sửa chữa điều hòa không khí',
      seoTitle: 'Dịch vụ bảo trì điều hòa',
      seoDescription: 'Dịch vụ bảo trì và sửa chữa điều hòa chuyên nghiệp',
    },
    ko: {
      name: '에어컨 서비스',
      description: '에어컨 유지보수 및 수리',
      seoTitle: '에어컨 유지보수 서비스',
      seoDescription: '전문 에어컨 유지보수 및 수리 서비스',
    },
    tl: {
      name: 'Serbisyo sa AC',
      description: 'Pagpapanatili at pagkukumpuni ng air conditioning',
      seoTitle: 'Serbisyo sa pagpapanatili ng AC',
      seoDescription: 'Propesyonal na serbisyo sa pagpapanatili at pagkukumpuni ng AC',
    },
    it: {
      name: 'Servizi di climatizzazione',
      description: 'Manutenzione e riparazione di condizionatori',
      seoTitle: 'Servizi di manutenzione AC',
      seoDescription: 'Servizi professionali di manutenzione e riparazione AC',
    },
    no: {
      name: 'AC-tjenester',
      description: 'Vedlikehold og reparasjon av klimaanlegg',
      seoTitle: 'AC vedlikeholdstjenester',
      seoDescription: 'Profesjonelle AC vedlikeholds- og reparasjonstjenester',
    },
    tr: {
      name: 'Klima servisi',
      description: 'Klima bakımı ve onarımı',
      seoTitle: 'Klima bakım hizmetleri',
      seoDescription: 'Profesyonel klima bakım ve onarım hizmetleri',
    },
    pt: {
      name: 'Serviços de ar condicionado',
      description: 'Manutenção e reparação de ar condicionado',
      seoTitle: 'Serviços de manutenção de AC',
      seoDescription: 'Serviços profissionais de manutenção e reparação de AC',
    },
    af: {
      name: 'AC-dienste',
      description: 'Lugversorging onderhoud en herstel',
      seoTitle: 'AC-onderhoudsdienste',
      seoDescription: 'Professionele AC-onderhouds- en hersteldienste',
    },
    ja: {
      name: 'エアコンサービス',
      description: 'エアコンのメンテナンスと修理',
      seoTitle: 'エアコンメンテナンスサービス',
      seoDescription: 'プロのエアコンメンテナンスと修理サービス',
    },
  },
};

export function getCategoryTranslations(slug: string) {
  const translations = CATEGORY_TRANSLATIONS[slug];
  if (!translations) return [];
  
  return ALL_LOCALES.map(locale => ({
    locale,
    name: translations[locale]?.name || translations['en'].name,
    description: translations[locale]?.description || translations['en'].description,
    seoTitle: translations[locale]?.seoTitle || translations['en'].seoTitle,
    seoDescription: translations[locale]?.seoDescription || translations['en'].seoDescription,
  }));
}

export const SAMPLE_IMAGES = {
  categories: {
    'home-cleaning': {
      thumbnail: '/images/categories/home-cleaning-thumb.jpg',
      gallery: [
        '/images/categories/home-cleaning-1.jpg',
        '/images/categories/home-cleaning-2.jpg',
        '/images/categories/home-cleaning-3.jpg',
      ],
      videos: [
        '/videos/categories/home-cleaning-intro.mp4',
      ],
    },
    'ac-services': {
      thumbnail: '/images/categories/ac-services-thumb.jpg',
      gallery: [
        '/images/categories/ac-services-1.jpg',
        '/images/categories/ac-services-2.jpg',
      ],
      videos: [
        '/videos/categories/ac-services-demo.mp4',
      ],
    },
  },
  services: {
    'deep-cleaning': {
      thumbnail: '/images/services/deep-cleaning-thumb.jpg',
      gallery: [
        '/images/services/deep-cleaning-1.jpg',
        '/images/services/deep-cleaning-2.jpg',
        '/images/services/deep-cleaning-3.jpg',
        '/images/services/deep-cleaning-4.jpg',
      ],
      videos: [
        '/videos/services/deep-cleaning-process.mp4',
      ],
    },
  },
  partners: {
    'real-estate': {
      logo: '/images/partners/real-estate-logo.png',
      profile: '/images/partners/real-estate-profile.jpg',
      gallery: [
        '/images/partners/real-estate-office-1.jpg',
        '/images/partners/real-estate-office-2.jpg',
      ],
      videos: [
        '/videos/partners/real-estate-intro.mp4',
      ],
    },
  },
};
