import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { stringify } from 'csv-stringify/sync';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all properties
    const properties = await prisma.property.findMany({
      include: {
        city: true,
        country: true,
        priceCurrency: true,
        media: {
          include: { media: true },
          orderBy: { order: 'asc' },
        },
        features: {
          include: { feature: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Convert to CSV format
    const csvData = properties.map(p => ({
      property_id: p.id,
      property_title: p.title || '',
      property_description: p.description || '',
      property_price: p.price || '',
      property_price_postfix: p.pricePostfix || '',
      property_status: p.status,
      property_type: p.type,
      property_address: p.addressLine1 || '',
      property_city: p.city?.name || '',
      property_state: '',
      property_country: p.country?.name || '',
      property_lat: p.latitude || '',
      property_lng: p.longitude || '',
      property_size: p.areaSize || '',
      property_size_unit: p.areaUnit || '',
      property_bedrooms: p.bedrooms || '',
      property_bathrooms: p.bathrooms || '',
      property_parking: p.parkingSpaces || '',
      property_year_built: p.yearBuilt || '',
      property_features: p.features.map(f => f.feature.key).join(','),
      property_images: p.media.map(m => m.media.url).join(','),
      property_featured_image: p.media[0]?.media.url || '',
      slug: p.slug,
      is_featured: p.isFeatured ? '1' : '0',
      visibility: p.visibility,
      views: p.views,
      created_at: p.createdAt.toISOString(),
      updated_at: p.updatedAt.toISOString(),
    }));

    // Generate CSV
    const csv = stringify(csvData, {
      header: true,
      columns: [
        'property_id',
        'property_title',
        'property_description',
        'property_price',
        'property_price_postfix',
        'property_status',
        'property_type',
        'property_address',
        'property_city',
        'property_state',
        'property_country',
        'property_lat',
        'property_lng',
        'property_size',
        'property_size_unit',
        'property_bedrooms',
        'property_bathrooms',
        'property_parking',
        'property_year_built',
        'property_features',
        'property_images',
        'property_featured_image',
        'slug',
        'is_featured',
        'visibility',
        'views',
        'created_at',
        'updated_at',
      ],
    });

    // Return CSV file
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="properties_export_${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });

  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Export failed: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
