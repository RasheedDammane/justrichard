/**
 * Script Node.js pour corriger TOUS les params async
 * Résout définitivement: "Cannot read properties of undefined"
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const ADMIN_DIR = path.join(__dirname, '../app/[locale]/admin');

function fixAsyncParams(content, filePath) {
  let fixed = content;
  let changed = false;
  
  // Pattern 1: params: { locale } dans la signature
  if (fixed.match(/params:\s*{\s*locale\s*}/)) {
    fixed = fixed.replace(
      /(\w+)\(\{\s*params:\s*{\s*locale\s*}\s*\}:\s*{\s*params:\s*{\s*locale:\s*string\s*}\s*\})/g,
      '$1({ params }: { params: Promise<{ locale: string }> })'
    );
    changed = true;
  }
  
  // Pattern 2: Ajouter await params si manquant
  if (changed && !fixed.includes('await params')) {
    const lines = fixed.split('\n');
    const newLines = [];
    let foundFunction = false;
    let addedAwait = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Détecter export default async function
      if (line.includes('export default async function') || line.includes('export async function')) {
        foundFunction = true;
        newLines.push(line);
        continue;
      }
      
      // Après la signature de fonction, ajouter le await
      if (foundFunction && !addedAwait && (line.trim() === '' || line.includes('const') || line.includes('//'))) {
        if (line.trim() !== '' && !line.includes('const { locale }')) {
          newLines.push('  const { locale } = await params;');
          newLines.push('  ');
          newLines.push('  // La protection est gérée par le layout admin');
          newLines.push('');
          addedAwait = true;
        }
      }
      
      newLines.push(line);
    }
    
    fixed = newLines.join('\n');
  }
  
  return { content: fixed, changed };
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { content: newContent, changed } = fixAsyncParams(content, filePath);
    
    if (changed) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`   ❌ ${filePath}: ${error.message}`);
    return false;
  }
}

function findAllPageFiles(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      files = files.concat(findAllPageFiles(fullPath));
    } else if (entry.name === 'page.tsx') {
      files.push(fullPath);
    }
  }
  
  return files;
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔧 CORRECTION MASSIVE DES PARAMS ASYNC');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const allFiles = findAllPageFiles(ADMIN_DIR);
let fixedCount = 0;

console.log(`📁 ${allFiles.length} fichiers page.tsx trouvés\n`);

allFiles.forEach((filePath, index) => {
  const relativePath = filePath.replace(ADMIN_DIR, '');
  process.stdout.write(`[${index + 1}/${allFiles.length}] ${relativePath}... `);
  
  if (processFile(filePath)) {
    console.log('✅');
    fixedCount++;
  } else {
    console.log('⏭️ ');
  }
});

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📊 RÉSULTATS');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log(`✅ Fichiers corrigés: ${fixedCount}`);
console.log(`⏭️  Fichiers ignorés: ${allFiles.length - fixedCount}`);
console.log('\n✅ TERMINÉ!\n');

// Maintenant redémarrer le serveur
console.log('🔄 Redémarrage du serveur Next.js dans 3 secondes...\n');
setTimeout(() => {
  exec('touch app/[locale]/admin/layout.tsx', (error) => {
    if (!error) {
      console.log('✅ Serveur en cours de rechargement...\n');
    }
  });
}, 3000);
