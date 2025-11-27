import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

// GET - Récupérer toutes les actions de la navbar
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';

    const actions = await prisma.navbarAction.findMany({
      where: { locale },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(actions);
  } catch (error) {
    console.error('Error fetching navbar actions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch navbar actions' },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle action
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const action = await prisma.navbarAction.create({
      data,
    });

    return NextResponse.json(action);
  } catch (error) {
    console.error('Error creating navbar action:', error);
    return NextResponse.json(
      { error: 'Failed to create navbar action' },
      { status: 500 }
    );
  }
}
