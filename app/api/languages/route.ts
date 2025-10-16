import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') === 'true';

    let whereClause: any = {};
    if (activeOnly) {
      whereClause.isActive = true;
    }

    const languages = await prisma.language.findMany({
      where: whereClause,
      orderBy: [
        { isDefault: 'desc' },
        { name: 'asc' },
      ],
    });

    const defaultLanguage = languages.find(l => l.isDefault);

    return NextResponse.json({ 
      languages,
      defaultLanguage,
    });
  } catch (error) {
    console.error('Error fetching languages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch languages' },
      { status: 500 }
    );
  }
}
