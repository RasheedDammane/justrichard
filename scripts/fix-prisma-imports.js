/**
 * Script pour corriger automatiquement les imports Prisma manquants
 * Résout l'erreur: "Cannot read properties of undefined (reading 'findMany')"
 */

const fs = require('fs');
const path = require('path');

const ADMIN_DIR = path.join(__dirname, '../app/[locale]/admin');

function hasNoPrismaImport(content) {
  return !content.includes("from '@/lib/prisma'") && 
         !content.includes('from "@/lib/prisma"');
}

function usesPrisma(content) {
  return content.includes('prisma.') || 
         content.includes('await prisma');
}

function addPrismaImport(content) {
  // Trouver la position après les imports existants
  const lines = content.split('\n');
  let lastImportIndex = -1;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('import ') || lines[i].startsWith("import ")) {
      lastImportIndex = i;
    }
  }
  
  if (lastImportIndex === -1) {
    // Pas d'imports, ajouter au début
    return "import { prisma } from '@/lib/prisma';\n" + content;
  }
  
  // Ajouter après le dernier import
  lines.splice(lastImportIndex + 1, 0, "import { prisma } from '@/lib/prisma';");
  return lines.join('\n');
}

function fixFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Vérifier si le fichier utilise prisma mais n'a pas l'import
    if (usesPrisma(content) && hasNoPrismaImport(content)) {
      const newContent = addPrismaImport(content);
      fs.writeFileSync(filePath, newContent, 'utf8');
      return true;
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
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
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
console.log('🔧 CORRECTION DES IMPORTS PRISMA');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const filesFixed = processDirectory(ADMIN_DIR);

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📊 RÉSULTATS');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log(`✅ Fichiers corrigés: ${filesFixed}`);
console.log('\n✅ TERMINÉ!\n');
