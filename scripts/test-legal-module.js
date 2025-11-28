// Script de test pour le module Legal
// Usage: node scripts/test-legal-module.js

const testData = {
  lawyer1: {
    type: 'LAWYER',
    status: 'PUBLISHED',
    name: 'Maître Sophie Martin',
    slug: 'maitre-sophie-martin',
    shortTitle: 'Avocate en droit des affaires',
    headline: 'Plus de 15 ans d\'expérience en M&A et droit des sociétés',
    email: 'sophie.martin@example.com',
    phone: '+33 1 23 45 67 89',
    city: 'Paris',
    country: 'France',
    bio: 'Avocate spécialisée en droit des affaires avec une expertise particulière en fusions-acquisitions et restructurations d\'entreprises. J\'accompagne les dirigeants et entrepreneurs dans leurs projets stratégiques.',
    languages: ['fr', 'en'],
    yearsOfExperience: 15,
    hourlyRateFrom: 300,
    hourlyRateTo: 500,
    currency: 'EUR',
    feeModel: 'HOURLY',
    practiceAreas: ['CORPORATE_LAW', 'TAX', 'LITIGATION'],
    industries: ['STARTUPS', 'SME'],
    licenseNumber: 'P12345',
    barAssociation: 'Barreau de Paris',
    barAdmissionYear: 2008,
    featured: true,
    isActive: true,
    newClientsAccepted: true,
  },

  lawFirm1: {
    type: 'LAW_FIRM',
    status: 'PUBLISHED',
    name: 'Cabinet Juridique International',
    slug: 'cabinet-juridique-international',
    shortTitle: 'Cabinet d\'avocats international',
    headline: 'Expertise en droit international et des affaires',
    email: 'contact@cji-law.com',
    phone: '+971 4 123 4567',
    city: 'Dubai',
    country: 'UAE',
    bio: 'Cabinet d\'avocats spécialisé en droit international avec des bureaux à Dubai, Paris et Londres. Nous accompagnons les entreprises dans leurs opérations transfrontalières.',
    languages: ['en', 'ar', 'fr'],
    yearsOfExperience: 20,
    practiceAreas: ['IMMIGRATION', 'CORPORATE_LAW', 'REAL_ESTATE'],
    industries: ['REAL_ESTATE', 'FINTECH', 'HOSPITALITY'],
    featured: false,
    isActive: true,
    newClientsAccepted: true,
  },

  lawyer2: {
    type: 'LAWYER',
    status: 'PUBLISHED',
    name: 'Maître Jean Dupont',
    slug: 'maitre-jean-dupont',
    shortTitle: 'Avocat en droit de la famille',
    headline: 'Spécialiste des divorces et successions',
    email: 'jean.dupont@example.com',
    phone: '+33 1 98 76 54 32',
    city: 'Lyon',
    country: 'France',
    bio: 'Avocat spécialisé en droit de la famille depuis plus de 10 ans. J\'accompagne mes clients avec empathie et professionnalisme dans les moments difficiles.',
    languages: ['fr'],
    yearsOfExperience: 10,
    hourlyRateFrom: 200,
    currency: 'EUR',
    feeModel: 'FIXED',
    practiceAreas: ['FAMILY_LAW'],
    licenseNumber: 'L67890',
    barAssociation: 'Barreau de Lyon',
    barAdmissionYear: 2013,
    featured: false,
    isActive: true,
    newClientsAccepted: true,
  },
};

console.log('=== DONNÉES DE TEST POUR LE MODULE LEGAL ===\n');
console.log('Copiez ces données dans le formulaire admin:\n');
console.log('URL: http://localhost:3100/fr/admin/legal/new\n');

Object.entries(testData).forEach(([key, data]) => {
  console.log(`\n--- ${key.toUpperCase()} ---`);
  console.log(JSON.stringify(data, null, 2));
});

console.log('\n\n=== TESTS À EFFECTUER ===\n');
console.log('1. Admin - Création:');
console.log('   - Aller sur /fr/admin/legal/new');
console.log('   - Copier les données ci-dessus');
console.log('   - Sauvegarder');
console.log('   - Vérifier dans la liste\n');

console.log('2. Admin - Validation:');
console.log('   - Essayer de créer sans nom → voir erreur');
console.log('   - Essayer slug avec espaces → voir erreur');
console.log('   - Essayer PUBLISHED sans domaines → voir erreur\n');

console.log('3. Public - Liste:');
console.log('   - Aller sur /fr/services/legal');
console.log('   - Voir les 3 professionnels');
console.log('   - Tester les filtres\n');

console.log('4. Public - Détail:');
console.log('   - Cliquer sur un professionnel');
console.log('   - Vérifier toutes les infos\n');

console.log('5. Public - Filtres:');
console.log('   - Rechercher "Sophie" → 1 résultat');
console.log('   - Filtrer par type "Avocat" → 2 résultats');
console.log('   - Filtrer par domaine "FAMILY_LAW" → 1 résultat');
console.log('   - Filtrer par langue "ar" → 1 résultat');
console.log('   - Réinitialiser → 3 résultats\n');

console.log('\n✅ Module Legal prêt à être testé!');
