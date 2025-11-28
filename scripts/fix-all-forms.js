#!/usr/bin/env node

/**
 * Script pour corriger automatiquement tous les formulaires
 */

const fs = require('fs');
const path = require('path');

const fixes = [
  {
    file: 'app/[locale]/admin/doctors/DoctorForm.tsx',
    entity: 'doctor',
    plural: 'doctors',
    wrongApiUrl: '/api/admin/doctores',
    correctApiUrl: '/api/admin/doctors'
  },
  {
    file: 'app/[locale]/admin/yachts/YachtForm.tsx',
    entity: 'yacht',
    plural: 'yachts',
    wrongApiUrl: '/api/admin/yachtes',
    correctApiUrl: '/api/admin/yachts'
  },
  {
    file: 'app/[locale]/admin/maids/MaidForm.tsx',
    entity: 'maid',
    plural: 'maids',
    wrongApiUrl: '/api/admin/maides',
    correctApiUrl: '/api/admin/maids'
  },
  {
    file: 'app/[locale]/admin/legal/LegalProfessionalForm.tsx',
    entity: 'legalProfessional',
    plural: 'legal',
    wrongApiUrl: '/api/admin/legalProfessionales',
    correctApiUrl: '/api/admin/legal'
  }
];

console.log('🔧 Correction automatique des formulaires...\n');

fixes.forEach(({ file, entity, plural, wrongApiUrl, correctApiUrl }) => {
  const filePath = path.join(__dirname, '..', file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${file} n'existe pas, ignoré`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Corriger les URLs d'API
  if (content.includes(wrongApiUrl)) {
    content = content.replace(new RegExp(wrongApiUrl, 'g'), correctApiUrl);
    modified = true;
    console.log(`✅ ${path.basename(file)}: API URL corrigée`);
  }
  
  // Corriger les URLs de redirection
  const wrongRedirect = `/admin/${entity}es`;
  const correctRedirect = `/admin/${plural}`;
  if (content.includes(wrongRedirect)) {
    content = content.replace(new RegExp(wrongRedirect, 'g'), correctRedirect);
    modified = true;
    console.log(`✅ ${path.basename(file)}: Redirect URL corrigée`);
  }
  
  // Sauvegarder si modifié
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`💾 ${path.basename(file)}: Fichier sauvegardé\n`);
  } else {
    console.log(`ℹ️  ${path.basename(file)}: Aucune correction nécessaire\n`);
  }
});

console.log('✨ Correction terminée!\n');
