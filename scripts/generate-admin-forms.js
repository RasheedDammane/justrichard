#!/usr/bin/env node

/**
 * Script de génération automatique des formulaires admin
 * Basé sur le template CoachForm.tsx
 */

const fs = require('fs');
const path = require('path');

// Configuration des entités
const entities = {
  doctors: {
    name: 'Doctor',
    namePlural: 'Doctors',
    icon: '🏥',
    fields: {
      simple: ['firstName', 'lastName', 'slug', 'title', 'gender', 'dateOfBirth', 'photo', 'specialty', 'licenseNumber', 'yearsOfExperience', 'clinicName', 'clinicAddress', 'cityId', 'countryId', 'consultationFee', 'consultationDuration', 'phone', 'email', 'whatsapp', 'website', 'video'],
      arrays: ['subSpecialties', 'languages', 'certifications', 'insuranceProviders', 'workingDays', 'treatmentAreas'],
      objects: ['education', 'services', 'workingHours', 'breakTime'],
      booleans: ['acceptsInsurance', 'isVerified', 'isPremium', 'acceptsOnlineBooking', 'acceptsVideoConsult', 'isActive', 'isAcceptingPatients']
    },
    sections: [
      { title: 'Basic Information', icon: '👤', fields: ['title', 'firstName', 'lastName', 'slug', 'gender', 'dateOfBirth', 'photo', 'video'] },
      { title: 'Specialty & Experience', icon: '🩺', fields: ['specialty', 'licenseNumber', 'yearsOfExperience', 'subSpecialties'] },
      { title: 'Education', icon: '🎓', type: 'cards', field: 'education', cardFields: ['degree', 'institution', 'year'] },
      { title: 'Certifications', icon: '📜', type: 'list', field: 'certifications' },
      { title: 'Languages', icon: '🌍', type: 'checkboxes', field: 'languages', options: ['English', 'Arabic', 'French', 'Spanish', 'German', 'Chinese', 'Hindi', 'Russian'] },
      { title: 'Clinic Information', icon: '🏥', fields: ['clinicName', 'clinicAddress', 'countryId', 'cityId'] },
      { title: 'Services & Treatment', icon: '💊', type: 'cards', field: 'services', cardFields: ['name', 'price', 'duration'] },
      { title: 'Consultation & Pricing', icon: '💰', fields: ['consultationFee', 'consultationDuration', 'acceptsInsurance', 'insuranceProviders'] },
      { title: 'Schedule', icon: '⏰', fields: ['workingDays', 'workingHours', 'breakTime'] },
      { title: 'Contact', icon: '📞', fields: ['phone', 'email', 'whatsapp', 'website'] }
    ]
  },
  
  rentalCars: {
    name: 'RentalCar',
    namePlural: 'Rental Cars',
    icon: '🚗',
    fields: {
      simple: ['slug', 'name', 'brand', 'model', 'year', 'category', 'description', 'shortDescription', 'doors', 'seats', 'horsepower', 'cylinders', 'acceleration', 'topSpeed', 'fuelType', 'transmission', 'color', 'pricePerDay', 'pricePerWeek', 'pricePerMonth', 'currency', 'deposit', 'noDeposit', 'noDepositFee', 'mileagePerDay', 'extraKmFee', 'freeDelivery', 'pickupFee', 'dropoffFee', 'minAge', 'minDays', 'instantBooking', 'mainImage', 'brandLogo', 'cityId', 'countryId'],
      arrays: ['deliveryLocations', 'requiredDocuments', 'features', 'carFeatures', 'images'],
      objects: ['faq'],
      booleans: ['noDeposit', 'freeDelivery', 'instantBooking', 'isNewArrival', 'isFeatured', 'isActive', 'isAvailable']
    }
  },
  
  legalProfessionals: {
    name: 'LegalProfessional',
    namePlural: 'Legal Professionals',
    icon: '⚖️',
    fields: {
      simple: ['type', 'status', 'name', 'slug', 'shortTitle', 'headline', 'profilePictureUrl', 'coverImageUrl', 'email', 'phone', 'whatsapp', 'websiteUrl', 'linkedInUrl', 'facebookUrl', 'twitterUrl', 'addressLine1', 'addressLine2', 'city', 'postalCode', 'country', 'bio', 'yearsOfExperience', 'hourlyRateFrom', 'hourlyRateTo', 'currency', 'feeModel', 'licenseNumber', 'barAssociation', 'barAdmissionYear', 'bookingUrl', 'averageResponseTime', 'newClientsAccepted', 'featured'],
      arrays: ['languages', 'practiceAreas', 'industries', 'certifications', 'seoKeywords'],
      objects: ['services'],
      booleans: ['isBookableOnline', 'newClientsAccepted', 'featured', 'isActive']
    }
  },
  
  yachts: {
    name: 'Yacht',
    namePlural: 'Yachts',
    icon: '⛵',
    fields: {
      simple: ['slug', 'name', 'brand', 'model', 'year', 'length', 'lengthUnit', 'capacity', 'cabins', 'bathrooms', 'crew', 'pricePerHour', 'priceFor2Hours', 'priceFor3Hours', 'priceFor4Hours', 'priceFor6Hours', 'priceFor8Hours', 'pricePerDay', 'currency', 'description', 'shortDescription', 'mainImage', 'location', 'cityId', 'countryId', 'speed', 'fuelType', 'engineType', 'manufacturer', 'minBookingHours', 'cancellationPolicy'],
      arrays: ['features', 'amenities', 'included', 'notIncluded', 'images'],
      objects: ['faq'],
      booleans: ['isActive', 'isFeatured', 'isAvailable']
    }
  },
  
  activities: {
    name: 'Activity',
    namePlural: 'Activities',
    icon: '🎯',
    fields: {
      simple: ['name', 'slug', 'description', 'category', 'duration', 'minAge', 'maxGroupSize', 'difficulty', 'pricePerPerson', 'pricePerGroup', 'currency', 'cityId', 'countryId', 'meetingPoint', 'latitude', 'longitude', 'video'],
      arrays: ['included', 'notIncluded', 'whatToBring', 'availableDays', 'startTimes', 'images'],
      objects: [],
      booleans: ['isActive', 'isFeatured', 'isAvailable']
    }
  },
  
  maids: {
    name: 'Maid',
    namePlural: 'Maids',
    icon: '👩‍🔧',
    fields: {
      simple: ['name', 'slug', 'refNo', 'nationality', 'dateOfBirth', 'placeOfBirth', 'age', 'sex', 'height', 'weight', 'complexion', 'religion', 'maritalStatus', 'numberOfChildren', 'qualification', 'englishLevel', 'arabicLevel', 'passportNo', 'passportExpiry', 'passportIssuePlace', 'yearsOfExperience', 'experienceCountry', 'currentLocation', 'contractType', 'monthlyFee', 'currency', 'availableFrom', 'image', 'video', 'cv', 'cityId', 'countryId', 'phone', 'email', 'whatsapp', 'notes'],
      arrays: ['otherLanguages', 'cookingOther', 'images', 'duties'],
      objects: [],
      booleans: ['elderlyCare', 'specialNeedsCare', 'babysittingOlderThan1Year', 'babysittingYoungerThan1Year', 'cookingSyrianLebanese', 'cookingGulf', 'cookingInternational', 'privateRoom', 'liveOut', 'workingOnDayOff', 'hasCat', 'hasDog', 'isActive', 'isFeatured', 'isVerified', 'isAvailable']
    }
  }
};

