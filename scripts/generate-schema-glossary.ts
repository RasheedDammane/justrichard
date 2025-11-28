import fs from 'fs';
import path from 'path';

interface Field {
  name: string;
  type: string;
  isOptional: boolean;
  isArray: boolean;
  isRelation: boolean;
  defaultValue?: string;
}

interface Model {
  name: string;
  fields: Field[];
  relations: string[];
  indexes: string[];
}

function parseSchema(schemaContent: string): Model[] {
  const models: Model[] = [];
  const modelRegex = /model\s+(\w+)\s*{([^}]+)}/g;
  
  let match;
  while ((match = modelRegex.exec(schemaContent)) !== null) {
    const modelName = match[1];
    const modelBody = match[2];
    
    const fields: Field[] = [];
    const relations: string[] = [];
    const indexes: string[] = [];
    
    // Parse fields
    const fieldLines = modelBody.split('\n').filter(line => line.trim() && !line.trim().startsWith('@@'));
    
    for (const line of fieldLines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('//')) continue;
      
      // Parse field
      const fieldMatch = trimmed.match(/^(\w+)\s+(\w+(\[\])?(\?)?)/);
      if (fieldMatch) {
        const fieldName = fieldMatch[1];
        const fieldType = fieldMatch[2];
        
        const isOptional = fieldType.includes('?');
        const isArray = fieldType.includes('[]');
        const baseType = fieldType.replace('[]', '').replace('?', '');
        
        // Check if it's a relation (starts with uppercase)
        const isRelation = /^[A-Z]/.test(baseType);
        
        // Extract default value
        let defaultValue: string | undefined;
        const defaultMatch = trimmed.match(/@default\(([^)]+)\)/);
        if (defaultMatch) {
          defaultValue = defaultMatch[1];
        }
        
        fields.push({
          name: fieldName,
          type: baseType,
          isOptional,
          isArray,
          isRelation,
          defaultValue,
        });
        
        if (isRelation) {
          relations.push(baseType);
        }
      }
    }
    
    // Parse indexes
    const indexMatches = modelBody.matchAll(/@@index\(\[([^\]]+)\]\)/g);
    for (const indexMatch of indexMatches) {
      indexes.push(indexMatch[1]);
    }
    
    models.push({
      name: modelName,
      fields,
      relations,
      indexes,
    });
  }
  
  return models;
}

function generateGlossary(models: Model[]): string {
  let output = '# 📚 GLOSSAIRE RÉFÉRENTIEL - PRISMA SCHEMA\n\n';
  output += '**Date de génération** : ' + new Date().toLocaleString('fr-FR') + '\n';
  output += '**Base de données** : PostgreSQL (justrichard_preprod)\n\n';
  output += '---\n\n';
  
  // Table of contents
  output += '## 📋 Table des Matières\n\n';
  models.forEach((model, index) => {
    output += `${index + 1}. [${model.name}](#${model.name.toLowerCase()})\n`;
  });
  output += '\n---\n\n';
  
  // Summary statistics
  output += '## 📊 Statistiques\n\n';
  output += `- **Total modèles** : ${models.length}\n`;
  output += `- **Total champs** : ${models.reduce((sum, m) => sum + m.fields.length, 0)}\n`;
  output += `- **Total relations** : ${models.reduce((sum, m) => sum + m.relations.length, 0)}\n`;
  output += '\n---\n\n';
  
  // Naming conventions
  output += '## 🎯 Conventions de Nommage\n\n';
  output += '### Modèles (Tables)\n';
  output += '- **Format** : PascalCase\n';
  output += '- **Exemples** : `User`, `BlogPost`, `NavbarLink`\n\n';
  
  output += '### Champs\n';
  output += '- **Format** : camelCase\n';
  output += '- **Exemples** : `userId`, `createdAt`, `isActive`\n\n';
  
  output += '### Relations\n';
  output += '- **Format** : PascalCase (même que le modèle cible)\n';
  output += '- **Exemples** : `User`, `Category`, `BlogPost`\n\n';
  
  output += '### Enums\n';
  output += '- **Format** : PascalCase\n';
  output += '- **Valeurs** : SCREAMING_SNAKE_CASE\n';
  output += '- **Exemples** : `UserRole.ADMIN`, `BookingStatus.CONFIRMED`\n\n';
  
  output += '---\n\n';
  
  // Models details
  output += '## 📦 Modèles Détaillés\n\n';
  
  models.forEach(model => {
    output += `### ${model.name}\n\n`;
    
    // Table name
    output += `**Table PostgreSQL** : \`"${model.name}"\`\n\n`;
    
    // Fields table
    output += '#### Champs\n\n';
    output += '| Nom | Type | Optionnel | Défaut | Description |\n';
    output += '|-----|------|-----------|--------|-------------|\n';
    
    model.fields.filter(f => !f.isRelation).forEach(field => {
      const optional = field.isOptional ? '✓' : '✗';
      const defaultVal = field.defaultValue || '-';
      output += `| \`${field.name}\` | \`${field.type}${field.isArray ? '[]' : ''}\` | ${optional} | \`${defaultVal}\` | |\n`;
    });
    
    output += '\n';
    
    // Relations
    if (model.relations.length > 0) {
      output += '#### Relations\n\n';
      model.relations.forEach(rel => {
        output += `- \`${rel}\`\n`;
      });
      output += '\n';
    }
    
    // Indexes
    if (model.indexes.length > 0) {
      output += '#### Index\n\n';
      model.indexes.forEach(idx => {
        output += `- \`${idx}\`\n`;
      });
      output += '\n';
    }
    
    // Usage in code
    output += '#### Utilisation dans le Code\n\n';
    output += '```typescript\n';
    output += `// Prisma Client\n`;
    output += `const ${model.name.charAt(0).toLowerCase() + model.name.slice(1)} = await prisma.${model.name.charAt(0).toLowerCase() + model.name.slice(1)}.findMany();\n\n`;
    output += `// TypeScript Type\n`;
    output += `import { ${model.name} } from '@prisma/client';\n`;
    output += '```\n\n';
    
    output += '---\n\n';
  });
  
  return output;
}

