/**
 * Get domestic service category details
 */
export function getDomesticCategoryDetails(category: string): {
  label: string;
  labelAr?: string;
  labelFr?: string;
  icon: string;
  description: string;
  subCategories: Array<{
    value: string;
    label: string;
    labelAr?: string;
    labelFr?: string;
  }>;
} {
  const categoryMap: Record<string, any> = {
    CHILDCARE: {
      label: 'Childcare',
      labelAr: 'رعاية الأطفال',
      labelFr: 'Garde d\'enfants',
      icon: '👶',
      description: 'Professional childcare services',
      subCategories: [
        { value: 'nanny', label: 'Nanny', labelAr: 'مربية', labelFr: 'Nounou' },
        { value: 'babysitter', label: 'Babysitter', labelAr: 'جليسة أطفال', labelFr: 'Baby-sitter' },
        { value: 'night_nanny', label: 'Night Nanny', labelAr: 'مربية ليلية', labelFr: 'Nounou de nuit' },
        { value: 'newborn_specialist', label: 'Newborn Care Specialist', labelAr: 'أخصائي رعاية المواليد', labelFr: 'Spécialiste nouveau-né' },
        { value: 'au_pair', label: 'Au Pair', labelAr: 'أو بير', labelFr: 'Au Pair' },
        { value: 'tutor', label: 'Tutor/Homework Helper', labelAr: 'مدرس خصوصي', labelFr: 'Tuteur' },
      ],
    },
    HOUSEKEEPING: {
      label: 'Housekeeping',
      labelAr: 'التدبير المنزلي',
      labelFr: 'Entretien ménager',
      icon: '🏠',
      description: 'Home cleaning and maintenance',
      subCategories: [
        { value: 'housekeeper', label: 'Housekeeper', labelAr: 'عاملة منزل', labelFr: 'Femme de ménage' },
        { value: 'deep_cleaning', label: 'Deep Cleaning Specialist', labelAr: 'أخصائي تنظيف عميق', labelFr: 'Nettoyage en profondeur' },
        { value: 'laundry', label: 'Laundry Specialist', labelAr: 'أخصائي غسيل وكي', labelFr: 'Spécialiste lessive' },
        { value: 'organizer', label: 'Professional Organizer', labelAr: 'منظم محترف', labelFr: 'Organisateur professionnel' },
      ],
    },
    COOKING: {
      label: 'Cooking',
      labelAr: 'الطبخ',
      labelFr: 'Cuisine',
      icon: '👨‍🍳',
      description: 'Professional cooking services',
      subCategories: [
        { value: 'personal_chef', label: 'Personal Chef', labelAr: 'طاهي شخصي', labelFr: 'Chef personnel' },
        { value: 'cook', label: 'Cook', labelAr: 'طباخ', labelFr: 'Cuisinier' },
        { value: 'meal_prep', label: 'Meal Prep Specialist', labelAr: 'أخصائي تحضير وجبات', labelFr: 'Préparation de repas' },
        { value: 'dietary_specialist', label: 'Dietary Specialist', labelAr: 'أخصائي تغذية', labelFr: 'Spécialiste diététique' },
      ],
    },
    NURSING: {
      label: 'Nursing',
      labelAr: 'التمريض',
      labelFr: 'Soins infirmiers',
      icon: '🩺',
      description: 'Professional nursing care',
      subCategories: [
        { value: 'registered_nurse', label: 'Registered Nurse', labelAr: 'ممرضة مسجلة', labelFr: 'Infirmière diplômée' },
        { value: 'practical_nurse', label: 'Practical Nurse', labelAr: 'ممرضة عملية', labelFr: 'Infirmière auxiliaire' },
        { value: 'home_health_aide', label: 'Home Health Aide', labelAr: 'مساعد صحي منزلي', labelFr: 'Aide-soignant' },
        { value: 'medical_companion', label: 'Medical Companion', labelAr: 'مرافق طبي', labelFr: 'Accompagnateur médical' },
      ],
    },
    ELDERLY_CARE: {
      label: 'Elderly Care',
      labelAr: 'رعاية المسنين',
      labelFr: 'Soins aux personnes âgées',
      icon: '👴',
      description: 'Care for elderly persons',
      subCategories: [
        { value: 'elderly_caregiver', label: 'Elderly Caregiver', labelAr: 'مقدم رعاية مسنين', labelFr: 'Aide aux personnes âgées' },
        { value: 'dementia_specialist', label: 'Dementia Care Specialist', labelAr: 'أخصائي رعاية الخرف', labelFr: 'Spécialiste démence' },
        { value: 'companion', label: 'Companion', labelAr: 'مرافق', labelFr: 'Compagnon' },
        { value: 'live_in_caregiver', label: 'Live-in Caregiver', labelAr: 'مقدم رعاية مقيم', labelFr: 'Aide à domicile résidente' },
      ],
    },
    SPECIAL_NEEDS_CARE: {
      label: 'Special Needs Care',
      labelAr: 'رعاية ذوي الاحتياجات الخاصة',
      labelFr: 'Soins spécialisés',
      icon: '🦽',
      description: 'Specialized care services',
      subCategories: [
        { value: 'disability_caregiver', label: 'Disability Caregiver', labelAr: 'مقدم رعاية إعاقة', labelFr: 'Aide handicap' },
        { value: 'autism_specialist', label: 'Autism Specialist', labelAr: 'أخصائي توحد', labelFr: 'Spécialiste autisme' },
        { value: 'physical_therapy_assistant', label: 'Physical Therapy Assistant', labelAr: 'مساعد علاج طبيعي', labelFr: 'Assistant kinésithérapeute' },
      ],
    },
    PET_CARE: {
      label: 'Pet Care',
      labelAr: 'رعاية الحيوانات الأليفة',
      labelFr: 'Soins aux animaux',
      icon: '🐕',
      description: 'Pet care services',
      subCategories: [
        { value: 'pet_sitter', label: 'Pet Sitter', labelAr: 'جليس حيوانات', labelFr: 'Garde d\'animaux' },
        { value: 'dog_walker', label: 'Dog Walker', labelAr: 'مشاء كلاب', labelFr: 'Promeneur de chiens' },
        { value: 'pet_groomer', label: 'Pet Groomer', labelAr: 'مصفف حيوانات', labelFr: 'Toiletteur' },
      ],
    },
    DRIVER: {
      label: 'Driver',
      labelAr: 'سائق',
      labelFr: 'Chauffeur',
      icon: '🚗',
      description: 'Professional driving services',
      subCategories: [
        { value: 'personal_driver', label: 'Personal Driver', labelAr: 'سائق شخصي', labelFr: 'Chauffeur personnel' },
        { value: 'family_driver', label: 'Family Driver', labelAr: 'سائق عائلي', labelFr: 'Chauffeur familial' },
        { value: 'elderly_driver', label: 'Elderly Driver', labelAr: 'سائق مسنين', labelFr: 'Chauffeur personnes âgées' },
      ],
    },
  };

  return categoryMap[category] || {
    label: category,
    icon: '👤',
    description: '',
    subCategories: [],
  };
}

