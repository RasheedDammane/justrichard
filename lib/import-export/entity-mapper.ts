/**
 * Maps API entity types to Prisma model names
 */
export const ENTITY_MODEL_MAP: Record<string, string> = {
  'real-estate-agents': 'realEstateAgent',
  'accountants': 'accountant',
  'translators': 'translator',
  'visa-agents': 'visaAgent',
  'business-consultants': 'businessConsultant',
  'architects': 'architect',
  'photographers': 'photographer',
  'coaches': 'coach',
  'doctors': 'doctor',
  'dentists': 'dentist',
  'lawyers': 'lawyer',
  'handymen': 'handyman',
  'buildings': 'building',
  'properties': 'property',
  'services': 'service',
  'users': 'user',
  'chatbots': 'chatbot',
  'blog-posts': 'blogPost',
  'bookings': 'booking',
};

/**
 * Get Prisma model name from API entity type
 */
export function getModelName(entityType: string): string {
  return ENTITY_MODEL_MAP[entityType] || entityType;
}

/**
 * Get API entity type from Prisma model name
 */
export function getEntityType(modelName: string): string {
  const entry = Object.entries(ENTITY_MODEL_MAP).find(
    ([_, model]) => model === modelName
  );
  return entry ? entry[0] : modelName;
}

/**
 * Get default relations for an entity type
 */
export function getDefaultRelations(entityType: string): string[] {
  const relationsMap: Record<string, string[]> = {
    'real-estate-agents': ['city', 'country'],
    'accountants': ['city', 'country'],
    'translators': ['city', 'country'],
    'visa-agents': ['city', 'country'],
    'business-consultants': ['city', 'country'],
    'architects': ['city', 'country'],
    'photographers': ['city', 'country'],
    'coaches': ['city', 'country'],
    'doctors': ['city', 'country'],
    'dentists': ['city', 'country'],
    'lawyers': ['city', 'country'],
    'buildings': ['city', 'country', 'region'],
    'properties': ['building', 'city', 'country'],
    'blog-posts': ['author'],
    'bookings': ['user', 'service'],
  };
  
  return relationsMap[entityType] || [];
}

/**
 * Get searchable fields for an entity type
 */
export function getSearchFields(entityType: string): string[] {
  const searchFieldsMap: Record<string, string[]> = {
    'real-estate-agents': ['name', 'companyName', 'email'],
    'accountants': ['name', 'companyName', 'email'],
    'translators': ['name', 'email'],
    'visa-agents': ['name', 'companyName', 'email'],
    'business-consultants': ['name', 'companyName', 'email'],
    'architects': ['name', 'companyName', 'email'],
    'photographers': ['name', 'email'],
    'coaches': ['name', 'email'],
    'doctors': ['name', 'email'],
    'dentists': ['name', 'email'],
    'lawyers': ['name', 'email'],
    'buildings': ['name', 'nameAr', 'developer'],
    'properties': ['title', 'description'],
    'blog-posts': ['title', 'slug'],
    'users': ['name', 'email'],
  };
  
  return searchFieldsMap[entityType] || ['name', 'email'];
}
