import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const city = await prisma.city.findUnique({
      where: { id: params.id },
      include: {
        Country: true,
        Region: true,
      },
    });

    if (!city) {
      return NextResponse.json(
        { success: false, error: 'City not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: city });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const city = await prisma.city.update({
      where: { id: params.id },
      data: {
        name: body.name,
        nameAr: body.nameAr || null,
        nameFr: body.nameFr || null,
        nameTh: body.nameTh || null,
        nameRu: body.nameRu || null,
        nameKo: body.nameKo || null,
        nameEs: body.nameEs || null,
        nameVi: body.nameVi || null,
        nameTl: body.nameTl || null,
        nameIt: body.nameIt || null,
        nameNo: body.nameNo || null,
        nameTr: body.nameTr || null,
        namePt: body.namePt || null,
        nameAf: body.nameAf || null,
        nameJa: body.nameJa || null,
        nameDe: body.nameDe || null,
        slug: body.slug,
        description: body.description || null,
        latitude: body.latitude || null,
        longitude: body.longitude || null,
        icon: body.icon || null,
        thumbnail: body.thumbnail || null,
        images: body.images || [],
        metaTitle: body.metaTitle || null,
        metaDescription: body.metaDescription || null,
        keywords: body.keywords || [],
        isActive: body.isActive,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, data: city });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.city.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      success: true,
      message: 'City deleted successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
