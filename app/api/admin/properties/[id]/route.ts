import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    // Convert string numbers to actual numbers if present
    const propertyData: any = {};
    
    // String fields
    if (data.name !== undefined) propertyData.name = data.name;
    if (data.slug !== undefined) propertyData.slug = data.slug;
    if (data.description !== undefined) propertyData.description = data.description;
    if (data.type !== undefined) propertyData.type = data.type;
    if (data.status !== undefined) propertyData.status = data.status;
    if (data.listingType !== undefined) propertyData.listingType = data.listingType;
    if (data.currency !== undefined) propertyData.currency = data.currency;
    if (data.areaPostfix !== undefined) propertyData.areaPostfix = data.areaPostfix;
    if (data.propertyId !== undefined) propertyData.propertyId = data.propertyId;
    if (data.address !== undefined) propertyData.address = data.address;
    if (data.streetAddress !== undefined) propertyData.streetAddress = data.streetAddress;
    if (data.zipCode !== undefined) propertyData.zipCode = data.zipCode;
    if (data.cityId !== undefined) propertyData.cityId = data.cityId;
    if (data.countryId !== undefined) propertyData.countryId = data.countryId;
    if (data.metaTitle !== undefined) propertyData.metaTitle = data.metaTitle;
    if (data.metaDescription !== undefined) propertyData.metaDescription = data.metaDescription;
    
    // Number fields
    if (data.salePrice) propertyData.salePrice = parseFloat(data.salePrice);
    if (data.rentPrice) propertyData.rentPrice = parseFloat(data.rentPrice);
    if (data.secondPrice) propertyData.secondPrice = parseFloat(data.secondPrice);
    if (data.bedrooms !== undefined) propertyData.bedrooms = data.bedrooms ? parseInt(data.bedrooms) : null;
    if (data.bathrooms !== undefined) propertyData.bathrooms = data.bathrooms ? parseInt(data.bathrooms) : null;
    if (data.rooms !== undefined) propertyData.rooms = data.rooms ? parseInt(data.rooms) : null;
    if (data.garages !== undefined) propertyData.garages = data.garages ? parseInt(data.garages) : null;
    if (data.area !== undefined) propertyData.area = data.area ? parseFloat(data.area) : null;
    if (data.landArea !== undefined) propertyData.landArea = data.landArea ? parseFloat(data.landArea) : null;
    if (data.floor !== undefined) propertyData.floor = data.floor ? parseInt(data.floor) : null;
    if (data.yearBuilt !== undefined) propertyData.yearBuilt = data.yearBuilt ? parseInt(data.yearBuilt) : null;
    if (data.latitude !== undefined) propertyData.latitude = data.latitude ? parseFloat(data.latitude) : null;
    if (data.longitude !== undefined) propertyData.longitude = data.longitude ? parseFloat(data.longitude) : null;
    
    // Boolean fields
    if (data.furnished !== undefined) propertyData.furnished = Boolean(data.furnished);
    if (data.isFeatured !== undefined) propertyData.isFeatured = Boolean(data.isFeatured);
    if (data.isActive !== undefined) propertyData.isActive = Boolean(data.isActive);
    if (data.isAvailable !== undefined) propertyData.isAvailable = Boolean(data.isAvailable);
    if (data.thaiCompany !== undefined) propertyData.thaiCompany = Boolean(data.thaiCompany);
    
    // Thailand Quota fields
    if (data.foreignQuota !== undefined) propertyData.foreignQuota = data.foreignQuota ? parseFloat(data.foreignQuota) : null;
    if (data.thaiQuota !== undefined) propertyData.thaiQuota = data.thaiQuota ? parseFloat(data.thaiQuota) : null;
    
    // Additional string fields
    if (data.category !== undefined) propertyData.category = data.category;
    if (data.pricePrefix !== undefined) propertyData.pricePrefix = data.pricePrefix;
    if (data.pricePostfix !== undefined) propertyData.pricePostfix = data.pricePostfix;
    if (data.landAreaPostfix !== undefined) propertyData.landAreaPostfix = data.landAreaPostfix;
    if (data.video !== undefined) propertyData.video = data.video;
    if (data.virtualTour !== undefined) propertyData.virtualTour = data.virtualTour;
    
    // Additional number fields
    if (data.garageSize !== undefined) propertyData.garageSize = data.garageSize ? parseFloat(data.garageSize) : null;
    
    // JSON fields - parse if string
    if (data.images !== undefined) {
      propertyData.images = typeof data.images === 'string' ? JSON.parse(data.images) : data.images;
    }
    if (data.features !== undefined) {
      propertyData.features = typeof data.features === 'string' ? JSON.parse(data.features) : data.features;
    }
    if (data.amenities !== undefined) {
      propertyData.amenities = typeof data.amenities === 'string' ? JSON.parse(data.amenities) : data.amenities;
    }
    if (data.floorPlans !== undefined) {
      propertyData.floorPlans = typeof data.floorPlans === 'string' ? JSON.parse(data.floorPlans) : data.floorPlans;
    }
    if (data.documents !== undefined) {
      propertyData.documents = typeof data.documents === 'string' ? JSON.parse(data.documents) : data.documents;
    }

    const property = await prisma.property.update({
      where: { id: params.id },
      data: propertyData,
    });

    return NextResponse.json(property);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.property.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
