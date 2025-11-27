import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

// GET - Récupérer la configuration du header
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';

    const headerConfig = await prisma.headerConfig.findUnique({
      where: { locale },
    });

    return NextResponse.json(headerConfig || {});
  } catch (error) {
    console.error('Error fetching header config:', error);
    return NextResponse.json(
      { error: 'Failed to fetch header config' },
      { status: 500 }
    );
  }
}

// POST - Créer ou mettre à jour la configuration du header
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { locale, ...rest } = data;

    const headerConfig = await prisma.headerConfig.upsert({
      where: { locale },
      create: { locale, ...rest },
      update: rest,
    });

    return NextResponse.json(headerConfig);
  } catch (error) {
    console.error('Error updating header config:', error);
    return NextResponse.json(
      { error: 'Failed to update header config' },
      { status: 500 }
    );
  }
}