/**
 * Get employment type details
 */
export function getEmploymentTypeDetails(type: string): {
  label: string;
  labelAr?: string;
  labelFr?: string;
  icon: string;
  description: string;
} {
  const typeMap: Record<string, any> = {
    FULL_TIME: {
      label: 'Full-Time',
      labelAr: 'دوام كامل',
      labelFr: 'Temps plein',
      icon: '⏰',
      description: '40+ hours per week',
    },
    PART_TIME: {
      label: 'Part-Time',
      labelAr: 'دوام جزئي',
      labelFr: 'Temps partiel',
      icon: '⏱️',
      description: 'Less than 40 hours per week',
    },
    LIVE_IN: {
      label: 'Live-In',
      labelAr: 'مقيم',
      labelFr: 'Résident',
      icon: '🏠',
      description: 'Lives at employer\'s residence',
    },
    LIVE_OUT: {
      label: 'Live-Out',
      labelAr: 'غير مقيم',
      labelFr: 'Non-résident',
      icon: '🚪',
      description: 'Does not live at residence',
    },
    HOURLY: {
      label: 'Hourly',
      labelAr: 'بالساعة',
      labelFr: 'À l\'heure',
      icon: '⏰',
      description: 'Paid by the hour',
    },
    DAILY: {
      label: 'Daily',
      labelAr: 'يومي',
      labelFr: 'Journalier',
      icon: '📅',
      description: 'Paid by the day',
    },
    WEEKLY: {
      label: 'Weekly',
      labelAr: 'أسبوعي',
      labelFr: 'Hebdomadaire',
      icon: '📆',
      description: 'Paid weekly',
    },
    MONTHLY: {
      label: 'Monthly',
      labelAr: 'شهري',
      labelFr: 'Mensuel',
      icon: '📊',
      description: 'Paid monthly',
    },
  };

  return typeMap[type] || {
    label: type,
    icon: '📋',
    description: '',
  };
}

/**
 * Get experience level details
 */
export function getExperienceLevelDetails(level: string): {
  label: string;
  years: string;
  color: string;
} {
  const levelMap: Record<string, any> = {
    ENTRY_LEVEL: {
      label: 'Entry Level',
      years: '0-2 years',
      color: 'blue',
    },
    INTERMEDIATE: {
      label: 'Intermediate',
      years: '2-5 years',
      color: 'green',
    },
    EXPERIENCED: {
      label: 'Experienced',
      years: '5-10 years',
      color: 'orange',
    },
    EXPERT: {
      label: 'Expert',
      years: '10+ years',
      color: 'purple',
    },
  };

  return levelMap[level] || {
    label: level,
    years: '',
    color: 'gray',
  };
}
