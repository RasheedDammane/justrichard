import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== Role.ADMIN && session.user.role !== Role.MANAGER)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const chatbot = await prisma.chatbot.findUnique({
      where: { id: params.id },
      include: {
        partner: {
          select: {
            id: true,
            name: true,
            email: true,
            logo: true,
          },
        },
        intents: {
          orderBy: { priority: 'desc' },
        },
        conversations: {
          orderBy: { startedAt: 'desc' },
          take: 10,
        },
        _count: {
          select: {
            intents: true,
            conversations: true,
          },
        },
      },
    });

    if (!chatbot) {
      return NextResponse.json({ error: 'Chatbot not found' }, { status: 404 });
    }

    return NextResponse.json({ chatbot });
  } catch (error) {
    console.error('Error fetching chatbot:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chatbot' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { intents, ...chatbotData } = body;

    // Check if chatbot exists
    const existing = await prisma.chatbot.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Chatbot not found' }, { status: 404 });
    }

    // Update chatbot
    const chatbot = await prisma.chatbot.update({
      where: { id: params.id },
      data: chatbotData,
    });

    // Update intents if provided
    if (intents !== undefined && Array.isArray(intents)) {
      // Delete existing intents
      await prisma.chatbotIntent.deleteMany({
        where: { chatbotId: params.id },
      });

      // Create new intents
      if (intents.length > 0) {
        await prisma.chatbotIntent.createMany({
          data: intents.map((intent: any) => ({
            chatbotId: params.id,
            name: intent.name,
            patterns: intent.patterns || [],
            responses: intent.responses || [],
            action: intent.action,
            priority: intent.priority || 0,
            isActive: intent.isActive ?? true,
          })),
        });
      }
    }

    return NextResponse.json({ chatbot });
  } catch (error) {
    console.error('Error updating chatbot:', error);
    return NextResponse.json(
      { error: 'Failed to update chatbot' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if chatbot exists
    const existing = await prisma.chatbot.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Chatbot not found' }, { status: 404 });
    }

    // Delete chatbot (cascade will handle related records)
    await prisma.chatbot.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Chatbot deleted successfully' });
  } catch (error) {
    console.error('Error deleting chatbot:', error);
    return NextResponse.json(
      { error: 'Failed to delete chatbot' },
      { status: 500 }
    );
  }
}