console.log('🚀 Génération des formulaires admin...\n');

// Fonction pour créer un formulaire basé sur le template
function generateForm(entityKey, config) {
  const templatePath = path.join(__dirname, '../app/[locale]/admin/coaches/CoachForm.tsx');
  const outputDir = path.join(__dirname, `../app/[locale]/admin/${entityKey}`);
  const outputPath = path.join(outputDir, `${config.name}Form.tsx`);
  
  console.log(`📝 Génération de ${config.name}Form.tsx...`);
  
  // Créer le dossier si nécessaire
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Lire le template
  let template = fs.readFileSync(templatePath, 'utf8');
  
  // Remplacements basiques
  template = template.replace(/CoachForm/g, `${config.name}Form`);
  template = template.replace(/coach/g, entityKey.slice(0, -1)); // Remove 's' for singular
  template = template.replace(/Coach/g, config.name);
  template = template.replace(/coaches/g, entityKey);
  
  // Écrire le fichier
  fs.writeFileSync(outputPath, template);
  
  console.log(`✅ ${config.name}Form.tsx créé avec succès!\n`);
  
  return outputPath;
}

// Générer tous les formulaires
Object.keys(entities).forEach(entityKey => {
  const config = entities[entityKey];
  try {
    generateForm(entityKey, config);
  } catch (error) {
    console.error(`❌ Erreur lors de la génération de ${config.name}Form:`, error.message);
  }
});

console.log('\n✨ Génération terminée!\n');
console.log('📋 Formulaires générés:');
Object.keys(entities).forEach(entityKey => {
  const config = entities[entityKey];
  console.log(`   - ${config.icon} ${config.namePlural}`);
});

console.log('\n⚠️  Note: Les formulaires générés nécessitent des ajustements manuels pour:');
console.log('   1. Adapter les champs spécifiques à chaque entité');
console.log('   2. Ajuster les sections et leur organisation');
console.log('   3. Vérifier les types de données');
console.log('   4. Tester le fonctionnement\n');
