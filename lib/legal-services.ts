/**
 * Get lawyer specialty details
 */
export function getLawyerSpecialtyDetails(specialty: string): {
  label: string;
  labelAr?: string;
  labelFr?: string;
  icon: string;
  description: string;
  category: string;
} {
  const specialtyMap: Record<string, any> = {
    // Droit des Affaires
    COMMERCIAL_LAW: {
      label: 'Commercial Law',
      labelAr: 'القانون التجاري',
      labelFr: 'Droit Commercial',
      icon: '💼',
      description: 'Commercial contracts and business law',
      category: 'Business Law',
    },
    CORPORATE_LAW: {
      label: 'Corporate Law',
      labelAr: 'قانون الشركات',
      labelFr: 'Droit des Sociétés',
      icon: '🏢',
      description: 'Company formation, mergers, acquisitions',
      category: 'Business Law',
    },
    BANKING_LAW: {
      label: 'Banking Law',
      labelAr: 'القانون المصرفي',
      labelFr: 'Droit Bancaire',
      icon: '🏦',
      description: 'Banking and finance law',
      category: 'Business Law',
    },
    INTELLECTUAL_PROPERTY: {
      label: 'Intellectual Property',
      labelAr: 'الملكية الفكرية',
      labelFr: 'Propriété Intellectuelle',
      icon: '💡',
      description: 'Patents, trademarks, copyrights',
      category: 'Business Law',
    },
    
    // Droit Civil
    FAMILY_LAW: {
      label: 'Family Law',
      labelAr: 'قانون الأسرة',
      labelFr: 'Droit de la Famille',
      icon: '👨‍👩‍👧‍👦',
      description: 'Divorce, custody, family matters',
      category: 'Civil Law',
    },
    REAL_ESTATE_LAW: {
      label: 'Real Estate Law',
      labelAr: 'قانون العقارات',
      labelFr: 'Droit Immobilier',
      icon: '🏠',
      description: 'Property transactions and disputes',
      category: 'Civil Law',
    },
    INHERITANCE_LAW: {
      label: 'Inheritance Law',
      labelAr: 'قانون الميراث',
      labelFr: 'Droit des Successions',
      icon: '📜',
      description: 'Wills, estates, inheritance',
      category: 'Civil Law',
    },
    CONTRACT_LAW: {
      label: 'Contract Law',
      labelAr: 'قانون العقود',
      labelFr: 'Droit des Contrats',
      icon: '📝',
      description: 'Contract drafting and disputes',
      category: 'Civil Law',
    },
    
    // Droit Pénal
    CRIMINAL_LAW: {
      label: 'Criminal Law',
      labelAr: 'القانون الجنائي',
      labelFr: 'Droit Pénal',
      icon: '⚖️',
      description: 'Criminal defense',
      category: 'Criminal Law',
    },
    BUSINESS_CRIMINAL_LAW: {
      label: 'Business Criminal Law',
      labelAr: 'القانون الجنائي للأعمال',
      labelFr: 'Droit Pénal des Affaires',
      icon: '⚖️',
      description: 'Fraud, corruption, white-collar crime',
      category: 'Criminal Law',
    },
    
    // Droit du Travail
    LABOR_LAW: {
      label: 'Labor Law',
      labelAr: 'قانون العمل',
      labelFr: 'Droit du Travail',
      icon: '👷',
      description: 'Employment contracts, termination',
      category: 'Labor Law',
    },
    SOCIAL_LAW: {
      label: 'Social Law',
      labelAr: 'القانون الاجتماعي',
      labelFr: 'Droit Social',
      icon: '🤝',
      description: 'Social security and benefits',
      category: 'Labor Law',
    },
    
    // Autres
    TAX_LAW: {
      label: 'Tax Law',
      labelAr: 'القانون الضريبي',
      labelFr: 'Droit Fiscal',
      icon: '💰',
      description: 'Taxation and tax disputes',
      category: 'Other',
    },
    ADMINISTRATIVE_LAW: {
      label: 'Administrative Law',
      labelAr: 'القانون الإداري',
      labelFr: 'Droit Administratif',
      icon: '🏛️',
      description: 'Government and administrative matters',
      category: 'Other',
    },
    IMMIGRATION_LAW: {
      label: 'Immigration Law',
      labelAr: 'قانون الهجرة',
      labelFr: 'Droit de l\'Immigration',
      icon: '✈️',
      description: 'Visas, permits, citizenship',
      category: 'Other',
    },
    MARITIME_LAW: {
      label: 'Maritime Law',
      labelAr: 'القانون البحري',
      labelFr: 'Droit Maritime',
      icon: '⚓',
      description: 'Shipping and maritime commerce',
      category: 'Other',
    },
    ENVIRONMENTAL_LAW: {
      label: 'Environmental Law',
      labelAr: 'قانون البيئة',
      labelFr: 'Droit de l\'Environnement',
      icon: '🌍',
      description: 'Environmental regulations',
      category: 'Other',
    },
    CONSUMER_LAW: {
      label: 'Consumer Law',
      labelAr: 'قانون المستهلك',
      labelFr: 'Droit de la Consommation',
      icon: '🛒',
      description: 'Consumer rights and protection',
      category: 'Other',
    },
    HEALTH_LAW: {
      label: 'Health Law',
      labelAr: 'قانون الصحة',
      labelFr: 'Droit de la Santé',
      icon: '🏥',
      description: 'Healthcare and medical law',
      category: 'Other',
    },
    INTERNATIONAL_LAW: {
      label: 'International Law',
      labelAr: 'القانون الدولي',
      labelFr: 'Droit International',
      icon: '🌐',
      description: 'International treaties and disputes',
      category: 'Other',
    },
  };

  return specialtyMap[specialty] || {
    label: specialty,
    icon: '⚖️',
    description: '',
    category: 'Other',
  };
}

