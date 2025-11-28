#!/usr/bin/env node

/**
 * Script pour vérifier les problèmes dans les formulaires générés
 */

const fs = require('fs');
const path = require('path');

const forms = [
  { file: 'app/[locale]/admin/doctors/DoctorForm.tsx', entity: 'doctor', plural: 'doctors' },
  { file: 'app/[locale]/admin/rental-cars/RentalCarForm.tsx', entity: 'rentalCar', plural: 'rental-cars' },
  { file: 'app/[locale]/admin/legal/LegalProfessionalForm.tsx', entity: 'legalProfessional', plural: 'legal' },
  { file: 'app/[locale]/admin/yachts/YachtForm.tsx', entity: 'yacht', plural: 'yachts' },
  { file: 'app/[locale]/admin/activities/ActivityForm.tsx', entity: 'activity', plural: 'activities' },
  { file: 'app/[locale]/admin/maids/MaidForm.tsx', entity: 'maid', plural: 'maids' }
];

console.log('🔍 Vérification des formulaires...\n');

forms.forEach(({ file, entity, plural }) => {
  const filePath = path.join(__dirname, '..', file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${file} n'existe pas`);
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Vérifier l'interface
  const interfaceRegex = new RegExp(`interface \\w+FormProps[^{]*{[^}]*${entity}\\?:[^}]*}`, 's');
  const hasCorrectInterface = interfaceRegex.test(content);
  
  // Vérifier les URLs d'API
  const hasCorrectApiUrl = content.includes(`/api/admin/${plural}/`);
  
  // Vérifier l'URL de redirection
  const hasCorrectRedirect = content.includes(`/admin/${plural}`);
  
  console.log(`📄 ${path.basename(file)}`);
  console.log(`   Interface: ${hasCorrectInterface ? '✅' : '❌'}`);
  console.log(`   API URL: ${hasCorrectApiUrl ? '✅' : '❌'}`);
  console.log(`   Redirect: ${hasCorrectRedirect ? '✅' : '❌'}`);
  console.log('');
});

console.log('✨ Vérification terminée!\n');
