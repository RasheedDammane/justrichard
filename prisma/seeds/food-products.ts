import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedFoodProducts() {
  console.log('🌱 Starting Food & Grocery seed...');

  try {
    // 1. Créer les catégories
    console.log('📁 Creating categories...');
    
    const categories = await Promise.all([
      prisma.foodCategory.upsert({
        where: { slug: 'dairy-cheese' },
        update: {},
        create: {
          name: 'Dairy & Cheese',
          slug: 'dairy-cheese',
          description: 'Fresh dairy products and artisanal cheeses from around the world',
          icon: '🧀',
          order: 1,
          isActive: true,
          isFeatured: true,
        },
      }),
      prisma.foodCategory.upsert({
        where: { slug: 'frozen-desserts' },
        update: {},
        create: {
          name: 'Frozen Desserts & Ice Cream',
          slug: 'frozen-desserts',
          description: 'Premium ice creams, gelatos and frozen treats',
          icon: '🍦',
          order: 2,
          isActive: true,
          isFeatured: true,
        },
      }),
      prisma.foodCategory.upsert({
        where: { slug: 'chocolates-sweets' },
        update: {},
        create: {
          name: 'Chocolates & Sweets',
          slug: 'chocolates-sweets',
          description: 'Luxury chocolates and confectionery',
          icon: '🍫',
          order: 3,
          isActive: true,
          isFeatured: true,
        },
      }),
      prisma.foodCategory.upsert({
        where: { slug: 'gourmet-delicacies' },
        update: {},
        create: {
          name: 'Gourmet Delicacies',
          slug: 'gourmet-delicacies',
          description: 'Premium gourmet products including foie gras, truffles and more',
          icon: '🍽️',
          order: 4,
          isActive: true,
          isFeatured: true,
        },
      }),
      prisma.foodCategory.upsert({
        where: { slug: 'cakes-pastries' },
        update: {},
        create: {
          name: 'Cakes & Pastries',
          slug: 'cakes-pastries',
          description: 'Fresh cakes, pastries and celebration desserts',
          icon: '🎂',
          order: 5,
          isActive: true,
          isFeatured: true,
        },
      }),
      prisma.foodCategory.upsert({
        where: { slug: 'party-catering' },
        update: {},
        create: {
          name: 'Party & Catering',
          slug: 'party-catering',
          description: 'Buffets, platters and catering options for events',
          icon: '🍱',
          order: 6,
          isActive: true,
          isFeatured: true,
        },
      }),
    ]);

    console.log(`✅ Created ${categories.length} categories`);

    // 2. Créer les marques
    console.log('🏷️ Creating brands...');
    
    const brands = await Promise.all([
      prisma.foodBrand.upsert({
        where: { slug: 'la-fromagerie' },
        update: {},
        create: {
          name: 'La Fromagerie',
          slug: 'la-fromagerie',
          description: 'Artisan French cheese makers',
          logo: '/images/brands/la-fromagerie.svg',
        },
      }),
      prisma.foodBrand.upsert({
        where: { slug: 'haagen-dazs' },
        update: {},
        create: {
          name: 'Häagen-Dazs',
          slug: 'haagen-dazs',
          description: 'Premium ice cream brand',
          logo: '/images/brands/haagen-dazs.svg',
        },
      }),
      prisma.foodBrand.upsert({
        where: { slug: 'lindt' },
        update: {},
        create: {
          name: 'Lindt',
          slug: 'lindt',
          description: 'Swiss chocolate excellence',
          logo: '/images/brands/lindt.svg',
        },
      }),
      prisma.foodBrand.upsert({
        where: { slug: 'maison-deluxe' },
        update: {},
        create: {
          name: 'Maison Deluxe',
          slug: 'maison-deluxe',
          description: 'Luxury gourmet products',
          logo: '/images/brands/maison-deluxe.svg',
        },
      }),
      prisma.foodBrand.upsert({
        where: { slug: 'patisserie-royale' },
        update: {},
        create: {
          name: 'Pâtisserie Royale',
          slug: 'patisserie-royale',
          description: 'Fine French pastries and cakes',
          logo: '/images/brands/patisserie-royale.svg',
        },
      }),
    ]);

    console.log(`✅ Created ${brands.length} brands`);

    // 3. Récupérer les pays et villes
    const [dubai, paris, bangkok] = await Promise.all([
      prisma.city.findFirst({ where: { slug: 'dubai' } }),
      prisma.city.findFirst({ where: { slug: 'paris' } }),
      prisma.city.findFirst({ where: { slug: 'bangkok' } }),
    ]);

    const [uae, france, thailand] = await Promise.all([
      prisma.country.findFirst({ where: { code: 'AE' } }),
      prisma.country.findFirst({ where: { code: 'FR' } }),
      prisma.country.findFirst({ where: { code: 'TH' } }),
    ]);

    // 4. Créer les produits
    console.log('🛒 Creating products...');
    
    const products = [];

    // === FROMAGES ===
    const cheeseCategory = categories.find((c) => c.slug === 'dairy-cheese');
    const fromagerieBrand = brands.find((b) => b.slug === 'la-fromagerie');

    products.push(
      // Camembert de Normandie
      prisma.foodProduct.create({
        data: {
          name: 'Camembert de Normandie AOP',
          slug: 'camembert-normandie-aop',
          sku: 'CHE-CAM-001',
          barcode: '3250391234567',
          description: 'Authentic Camembert from Normandy with a creamy texture and rich flavor. Made from raw cow\'s milk and aged to perfection.',
          shortDescription: 'Traditional French Camembert cheese',
          categoryId: cheeseCategory!.id,
          brandId: fromagerieBrand!.id,
          sellingPrice: 65, // AED
          compareAtPrice: 85,
          currency: 'AED',
          buyingPrice: 45,
          taxRate: 5,
          cityId: dubai?.id,
          countryId: uae?.id,
          stock: 25,
          lowStockThreshold: 5,
          unit: 'piece',
          weight: 250,
          canPurchase: true,
          isActive: true,
          isFeatured: true,
          isOrganic: true,
          tags: ['French', 'AOP', 'Soft Cheese', 'Normandy'],
          image: '/images/products/camembert.jpg',
          metaTitle: 'Camembert de Normandie AOP - Authentic French Cheese',
          metaDescription: 'Buy authentic Camembert de Normandie AOP online. Premium French soft cheese delivered fresh.',
        },
      }),

      // Roquefort
      prisma.foodProduct.create({
        data: {
          name: 'Roquefort AOP Société',
          slug: 'roquefort-aop-societe',
          sku: 'CHE-ROQ-001',
          barcode: '3250391234568',
          description: 'King of blue cheeses, Roquefort is aged in natural caves. Sheep\'s milk cheese with distinctive blue veining and sharp flavor.',
          shortDescription: 'Premium French blue cheese',
          categoryId: cheeseCategory!.id,
          brandId: fromagerieBrand!.id,
          sellingPrice: 95,
          compareAtPrice: 120,
          currency: 'AED',
          buyingPrice: 65,
          taxRate: 5,
          cityId: dubai?.id,
          countryId: uae?.id,
          stock: 15,
          lowStockThreshold: 3,
          unit: 'piece',
          weight: 200,
          canPurchase: true,
          isActive: true,
          isFeatured: true,
          tags: ['French', 'AOP', 'Blue Cheese', 'Sheep Milk'],
          image: '/images/products/roquefort.jpg',
          metaTitle: 'Roquefort AOP - Premium French Blue Cheese',
          metaDescription: 'Authentic Roquefort blue cheese aged in natural caves. Order premium French cheese online.',
        },
      }),

      // Comté
      prisma.foodProduct.create({
        data: {
          name: 'Comté Extra Vieux 24 Months',
          slug: 'comte-extra-vieux-24-months',
          sku: 'CHE-COM-001',
          barcode: '3250391234569',
          description: 'Aged Comté cheese with complex nutty flavors. 24 months of aging in cellars of Jura.',
          shortDescription: 'Aged French mountain cheese',
          categoryId: cheeseCategory!.id,
          brandId: fromagerieBrand!.id,
          sellingPrice: 85,
          currency: 'AED',
          buyingPrice: 58,
          taxRate: 5,
          cityId: dubai?.id,
          countryId: uae?.id,
          stock: 20,
          lowStockThreshold: 5,
          unit: 'kg',
          weight: 1000,
          sellByFraction: true,
          canPurchase: true,
          isActive: true,
          isBestSeller: true,
          tags: ['French', 'AOP', 'Hard Cheese', 'Aged'],
          image: '/images/products/comte.jpg',
        },
      }),
    );

    // === GLACES ===
    const iceCreamCategory = categories.find((c) => c.slug === 'frozen-desserts');
    const haagenDazsBrand = brands.find((b) => b.slug === 'haagen-dazs');

    products.push(
      // Vanilla Ice Cream
      prisma.foodProduct.create({
        data: {
          name: 'Häagen-Dazs Vanilla Bean Ice Cream',
          slug: 'haagen-dazs-vanilla-bean',
          sku: 'ICE-VAN-001',
          barcode: '0074570050024',
          description: 'Premium vanilla ice cream made with real Madagascar vanilla beans. Rich, creamy and indulgent.',
          shortDescription: 'Classic vanilla bean ice cream',
          categoryId: iceCreamCategory!.id,
          brandId: haagenDazsBrand!.id,
          sellingPrice: 42,
          currency: 'AED',
          buyingPrice: 28,
          taxRate: 5,
          cityId: dubai?.id,
          countryId: uae?.id,
          stock: 50,
          lowStockThreshold: 10,
          maxPurchaseQuantity: 5,
          unit: 'piece',
          volume: 473,
          canPurchase: true,
          isActive: true,
          isFeatured: true,
          isGlutenFree: true,
          tags: ['Ice Cream', 'Vanilla', 'Premium', 'Gluten-Free'],
          image: '/images/products/haagen-dazs-vanilla.jpg',
        },
      }),

      // Belgian Chocolate Ice Cream
      prisma.foodProduct.create({
        data: {
          name: 'Häagen-Dazs Belgian Chocolate',
          slug: 'haagen-dazs-belgian-chocolate',
          sku: 'ICE-CHO-001',
          barcode: '0074570050031',
          description: 'Decadent ice cream with rich Belgian chocolate. Pure indulgence in every scoop.',
          shortDescription: 'Belgian chocolate ice cream',
          categoryId: iceCreamCategory!.id,
          brandId: haagenDazsBrand!.id,
          sellingPrice: 45,
          currency: 'AED',
          buyingPrice: 30,
          taxRate: 5,
          cityId: dubai?.id,
          countryId: uae?.id,
          stock: 45,
          lowStockThreshold: 10,
          unit: 'piece',
          volume: 473,
          canPurchase: true,
          isActive: true,
          isBestSeller: true,
          isGlutenFree: true,
          tags: ['Ice Cream', 'Chocolate', 'Belgian', 'Premium'],
          image: '/images/products/haagen-dazs-chocolate.jpg',
        },
      }),

      // Pistachio Gelato
      prisma.foodProduct.create({
        data: {
          name: 'Artisan Pistachio Gelato',
          slug: 'artisan-pistachio-gelato',
          sku: 'ICE-PIS-001',
          barcode: '8001234567890',
          description: 'Authentic Italian gelato made with Sicilian pistachios. Smooth, creamy texture with intense pistachio flavor.',
          shortDescription: 'Italian pistachio gelato',
          categoryId: iceCreamCategory!.id,
          sellingPrice: 55,
          currency: 'AED',
          buyingPrice: 38,
          taxRate: 5,
          cityId: dubai?.id,
          countryId: uae?.id,
          stock: 30,
          lowStockThreshold: 8,
          unit: 'piece',
          volume: 500,
          canPurchase: true,
          isActive: true,
          isFeatured: true,
          tags: ['Gelato', 'Pistachio', 'Italian', 'Artisan'],
          image: '/images/products/pistachio-gelato.jpg',
        },
      }),
    );

    // === CHOCOLATS ===
    const chocolateCategory = categories.find((c) => c.slug === 'chocolates-sweets');
    const lindtBrand = brands.find((b) => b.slug === 'lindt');

    products.push(
      // Lindt Excellence 85%
      prisma.foodProduct.create({
        data: {
          name: 'Lindt Excellence 85% Cacao Dark Chocolate',
          slug: 'lindt-excellence-85-dark',
          sku: 'CHO-LIN-001',
          barcode: '3046920028844',
          description: 'Intense dark chocolate with 85% cacao. Perfect balance of bitter and sweet. Rich in antioxidants.',
          shortDescription: 'Premium 85% dark chocolate bar',
          categoryId: chocolateCategory!.id,
          brandId: lindtBrand!.id,
          sellingPrice: 25,
          compareAtPrice: 32,
          currency: 'AED',
          buyingPrice: 16,
          taxRate: 5,
          cityId: dubai?.id,
          countryId: uae?.id,
          stock: 100,
          lowStockThreshold: 20,
          maxPurchaseQuantity: 10,
          unit: 'piece',
          weight: 100,
          canPurchase: true,
          isActive: true,
          isOnSale: true,
          isVegan: true,
          isGlutenFree: true,
          tags: ['Dark Chocolate', 'Swiss', 'Vegan', 'Premium'],
          image: '/images/products/lindt-85.jpg',
        },
      }),

      // Lindt Lindor Assorted
      prisma.foodProduct.create({
        data: {
          name: 'Lindt Lindor Assorted Chocolate Truffles',
          slug: 'lindt-lindor-assorted-truffles',
          sku: 'CHO-LIN-002',
          barcode: '3046920029155',
          description: 'Assorted chocolate truffles with smooth melting centers. Mix of milk, dark and white chocolate.',
          shortDescription: 'Premium chocolate truffles assortment',
          categoryId: chocolateCategory!.id,
          brandId: lindtBrand!.id,
          sellingPrice: 68,
          currency: 'AED',
          buyingPrice: 45,
          taxRate: 5,
          cityId: dubai?.id,
          countryId: uae?.id,
          stock: 75,
          lowStockThreshold: 15,
          unit: 'piece',
          weight: 200,
          canPurchase: true,
          isActive: true,
          isFeatured: true,
          isBestSeller: true,
          tags: ['Truffles', 'Assorted', 'Gift', 'Swiss'],
          image: '/images/products/lindor-assorted.jpg',
        },
      }),

      // Artisan Pralines
      prisma.foodProduct.create({
        data: {
          name: 'Belgian Chocolate Pralines Selection',
          slug: 'belgian-chocolate-pralines',
          sku: 'CHO-PRA-001',
          barcode: '5410976880028',
          description: 'Handcrafted Belgian pralines with various fillings. Hazelnut, caramel, coffee and more.',
          shortDescription: 'Artisan Belgian pralines box',
          categoryId: chocolateCategory!.id,
          sellingPrice: 95,
          currency: 'AED',
          buyingPrice: 62,
          taxRate: 5,
          cityId: dubai?.id,
          countryId: uae?.id,
          stock: 40,
          lowStockThreshold: 10,
          unit: 'piece',
          weight: 250,
          canPurchase: true,
          isActive: true,
          isFeatured: true,
          tags: ['Pralines', 'Belgian', 'Luxury', 'Gift Box'],
          image: '/images/products/belgian-pralines.jpg',
        },
      }),
    );

    // === FOIE GRAS & DELICACIES ===
    const gourmetCategory = categories.find((c) => c.slug === 'gourmet-delicacies');
    const maisonBrand = brands.find((b) => b.slug === 'maison-deluxe');

    products.push(
      // Foie Gras
      prisma.foodProduct.create({
        data: {
          name: 'Foie Gras de Canard Entier',
          slug: 'foie-gras-canard-entier',
          sku: 'GOU-FOI-001',
          barcode: '3760123456789',
          description: 'Whole duck foie gras from Southwest France. Traditional preparation, smooth and delicate. Perfect for special occasions.',
          shortDescription: 'Premium French duck foie gras',
          categoryId: gourmetCategory!.id,
          brandId: maisonBrand!.id,
          sellingPrice: 285,
          currency: 'AED',
          buyingPrice: 195,
          taxRate: 5,
          cityId: dubai?.id,
          countryId: uae?.id,
          stock: 12,
          lowStockThreshold: 3,
          unit: 'piece',
          weight: 180,
          canPurchase: true,
          isActive: true,
          isFeatured: true,
          tags: ['Foie Gras', 'French', 'Luxury', 'Gourmet'],
          image: '/images/products/foie-gras.jpg',
          metaTitle: 'Foie Gras de Canard Entier - French Delicacy',
          metaDescription: 'Premium French duck foie gras. Order authentic gourmet delicacies online.',
        },
      }),

      // Caviar
      prisma.foodProduct.create({
        data: {
          name: 'Beluga Caviar Imperial Selection',
          slug: 'beluga-caviar-imperial',
          sku: 'GOU-CAV-001',
          barcode: '7891234567890',
          description: 'Premium Beluga caviar with large, firm pearls. Buttery taste with a subtle hint of the sea.',
          shortDescription: 'Premium Beluga caviar',
          categoryId: gourmetCategory!.id,
          brandId: maisonBrand!.id,
          sellingPrice: 1250,
          currency: 'AED',
          buyingPrice: 875,
          taxRate: 5,
          cityId: dubai?.id,
          countryId: uae?.id,
          stock: 8,
          lowStockThreshold: 2,
          unit: 'piece',
          weight: 50,
          canPurchase: true,
          isActive: true,
          isFeatured: true,
          tags: ['Caviar', 'Beluga', 'Luxury', 'Premium'],
          image: '/images/products/caviar.jpg',
        },
      }),
    );

    // === GÂTEAUX ===
    const cakeCategory = categories.find((c) => c.slug === 'cakes-pastries');
    const patisserieBrand = brands.find((b) => b.slug === 'patisserie-royale');

    products.push(
      // Gâteau d'anniversaire
      prisma.foodProduct.create({
        data: {
          name: 'Chocolate Birthday Cake - 8 Persons',
          slug: 'chocolate-birthday-cake-8p',
          sku: 'CAK-BIR-001',
          barcode: '4567890123456',
          description: 'Decadent chocolate cake with ganache frosting. Decorated with fresh flowers and personalized message. Serves 8 people.',
          shortDescription: 'Premium chocolate birthday cake',
          categoryId: cakeCategory!.id,
          brandId: patisserieBrand!.id,
          sellingPrice: 280,
          currency: 'AED',
          buyingPrice: 180,
          taxRate: 5,
          cityId: dubai?.id,
          countryId: uae?.id,
          stock: 15,
          lowStockThreshold: 5,
          unit: 'piece',
          weight: 2000,
          canPurchase: true,
          isActive: true,
          isFeatured: true,
          isBestSeller: true,
          tags: ['Birthday', 'Cake', 'Chocolate', 'Celebration'],
          image: '/images/products/birthday-cake.jpg',
        },
      }),

      // Opera Cake
      prisma.foodProduct.create({
        data: {
          name: 'Classic French Opera Cake',
          slug: 'french-opera-cake',
          sku: 'CAK-OPE-001',
          barcode: '4567890123457',
          description: 'Layers of almond sponge soaked in coffee syrup, coffee buttercream and chocolate ganache. A French classic.',
          shortDescription: 'Traditional Opera cake',
          categoryId: cakeCategory!.id,
          brandId: patisserieBrand!.id,
          sellingPrice: 180,
          currency: 'AED',
          buyingPrice: 120,
          taxRate: 5,
          cityId: dubai?.id,
          countryId: uae?.id,
          stock: 10,
          lowStockThreshold: 3,
          unit: 'piece',
          weight: 1200,
          canPurchase: true,
          isActive: true,
          isFeatured: true,
          tags: ['Opera', 'French', 'Coffee', 'Chocolate'],
          image: '/images/products/opera-cake.jpg',
        },
      }),
    );

    // === BUFFETS & PLATEAUX ===
    const cateringCategory = categories.find((c) => c.slug === 'party-catering');

    products.push(
      // Cheese Platter
      prisma.foodProduct.create({
        data: {
          name: 'Premium Cheese Platter - 10 Persons',
          slug: 'premium-cheese-platter-10p',
          sku: 'CAT-CHE-001',
          barcode: '5678901234567',
          description: 'Selection of 8 premium cheeses including Brie, Camembert, Roquefort, Comté and more. Served with crackers, nuts and dried fruits. Perfect for 10 people.',
          shortDescription: 'Gourmet cheese platter for 10',
          categoryId: cateringCategory!.id,
          brandId: fromagerieBrand!.id,
          sellingPrice: 450,
          currency: 'AED',
          buyingPrice: 300,
          taxRate: 5,
          cityId: dubai?.id,
          countryId: uae?.id,
          stock: 20,
          lowStockThreshold: 5,
          unit: 'piece',
          weight: 1500,
          canPurchase: true,
          isActive: true,
          isFeatured: true,
          isBestSeller: true,
          tags: ['Cheese', 'Platter', 'Party', 'Gourmet'],
          image: '/images/products/cheese-platter.jpg',
          metaTitle: 'Premium Cheese Platter for 10 - Gourmet Selection',
          metaDescription: 'Order our premium cheese platter with 8 artisanal cheeses. Perfect for parties and events.',
        },
      }),

      // Dessert Buffet
      prisma.foodProduct.create({
        data: {
          name: 'Deluxe Dessert Buffet - 20 Persons',
          slug: 'deluxe-dessert-buffet-20p',
          sku: 'CAT-DES-001',
          barcode: '5678901234568',
          description: 'Complete dessert buffet including mini cakes, pastries, macarons, éclairs, tarts and more. Serves 20 people. Perfect for events and celebrations.',
          shortDescription: 'Premium dessert buffet for 20',
          categoryId: cateringCategory!.id,
          brandId: patisserieBrand!.id,
          sellingPrice: 850,
          currency: 'AED',
          buyingPrice: 550,
          taxRate: 5,
          cityId: dubai?.id,
          countryId: uae?.id,
          stock: 8,
          lowStockThreshold: 2,
          unit: 'piece',
          weight: 5000,
          canPurchase: true,
          isActive: true,
          isFeatured: true,
          tags: ['Dessert', 'Buffet', 'Party', 'Catering'],
          image: '/images/products/dessert-buffet.jpg',
        },
      }),

      // Luxury Chocolate Buffet
      prisma.foodProduct.create({
        data: {
          name: 'Luxury Chocolate Buffet - 15 Persons',
          slug: 'luxury-chocolate-buffet-15p',
          sku: 'CAT-CHO-001',
          barcode: '5678901234569',
          description: 'Indulgent chocolate buffet with truffles, pralines, chocolate fountain, brownies and more. Serves 15 people.',
          shortDescription: 'Premium chocolate buffet for 15',
          categoryId: cateringCategory!.id,
          brandId: lindtBrand!.id,
          sellingPrice: 680,
          currency: 'AED',
          buyingPrice: 450,
          taxRate: 5,
          cityId: dubai?.id,
          countryId: uae?.id,
          stock: 10,
          lowStockThreshold: 3,
          unit: 'piece',
          weight: 3500,
          canPurchase: true,
          isActive: true,
          isFeatured: true,
          tags: ['Chocolate', 'Buffet', 'Party', 'Luxury'],
          image: '/images/products/chocolate-buffet.jpg',
        },
      }),
    );

    // Créer tous les produits
    const createdProducts = await Promise.all(products);
    console.log(`✅ Created ${createdProducts.length} products`);

    // 5. Créer quelques zones de livraison
    console.log('🚚 Creating delivery zones...');
    
    const zones = await Promise.all([
      prisma.foodZone.upsert({
        where: { slug: 'dubai-downtown' },
        update: {},
        create: {
          name: 'Dubai Downtown',
          slug: 'dubai-downtown',
          description: 'Downtown Dubai and surrounding areas',
          cityId: dubai?.id,
          countryId: uae?.id,
          deliveryFee: 15,
          minOrderAmount: 50,
          freeDeliveryThreshold: 200,
          estimatedDeliveryTime: '30-45 min',
          isActive: true,
        },
      }),
      prisma.foodZone.upsert({
        where: { slug: 'dubai-marina' },
        update: {},
        create: {
          name: 'Dubai Marina',
          slug: 'dubai-marina',
          description: 'Dubai Marina and JBR area',
          cityId: dubai?.id,
          countryId: uae?.id,
          deliveryFee: 20,
          minOrderAmount: 50,
          freeDeliveryThreshold: 250,
          estimatedDeliveryTime: '45-60 min',
          isActive: true,
        },
      }),
    ]);

    console.log(`✅ Created ${zones.length} delivery zones`);

    // 6. Créer des coupons
    console.log('🎟️ Creating coupons...');
    
    const coupons = await Promise.all([
      prisma.foodCoupon.upsert({
        where: { code: 'WELCOME10' },
        update: {},
        create: {
          code: 'WELCOME10',
          description: '10% off your first order',
          discountType: 'percentage',
          discountValue: 10,
          minOrderAmount: 100,
          maxDiscountAmount: 50,
          usageLimit: 1000,
          validFrom: new Date(),
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          isActive: true,
        },
      }),
      prisma.foodCoupon.upsert({
        where: { code: 'FREESHIP' },
        update: {},
        create: {
          code: 'FREESHIP',
          description: 'Free delivery on orders above 150 AED',
          discountType: 'free_delivery',
          discountValue: 0,
          minOrderAmount: 150,
          usageLimit: null,
          validFrom: new Date(),
          validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days
          isActive: true,
        },
      }),
    ]);

    console.log(`✅ Created ${coupons.length} coupons`);

    console.log('\n🎉 Food & Grocery seed completed successfully!');
    console.log(`
Summary:
- ${categories.length} categories
- ${brands.length} brands
- ${createdProducts.length} products
- ${zones.length} delivery zones
- ${coupons.length} coupons
    `);
  } catch (error) {
    console.error('❌ Error seeding food products:', error);
    throw error;
  }
}

// Execute seed
seedFoodProducts()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
