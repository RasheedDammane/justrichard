import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import crypto from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET - Liste des claims (admin ou user)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    
    const status = searchParams.get('status');
    const userId = searchParams.get('userId');

    const where: any = {};

    if (status) {
      where.status = status;
    }

    // Si pas admin, ne voir que ses propres claims
    if (session?.user?.role !== 'ADMIN' && session?.user?.id) {
      where.claimantUserId = session.user.id;
    } else if (userId) {
      where.claimantUserId = userId;
    }

    const claims = await prisma.businessClaim.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        claimantUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: claims,
      count: claims.length
    });
  } catch (error: any) {
    console.error('Error fetching claims:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Créer un claim
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();

    const {
      googlePlaceId,
      businessName,
      address,
      city,
      state,
      country,
      countryCode,
      postalCode,
      phone,
      internationalPhone,
      website,
      category,
      categoryId,
      businessStatus,
      latitude,
      longitude,
      vicinity,
      plusCode,
      openingHours,
      rating,
      userRatingsTotal,
      priceLevel,
      delivery,
      dineIn,
      takeout,
      reservable,
      wheelchairAccessible,
      photos,
      icon,
      googleData,
      facebook,
      instagram,
      twitter,
      linkedin,
      youtube,
      tiktok,
      websiteAnalysis,
      claimantName,
      claimantEmail,
      claimantPhone,
      claimantRole,
      verificationMethod,
    } = body;

    // Validation
    if (!businessName || !claimantName || !claimantEmail) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: businessName, claimantName, claimantEmail' },
        { status: 400 }
      );
    }

    // Vérifier si le business n'est pas déjà claimed
    if (googlePlaceId) {
      const existingClaim = await prisma.businessClaim.findFirst({
        where: {
          googlePlaceId,
          status: { in: ['pending', 'verified', 'approved'] },
        },
      });

      if (existingClaim) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'This business has already been claimed',
            existingClaim: {
              status: existingClaim.status,
              claimantEmail: existingClaim.claimantEmail,
              createdAt: existingClaim.createdAt
            },
          },
          { status: 409 }
        );
      }
    }

    // Générer un token de vérification
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const claim = await prisma.businessClaim.create({
      data: {
        // Business Info
        googlePlaceId,
        businessName,
        address,
        city,
        state,
        country,
        countryCode,
        postalCode,
        phone,
        internationalPhone,
        website,
        category,
        categoryId: categoryId || null,
        businessStatus,
        
        // Location
        latitude,
        longitude,
        vicinity,
        plusCode,
        
        // Horaires
        openingHours,
        
        // Avis et notes
        rating,
        userRatingsTotal,
        priceLevel,
        
        // Services
        delivery,
        dineIn,
        takeout,
        reservable,
        wheelchairAccessible,
        
        // Photos
        photos: photos || [],
        icon,
        
        // Réseaux sociaux
        facebook,
        instagram,
        twitter,
        linkedin,
        youtube,
        tiktok,
        
        // SEO et site web
        hasRobotsTxt: websiteAnalysis?.seo?.hasRobotsTxt,
        hasSitemap: websiteAnalysis?.seo?.hasSitemap,
        sitemapUrl: websiteAnalysis?.seo?.sitemapUrl,
        websiteAnalysis,
        
        // Données complètes
        googleData,
        
        // Claim Info
        claimantUserId: session?.user?.id,
        claimantName,
        claimantEmail,
        claimantPhone,
        claimantRole: claimantRole || 'Owner',
        verificationMethod: verificationMethod || 'email',
        verificationToken,
        verificationCode,
        verificationSentAt: new Date(),
        status: 'pending',
      },
    });

    // TODO: Envoyer l'email de vérification
    // await sendVerificationEmail(claimantEmail, verificationCode, verificationToken);

    return NextResponse.json({
      success: true,
      data: claim,
      message: 'Business claim submitted successfully. Please check your email for verification.',
    });
  } catch (error: any) {
    console.error('Error creating claim:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
