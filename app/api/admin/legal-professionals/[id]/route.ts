import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/admin/legal-professionals/[id]
 * Get a single legal professional by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const professional = await prisma.legalProfessional.findUnique({
      where: { id: params.id },
    });

    if (!professional) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(professional);
  } catch (error: any) {
    console.error('Error fetching legal professional:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * PUT /api/admin/legal-professionals/[id]
 * Update a legal professional
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    // Check if exists
    const existing = await prisma.legalProfessional.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Check slug uniqueness if changed
    if (data.slug && data.slug !== existing.slug) {
      const slugExists = await prisma.legalProfessional.findUnique({
        where: { slug: data.slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: 'Slug already exists' },
          { status: 400 }
        );
      }
    }

    // Validate PUBLISHED status
    if (data.status === 'PUBLISHED') {
      const country = data.country || existing.country;
      const practiceAreas = data.practiceAreas || existing.practiceAreas;
      
      if (!country || !practiceAreas || practiceAreas.length === 0) {
        return NextResponse.json(
          { error: 'Published professionals must have country and at least one practice area' },
          { status: 400 }
        );
      }
    }

    const professional = await prisma.legalProfessional.update({
      where: { id: params.id },
      data: {
        ...data,
        lastModifiedByAdminId: session.user.id,
      },
    });

    return NextResponse.json(professional);
  } catch (error: any) {
    console.error('Error updating legal professional:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/legal-professionals/[id]
 * Soft delete (archive) a legal professional
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const professional = await prisma.legalProfessional.update({
      where: { id: params.id },
      data: {
        status: 'ARCHIVED',
        isActive: false,
        lastModifiedByAdminId: session.user.id,
      },
    });

    return NextResponse.json({ message: 'Professional archived successfully', professional });
  } catch (error: any) {
    console.error('Error deleting legal professional:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
