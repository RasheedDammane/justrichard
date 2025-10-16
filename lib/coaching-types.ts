/**
 * Get coaching type details
 */
export function getCoachingTypeDetails(type: string): {
  label: string;
  labelAr?: string;
  labelFr?: string;
  icon: string;
  description: string;
  specializations: string[];
} {
  const typeMap: Record<string, any> = {
    LIFE_COACHING: {
      label: 'Life Coaching',
      labelAr: 'تدريب الحياة',
      labelFr: 'Coaching de Vie',
      icon: '🌟',
      description: 'Personal development and life balance',
      specializations: [
        'Personal Development',
        'Stress Management',
        'Self-Confidence',
        'Work-Life Balance',
        'Goal Setting',
        'Habit Formation',
      ],
    },
    BUSINESS_COACHING: {
      label: 'Business Coaching',
      labelAr: 'تدريب الأعمال',
      labelFr: 'Coaching d\'Entreprise',
      icon: '💼',
      description: 'Business strategy and growth',
      specializations: [
        'Business Strategy',
        'Leadership Development',
        'Team Management',
        'Business Growth',
        'Entrepreneurship',
        'Startup Coaching',
      ],
    },
    CAREER_COACHING: {
      label: 'Career Coaching',
      labelAr: 'تدريب مهني',
      labelFr: 'Coaching de Carrière',
      icon: '🎯',
      description: 'Career development and transitions',
      specializations: [
        'Career Planning',
        'Job Search',
        'Career Transition',
        'Salary Negotiation',
        'Interview Preparation',
        'Professional Branding',
      ],
    },
    EXECUTIVE_COACHING: {
      label: 'Executive Coaching',
      labelAr: 'تدريب تنفيذي',
      labelFr: 'Coaching Exécutif',
      icon: '👔',
      description: 'Leadership for executives and managers',
      specializations: [
        'Executive Leadership',
        'Strategic Thinking',
        'Decision Making',
        'Change Management',
        'Executive Presence',
        'Board Relations',
      ],
    },
    HEALTH_WELLNESS: {
      label: 'Health & Wellness Coaching',
      labelAr: 'تدريب الصحة والعافية',
      labelFr: 'Coaching Santé et Bien-être',
      icon: '💪',
      description: 'Health, fitness, and wellness',
      specializations: [
        'Nutrition Coaching',
        'Fitness Coaching',
        'Weight Loss',
        'Healthy Lifestyle',
        'Sleep Optimization',
        'Energy Management',
      ],
    },
    FINANCIAL_COACHING: {
      label: 'Financial Coaching',
      labelAr: 'تدريب مالي',
      labelFr: 'Coaching Financier',
      icon: '💰',
      description: 'Financial planning and management',
      specializations: [
        'Budget Management',
        'Debt Reduction',
        'Investment Planning',
        'Retirement Planning',
        'Financial Goals',
        'Money Mindset',
      ],
    },
    RELATIONSHIP_COACHING: {
      label: 'Relationship Coaching',
      labelAr: 'تدريب العلاقات',
      labelFr: 'Coaching Relationnel',
      icon: '❤️',
      description: 'Relationships and communication',
      specializations: [
        'Couples Coaching',
        'Communication Skills',
        'Conflict Resolution',
        'Dating Coaching',
        'Marriage Coaching',
        'Family Dynamics',
      ],
    },
    SPORTS_COACHING: {
      label: 'Sports Coaching',
      labelAr: 'تدريب رياضي',
      labelFr: 'Coaching Sportif',
      icon: '⚽',
      description: 'Athletic performance and mindset',
      specializations: [
        'Performance Coaching',
        'Mental Preparation',
        'Sports Nutrition',
        'Injury Recovery',
        'Competition Mindset',
        'Athletic Development',
      ],
    },
    MINDFULNESS_COACHING: {
      label: 'Mindfulness Coaching',
      labelAr: 'تدريب اليقظة',
      labelFr: 'Coaching Pleine Conscience',
      icon: '🧘',
      description: 'Mindfulness and emotional intelligence',
      specializations: [
        'Meditation Practice',
        'Mindfulness Techniques',
        'Emotional Intelligence',
        'Stress Reduction',
        'Present Moment Awareness',
        'Inner Peace',
      ],
    },
    PRODUCTIVITY_COACHING: {
      label: 'Productivity Coaching',
      labelAr: 'تدريب الإنتاجية',
      labelFr: 'Coaching Productivité',
      icon: '📊',
      description: 'Time management and productivity',
      specializations: [
        'Time Management',
        'Goal Achievement',
        'Organization Skills',
        'Focus & Concentration',
        'Productivity Systems',
        'Work Efficiency',
      ],
    },
  };

  return typeMap[type] || {
    label: type,
    icon: '🎯',
    description: '',
    specializations: [],
  };
}

/**
 * Get session format details
 */
export function getSessionFormatDetails(format: string): {
  label: string;
  icon: string;
  description: string;
} {
  const formatMap: Record<string, any> = {
    ONE_ON_ONE: {
      label: 'One-on-One',
      icon: '👤',
      description: 'Private individual session',
    },
    GROUP: {
      label: 'Group Session',
      icon: '👥',
      description: 'Small group coaching',
    },
    ONLINE: {
      label: 'Online',
      icon: '💻',
      description: 'Video call session',
    },
    IN_PERSON: {
      label: 'In-Person',
      icon: '🤝',
      description: 'Face-to-face meeting',
    },
    HYBRID: {
      label: 'Hybrid',
      icon: '🔄',
      description: 'Combination of online and in-person',
    },
  };

  return formatMap[format] || {
    label: format,
    icon: '📋',
    description: '',
  };
}

/**
 * Calculate package savings
 */
export function calculatePackageSavings(
  hourlyRate: number,
  numberOfSessions: number,
  packagePrice: number
): {
  regularPrice: number;
  packagePrice: number;
  savings: number;
  savingsPercentage: number;
} {
  const regularPrice = hourlyRate * numberOfSessions;
  const savings = regularPrice - packagePrice;
  const savingsPercentage = (savings / regularPrice) * 100;

  return {
    regularPrice,
    packagePrice,
    savings,
    savingsPercentage: Math.round(savingsPercentage),
  };
}
