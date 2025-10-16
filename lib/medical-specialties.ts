/**
 * Get medical specialty details
 */
export function getMedicalSpecialtyDetails(specialty: string): {
  label: string;
  labelAr?: string;
  labelFr?: string;
  icon: string;
  description: string;
  category: string;
} {
  const specialtyMap: Record<string, any> = {
    // Médecine Générale
    GENERAL_PRACTITIONER: {
      label: 'General Practitioner',
      labelAr: 'طبيب عام',
      labelFr: 'Médecin Généraliste',
      icon: '👨‍⚕️',
      description: 'General medical care and health checkups',
      category: 'General Medicine',
    },
    FAMILY_DOCTOR: {
      label: 'Family Doctor',
      labelAr: 'طبيب عائلة',
      labelFr: 'Médecin de Famille',
      icon: '👨‍⚕️',
      description: 'Primary care for all family members',
      category: 'General Medicine',
    },
    
    // Spécialités Médicales
    CARDIOLOGIST: {
      label: 'Cardiologist',
      labelAr: 'طبيب قلب',
      labelFr: 'Cardiologue',
      icon: '❤️',
      description: 'Heart and cardiovascular system',
      category: 'Medical Specialty',
    },
    DERMATOLOGIST: {
      label: 'Dermatologist',
      labelAr: 'طبيب جلدية',
      labelFr: 'Dermatologue',
      icon: '🧴',
      description: 'Skin, hair, and nails',
      category: 'Medical Specialty',
    },
    ENDOCRINOLOGIST: {
      label: 'Endocrinologist',
      labelAr: 'طبيب غدد صماء',
      labelFr: 'Endocrinologue',
      icon: '🩺',
      description: 'Hormones, diabetes, thyroid',
      category: 'Medical Specialty',
    },
    GASTROENTEROLOGIST: {
      label: 'Gastroenterologist',
      labelAr: 'طبيب جهاز هضمي',
      labelFr: 'Gastro-entérologue',
      icon: '🫃',
      description: 'Digestive system',
      category: 'Medical Specialty',
    },
    GYNECOLOGIST: {
      label: 'Gynecologist',
      labelAr: 'طبيب نساء',
      labelFr: 'Gynécologue',
      icon: '👩‍⚕️',
      description: 'Women\'s health',
      category: 'Medical Specialty',
    },
    OBSTETRICIAN: {
      label: 'Obstetrician',
      labelAr: 'طبيب توليد',
      labelFr: 'Obstétricien',
      icon: '🤰',
      description: 'Pregnancy and childbirth',
      category: 'Medical Specialty',
    },
    NEPHROLOGIST: {
      label: 'Nephrologist',
      labelAr: 'طبيب كلى',
      labelFr: 'Néphrologue',
      icon: '🩺',
      description: 'Kidneys',
      category: 'Medical Specialty',
    },
    NEUROLOGIST: {
      label: 'Neurologist',
      labelAr: 'طبيب أعصاب',
      labelFr: 'Neurologue',
      icon: '🧠',
      description: 'Nervous system and brain',
      category: 'Medical Specialty',
    },
    ONCOLOGIST: {
      label: 'Oncologist',
      labelAr: 'طبيب أورام',
      labelFr: 'Oncologue',
      icon: '🎗️',
      description: 'Cancer treatment',
      category: 'Medical Specialty',
    },
    OPHTHALMOLOGIST: {
      label: 'Ophthalmologist',
      labelAr: 'طبيب عيون',
      labelFr: 'Ophtalmologue',
      icon: '👁️',
      description: 'Eyes and vision',
      category: 'Medical Specialty',
    },
    ENT: {
      label: 'ENT Specialist',
      labelAr: 'أنف وأذن وحنجرة',
      labelFr: 'ORL',
      icon: '👂',
      description: 'Ear, nose, and throat',
      category: 'Medical Specialty',
    },
    PEDIATRICIAN: {
      label: 'Pediatrician',
      labelAr: 'طبيب أطفال',
      labelFr: 'Pédiatre',
      icon: '👶',
      description: 'Children and adolescents',
      category: 'Medical Specialty',
    },
    PULMONOLOGIST: {
      label: 'Pulmonologist',
      labelAr: 'طبيب صدرية',
      labelFr: 'Pneumologue',
      icon: '🫁',
      description: 'Lungs and respiratory system',
      category: 'Medical Specialty',
    },
    PSYCHIATRIST: {
      label: 'Psychiatrist',
      labelAr: 'طبيب نفسي',
      labelFr: 'Psychiatre',
      icon: '🧠',
      description: 'Mental health',
      category: 'Medical Specialty',
    },
    RHEUMATOLOGIST: {
      label: 'Rheumatologist',
      labelAr: 'طبيب روماتيزم',
      labelFr: 'Rhumatologue',
      icon: '🦴',
      description: 'Joints, bones, and muscles',
      category: 'Medical Specialty',
    },
    UROLOGIST: {
      label: 'Urologist',
      labelAr: 'طبيب مسالك بولية',
      labelFr: 'Urologue',
      icon: '🩺',
      description: 'Urinary system',
      category: 'Medical Specialty',
    },
    
    // Spécialités Chirurgicales
    GENERAL_SURGEON: {
      label: 'General Surgeon',
      labelAr: 'جراح عام',
      labelFr: 'Chirurgien Général',
      icon: '🔪',
      description: 'General surgery',
      category: 'Surgical Specialty',
    },
    ORTHOPEDIC_SURGEON: {
      label: 'Orthopedic Surgeon',
      labelAr: 'جراح عظام',
      labelFr: 'Chirurgien Orthopédiste',
      icon: '🦴',
      description: 'Bones and joints surgery',
      category: 'Surgical Specialty',
    },
    PLASTIC_SURGEON: {
      label: 'Plastic Surgeon',
      labelAr: 'جراح تجميل',
      labelFr: 'Chirurgien Plastique',
      icon: '✨',
      description: 'Cosmetic and reconstructive surgery',
      category: 'Surgical Specialty',
    },
    CARDIOVASCULAR_SURGEON: {
      label: 'Cardiovascular Surgeon',
      labelAr: 'جراح قلب',
      labelFr: 'Chirurgien Cardiovasculaire',
      icon: '❤️',
      description: 'Heart surgery',
      category: 'Surgical Specialty',
    },
    NEUROSURGEON: {
      label: 'Neurosurgeon',
      labelAr: 'جراح أعصاب',
      labelFr: 'Neurochirurgien',
      icon: '🧠',
      description: 'Brain and spine surgery',
      category: 'Surgical Specialty',
    },
    
    // Autres
    ALLERGIST: {
      label: 'Allergist',
      labelAr: 'طبيب حساسية',
      labelFr: 'Allergologue',
      icon: '🤧',
      description: 'Allergies',
      category: 'Other',
    },
    ANESTHESIOLOGIST: {
      label: 'Anesthesiologist',
      labelAr: 'طبيب تخدير',
      labelFr: 'Anesthésiste',
      icon: '💉',
      description: 'Anesthesia',
      category: 'Other',
    },
    GERIATRICIAN: {
      label: 'Geriatrician',
      labelAr: 'طبيب مسنين',
      labelFr: 'Gériatre',
      icon: '👴',
      description: 'Elderly care',
      category: 'Other',
    },
    HEMATOLOGIST: {
      label: 'Hematologist',
      labelAr: 'طبيب دم',
      labelFr: 'Hématologue',
      icon: '🩸',
      description: 'Blood disorders',
      category: 'Other',
    },
    INFECTIOUS_DISEASE: {
      label: 'Infectious Disease Specialist',
      labelAr: 'طبيب أمراض معدية',
      labelFr: 'Infectiologue',
      icon: '🦠',
      description: 'Infectious diseases',
      category: 'Other',
    },
    SPORTS_MEDICINE: {
      label: 'Sports Medicine',
      labelAr: 'طب رياضي',
      labelFr: 'Médecin du Sport',
      icon: '⚽',
      description: 'Sports injuries',
      category: 'Other',
    },
    NUTRITIONIST: {
      label: 'Nutritionist',
      labelAr: 'أخصائي تغذية',
      labelFr: 'Nutritionniste',
      icon: '🥗',
      description: 'Nutrition and diet',
      category: 'Other',
    },
    RADIOLOGIST: {
      label: 'Radiologist',
      labelAr: 'أخصائي أشعة',
      labelFr: 'Radiologue',
      icon: '🩻',
      description: 'Medical imaging',
      category: 'Other',
    },
  };

  return specialtyMap[specialty] || {
    label: specialty,
    icon: '👨‍⚕️',
    description: '',
    category: 'Other',
  };
}

