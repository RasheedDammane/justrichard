import { NextResponse } from 'next/server';

// Simple email notification system
// In production, you would use services like SendGrid, AWS SES, or Nodemailer

export async function POST(request: Request) {
  try {
    const { to, subject, message, type } = await request.json();

    // Validate required fields
    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, message' },
        { status: 400 }
      );
    }

    // Email templates based on type
    const templates = {
      inquiry_received: {
        subject: `New Inquiry: ${subject}`,
        body: `
          <h2>New Inquiry Received</h2>
          <p>${message}</p>
          <p>Please log in to your dashboard to respond.</p>
        `,
      },
      inquiry_replied: {
        subject: `Response to Your Inquiry: ${subject}`,
        body: `
          <h2>Supplier Response</h2>
          <p>${message}</p>
        `,
      },
      favorite_added: {
        subject: 'Supplier Added to Favorites',
        body: `
          <h2>Favorite Added</h2>
          <p>${message}</p>
        `,
      },
    };

    const template = type && templates[type as keyof typeof templates];
    const emailSubject = template ? template.subject : subject;
    const emailBody = template ? template.body : message;

    // Log email (in production, send actual email)
    console.log('📧 Email Notification:');
    console.log('To:', to);
    console.log('Subject:', emailSubject);
    console.log('Body:', emailBody);
    console.log('Type:', type || 'custom');

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In production, integrate with email service:
    /*
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to,
      subject: emailSubject,
      html: emailBody,
    });
    */

    return NextResponse.json({
      success: true,
      message: 'Email notification sent successfully',
      details: {
        to,
        subject: emailSubject,
        type: type || 'custom',
      },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email notification' },
      { status: 500 }
    );
  }
}
