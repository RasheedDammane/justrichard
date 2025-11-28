const fs = require('fs');
const path = require('path');

const files = [
  'app/[locale]/admin/transfers/page.tsx',
  'app/[locale]/admin/activities/page.tsx',
  'app/[locale]/admin/suppliers/page.tsx',
];

files.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${file} n'existe pas`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remplacer la requête where avec OR
  content = content.replace(
    /where: \{\s*OR: \[\s*\{ type: \{ contains: '[^']+', mode: 'insensitive' \} \},\s*\{ type: \{ contains: '[^']+', mode: 'insensitive' \} \},\s*\{ type: \{ contains: '[^']+', mode: 'insensitive' \} \},?\s*\],\s*\},/gs,
    'where: {\n      isActive: true,\n    },'
  );
  
  // Supprimer Appointment du _count
  content = content.replace(/Appointment: true,\s*/g, '');
  
  // Remplacer item.type par item.email
  content = content.replace(/{item\.type}/g, '{item.email}');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ ${file} corrigé`);
});

console.log('🎉 Correction terminée!');
