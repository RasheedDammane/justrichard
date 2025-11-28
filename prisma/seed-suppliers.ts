import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🏭 Starting Suppliers seeding...\n');

  const uae = await prisma.country.findFirst({ where: { code: 'AE' } });
  if (!uae) {
    console.log('❌ UAE not found');
    return;
  }

  const dubai = await prisma.city.findFirst({ where: { slug: 'dubai' } });
  if (!dubai) {
    console.log('❌ Dubai not found');
    return;
  }

  const suppliers = [
    // 1. Textile Manufacturer
    {
      id: 'supplier-premium-textiles-intl',
      name: 'Premium Textiles International',
      slug: 'premium-textiles-intl',
      companyName: 'Premium Textiles International LLC',
      businessType: 'Manufacturer',
      yearEstablished: 2010,
      numberOfEmployees: '201-500',
      annualRevenue: '$10M-$50M',
      mainCategory: 'Textiles',
      categories: JSON.stringify(['Textiles', 'Fabrics', 'Home Textiles', 'Apparel']),
      products: JSON.stringify([
        { name: 'Cotton Fabric', moq: '1000 meters', price: '$2-5/meter' },
        { name: 'Polyester Blend', moq: '2000 meters', price: '$1.5-3/meter' },
        { name: 'Silk Fabric', moq: '500 meters', price: '$10-20/meter' },
      ]),
      tags: JSON.stringify(['textile', 'fabric', 'cotton', 'polyester', 'silk', 'organic', 'sustainable']),
      certifications: JSON.stringify(['ISO 9001', 'OEKO-TEX', 'GOTS']),
      isHalalCertified: false,
      isOrganicCertified: true,
      description: 'Leading manufacturer of premium quality textiles and fabrics. We specialize in organic cotton, sustainable materials, and custom fabric solutions for the global market.',
      mainProducts: 'Cotton fabrics, Polyester blends, Silk fabrics, Home textiles, Bed linens, Curtains, Upholstery fabrics',
      capabilities: JSON.stringify(['OEM', 'ODM', 'Custom Design', 'Private Label']),
      minOrderQuantity: '500 meters',
      priceRange: '$1-$20/meter',
      paymentTerms: JSON.stringify(['T/T', 'L/C', 'PayPal']),
      deliveryTime: '15-30 days',
      cityId: dubai.id,
      countryId: uae.id,
      address: 'Dubai Textile City, Dubai, UAE',
      contactPerson: 'Ahmed Al Mansoori',
      phone: '+971 4 567 8901',
      email: 'sales@premiumtextiles.ae',
      whatsapp: '+971 50 123 4567',
      website: 'www.premiumtextiles.ae',
      logo: '🧵',
      images: JSON.stringify(['fabric1.jpg', 'fabric2.jpg', 'factory.jpg']),
      tradeShows: JSON.stringify(['Heimtextil Frankfurt', 'Dubai Textile Expo']),
      responseRate: 95,
      responseTime: '< 24h',
      totalTransactions: 450,
      rating: 4.8,
      reviews: 120,
      isActive: true,
      isFeatured: true,
      isVerified: true,
      isGoldSupplier: true,
      updatedAt: new Date(),
    },

    // 2. Halal Food Supplier
    {
      id: 'supplier-halal-foods-global',
      name: 'Halal Foods Global',
      slug: 'halal-foods-global',
      companyName: 'Halal Foods Global Trading LLC',
      businessType: 'Trading Company',
      yearEstablished: 2015,
      numberOfEmployees: '51-200',
      annualRevenue: '$5M-$10M',
      mainCategory: 'Food & Beverage',
      categories: JSON.stringify(['Food & Beverage', 'Halal Food', 'Frozen Food', 'Meat Products']),
      products: JSON.stringify([
        { name: 'Halal Chicken', moq: '1000 kg', price: '$3-5/kg' },
        { name: 'Halal Beef', moq: '500 kg', price: '$8-12/kg' },
        { name: 'Halal Lamb', moq: '300 kg', price: '$10-15/kg' },
      ]),
      tags: JSON.stringify(['halal', 'food', 'meat', 'butcher', 'frozen', 'certified', 'organic']),
      certifications: JSON.stringify(['Halal Certificate', 'HACCP', 'ISO 22000', 'FDA']),
      isHalalCertified: true,
      isOrganicCertified: true,
      description: 'Premium halal food supplier specializing in certified halal meat products, frozen foods, and ready-to-eat meals. We ensure the highest quality standards and full traceability.',
      mainProducts: 'Halal chicken, Halal beef, Halal lamb, Frozen halal meals, Halal sausages, Halal burgers',
      capabilities: JSON.stringify(['OEM', 'Private Label', 'Custom Packaging']),
      minOrderQuantity: '500 kg',
      priceRange: '$3-$15/kg',
      paymentTerms: JSON.stringify(['T/T', 'L/C']),
      deliveryTime: '7-15 days',
      cityId: dubai.id,
      countryId: uae.id,
      address: 'Dubai Industrial City, Dubai, UAE',
      contactPerson: 'Mohammed Hassan',
      phone: '+971 4 678 9012',
      email: 'info@halalfoods.ae',
      whatsapp: '+971 50 234 5678',
      website: 'www.halalfoods.ae',
      logo: '🥩',
      images: JSON.stringify(['meat1.jpg', 'facility.jpg', 'products.jpg']),
      tradeShows: JSON.stringify(['Gulfood Dubai', 'SIAL Paris']),
      responseRate: 98,
      responseTime: '< 12h',
      totalTransactions: 680,
      rating: 4.9,
      reviews: 210,
      isActive: true,
      isFeatured: true,
      isVerified: true,
      isGoldSupplier: true,
      updatedAt: new Date(),
    },

    // 3. Furniture Manufacturer
    {
      id: 'supplier-luxury-furniture-co',
      name: 'Luxury Furniture Co.',
      slug: 'luxury-furniture-co',
      companyName: 'Luxury Furniture Manufacturing LLC',
      businessType: 'Manufacturer',
      yearEstablished: 2008,
      numberOfEmployees: '201-500',
      annualRevenue: '$10M-$50M',
      mainCategory: 'Furniture',
      categories: JSON.stringify(['Furniture', 'Home Furniture', 'Office Furniture', 'Outdoor Furniture']),
      products: JSON.stringify([
        { name: 'Luxury Sofa Set', moq: '10 sets', price: '$500-1500/set' },
        { name: 'Dining Table Set', moq: '20 sets', price: '$300-800/set' },
        { name: 'Office Desk', moq: '50 units', price: '$200-500/unit' },
      ]),
      tags: JSON.stringify(['furniture', 'luxury', 'modern', 'custom', 'wood', 'metal', 'design']),
      certifications: JSON.stringify(['ISO 9001', 'FSC', 'CARB']),
      isHalalCertified: false,
      isOrganicCertified: false,
      description: 'Premium furniture manufacturer specializing in luxury home and office furniture. We offer custom designs, high-quality materials, and exceptional craftsmanship.',
      mainProducts: 'Sofas, Dining sets, Bedroom furniture, Office furniture, Outdoor furniture, Custom furniture',
      capabilities: JSON.stringify(['OEM', 'ODM', 'Custom Design', 'Interior Design Consultation']),
      minOrderQuantity: '10 sets',
      priceRange: '$200-$2000/piece',
      paymentTerms: JSON.stringify(['T/T', 'L/C', 'PayPal']),
      deliveryTime: '30-45 days',
      cityId: dubai.id,
      countryId: uae.id,
      address: 'Dubai Investment Park, Dubai, UAE',
      contactPerson: 'Sarah Williams',
      phone: '+971 4 789 0123',
      email: 'sales@luxuryfurniture.ae',
      whatsapp: '+971 50 345 6789',
      website: 'www.luxuryfurniture.ae',
      logo: '🛋️',
      images: JSON.stringify(['sofa.jpg', 'dining.jpg', 'showroom.jpg']),
      tradeShows: JSON.stringify(['INDEX Dubai', 'Salone del Mobile Milan']),
      responseRate: 92,
      responseTime: '< 24h',
      totalTransactions: 320,
      rating: 4.7,
      reviews: 95,
      isActive: true,
      isFeatured: true,
      isVerified: true,
      isGoldSupplier: false,
      updatedAt: new Date(),
    },
  ];

  // Generate additional suppliers
  const additionalSuppliers = generateAdditionalSuppliers(dubai, uae);
  suppliers.push(...additionalSuppliers);

  for (const supplier of suppliers) {
    await prisma.supplier.upsert({
      where: { id: supplier.id },
      update: supplier,
      create: supplier,
    });
    console.log(`✅ Created/Updated: ${supplier.name} (${supplier.mainCategory})`);
  }

  console.log(`\n🎉 Successfully seeded ${suppliers.length} suppliers!`);
}

