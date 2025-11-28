/**
 * Script pour corriger les params async dans toutes les pages admin
 * Résout: "Cannot read properties of undefined"
 */

const fs = require('fs');
const path = require('path');

const ADMIN_DIR = path.join(__dirname, '../app/[locale]/admin');

function needsParamsFix(content) {
  // Chercher les patterns problématiques
  return (
    content.includes('params: { locale }') ||
    content.includes('params }: { params: { locale') ||
    (content.includes('params') && !content.includes('await params') && content.includes('const { locale }'))
  );
}

function fixParams(content) {
  let fixed = content;
  
  // Pattern 1: params: { locale } => params: Promise<{ locale }>
  fixed = fixed.replace(
    /params:\s*{\s*locale\s*}\s*}:\s*{\s*params:\s*{\s*locale:\s*string\s*}/g,
    'params }: { params: Promise<{ locale: string }>'
  );
  
  // Pattern 2: Ajouter await params si manquant
  if (fixed.includes('{ params }') && !fixed.includes('await params')) {
    const lines = fixed.split('\n');
    const newLines = [];
    let inFunction = false;
    let addedAwait = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      newLines.push(line);
      
      // Détecter le début de la fonction
      if (line.includes('export default async function') || line.includes('export async function')) {
        inFunction = true;
      }
      
      // Si on est dans la fonction et qu'on n'a pas encore ajouté le await
      if (inFunction && !addedAwait && (line.includes('const { locale }') || line.includes('const locale'))) {
        // Remplacer ou ajouter
        const lastLine = newLines.pop();
        newLines.push('  const { locale } = await params;');
        newLines.push('  ');
        newLines.push('  // La protection est gérée par le layout admin');
        addedAwait = true;
      }
    }
    
    fixed = newLines.join('\n');
  }
  
  return fixed;
}

function fixFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    if (needsParamsFix(content)) {
      const newContent = fixParams(content);
      
      if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error(`   ❌ Erreur: ${error.message}`);
    return false;
  }
}

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let filesFixed = 0;
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      filesFixed += processDirectory(fullPath);
    } else if (entry.isFile() && entry.name === 'page.tsx') {
      const relativePath = fullPath.replace(ADMIN_DIR, '');
      process.stdout.write(`📝 ${relativePath}... `);
      
      if (fixFile(fullPath)) {
        console.log('✅ Fixed');
        filesFixed++;
      } else {
        console.log('⏭️  Skip');
      }
    }
  }
  
  return filesFixed;
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔧 CORRECTION DES PARAMS ASYNC');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const filesFixed = processDirectory(ADMIN_DIR);

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📊 RÉSULTATS');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log(`✅ Fichiers corrigés: ${filesFixed}`);
console.log('\n✅ TERMINÉ!\n');
