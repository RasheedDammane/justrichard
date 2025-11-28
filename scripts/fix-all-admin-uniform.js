#!/usr/bin/env node
/**
 * Script pour corriger UNIFORMÉMENT toutes les pages admin
 * Résout définitivement tous les problèmes de params async
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ADMIN_DIR = path.join(__dirname, '../app/[locale]/admin');

// Pattern à détecter et corriger
function needsFix(content) {
  return (
    content.includes('params: { locale }') ||
    (content.includes('export default async function') && 
     content.includes('params') && 
     !content.includes('await params'))
  );
}

// Correction uniforme
function applyUniformFix(content, filename) {
  let fixed = content;
  
  // Fix 1: params: { locale } dans la signature
  fixed = fixed.replace(
    /\{\s*params:\s*{\s*locale\s*}\s*\}:\s*{\s*params:\s*{\s*locale:\s*string\s*}\s*}/g,
    '{ params }: { params: Promise<{ locale: string }> }'
  );
  
  // Fix 2: params }: { params: { locale
  fixed = fixed.replace(
    /params\s*}:\s*{\s*params:\s*{\s*locale:\s*string\s*}/g,
    'params }: { params: Promise<{ locale: string }>'
  );
  
  // Fix 3: Ajouter await params si manquant
  if (!fixed.includes('await params') && fixed.includes('export default async function')) {
    const lines = fixed.split('\n');
    const newLines = [];
    let foundExport = false;
    let addedAwait = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      newLines.push(line);
      
      // Trouver la ligne export default async function
      if (line.includes('export default async function') || line.includes('export async function')) {
        foundExport = true;
        continue;
      }
      
      // Ajouter await params après la signature
      if (foundExport && !addedAwait) {
        // Chercher la première ligne vide ou ligne de code après la fonction
        if (line.trim() === '' || line.trim().startsWith('const') || line.trim().startsWith('//')) {
          newLines.pop(); // Retirer la ligne qu'on vient d'ajouter
          newLines.push('  const { locale } = await params;');
          newLines.push('  ');
          newLines.push('  // La protection est gérée par le layout admin');
          newLines.push('');
          if (line.trim() !== '') {
            newLines.push(line);
          }
          addedAwait = true;
          foundExport = false;
        }
      }
    }
    
    fixed = newLines.join('\n');
  }
  
  return fixed;
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    if (needsFix(content)) {
      const fixed = applyUniformFix(content, path.basename(filePath));
      
      if (fixed !== content) {
        fs.writeFileSync(filePath, fixed, 'utf8');
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error(`   ❌ ${filePath}: ${error.message}`);
    return false;
  }
}

function findAllFiles(dir, pattern = 'page.tsx') {
  let results = [];
  
  try {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        results = results.concat(findAllFiles(filePath, pattern));
      } else if (file === pattern) {
        results.push(filePath);
      }
    }
  } catch (error) {
    // Ignore errors
  }
  
  return results;
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔧 CORRECTION UNIFORME DE TOUTES LES PAGES ADMIN');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const allPageFiles = findAllFiles(ADMIN_DIR);
console.log(`📁 ${allPageFiles.length} fichiers page.tsx trouvés\n`);

let fixedCount = 0;
const fixedFiles = [];

allPageFiles.forEach((filePath, index) => {
  const relativePath = filePath.replace(ADMIN_DIR, '').replace(/^\//, '');
  process.stdout.write(`[${(index + 1).toString().padStart(2)}/${allPageFiles.length}] ${relativePath.padEnd(40)}... `);
  
  if (processFile(filePath)) {
    console.log('✅ FIXÉ');
    fixedCount++;
    fixedFiles.push(relativePath);
  } else {
    console.log('⏭️  OK');
  }
});

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📊 RÉSULTATS');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log(`✅ Fichiers corrigés: ${fixedCount}`);
console.log(`⏭️  Fichiers OK: ${allPageFiles.length - fixedCount}`);
console.log(`📊 Total: ${allPageFiles.length}\n`);

if (fixedCount > 0) {
  console.log('📝 Fichiers modifiés:');
  fixedFiles.forEach(file => console.log(`   • ${file}`));
  console.log('');
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ CORRECTION UNIFORME TERMINÉE!');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('🔄 Redémarrage du serveur Next.js...\n');
try {
  execSync('touch app/[locale]/admin/layout.tsx');
  console.log('✅ Serveur en cours de rechargement...\n');
} catch (error) {
  console.log('⚠️  Redémarrez manuellement le serveur\n');
}

console.log('🧪 TESTEZ MAINTENANT TOUTES LES URLs!\n');