/**
 * Get company type details
 */
export function getCompanyTypeDetails(type: string): {
  label: string;
  labelAr?: string;
  description: string;
  suitableFor: string;
} {
  const typeMap: Record<string, any> = {
    SOLE_PROPRIETORSHIP: {
      label: 'Sole Proprietorship',
      labelAr: 'مؤسسة فردية',
      description: 'Individual business, simplest form',
      suitableFor: 'Freelancers, small businesses',
    },
    LLC: {
      label: 'LLC (SARL)',
      labelAr: 'شركة ذات مسؤولية محدودة',
      description: 'Limited liability company',
      suitableFor: 'Small to medium businesses',
    },
    SA: {
      label: 'SA (Société Anonyme)',
      labelAr: 'شركة مساهمة',
      description: 'Public limited company',
      suitableFor: 'Large corporations',
    },
    SAS: {
      label: 'SAS',
      labelAr: 'شركة مساهمة مبسطة',
      description: 'Simplified joint-stock company',
      suitableFor: 'Flexible structure businesses',
    },
    OFFSHORE_COMPANY: {
      label: 'Offshore Company',
      labelAr: 'شركة خارجية',
      description: 'Company registered offshore',
      suitableFor: 'International business, tax optimization',
    },
    FREE_ZONE_COMPANY: {
      label: 'Free Zone Company',
      labelAr: 'شركة منطقة حرة',
      description: 'Company in free zone (UAE)',
      suitableFor: '100% foreign ownership, tax benefits',
    },
    BRANCH_OFFICE: {
      label: 'Branch Office',
      labelAr: 'مكتب فرع',
      description: 'Extension of parent company',
      suitableFor: 'Established companies expanding',
    },
    REPRESENTATIVE_OFFICE: {
      label: 'Representative Office',
      labelAr: 'مكتب تمثيلي',
      description: 'Non-trading representative office',
      suitableFor: 'Market research, liaison',
    },
  };

  return typeMap[type] || {
    label: type,
    description: '',
    suitableFor: '',
  };
}

/**
 * Get permit type details by country
 */
export function getPermitTypeDetails(type: string, countryCode?: string): {
  label: string;
  labelAr?: string;
  description: string;
  typicalDuration?: string;
} {
  const typeMap: Record<string, any> = {
    TOURIST_VISA: {
      label: 'Tourist Visa',
      labelAr: 'تأشيرة سياحية',
      description: 'Short-term tourist visa',
      typicalDuration: '30-90 days',
    },
    RESIDENCE_VISA: {
      label: 'Residence Visa',
      labelAr: 'تأشيرة إقامة',
      description: 'Long-term residence permit',
      typicalDuration: '1-3 years',
    },
    WORK_VISA: {
      label: 'Work Visa',
      labelAr: 'تأشيرة عمل',
      description: 'Employment visa',
      typicalDuration: '2-3 years',
    },
    INVESTOR_VISA: {
      label: 'Investor Visa',
      labelAr: 'تأشيرة مستثمر',
      description: 'For business investors',
      typicalDuration: '2-10 years',
    },
    WORK_PERMIT: {
      label: 'Work Permit',
      labelAr: 'تصريح عمل',
      description: 'Permission to work',
      typicalDuration: '1-2 years',
    },
    DRIVING_LICENSE: {
      label: 'Driving License',
      labelAr: 'رخصة قيادة',
      description: 'Driver\'s license',
      typicalDuration: '2-10 years',
    },
    BUSINESS_LICENSE: {
      label: 'Business License',
      labelAr: 'رخصة تجارية',
      description: 'Commercial trading license',
      typicalDuration: '1 year (renewable)',
    },
    PROFESSIONAL_LICENSE: {
      label: 'Professional License',
      labelAr: 'رخصة مهنية',
      description: 'Professional services license',
      typicalDuration: '1 year (renewable)',
    },
    GOLDEN_VISA: {
      label: 'Golden Visa (UAE)',
      labelAr: 'التأشيرة الذهبية',
      description: 'Long-term residence (UAE)',
      typicalDuration: '5-10 years',
    },
    ELITE_VISA: {
      label: 'Elite Visa (Thailand)',
      labelAr: 'تأشيرة النخبة',
      description: 'Premium long-term visa (Thailand)',
      typicalDuration: '5-20 years',
    },
  };

  return typeMap[type] || {
    label: type,
    description: '',
  };
}