function generateAdditionalSuppliers(dubai: any, uae: any) {
  const categories = [
    { name: 'Beverage', emoji: '🥤', tags: ['beverage', 'drinks', 'juice', 'organic', 'healthy'] },
    { name: 'Kitchen Equipment', emoji: '👨‍🍳', tags: ['kitchen', 'cuisiniste', 'equipment', 'commercial'] },
    { name: 'Chocolate', emoji: '🍫', tags: ['chocolate', 'confectionery', 'sweets', 'halal'] },
    { name: 'Cheese', emoji: '🧀', tags: ['cheese', 'dairy', 'gourmet', 'halal', 'organic'] },
    { name: 'Healthy Food', emoji: '🥗', tags: ['healthy', 'collagen', 'organic', 'nutrition', 'supplements'] },
    { name: 'Organic Food', emoji: '🌿', tags: ['organic', 'healthy', 'natural', 'food', 'halal'] },
    { name: 'Butcher', emoji: '🥩', tags: ['meat', 'butcher', 'halal', 'beef', 'lamb'] },
  ];

  const suppliers = [];

  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i];
    const name = `${cat.name} Supplier ${i + 4}`;
    const slug = name.toLowerCase().replace(/\s+/g, '-');

    suppliers.push({
      id: `supplier-${slug}`,
      name,
      slug,
      companyName: `${name} LLC`,
      businessType: i % 2 === 0 ? 'Manufacturer' : 'Trading Company',
      yearEstablished: 2010 + i,
      numberOfEmployees: i % 3 === 0 ? '10-50' : i % 3 === 1 ? '51-200' : '201-500',
      annualRevenue: i % 2 === 0 ? '$1M-$5M' : '$5M-$10M',
      mainCategory: cat.name,
      categories: JSON.stringify([cat.name, 'Food & Beverage']),
      products: JSON.stringify([
        { name: `${cat.name} Product 1`, moq: '100 units', price: '$5-10/unit' },
        { name: `${cat.name} Product 2`, moq: '200 units', price: '$10-20/unit' },
      ]),
      tags: JSON.stringify(cat.tags),
      certifications: JSON.stringify(['ISO 9001', 'Halal Certificate']),
      isHalalCertified: true,
      isOrganicCertified: i % 2 === 0,
      description: `Leading ${cat.name.toLowerCase()} supplier offering high-quality products to the global market.`,
      mainProducts: `${cat.name} products, Premium ${cat.name.toLowerCase()}, Custom ${cat.name.toLowerCase()}`,
      capabilities: JSON.stringify(['OEM', 'Private Label']),
      minOrderQuantity: '100 units',
      priceRange: '$5-$20/unit',
      paymentTerms: JSON.stringify(['T/T', 'L/C']),
      deliveryTime: '15-30 days',
      cityId: dubai.id,
      countryId: uae.id,
      address: `Dubai Industrial Area, Dubai, UAE`,
      contactPerson: `Contact Person ${i + 4}`,
      phone: `+971 4 ${100 + i}00 ${1000 + i}`,
      email: `info@${slug}.ae`,
      whatsapp: `+971 50 ${100 + i}00 ${1000 + i}`,
      website: `www.${slug}.ae`,
      logo: cat.emoji,
      images: JSON.stringify(['product1.jpg', 'product2.jpg']),
      tradeShows: JSON.stringify(['Gulfood Dubai']),
      responseRate: 85 + i,
      responseTime: '< 24h',
      totalTransactions: 100 + i * 50,
      rating: 4.0 + (i * 0.1),
      reviews: 50 + i * 10,
      isActive: true,
      isFeatured: i % 3 === 0,
      isVerified: true,
      isGoldSupplier: i % 4 === 0,
      updatedAt: new Date(),
    });
  }

  return suppliers;
}

main()
  .catch((e) => {
    console.error('❌ Error seeding suppliers:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