/**
 * Get dental specialty details
 */
export function getDentalSpecialtyDetails(specialty: string): {
  label: string;
  labelAr?: string;
  labelFr?: string;
  icon: string;
  description: string;
} {
  const specialtyMap: Record<string, any> = {
    GENERAL_DENTIST: {
      label: 'General Dentist',
      labelAr: 'طبيب أسنان عام',
      labelFr: 'Dentiste Généraliste',
      icon: '🦷',
      description: 'General dental care',
    },
    DENTAL_HYGIENIST: {
      label: 'Dental Hygienist',
      labelAr: 'أخصائي صحة الفم',
      labelFr: 'Hygiéniste Dentaire',
      icon: '🪥',
      description: 'Teeth cleaning and prevention',
    },
    ORTHODONTIST: {
      label: 'Orthodontist',
      labelAr: 'أخصائي تقويم أسنان',
      labelFr: 'Orthodontiste',
      icon: '😁',
      description: 'Braces and teeth alignment',
    },
    PERIODONTIST: {
      label: 'Periodontist',
      labelAr: 'أخصائي لثة',
      labelFr: 'Parodontiste',
      icon: '🦷',
      description: 'Gums and supporting bone',
    },
    ENDODONTIST: {
      label: 'Endodontist',
      labelAr: 'أخصائي علاج جذور',
      labelFr: 'Endodontiste',
      icon: '🦷',
      description: 'Root canal treatment',
    },
    PROSTHODONTIST: {
      label: 'Prosthodontist',
      labelAr: 'أخصائي تركيبات',
      labelFr: 'Prosthodontiste',
      icon: '🦷',
      description: 'Crowns, bridges, dentures',
    },
    ORAL_SURGEON: {
      label: 'Oral Surgeon',
      labelAr: 'جراح فم',
      labelFr: 'Chirurgien Oral',
      icon: '🔪',
      description: 'Extractions and oral surgery',
    },
    PEDIATRIC_DENTIST: {
      label: 'Pediatric Dentist',
      labelAr: 'طبيب أسنان أطفال',
      labelFr: 'Pédodontiste',
      icon: '👶',
      description: 'Children\'s dentistry',
    },
    COSMETIC_DENTIST: {
      label: 'Cosmetic Dentist',
      labelAr: 'طبيب أسنان تجميلي',
      labelFr: 'Dentiste Esthétique',
      icon: '✨',
      description: 'Whitening, veneers, aesthetics',
    },
    IMPLANTOLOGIST: {
      label: 'Implantologist',
      labelAr: 'أخصائي زراعة أسنان',
      labelFr: 'Implantologue',
      icon: '🦷',
      description: 'Dental implants',
    },
  };

  return specialtyMap[specialty] || {
    label: specialty,
    icon: '🦷',
    description: '',
  };
}

/**
 * Get medical urgency details
 */
export function getMedicalUrgencyDetails(urgency: string): {
  label: string;
  color: string;
  icon: string;
  responseTime: string;
} {
  const urgencyMap: Record<string, any> = {
    CRITICAL: {
      label: 'Urgence Vitale',
      color: 'red',
      icon: '🔴',
      responseTime: '0-1 heure',
    },
    URGENT: {
      label: 'Urgence',
      color: 'orange',
      icon: '🟠',
      responseTime: '1-4 heures',
    },
    SEMI_URGENT: {
      label: 'Semi-urgence',
      color: 'yellow',
      icon: '🟡',
      responseTime: '4-24 heures',
    },
    NORMAL: {
      label: 'Consultation Normale',
      color: 'green',
      icon: '🟢',
      responseTime: 'Rendez-vous planifié',
    },
  };

  return urgencyMap[urgency] || urgencyMap.NORMAL;
}
