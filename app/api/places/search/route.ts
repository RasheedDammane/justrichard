import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const location = searchParams.get('location'); // lat,lng
    const radius = searchParams.get('radius') || '50000'; // 50km par défaut

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    if (!GOOGLE_PLACES_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Google Places API key not configured' },
        { status: 500 }
      );
    }

    // Utiliser Text Search (New) API
    const url = new URL('https://places.googleapis.com/v1/places:searchText');
    
    const requestBody = {
      textQuery: query,
      ...(location && {
        locationBias: {
          circle: {
            center: {
              latitude: parseFloat(location.split(',')[0]),
              longitude: parseFloat(location.split(',')[1])
            },
            radius: parseFloat(radius)
          }
        }
      })
    };

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.types,places.businessStatus,places.rating,places.userRatingCount,places.priceLevel,places.photos,places.nationalPhoneNumber,places.internationalPhoneNumber,places.websiteUri,places.googleMapsUri'
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Google Places API error:', data);
      return NextResponse.json(
        { success: false, error: data.error?.message || 'Failed to search places' },
        { status: response.status }
      );
    }

    // Transformer les résultats au format attendu
    const results = (data.places || []).map((place: any) => ({
      placeId: place.id,
      name: place.displayName?.text || '',
      address: place.formattedAddress || '',
      vicinity: place.formattedAddress || '',
      location: {
        lat: place.location?.latitude || 0,
        lng: place.location?.longitude || 0
      },
      types: place.types || [],
      businessStatus: place.businessStatus || 'OPERATIONAL',
      rating: place.rating,
      userRatingsTotal: place.userRatingCount,
      priceLevel: place.priceLevel,
      photos: place.photos || [],
      phone: place.nationalPhoneNumber,
      internationalPhone: place.internationalPhoneNumber,
      website: place.websiteUri,
      googleMapsUrl: place.googleMapsUri
    }));

    return NextResponse.json({
      success: true,
      data: results,
      count: results.length
    });
  } catch (error: any) {
    console.error('Error searching places:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
