import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

// GET - Récupérer le branding du footer
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';

    const branding = await prisma.footerBranding.findUnique({
      where: { locale },
    });

    return NextResponse.json(branding || {});
  } catch (error) {
    console.error('Error fetching footer branding:', error);
    return NextResponse.json(
      { error: 'Failed to fetch footer branding' },
      { status: 500 }
    );
  }
}

// POST - Créer ou mettre à jour le branding du footer
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { locale, ...rest } = data;

    const branding = await prisma.footerBranding.upsert({
      where: { locale },
      create: { locale, ...rest },
      update: rest,
    });

    return NextResponse.json(branding);
  } catch (error) {
    console.error('Error updating footer branding:', error);
    return NextResponse.json(
      { error: 'Failed to update footer branding' },
      { status: 500 }
    );
  }
}
