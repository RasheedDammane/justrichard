#!/usr/bin/env node

/**
 * Script pour créer des images placeholder SVG pour les produits Food & Grocery
 * Usage: node scripts/create-food-placeholder-images.js
 */

const fs = require('fs');
const path = require('path');

// Créer les dossiers nécessaires
const productsDir = path.join(__dirname, '../public/images/products');
const brandsDir = path.join(__dirname, '../public/images/brands');

if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
}

if (!fs.existsSync(brandsDir)) {
  fs.mkdirSync(brandsDir, { recursive: true });
}

// Fonction pour créer un SVG placeholder
function createProductSVG(name, emoji, color) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad${emoji}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:${color};stop-opacity:0.6" />
    </linearGradient>
  </defs>
  <rect width="800" height="800" fill="url(#grad${emoji})"/>
  <text x="400" y="320" font-family="Arial, sans-serif" font-size="200" text-anchor="middle" fill="#333">${emoji}</text>
  <text x="400" y="520" font-family="Arial, sans-serif" font-size="32" text-anchor="middle" fill="#666" font-weight="bold">${name}</text>
</svg>`;
}

function createBrandSVG(name, initials, color) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="${color}"/>
  <text x="200" y="240" font-family="Arial, sans-serif" font-size="120" text-anchor="middle" fill="white" font-weight="bold">${initials}</text>
</svg>`;
}

// Produits à créer
const products = [
  { filename: 'camembert.jpg', name: 'Camembert', emoji: '🧀', color: '#FEF3C7' },
  { filename: 'roquefort.jpg', name: 'Roquefort', emoji: '🧀', color: '#DBEAFE' },
  { filename: 'comte.jpg', name: 'Comté', emoji: '🧀', color: '#FEF3C7' },
  { filename: 'haagen-dazs-vanilla.jpg', name: 'Vanilla Ice Cream', emoji: '🍦', color: '#FEF3C7' },
  { filename: 'haagen-dazs-chocolate.jpg', name: 'Chocolate Ice Cream', emoji: '🍦', color: '#D1FAE5' },
  { filename: 'pistachio-gelato.jpg', name: 'Pistachio Gelato', emoji: '🍦', color: '#D1FAE5' },
  { filename: 'lindt-85.jpg', name: 'Dark Chocolate 85%', emoji: '🍫', color: '#FED7AA' },
  { filename: 'lindor-assorted.jpg', name: 'Chocolate Truffles', emoji: '🍫', color: '#FECACA' },
  { filename: 'belgian-pralines.jpg', name: 'Belgian Pralines', emoji: '🍫', color: '#FED7AA' },
  { filename: 'foie-gras.jpg', name: 'Foie Gras', emoji: '🍽️', color: '#FEF3C7' },
  { filename: 'caviar.jpg', name: 'Caviar', emoji: '🍽️', color: '#E0E7FF' },
  { filename: 'birthday-cake.jpg', name: 'Birthday Cake', emoji: '🎂', color: '#FCE7F3' },
  { filename: 'opera-cake.jpg', name: 'Opera Cake', emoji: '🎂', color: '#FED7AA' },
  { filename: 'cheese-platter.jpg', name: 'Cheese Platter', emoji: '🧀', color: '#FEF3C7' },
  { filename: 'dessert-buffet.jpg', name: 'Dessert Buffet', emoji: '🍰', color: '#FCE7F3' },
  { filename: 'chocolate-buffet.jpg', name: 'Chocolate Buffet', emoji: '🍫', color: '#FED7AA' },
];

const brands = [
  { filename: 'la-fromagerie.svg', name: 'La Fromagerie', initials: 'LF', color: '#059669' },
  { filename: 'haagen-dazs.svg', name: 'Häagen-Dazs', initials: 'HD', color: '#DC2626' },
  { filename: 'lindt.svg', name: 'Lindt', initials: 'L', color: '#B91C1C' },
  { filename: 'maison-deluxe.svg', name: 'Maison Deluxe', initials: 'MD', color: '#7C3AED' },
  { filename: 'patisserie-royale.svg', name: 'Pâtisserie Royale', initials: 'PR', color: '#EA580C' },
];

// Créer les images de produits
console.log('📸 Creating product placeholder images...');
products.forEach(product => {
  const svg = createProductSVG(product.name, product.emoji, product.color);
  const filepath = path.join(productsDir, product.filename);
  fs.writeFileSync(filepath, svg);
  console.log(`  ✅ Created ${product.filename}`);
});

// Créer les logos de marques
console.log('\n🏷️  Creating brand placeholder logos...');
brands.forEach(brand => {
  const svg = createBrandSVG(brand.name, brand.initials, brand.color);
  const filepath = path.join(brandsDir, brand.filename);
  fs.writeFileSync(filepath, svg);
  console.log(`  ✅ Created ${brand.filename}`);
});

console.log('\n✨ All placeholder images created successfully!');
console.log(`   Products: ${productsDir}`);
console.log(`   Brands: ${brandsDir}`);
console.log('\n💡 You can now replace these with real product photos.');
