import { prisma } from './prisma';

export async function triggerWebhooks(event: string, data: any) {
  try {
    // Find all active webhooks that listen to this event
    const webhooks = await prisma.webhook.findMany({
      where: {
        isActive: true,
        events: {
          has: event,
        },
      },
    });

    if (webhooks.length === 0) {
      return;
    }

    // Trigger all webhooks in parallel
    const promises = webhooks.map(async (webhook) => {
      try {
        const payload = {
          event,
          timestamp: new Date().toISOString(),
          data,
        };

        const response = await fetch(webhook.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(webhook.secret && { 'X-Webhook-Secret': webhook.secret }),
          },
          body: JSON.stringify(payload),
        });

        // Update last triggered
        await prisma.webhook.update({
          where: { id: webhook.id },
          data: { lastTriggered: new Date() },
        });

        return {
          webhookId: webhook.id,
          success: response.ok,
          status: response.status,
        };
      } catch (error) {
        console.error(`Error triggering webhook ${webhook.id}:`, error);
        return {
          webhookId: webhook.id,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    });

    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Error in triggerWebhooks:', error);
    return [];
  }
}

// Available webhook events
export const WEBHOOK_EVENTS = {
  // Bookings
  BOOKING_CREATED: 'booking.created',
  BOOKING_UPDATED: 'booking.updated',
  BOOKING_CANCELLED: 'booking.cancelled',
  BOOKING_COMPLETED: 'booking.completed',
  
  // Payments
  PAYMENT_SUCCEEDED: 'payment.succeeded',
  PAYMENT_FAILED: 'payment.failed',
  PAYMENT_REFUNDED: 'payment.refunded',
  
  // Users
  USER_REGISTERED: 'user.registered',
  USER_UPDATED: 'user.updated',
  
  // Partners
  PARTNER_CREATED: 'partner.created',
  PARTNER_VERIFIED: 'partner.verified',
  
  // Reviews
  REVIEW_CREATED: 'review.created',
};
