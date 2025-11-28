/**
 * Script pour simplifier toutes les pages admin
 * Retire les vérifications de session individuelles
 * Le layout admin gère déjà l'authentification
 */

const fs = require('fs');
const path = require('path');

const ADMIN_DIR = path.join(__dirname, '../app/[locale]/admin');

// Pattern à rechercher et remplacer
const patterns = [
  {
    // Imports à retirer
    remove: [
      /import\s+{\s*getServerSession\s*}\s+from\s+['"]next-auth['"];?\s*/g,
      /import\s+{\s*authOptions\s*}\s+from\s+['"]@\/lib\/auth['"];?\s*/g,
      /import\s+{\s*redirect\s*}\s+from\s+['"]next\/navigation['"];?\s*/g,
      /import\s+AdminLayout\s+from\s+['"]@\/components\/admin\/AdminLayout['"];?\s*/g,
    ],
    // Code de vérification session à retirer
    sessionCheck: /const\s+session\s*=\s*await\s+getServerSession\(authOptions\);?\s*\n\s*if\s*\(!session.*?\)\s*{\s*redirect\([^)]+\);?\s*}/gs,
    // Wrapper AdminLayout à retirer
    adminLayoutWrapper: /<AdminLayout[^>]*>|<\/AdminLayout>/g,
  }
];

let filesProcessed = 0;
let filesModified = 0;
let errors = [];

function shouldProcessFile(filePath) {
  // Ne pas traiter layout.tsx et page.tsx (dashboard principal)
  const fileName = path.basename(filePath);
  const dirName = path.basename(path.dirname(filePath));
  
  if (fileName === 'layout.tsx') return false;
  if (dirName === 'admin' && fileName === 'page.tsx') return false;
  if (fileName.includes('Client')) return false;
  if (fileName.includes('Form')) return false;
  
  return fileName.endsWith('.tsx') || fileName.endsWith('.ts');
}

function simplifyPage(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Vérifier si le fichier contient des vérifications de session
    if (!content.includes('getServerSession') && !content.includes('authOptions')) {
      return false; // Déjà simplifié ou pas concerné
    }
    
    console.log(`\n📝 Traitement: ${filePath.replace(ADMIN_DIR, '')}`);
    
    // 1. Retirer les imports inutiles
    patterns[0].remove.forEach(regex => {
      if (content.match(regex)) {
        console.log('   ❌ Retire import:', regex.source.substring(0, 30) + '...');
        content = content.replace(regex, '');
      }
    });
    
    // 2. Retirer la vérification de session
    const sessionCheckMatch = content.match(patterns[0].sessionCheck);
    if (sessionCheckMatch) {
      console.log('   ❌ Retire vérification session');
      content = content.replace(patterns[0].sessionCheck, '');
    }
    
    // 3. Retirer le wrapper AdminLayout si présent
    if (content.match(patterns[0].adminLayoutWrapper)) {
      console.log('   ❌ Retire wrapper AdminLayout');
      content = content.replace(patterns[0].adminLayoutWrapper, '');
    }
    
    // 4. Nettoyer les lignes vides multiples
    content = content.replace(/\n\n\n+/g, '\n\n');
    
    // 5. Ajouter un commentaire explicatif si la fonction contient encore du code
    if (content.includes('export default async function')) {
      const hasComment = content.includes('// La protection est gérée par le layout admin');
      if (!hasComment && content.includes('const { locale }')) {
        content = content.replace(
          /(const { locale } = await params;)/,
          '$1\n  \n  // La protection est gérée par le layout admin'
        );
      }
    }
    
    // Vérifier si le contenu a changé
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('   ✅ Fichier simplifié!');
      return true;
    }
    
    return false;
  } catch (error) {
    errors.push({ file: filePath, error: error.message });
    console.error(`   ❌ Erreur:`, error.message);
    return false;
  }
}

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile() && shouldProcessFile(fullPath)) {
      filesProcessed++;
      if (simplifyPage(fullPath)) {
        filesModified++;
      }
    }
  }
}

// Exécution
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔧 SIMPLIFICATION DES PAGES ADMIN');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');
console.log('📁 Dossier:', ADMIN_DIR);
console.log('');

processDirectory(ADMIN_DIR);

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📊 RÉSULTATS');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');
console.log(`📝 Fichiers traités: ${filesProcessed}`);
console.log(`✅ Fichiers modifiés: ${filesModified}`);
console.log(`⏭️  Fichiers ignorés: ${filesProcessed - filesModified}`);

if (errors.length > 0) {
  console.log(`\n❌ Erreurs: ${errors.length}`);
  errors.forEach(e => {
    console.log(`   - ${e.file}: ${e.error}`);
  });
}

console.log('\n✅ Simplification terminée!');
console.log('');
console.log('🎯 Avantages:');
console.log('   • Une seule vérification au layout');
console.log('   • Session persiste pour TOUS les utilisateurs');
console.log('   • ADMIN, PROVIDER, USER restent connectés');
console.log('   • Plus de problèmes de reconnexion');
console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
