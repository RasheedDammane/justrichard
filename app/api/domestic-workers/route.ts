import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Filters
    const category = searchParams.get('category');
    const subCategory = searchParams.get('subCategory');
    const country = searchParams.get('country');
    const cityId = searchParams.get('cityId');
    const employmentType = searchParams.get('employmentType');
    const experienceLevel = searchParams.get('experienceLevel');
    const language = searchParams.get('language');
    const minRating = searchParams.get('minRating');
    const liveInOnly = searchParams.get('liveInOnly') === 'true';
    const liveOutOnly = searchParams.get('liveOutOnly') === 'true';
    const drivingLicense = searchParams.get('drivingLicense') === 'true';
    const healthCertificate = searchParams.get('healthCertificate') === 'true';
    const backgroundCheck = searchParams.get('backgroundCheck') === 'true';
    const verifiedOnly = searchParams.get('verifiedOnly') === 'true';
    const availableOnly = searchParams.get('availableOnly') === 'true';
    const gender = searchParams.get('gender');
    const nationality = searchParams.get('nationality');
    
    // Sorting
    const sortBy = searchParams.get('sortBy') || 'relevance';

    let whereClause: any = {
      status: 'approved',
    };

    if (category) {
      whereClause.category = category;
    }

    if (subCategory) {
      whereClause.subCategories = {
        has: subCategory,
      };
    }

    if (country) {
      whereClause.countries = {
        has: country,
      };
    }

    if (cityId) {
      whereClause.cityId = cityId;
    }

    if (employmentType) {
      whereClause.employmentTypes = {
        has: employmentType,
      };
    }

    if (experienceLevel) {
      whereClause.experienceLevel = experienceLevel;
    }

    if (language) {
      whereClause.languages = {
        has: language,
      };
    }

    if (minRating) {
      whereClause.rating = {
        gte: parseFloat(minRating),
      };
    }

    if (liveInOnly) {
      whereClause.liveInAvailable = true;
    }

    if (liveOutOnly) {
      whereClause.liveOutAvailable = true;
    }

    if (drivingLicense) {
      whereClause.drivingLicense = true;
    }

    if (healthCertificate) {
      whereClause.healthCertificate = true;
    }

    if (backgroundCheck) {
      whereClause.backgroundCheck = true;
    }

    if (verifiedOnly) {
      whereClause.verified = true;
    }

    if (availableOnly) {
      whereClause.isAvailable = true;
    }

    if (gender) {
      whereClause.gender = gender;
    }

    if (nationality) {
      whereClause.nationality = nationality;
    }

    // Sorting
    let orderBy: any = [];
    
    if (sortBy === 'relevance') {
      orderBy = [
        { verified: 'desc' },
        { rating: 'desc' },
        { yearsExperience: 'desc' },
        { totalJobs: 'desc' },
      ];
    } else if (sortBy === 'price_asc') {
      orderBy = [{ monthlyRate: 'asc' }];
    } else if (sortBy === 'rating') {
      orderBy = [{ rating: 'desc' }, { reviewCount: 'desc' }];
    } else if (sortBy === 'experience') {
      orderBy = [{ yearsExperience: 'desc' }];
    } else if (sortBy === 'recent') {
      orderBy = [{ createdAt: 'desc' }];
    }

    const workers = await prisma.domesticWorker.findMany({
      where: whereClause,
      include: {
        city: {
          include: {
          },
        },
        reviews: {
          where: { isVisible: true },
          orderBy: { createdAt: 'desc' },
          take: 3,
          select: {
            id: true,
            rating: true,
            punctuality: true,
            professionalism: true,
            quality: true,
            communication: true,
            comment: true,
            createdAt: true,
          },
        },
        _count: {
          select: {
            jobs: true,
            reviews: true,
          },
        },
      },
      orderBy,
      take: 50,
    });

    return NextResponse.json({ 
      workers,
      total: workers.length,
    });
  } catch (error) {
    console.error('Error fetching domestic workers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch domestic workers' },
      { status: 500 }
    );
  }
}
