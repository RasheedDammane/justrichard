import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const placeId = searchParams.get('placeId');

    if (!placeId) {
      return NextResponse.json(
        { success: false, error: 'placeId parameter is required' },
        { status: 400 }
      );
    }

    if (!GOOGLE_PLACES_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Google Places API key not configured' },
        { status: 500 }
      );
    }

    // Utiliser Place Details (New) API
    const url = `https://places.googleapis.com/v1/${placeId}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
        'X-Goog-FieldMask': 'id,displayName,formattedAddress,location,types,businessStatus,rating,userRatingCount,priceLevel,photos,nationalPhoneNumber,internationalPhoneNumber,websiteUri,googleMapsUri,currentOpeningHours,regularOpeningHours,addressComponents,plusCode,servesBreakfast,servesBrunch,servesLunch,servesDinner,servesBeer,servesWine,servesVegetarianFood,delivery,dineIn,takeout,reservable,wheelchairAccessibleEntrance,parkingOptions,paymentOptions,outdoorSeating,liveMusic,menuForChildren,servesCocktails,servesDessert,servesCoffee,goodForChildren,goodForGroups,goodForWatchingSports,restroom,editorialSummary,reviews'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Google Places API error:', data);
      return NextResponse.json(
        { success: false, error: data.error?.message || 'Failed to fetch place details' },
        { status: response.status }
      );
    }

    // Extraire les composants d'adresse
    const addressComponents: any = {};
    if (data.addressComponents) {
      data.addressComponents.forEach((component: any) => {
        const types = component.types || [];
        if (types.includes('street_number')) {
          addressComponents.streetNumber = component.longText;
        }
        if (types.includes('route')) {
          addressComponents.street = component.longText;
        }
        if (types.includes('locality')) {
          addressComponents.city = component.longText;
        }
        if (types.includes('administrative_area_level_1')) {
          addressComponents.state = component.longText;
        }
        if (types.includes('country')) {
          addressComponents.country = component.longText;
          addressComponents.countryCode = component.shortText;
        }
        if (types.includes('postal_code')) {
          addressComponents.postalCode = component.longText;
        }
      });
    }

    // Transformer les données au format attendu
    const placeDetails = {
      placeId: data.id,
      name: data.displayName?.text || '',
      address: data.formattedAddress || '',
      vicinity: data.formattedAddress || '',
      location: {
        lat: data.location?.latitude || 0,
        lng: data.location?.longitude || 0
      },
      types: data.types || [],
      businessStatus: data.businessStatus || 'OPERATIONAL',
      rating: data.rating,
      userRatingsTotal: data.userRatingCount,
      priceLevel: data.priceLevel,
      photos: data.photos || [],
      phone: data.nationalPhoneNumber,
      internationalPhone: data.internationalPhoneNumber,
      website: data.websiteUri,
      googleMapsUrl: data.googleMapsUri,
      plusCode: data.plusCode?.globalCode,
      
      // Opening Hours
      openingHours: data.currentOpeningHours || data.regularOpeningHours,
      
      // Address Components
      addressComponents,
      
      // Services
      services: {
        delivery: data.delivery,
        dineIn: data.dineIn,
        takeout: data.takeout,
        reservable: data.reservable,
        breakfast: data.servesBreakfast,
        brunch: data.servesBrunch,
        lunch: data.servesLunch,
        dinner: data.servesDinner,
        vegetarian: data.servesVegetarianFood,
        outdoor: data.outdoorSeating,
        liveMusic: data.liveMusic,
        goodForChildren: data.goodForChildren,
        goodForGroups: data.goodForGroups
      },
      
      // Accessibility
      wheelchairAccessible: data.wheelchairAccessibleEntrance,
      
      // Reviews
      reviews: data.reviews || [],
      
      // Editorial Summary
      editorialSummary: data.editorialSummary?.text,
      
      // Raw data
      rawData: data
    };

    return NextResponse.json({
      success: true,
      data: placeDetails
    });
  } catch (error: any) {
    console.error('Error fetching place details:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
