import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

interface ValidationError {
  file: string;
  line: number;
  error: string;
  suggestion: string;
}

const errors: ValidationError[] = [];

// Extract model names from schema
function getModelNames(schemaPath: string): string[] {
  const content = fs.readFileSync(schemaPath, 'utf-8');
  const modelRegex = /model\s+(\w+)\s*{/g;
  const models: string[] = [];
  let match;
  
  while ((match = modelRegex.exec(content)) !== null) {
    models.push(match[1]);
  }
  
  return models;
}

// Check if string is PascalCase
function isPascalCase(str: string): boolean {
  return /^[A-Z][a-zA-Z0-9]*$/.test(str);
}

// Check if string is camelCase
function isCamelCase(str: string): boolean {
  return /^[a-z][a-zA-Z0-9]*$/.test(str);
}

// Convert PascalCase to camelCase
function toCamelCase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

// Validate TypeScript files
async function validateTypeScriptFiles(models: string[]) {
  const files = await glob('**/*.{ts,tsx}', {
    cwd: process.cwd(),
    ignore: ['node_modules/**', '.next/**', 'dist/**', 'scripts/**'],
  });
  
  for (const file of files) {
    const filePath = path.join(process.cwd(), file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      // Check for incorrect Prisma Client usage (PascalCase instead of camelCase)
      models.forEach(model => {
        const incorrectPattern = new RegExp(`prisma\\.${model}\\.(findMany|findUnique|findFirst|create|update|delete|upsert|count)`, 'g');
        if (incorrectPattern.test(line)) {
          errors.push({
            file,
            line: index + 1,
            error: `Utilisation incorrecte: prisma.${model}`,
            suggestion: `Utiliser: prisma.${toCamelCase(model)}`,
          });
        }
      });
      
      // Check for SQL queries without quotes
      if (line.includes('FROM') || line.includes('JOIN')) {
        models.forEach(model => {
          const unquotedPattern = new RegExp(`(FROM|JOIN)\\s+${model}(?!["])`, 'i');
          if (unquotedPattern.test(line)) {
            errors.push({
              file,
              line: index + 1,
              error: `Table SQL sans guillemets: ${model}`,
              suggestion: `Utiliser: "${model}"`,
            });
          }
        });
      }
      
      // Check for snake_case in Prisma queries
      const snakeCasePattern = /prisma\.\w+\.(findMany|findUnique|create|update).*\{[^}]*\b\w+_\w+\b/;
      if (snakeCasePattern.test(line)) {
        errors.push({
          file,
          line: index + 1,
          error: 'Utilisation de snake_case dans une requête Prisma',
          suggestion: 'Utiliser camelCase pour les champs',
        });
      }
    });
  }
}

// Validate Prisma schema
function validatePrismaSchema(schemaPath: string) {
  const content = fs.readFileSync(schemaPath, 'utf-8');
  const lines = content.split('\n');
  
  let currentModel = '';
  let inModel = false;
  
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    // Check model name
    const modelMatch = trimmed.match(/^model\s+(\w+)/);
    if (modelMatch) {
      currentModel = modelMatch[1];
      inModel = true;
      
      if (!isPascalCase(currentModel)) {
        errors.push({
          file: 'schema.prisma',
          line: index + 1,
          error: `Nom de modèle incorrect: ${currentModel}`,
          suggestion: 'Utiliser PascalCase',
        });
      }
    }
    
    // Check field names
    if (inModel && trimmed && !trimmed.startsWith('//') && !trimmed.startsWith('@@') && !trimmed.startsWith('}')) {
      const fieldMatch = trimmed.match(/^(\w+)\s+/);
      if (fieldMatch) {
        const fieldName = fieldMatch[1];
        
        // Skip if it's a relation (PascalCase is correct)
        const typeMatch = trimmed.match(/^\w+\s+(\w+)/);
        const fieldType = typeMatch ? typeMatch[1].replace('?', '').replace('[]', '') : '';
        const isRelation = isPascalCase(fieldType);
        
        if (!isRelation && !isCamelCase(fieldName) && fieldName !== 'id') {
          errors.push({
            file: 'schema.prisma',
            line: index + 1,
            error: `Nom de champ incorrect: ${fieldName} dans ${currentModel}`,
            suggestion: 'Utiliser camelCase',
          });
        }
      }
    }
    
    if (trimmed === '}') {
      inModel = false;
    }
  });
}

// Main execution
async function main() {
  console.log('🔍 Validation des conventions de nommage...\n');
  
  const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
  
  // Get model names
  const models = getModelNames(schemaPath);
  console.log(`📊 ${models.length} modèles trouvés\n`);
  
  // Validate Prisma schema
  console.log('🔎 Validation du schéma Prisma...');
  validatePrismaSchema(schemaPath);
  
  // Validate TypeScript files
  console.log('🔎 Validation des fichiers TypeScript...');
  await validateTypeScriptFiles(models);
  
  // Display results
  console.log('\n' + '='.repeat(80));
  
  if (errors.length === 0) {
    console.log('\n✅ AUCUNE ERREUR DÉTECTÉE !');
    console.log('\n🎉 Toutes les conventions de nommage sont respectées.\n');
  } else {
    console.log(`\n⚠️  ${errors.length} ERREUR(S) DÉTECTÉE(S)\n`);
    
    // Group by file
    const errorsByFile = new Map<string, ValidationError[]>();
    errors.forEach(error => {
      if (!errorsByFile.has(error.file)) {
        errorsByFile.set(error.file, []);
      }
      errorsByFile.get(error.file)!.push(error);
    });
    
    // Display errors
    errorsByFile.forEach((fileErrors, file) => {
      console.log(`\n📄 ${file}`);
      fileErrors.forEach(error => {
        console.log(`   Ligne ${error.line}:`);
        console.log(`   ❌ ${error.error}`);
        console.log(`   💡 ${error.suggestion}`);
        console.log('');
      });
    });
    
    console.log('='.repeat(80));
    console.log('\n📖 Consultez docs/CONVENTIONS_NOMMAGE.md pour plus d\'informations\n');
    
    process.exit(1);
  }
}

main().catch(console.error);
