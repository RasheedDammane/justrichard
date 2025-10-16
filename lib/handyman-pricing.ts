/**
 * Calculate handyman service price based on urgency level
 */
export function calculateHandymanPrice(
  basePrice: number,
  urgencyLevel: string,
  criticalMultiplier: number = 2.0,
  highMultiplier: number = 1.5
): {
  finalPrice: number;
  urgencyFee: number;
  multiplier: number;
} {
  let multiplier = 1.0;
  
  switch (urgencyLevel) {
    case 'CRITICAL':
      multiplier = criticalMultiplier;
      break;
    case 'HIGH':
      multiplier = highMultiplier;
      break;
    case 'MEDIUM':
    case 'LOW':
    default:
      multiplier = 1.0;
      break;
  }

  const finalPrice = basePrice * multiplier;
  const urgencyFee = finalPrice - basePrice;

  return {
    finalPrice,
    urgencyFee,
    multiplier,
  };
}

/**
 * Get urgency level details
 */
export function getUrgencyDetails(urgencyLevel: string): {
  label: string;
  color: string;
  icon: string;
  responseTime: string;
  availability: string;
  surcharge: string;
} {
  const urgencyMap: Record<string, any> = {
    CRITICAL: {
      label: 'Urgence Critique',
      color: 'red',
      icon: '🔴',
      responseTime: '0-2 heures',
      availability: '24/7',
      surcharge: '+100%',
    },
    HIGH: {
      label: 'Urgence Haute',
      color: 'orange',
      icon: '🟠',
      responseTime: '2-6 heures',
      availability: '7h-22h',
      surcharge: '+50%',
    },
    MEDIUM: {
      label: 'Urgence Moyenne',
      color: 'yellow',
      icon: '🟡',
      responseTime: '24-48 heures',
      availability: 'Horaires normaux',
      surcharge: 'Aucun',
    },
    LOW: {
      label: 'Pas d\'urgence',
      color: 'green',
      icon: '🟢',
      responseTime: '3-7 jours',
      availability: 'Sur rendez-vous',
      surcharge: 'Aucun',
    },
  };

  return urgencyMap[urgencyLevel] || urgencyMap.MEDIUM;
}

/**
 * Get category details
 */
export function getCategoryDetails(category: string): {
  label: string;
  icon: string;
  description: string;
} {
  const categoryMap: Record<string, any> = {
    PLUMBING: {
      label: 'Plomberie',
      icon: '🔧',
      description: 'Fuites, débouchage, installation sanitaire',
    },
    ELECTRICAL: {
      label: 'Électricité',
      icon: '⚡',
      description: 'Pannes, installations, tableau électrique',
    },
    HVAC: {
      label: 'Climatisation & Chauffage',
      icon: '❄️',
      description: 'AC, chauffage, ventilation',
    },
    CARPENTRY: {
      label: 'Menuiserie',
      icon: '🪚',
      description: 'Portes, fenêtres, placards, meubles',
    },
    PAINTING: {
      label: 'Peinture',
      icon: '🎨',
      description: 'Peinture intérieure/extérieure, papier peint',
    },
    LOCKSMITH: {
      label: 'Serrurerie',
      icon: '🔑',
      description: 'Serrures, clés, portes bloquées',
    },
    TILING_FLOORING: {
      label: 'Carrelage & Sol',
      icon: '🏗️',
      description: 'Carrelage, parquet, revêtements',
    },
    ROOFING: {
      label: 'Toiture',
      icon: '🏠',
      description: 'Fuites, tuiles, gouttières',
    },
    MASONRY: {
      label: 'Maçonnerie',
      icon: '🧱',
      description: 'Murs, fissures, enduit, béton',
    },
    APPLIANCES: {
      label: 'Électroménager',
      icon: '🔌',
      description: 'Réfrigérateur, lave-linge, four',
    },
    GARDENING: {
      label: 'Jardinage',
      icon: '🌳',
      description: 'Tonte, taille, entretien jardin',
    },
    CLEANING: {
      label: 'Nettoyage',
      icon: '🧹',
      description: 'Nettoyage profond, entretien',
    },
  };

  return categoryMap[category] || {
    label: category,
    icon: '🔧',
    description: '',
  };
}

/**
 * Get intervention type details
 */
export function getInterventionTypeDetails(type: string): {
  label: string;
  description: string;
} {
  const typeMap: Record<string, any> = {
    DIAGNOSTIC: {
      label: 'Diagnostic',
      description: 'Inspection et évaluation du problème',
    },
    REPAIR: {
      label: 'Réparation',
      description: 'Correction et remplacement',
    },
    INSTALLATION: {
      label: 'Installation',
      description: 'Pose et montage neuf',
    },
    MAINTENANCE: {
      label: 'Entretien',
      description: 'Maintenance préventive',
    },
    EMERGENCY: {
      label: 'Dépannage',
      description: 'Intervention rapide urgente',
    },
    RENOVATION: {
      label: 'Rénovation',
      description: 'Amélioration et modernisation',
    },
  };

  return typeMap[type] || {
    label: type,
    description: '',
  };
}
