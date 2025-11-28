#!/usr/bin/env node

/**
 * Script pour corriger les URLs d'édition dans tous les fichiers Actions
 * Remplace /admin/entity/${id} par /admin/entity/edit/${id}
 */

const fs = require('fs');
const path = require('path');

const entities = [
  { dir: 'doctors', file: 'DoctorActions.tsx', entity: 'doctor' },
  { dir: 'legal', file: 'LegalActions.tsx', entity: 'legalProfessional' },
  { dir: 'yachts', file: 'YachtActions.tsx', entity: 'yacht' },
  { dir: 'activities', file: 'ActivityActions.tsx', entity: 'activity' },
  { dir: 'maids', file: 'MaidActions.tsx', entity: 'maid' }
];

console.log('🔧 Correction des URLs d\'édition...\n');

entities.forEach(({ dir, file, entity }) => {
  const filePath = path.join(__dirname, `../app/[locale]/admin/${dir}/${file}`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${file} n'existe pas, création en cours...`);
    // On va le créer basé sur le template RentalCarActions
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remplacer l'URL d'édition
  const oldPattern = new RegExp(`href={\`/\\$\\{locale\\}/admin/${dir}/\\$\\{${entity}\\.id\\}\`}`, 'g');
  const newPattern = `href={\`/\${locale}/admin/${dir}/edit/\${${entity}.id}\`}`;
  
  if (content.match(oldPattern)) {
    content = content.replace(oldPattern, newPattern);
    fs.writeFileSync(filePath, content);
    console.log(`✅ ${file} corrigé`);
  } else {
    console.log(`ℹ️  ${file} déjà correct ou pattern non trouvé`);
  }
});

console.log('\n✨ Correction terminée!\n');
