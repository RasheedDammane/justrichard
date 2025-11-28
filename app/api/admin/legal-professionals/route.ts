import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/admin/legal-professionals
 * List legal professionals with filters and pagination
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const city = searchParams.get('city');
    const country = searchParams.get('country');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');

    const where: any = {};

    if (status) where.status = status;
    if (type) where.type = type;
    if (city) where.city = { contains: city, mode: 'insensitive' };
    if (country) where.country = { contains: country, mode: 'insensitive' };
    if (featured === 'true') where.featured = true;
    if (featured === 'false') where.featured = false;

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { headline: { contains: search, mode: 'insensitive' } },
        { bio: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.legalProfessional.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: [
          { featured: 'desc' },
          { priorityOrder: 'asc' },
          { createdAt: 'desc' },
        ],
      }),
      prisma.legalProfessional.count({ where }),
    ]);

    return NextResponse.json({
      items,
      page,
      pageSize,
      total,
    });
  } catch (error: any) {
    console.error('Error fetching legal professionals:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * POST /api/admin/legal-professionals
 * Create a new legal professional
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    // Validation robuste
    const errors: string[] = [];

    // Required fields
    if (!data.name?.trim()) errors.push('Name is required');
    if (!data.slug?.trim()) errors.push('Slug is required');
    if (!data.type) errors.push('Type is required');
    if (!data.status) errors.push('Status is required');

    // Type validation
    const validTypes = ['LAWYER', 'LAW_FIRM', 'LEGAL_ADVISOR', 'NOTARY'];
    if (data.type && !validTypes.includes(data.type)) {
      errors.push('Invalid type');
    }

    // Status validation
    const validStatuses = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];
    if (data.status && !validStatuses.includes(data.status)) {
      errors.push('Invalid status');
    }

    // Slug format validation
    if (data.slug && !/^[a-z0-9-]+$/.test(data.slug)) {
      errors.push('Slug must contain only lowercase letters, numbers, and hyphens');
    }

    // Email validation
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('Invalid email format');
    }

    // URL validations
    const urlFields = ['websiteUrl', 'linkedInUrl', 'facebookUrl', 'twitterUrl', 'bookingUrl', 'profilePictureUrl', 'coverImageUrl'];
    urlFields.forEach(field => {
      if (data[field] && data[field].trim() && !data[field].startsWith('http')) {
        errors.push(`${field} must be a valid URL starting with http:// or https://`);
      }
    });

    // Languages validation
    if (data.languages && (!Array.isArray(data.languages) || data.languages.length === 0)) {
      errors.push('At least one language is required');
    }

    // Practice areas validation
    if (data.practiceAreas && !Array.isArray(data.practiceAreas)) {
      errors.push('Practice areas must be an array');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    // Check slug uniqueness
    const existing = await prisma.legalProfessional.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Slug already exists. Please choose a different slug.' },
        { status: 400 }
      );
    }

    // Validate PUBLISHED status requirements
    if (data.status === 'PUBLISHED') {
      const publishErrors: string[] = [];
      
      if (!data.city?.trim()) publishErrors.push('City is required for published professionals');
      if (!data.country?.trim()) publishErrors.push('Country is required for published professionals');
      if (!data.practiceAreas || data.practiceAreas.length === 0) {
        publishErrors.push('At least one practice area is required for published professionals');
      }
      if (!data.email?.trim() && !data.phone?.trim()) {
        publishErrors.push('Email or phone is required for published professionals');
      }

      if (publishErrors.length > 0) {
        return NextResponse.json(
          { error: 'Cannot publish: missing required fields', details: publishErrors },
          { status: 400 }
        );
      }
    }

    // Validate booking requirements
    if (data.isBookableOnline && !data.bookingUrl?.trim()) {
      return NextResponse.json(
        { error: 'Booking URL is required when online booking is enabled' },
        { status: 400 }
      );
    }

    const professional = await prisma.legalProfessional.create({
      data: {
        ...data,
        createdByAdminId: session.user.id,
        lastModifiedByAdminId: session.user.id,
      },
    });

    return NextResponse.json(professional, { status: 201 });
  } catch (error: any) {
    console.error('Error creating legal professional:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
