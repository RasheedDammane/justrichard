const fs = require('fs');
const path = require('path');

// Configuration des formulaires à générer
const forms = {
  yacht: {
    model: 'Yacht',
    tabs: [
      { id: 'basic', label: 'Informations', icon: 'Ship', fields: ['name', 'slug', 'brand', 'model', 'year', 'manufacturer', 'countryId', 'cityId', 'location'] },
      { id: 'specs', label: 'Spécifications', icon: 'Settings', fields: ['length', 'lengthUnit', 'capacity', 'cabins', 'bathrooms', 'crew', 'speed', 'fuelType', 'engineType'] },
      { id: 'pricing', label: 'Tarification', icon: 'DollarSign', fields: ['currency', 'minBookingHours', 'pricePerHour', 'priceFor2Hours', 'priceFor3Hours', 'priceFor4Hours', 'priceFor6Hours', 'priceFor8Hours', 'pricePerDay'] },
      { id: 'description', label: 'Description', icon: 'FileText', fields: ['shortDescription', 'description', 'cancellationPolicy'] },
      { id: 'features', label: 'Équipements', icon: 'Tag', fields: ['features', 'amenities', 'included', 'notIncluded'] },
      { id: 'images', label: 'Images & SEO', icon: 'Image', fields: ['mainImage', 'images', 'metaTitle', 'metaDescription'] },
    ]
  },
  rentalCar: {
    model: 'RentalCar',
    tabs: [
      { id: 'basic', label: 'Informations', icon: 'Car', fields: ['name', 'slug', 'brand', 'model', 'year', 'category', 'color', 'countryId', 'cityId'] },
      { id: 'specs', label: 'Spécifications', icon: 'Settings', fields: ['doors', 'seats', 'horsepower', 'cylinders', 'acceleration', 'topSpeed', 'fuelType', 'transmission'] },
      { id: 'pricing', label: 'Tarification', icon: 'DollarSign', fields: ['currency', 'pricePerDay', 'pricePerWeek', 'pricePerMonth', 'deposit', 'noDeposit', 'noDepositFee'] },
      { id: 'mileage', label: 'Kilométrage', icon: 'Gauge', fields: ['mileagePerDay', 'mileagePerWeek', 'mileagePerMonth', 'extraKmFee'] },
      { id: 'delivery', label: 'Livraison', icon: 'Truck', fields: ['freeDelivery', 'pickupFee', 'dropoffFee', 'deliveryLocations'] },
      { id: 'requirements', label: 'Conditions', icon: 'FileCheck', fields: ['minAge', 'minDays', 'requiredDocuments', 'instantBooking'] },
      { id: 'features', label: 'Équipements', icon: 'Tag', fields: ['features', 'carFeatures'] },
      { id: 'description', label: 'Description', icon: 'FileText', fields: ['shortDescription', 'description', 'faq'] },
      { id: 'images', label: 'Images & SEO', icon: 'Image', fields: ['mainImage', 'images', 'brandLogo', 'metaTitle', 'metaDescription'] },
    ]
  },
  motorbike: {
    model: 'RentalMotorbike',
    tabs: [
      { id: 'basic', label: 'Informations', icon: 'Bike', fields: ['brand', 'model', 'year', 'category', 'slug', 'countryId', 'cityId'] },
      { id: 'specs', label: 'Spécifications', icon: 'Settings', fields: ['seats', 'transmission', 'fuelType', 'engineSize'] },
      { id: 'pricing', label: 'Tarification', icon: 'DollarSign', fields: ['currency', 'pricePerDay', 'pricePerWeek', 'pricePerMonth'] },
      { id: 'description', label: 'Description', icon: 'FileText', fields: ['description'] },
      { id: 'features', label: 'Équipements', icon: 'Tag', fields: ['features'] },
      { id: 'images', label: 'Images', icon: 'Image', fields: ['images'] },
    ]
  },
  maid: {
    model: 'Maid',
    tabs: [
      { id: 'personal', label: 'Informations personnelles', icon: 'User', fields: ['name', 'slug', 'refNo', 'nationality', 'dateOfBirth', 'age', 'sex', 'height', 'weight', 'complexion', 'religion', 'maritalStatus', 'numberOfChildren'] },
      { id: 'documents', label: 'Documents', icon: 'FileText', fields: ['passportNo', 'passportExpiry', 'passportIssuePlace', 'qualification'] },
      { id: 'languages', label: 'Langues', icon: 'Languages', fields: ['englishLevel', 'arabicLevel', 'otherLanguages'] },
      { id: 'experience', label: 'Expérience', icon: 'Briefcase', fields: ['yearsOfExperience', 'experienceCountry', 'currentLocation', 'duties'] },
      { id: 'skills', label: 'Compétences', icon: 'Award', fields: ['elderlyCare', 'specialNeedsCare', 'babysittingOlderThan1Year', 'babysittingYoungerThan1Year', 'cookingSyrianLebanese', 'cookingGulf', 'cookingInternational', 'cookingOther'] },
      { id: 'contract', label: 'Contrat', icon: 'FileSignature', fields: ['contractType', 'monthlyFee', 'currency', 'availableFrom', 'privateRoom', 'liveOut', 'workingOnDayOff', 'hasCat', 'hasDog'] },
      { id: 'location', label: 'Localisation', icon: 'MapPin', fields: ['countryId', 'cityId', 'latitude', 'longitude'] },
      { id: 'contact', label: 'Contact', icon: 'Phone', fields: ['phone', 'email', 'whatsapp', 'notes'] },
      { id: 'media', label: 'Médias & SEO', icon: 'Image', fields: ['image', 'images', 'video', 'cv', 'metaTitle', 'metaDescription'] },
    ]
  }
};

console.log('📋 Formulaires à générer:');
console.log('1. Yacht - 6 onglets');
console.log('2. RentalCar - 9 onglets');
console.log('3. Motorbike - 6 onglets');
console.log('4. Maid - 9 onglets');
console.log('\n✅ Configuration prête!');
console.log('\nPour générer les formulaires, utilisez les templates individuels.');