function generateQuickReference(models: Model[]): string {
  let output = '# 🔍 RÉFÉRENCE RAPIDE - NOMS PRISMA\n\n';
  output += '**Pour copier-coller dans votre code**\n\n';
  output += '---\n\n';
  
  output += '## Modèles (PascalCase)\n\n';
  output += '```typescript\n';
  models.forEach(model => {
    output += `${model.name}\n`;
  });
  output += '```\n\n';
  
  output += '## Prisma Client (camelCase)\n\n';
  output += '```typescript\n';
  models.forEach(model => {
    const camelCase = model.name.charAt(0).toLowerCase() + model.name.slice(1);
    output += `prisma.${camelCase}\n`;
  });
  output += '```\n\n';
  
  output += '## Champs Communs\n\n';
  const commonFields = new Map<string, number>();
  models.forEach(model => {
    model.fields.forEach(field => {
      if (!field.isRelation) {
        commonFields.set(field.name, (commonFields.get(field.name) || 0) + 1);
      }
    });
  });
  
  const sortedFields = Array.from(commonFields.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);
  
  output += '```typescript\n';
  sortedFields.forEach(([field, count]) => {
    output += `${field} // utilisé dans ${count} modèles\n`;
  });
  output += '```\n\n';
  
  return output;
}

// Main execution
const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
const schemaContent = fs.readFileSync(schemaPath, 'utf-8');

const models = parseSchema(schemaContent);

// Generate glossary
const glossary = generateGlossary(models);
const glossaryPath = path.join(process.cwd(), 'docs', 'GLOSSAIRE_PRISMA.md');
fs.mkdirSync(path.dirname(glossaryPath), { recursive: true });
fs.writeFileSync(glossaryPath, glossary);

console.log('✅ Glossaire généré:', glossaryPath);

// Generate quick reference
const quickRef = generateQuickReference(models);
const quickRefPath = path.join(process.cwd(), 'docs', 'REFERENCE_RAPIDE_PRISMA.md');
fs.writeFileSync(quickRefPath, quickRef);

console.log('✅ Référence rapide générée:', quickRefPath);

console.log('\n📊 Statistiques:');
console.log(`   - ${models.length} modèles`);
console.log(`   - ${models.reduce((sum, m) => sum + m.fields.length, 0)} champs`);
console.log(`   - ${models.reduce((sum, m) => sum + m.relations.length, 0)} relations`);
