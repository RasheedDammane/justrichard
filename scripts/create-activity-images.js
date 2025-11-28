const fs = require('fs');
const path = require('path');

// Activity images organized by category
const activityImages = {
  cultural: [
    { name: 'grand-palace', emoji: '🏛️', title: 'Grand Palace' },
    { name: 'wat-pho', emoji: '🙏', title: 'Wat Pho' },
    { name: 'wat-arun', emoji: '⛩️', title: 'Wat Arun' },
    { name: 'floating-market', emoji: '🛶', title: 'Floating Market' },
    { name: 'boat-market', emoji: '🚣', title: 'Boat Market' },
  ],
  'food-drink': [
    { name: 'cooking-class', emoji: '👨‍🍳', title: 'Cooking Class' },
    { name: 'thai-food', emoji: '🍜', title: 'Thai Food' },
  ],
  'water-sports': [
    { name: 'coral-island', emoji: '🏝️', title: 'Coral Island' },
    { name: 'snorkeling', emoji: '🤿', title: 'Snorkeling' },
  ],
  adventure: [
    { name: 'parasailing', emoji: '🪂', title: 'Parasailing' },
    { name: 'pattaya-beach', emoji: '🏖️', title: 'Pattaya Beach' },
    { name: 'desert-safari', emoji: '🏜️', title: 'Desert Safari' },
    { name: 'dune-bashing', emoji: '🚙', title: 'Dune Bashing' },
    { name: 'bbq-dinner', emoji: '🍖', title: 'BBQ Dinner' },
  ],
  'island-hopping': [
    { name: 'phi-phi', emoji: '🏝️', title: 'Phi Phi Islands' },
    { name: 'maya-bay', emoji: '🌊', title: 'Maya Bay' },
    { name: 'snorkel-phi-phi', emoji: '🤿', title: 'Snorkeling' },
  ],
  sightseeing: [
    { name: 'burj-khalifa', emoji: '🏙️', title: 'Burj Khalifa' },
    { name: 'dubai-view', emoji: '🌆', title: 'Dubai View' },
  ],
  'dinner-cruise': [
    { name: 'dhow-cruise', emoji: '⛵', title: 'Dhow Cruise' },
    { name: 'dubai-marina', emoji: '🌃', title: 'Dubai Marina' },
  ],
  family: [
    { name: 'dubai-aquarium', emoji: '🐠', title: 'Dubai Aquarium' },
    { name: 'underwater-zoo', emoji: '🐙', title: 'Underwater Zoo' },
  ],
  'extreme-sports': [
    { name: 'skydive-dubai', emoji: '🪂', title: 'Skydive Dubai' },
    { name: 'palm-jumeirah', emoji: '🌴', title: 'Palm Jumeirah' },
  ],
};

// Color schemes by category
const categoryColors = {
  cultural: { bg: '#FFF7ED', accent: '#EA580C' },
  'food-drink': { bg: '#FEF3C7', accent: '#D97706' },
  'water-sports': { bg: '#DBEAFE', accent: '#2563EB' },
  adventure: { bg: '#DCFCE7', accent: '#16A34A' },
  'island-hopping': { bg: '#E0F2FE', accent: '#0284C7' },
  sightseeing: { bg: '#F3E8FF', accent: '#9333EA' },
  'dinner-cruise': { bg: '#FCE7F3', accent: '#DB2777' },
  family: { bg: '#FEF9C3', accent: '#CA8A04' },
  'extreme-sports': { bg: '#FEE2E2', accent: '#DC2626' },
};

function createSVG(emoji, title, bgColor, accentColor) {
  return `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${accentColor};stop-opacity:0.3" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#grad)"/>
  <text x="400" y="280" font-size="180" text-anchor="middle" fill="${accentColor}" opacity="0.3">
    ${emoji}
  </text>
  <text x="400" y="400" font-size="32" font-weight="bold" text-anchor="middle" fill="${accentColor}" font-family="Arial, sans-serif">
    ${title}
  </text>
  <text x="400" y="440" font-size="18" text-anchor="middle" fill="${accentColor}" opacity="0.7" font-family="Arial, sans-serif">
    JustRichard Activities
  </text>
</svg>`;
}

console.log('🎨 Creating activity images...\n');

let totalCreated = 0;

Object.entries(activityImages).forEach(([category, images]) => {
  const categoryPath = path.join(__dirname, '..', 'public', 'media', 'activities', category);
  
  // Ensure directory exists
  if (!fs.existsSync(categoryPath)) {
    fs.mkdirSync(categoryPath, { recursive: true });
  }

  const colors = categoryColors[category] || { bg: '#F3F4F6', accent: '#6B7280' };

  images.forEach(({ name, emoji, title }) => {
    const svg = createSVG(emoji, title, colors.bg, colors.accent);
    const filePath = path.join(categoryPath, `${name}.svg`);
    
    fs.writeFileSync(filePath, svg);
    console.log(`✅ Created: /media/activities/${category}/${name}.svg`);
    totalCreated++;
  });
});

console.log(`\n🎉 Successfully created ${totalCreated} activity images!`);
console.log('\nImages organized by category:');
Object.keys(activityImages).forEach(category => {
  console.log(`  - ${category}: ${activityImages[category].length} images`);
});
