import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== Role.ADMIN && session.user.role !== Role.MANAGER)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { chatbot, intents, partnerId } = body;

    if (!chatbot) {
      return NextResponse.json(
        { error: 'Invalid data format. Expected { chatbot: {}, intents: [] }' },
        { status: 400 }
      );
    }

    // Check if chatbot with same name and industry exists
    const existing = await prisma.chatbot.findFirst({
      where: {
        name: chatbot.name,
        industry: chatbot.industry,
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: `Chatbot "${chatbot.name}" for ${chatbot.industry} already exists` },
        { status: 400 }
      );
    }

    // Verify partner if provided
    if (partnerId) {
      const partner = await prisma.partner.findUnique({
        where: { id: partnerId },
      });

      if (!partner) {
        return NextResponse.json(
          { error: 'Partner not found' },
          { status: 404 }
        );
      }
    }

    // Create chatbot
    const createdChatbot = await prisma.chatbot.create({
      data: {
        ...chatbot,
        partnerId: partnerId || null,
      },
    });

    // Create intents if provided
    let createdIntents = [];
    if (intents && Array.isArray(intents) && intents.length > 0) {
      const intentsData = intents.map((intent: any) => ({
        chatbotId: createdChatbot.id,
        name: intent.name,
        patterns: intent.patterns || [],
        responses: intent.responses || [],
        action: intent.action || null,
        priority: intent.priority || 0,
        isActive: intent.isActive !== false,
      }));

      await prisma.chatbotIntent.createMany({
        data: intentsData,
      });

      createdIntents = await prisma.chatbotIntent.findMany({
        where: { chatbotId: createdChatbot.id },
      });
    }

    return NextResponse.json({
      message: 'Chatbot imported successfully',
      chatbot: createdChatbot,
      intentsCount: createdIntents.length,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Chatbot import error:', error);
    return NextResponse.json(
      { error: `Failed to import chatbot: ${error.message}` },
      { status: 500 }
    );
  }
}
