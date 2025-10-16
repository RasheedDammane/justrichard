import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Filters
    const coachingType = searchParams.get('coachingType');
    const specialization = searchParams.get('specialization');
    const country = searchParams.get('country');
    const cityId = searchParams.get('cityId');
    const format = searchParams.get('format'); // online, in_person, group
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const language = searchParams.get('language');
    const minRating = searchParams.get('minRating');
    const freeConsultation = searchParams.get('freeConsultation') === 'true';
    const verifiedOnly = searchParams.get('verifiedOnly') === 'true';
    const availableOnly = searchParams.get('availableOnly') === 'true';
    
    // Sorting
    const sortBy = searchParams.get('sortBy') || 'relevance'; // relevance, price_asc, rating, recent

    let whereClause: any = {
      status: 'approved', // Only show approved coaches
    };

    // Type filter (supports multiple types)
    if (coachingType) {
      whereClause.coachingTypes = {
        has: coachingType,
      };
    }

    // Specialization filter
    if (specialization) {
      whereClause.specializations = {
        has: specialization,
      };
    }

    // Country filter (supports multiple countries)
    if (country) {
      whereClause.countries = {
        has: country,
      };
    }

    // City filter
    if (cityId) {
      whereClause.cityId = cityId;
    }

    // Format filters
    if (format === 'online') whereClause.offersOnline = true;
    if (format === 'in_person') whereClause.offersInPerson = true;
    if (format === 'group') whereClause.offersGroup = true;

    // Price filter
    if (minPrice || maxPrice) {
      whereClause.oneOnOneRate = {};
      if (minPrice) whereClause.oneOnOneRate.gte = parseFloat(minPrice);
      if (maxPrice) whereClause.oneOnOneRate.lte = parseFloat(maxPrice);
    }

    // Language filter
    if (language) {
      whereClause.languages = {
        has: language,
      };
    }

    // Rating filter
    if (minRating) {
      whereClause.rating = {
        gte: parseFloat(minRating),
      };
    }

    // Free consultation filter
    if (freeConsultation) {
      whereClause.freeConsultation = true;
    }

    // Verified filter
    if (verifiedOnly) {
      whereClause.verified = true;
    }

    // Available filter
    if (availableOnly) {
      whereClause.isAvailable = true;
    }

    // Sorting logic
    let orderBy: any = [];
    
    if (sortBy === 'relevance') {
      // Relevance score: rating*0.4 + experience*0.3 + activity*0.2 + language*0.1
      orderBy = [
        { verified: 'desc' },
        { rating: 'desc' },
        { yearsExperience: 'desc' },
        { totalSessions: 'desc' },
      ];
    } else if (sortBy === 'price_asc') {
      orderBy = [{ oneOnOneRate: 'asc' }];
    } else if (sortBy === 'rating') {
      orderBy = [{ rating: 'desc' }, { reviewCount: 'desc' }];
    } else if (sortBy === 'recent') {
      orderBy = [{ createdAt: 'desc' }];
    } else if (sortBy === 'popular') {
      orderBy = [{ totalSessions: 'desc' }, { totalClients: 'desc' }];
    }

    const coaches = await prisma.coach.findMany({
      where: whereClause,
      include: {
        city: {
          include: {
          },
        },
        packages: {
          where: { isActive: true },
          orderBy: { numberOfSessions: 'asc' },
        },
        reviews: {
          where: { isVisible: true },
          orderBy: { createdAt: 'desc' },
          take: 3,
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
            userId: true,
          },
        },
        _count: {
          select: {
            sessions: true,
            reviews: true,
          },
        },
      },
      orderBy,
      take: 50, // Limit results
    });

    // Calculate relevance score for each coach (if sorting by relevance)
    const coachesWithScore = coaches.map(coach => {
      let relevanceScore = 0;
      if (sortBy === 'relevance') {
        relevanceScore = 
          (coach.rating * 0.4) +
          (Math.min(coach.yearsExperience / 10, 1) * 0.3) +
          (Math.min(coach.totalSessions / 100, 1) * 0.2) +
          (language && coach.languages.includes(language) ? 0.1 : 0);
      }
      
      return {
        ...coach,
        relevanceScore: Math.round(relevanceScore * 100) / 100,
      };
    });

    return NextResponse.json({ 
      coaches: coachesWithScore,
      total: coachesWithScore.length,
    });
  } catch (error) {
    console.error('Error fetching coaches:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coaches' },
      { status: 500 }
    );
  }
}
