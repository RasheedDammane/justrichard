import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== Role.ADMIN && session.user.role !== Role.MANAGER)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const chatbots = await prisma.chatbot.findMany({
      include: {
        partner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            intents: true,
            conversations: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ chatbots });
  } catch (error) {
    console.error('Error fetching chatbots:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chatbots' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { intents, ...chatbotData } = body;

    // Create chatbot
    const chatbot = await prisma.chatbot.create({
      data: {
        ...chatbotData,
        isActive: chatbotData.isActive ?? true,
      },
    });

    // Create intents if provided
    if (intents && Array.isArray(intents) && intents.length > 0) {
      await prisma.chatbotIntent.createMany({
        data: intents.map((intent: any) => ({
          chatbotId: chatbot.id,
          name: intent.name,
          patterns: intent.patterns || [],
          responses: intent.responses || [],
          action: intent.action,
          priority: intent.priority || 0,
          isActive: intent.isActive ?? true,
        })),
      });
    }

    return NextResponse.json({ chatbot }, { status: 201 });
  } catch (error) {
    console.error('Error creating chatbot:', error);
    return NextResponse.json(
      { error: 'Failed to create chatbot' },
      { status: 500 }
    );
  }
}
