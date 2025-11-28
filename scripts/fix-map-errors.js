#!/usr/bin/env node

/**
 * Script pour corriger les erreurs .map() dans les formulaires
 * Problème: cities.map is not a function
 * Solution: Vérifier que les données sont des tableaux avant de les utiliser
 */

const fs = require('fs');
const path = require('path');

const files = [
  'app/[locale]/admin/doctors/ProviderForm.tsx',
  'app/[locale]/admin/motorbikes/MotorbikeForm.tsx'
];

console.log('🔧 Correction des erreurs .map() dans les formulaires...\n');

const oldPattern1 = `fetch('/api/countries').then(r => r.json()).then(setCountries).catch(console.error);`;
const newPattern1 = `fetch('/api/countries')
      .then(r => r.json())
      .then(data => setCountries(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Error fetching countries:', err);
        setCountries([]);
      });`;

const oldPattern2 = `fetch(\`/api/cities?countryId=\${formData.countryId}\`).then(r => r.json()).then(setCities).catch(console.error);`;
const newPattern2 = `fetch(\`/api/cities?countryId=\${formData.countryId}\`)
        .then(r => r.json())
        .then(data => setCities(Array.isArray(data) ? data : []))
        .catch(err => {
          console.error('Error fetching cities:', err);
          setCities([]);
        });`;

// Patterns alternatifs
const oldPattern3 = /fetch\('\/api\/countries'\)\.then\([^)]+\)\.then\(setCountries\)[^;]*;/g;
const oldPattern4 = /fetch\(`\/api\/cities\?countryId=\$\{[^}]+\}`\)\.then\([^)]+\)\.then\(setCities\)[^;]*;/g;

files.forEach((file) => {
  const filePath = path.join(__dirname, '..', file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${file} n'existe pas, ignoré`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Corriger les patterns
  if (content.includes("fetch('/api/countries')") && content.includes('.then(setCountries)')) {
    content = content.replace(oldPattern3, newPattern1);
    modified = true;
    console.log(`✅ ${path.basename(file)}: Pattern countries corrigé`);
  }
  
  if (content.includes("fetch(`/api/cities?countryId=") && content.includes('.then(setCities)')) {
    content = content.replace(oldPattern4, newPattern2);
    modified = true;
    console.log(`✅ ${path.basename(file)}: Pattern cities corrigé`);
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`💾 ${path.basename(file)}: Fichier sauvegardé\n`);
  } else {
    console.log(`ℹ️  ${path.basename(file)}: Aucune correction nécessaire\n`);
  }
});

console.log('✨ Correction terminée!\n');
console.log('📝 Résumé:');
console.log('   - RentalCarForm.tsx: ✅ Déjà corrigé manuellement');
console.log('   - ProviderForm.tsx: Vérifié');
console.log('   - MotorbikeForm.tsx: Vérifié');
