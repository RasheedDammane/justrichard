const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Updating existing properties with new fields...\n');

  try {
    // Get all properties
    const properties = await prisma.property.findMany({
      include: {
        City: true,
        Country: true,
      }
    });

    console.log(`📊 Found ${properties.length} properties to update\n`);

    for (const property of properties) {
      console.log(`Updating: ${property.name}`);

      // Prepare update data based on property type
      const updateData = {
        // Normalize status to lowercase
        status: property.status ? property.status.toLowerCase() : 'draft',
        
        // Normalize type to lowercase
        type: property.type ? property.type.toLowerCase() : 'apartment',
        
        // Normalize listingType
        listingType: property.listingType || 'sale',
        
        // Add default currency if missing
        currency: property.currency || 'AED',
        
        // Add area postfix
        areaPostfix: property.areaPostfix || 'm²',
        
        // Set default values for new fields
        enablePricePlaceholder: false,
        customSlider: false,
        loginRequired: false,
        furnished: property.furnished || false,
        isFeatured: property.isFeatured || false,
        isActive: property.isActive !== false,
        isAvailable: property.isAvailable !== false,
        
        // Add default author type
        authorType: property.authorType || 'author',
        
        // Stats
        views: property.views || 0,
        bookings: property.bookings || 0,
      };

      // Add sample prices based on type if missing
      if (!property.salePrice && !property.rentPrice) {
        if (property.type === 'VILLA' || property.type === 'villa') {
          updateData.salePrice = 3500000;
          updateData.listingType = 'sale';
        } else if (property.type === 'APARTMENT' || property.type === 'apartment') {
          updateData.rentPrice = 6500;
          updateData.listingType = 'rent';
        } else if (property.type === 'STUDIO' || property.type === 'studio') {
          updateData.rentPrice = 4000;
          updateData.listingType = 'rent';
        } else if (property.type === 'TOWNHOUSE' || property.type === 'townhouse') {
          updateData.salePrice = 2800000;
          updateData.listingType = 'sale';
        } else if (property.type === 'LAND' || property.type === 'land') {
          updateData.salePrice = 1500000;
          updateData.listingType = 'sale';
        }
      }

      // Add sample bedrooms/bathrooms if missing
      if (!property.bedrooms) {
        if (property.type === 'STUDIO' || property.type === 'studio') {
          updateData.bedrooms = 0;
          updateData.bathrooms = 1;
          updateData.rooms = 1;
        } else if (property.type === 'VILLA' || property.type === 'villa') {
          updateData.bedrooms = 4;
          updateData.bathrooms = 5;
          updateData.rooms = 8;
        } else if (property.type === 'TOWNHOUSE' || property.type === 'townhouse') {
          updateData.bedrooms = 3;
          updateData.bathrooms = 3;
          updateData.rooms = 6;
        } else {
          updateData.bedrooms = 2;
          updateData.bathrooms = 2;
          updateData.rooms = 4;
        }
      }

      // Add sample area if missing
      if (!property.area) {
        if (property.type === 'STUDIO' || property.type === 'studio') {
          updateData.area = 45;
        } else if (property.type === 'VILLA' || property.type === 'villa') {
          updateData.area = 450;
        } else if (property.type === 'TOWNHOUSE' || property.type === 'townhouse') {
          updateData.area = 220;
        } else if (property.type === 'LAND' || property.type === 'land') {
          updateData.area = 500;
        } else {
          updateData.area = 120;
        }
      }

      // Add year built
      if (!property.yearBuilt) {
        updateData.yearBuilt = 2022;
      }

      // Add property ID
      if (!property.propertyId) {
        const prefix = property.type ? property.type.substring(0, 2).toUpperCase() : 'PR';
        updateData.propertyId = `${prefix}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
      }

      // Update the property
      await prisma.property.update({
        where: { id: property.id },
        data: updateData,
      });

      console.log(`✅ Updated: ${property.name}`);
      console.log(`   - Status: ${updateData.status}`);
      console.log(`   - Type: ${updateData.type}`);
      console.log(`   - Listing: ${updateData.listingType}`);
      if (updateData.salePrice) console.log(`   - Sale Price: ${updateData.salePrice} ${updateData.currency}`);
      if (updateData.rentPrice) console.log(`   - Rent Price: ${updateData.rentPrice} ${updateData.currency}`);
      console.log(`   - Bedrooms: ${updateData.bedrooms || property.bedrooms}`);
      console.log(`   - Area: ${updateData.area || property.area}${updateData.areaPostfix}`);
      console.log(`   - Property ID: ${updateData.propertyId}\n`);
    }

    console.log('✅ All properties updated successfully!');
    
    // Display summary
    const updated = await prisma.property.findMany({
      select: {
        id: true,
        name: true,
        type: true,
        status: true,
        listingType: true,
        salePrice: true,
        rentPrice: true,
        currency: true,
        bedrooms: true,
        area: true,
        propertyId: true,
      }
    });

    console.log('\n📊 SUMMARY:');
    console.log('-----------------------------------');
    updated.forEach(p => {
      console.log(`${p.name}`);
      console.log(`  Type: ${p.type} | Status: ${p.status} | Listing: ${p.listingType}`);
      console.log(`  Price: ${p.salePrice || p.rentPrice} ${p.currency} | Beds: ${p.bedrooms} | Area: ${p.area}m²`);
      console.log(`  ID: ${p.propertyId}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
