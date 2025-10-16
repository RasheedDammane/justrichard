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

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // users, bookings, partners, etc.
    const format = searchParams.get('format') || 'csv'; // csv or json

    let data: any[] = [];
    let headers: string[] = [];

    switch (type) {
      case 'users':
        data = await prisma.user.findMany({
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
            role: true,
            locale: true,
            createdAt: true,
          },
        });
        headers = ['ID', 'Email', 'Name', 'Phone', 'Role', 'Locale', 'Created At'];
        break;

      case 'bookings':
        data = await prisma.booking.findMany({
          include: {
            user: { select: { name: true, email: true } },
            service: {
              include: {
                translations: { where: { locale: 'fr' }, take: 1 },
              },
            },
          },
        });
        headers = ['ID', 'User', 'Service', 'Date', 'Time', 'Status', 'Payment Status', 'Total', 'Created At'];
        data = data.map(b => ({
          id: b.id,
          user: b.user.name || b.user.email,
          service: b.service.translations[0]?.name || 'N/A',
          date: b.scheduledDate,
          time: b.scheduledTime,
          status: b.status,
          paymentStatus: b.paymentStatus,
          total: b.total,
          createdAt: b.createdAt,
        }));
        break;

      case 'partners':
        data = await prisma.partner.findMany({
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            companyName: true,
            type: true,
            status: true,
            city: true,
            commissionRate: true,
            totalRevenue: true,
            isVerified: true,
            createdAt: true,
          },
        });
        headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Type', 'Status', 'City', 'Country', 'Commission', 'Revenue', 'Verified', 'Created At'];
        break;

      case 'services':
        data = await prisma.service.findMany({
          include: {
            translations: { where: { locale: 'fr' }, take: 1 },
            category: {
              include: {
                translations: { where: { locale: 'fr' }, take: 1 },
              },
            },
          },
        });
        headers = ['ID', 'Name', 'Category', 'Price', 'Duration', 'Rating', 'Total Bookings', 'Active', 'Created At'];
        data = data.map(s => ({
          id: s.id,
          name: s.translations[0]?.name || 'N/A',
          category: s.category.translations[0]?.name || 'N/A',
          price: s.basePrice,
          duration: s.duration,
          rating: s.rating,
          totalBookings: s.totalBookings,
          isActive: s.isActive,
          createdAt: s.createdAt,
        }));
        break;

      case 'promotions':
        data = await prisma.promotion.findMany({
          select: {
            id: true,
            code: true,
            type: true,
            value: true,
            minAmount: true,
            maxDiscount: true,
            usageLimit: true,
            usageCount: true,
            startsAt: true,
            expiresAt: true,
            isActive: true,
            createdAt: true,
          },
        });
        headers = ['ID', 'Code', 'Type', 'Value', 'Min Amount', 'Max Discount', 'Usage Limit', 'Usage Count', 'Starts At', 'Expires At', 'Active', 'Created At'];
        break;

      default:
        return NextResponse.json({ error: 'Invalid export type' }, { status: 400 });
    }

    if (format === 'csv') {
      // Generate CSV
      const csvRows = [headers.join(',')];
      
      for (const row of data) {
        const values = Object.values(row).map(value => {
          if (value === null || value === undefined) return '';
          if (value instanceof Date) return value.toISOString();
          if (typeof value === 'object') return JSON.stringify(value);
          // Escape quotes and wrap in quotes if contains comma
          const stringValue = String(value);
          if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        });
        csvRows.push(values.join(','));
      }

      const csv = csvRows.join('\n');
      
      // Log export activity
      await prisma.activityLog.create({
        data: {
          userId: session.user.id,
          action: 'EXPORT',
          entityType: type,
          description: `Exported ${data.length} ${type} records as CSV`,
        },
      });

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${type}_export_${Date.now()}.csv"`,
        },
      });
    } else {
      // Return JSON
      await prisma.activityLog.create({
        data: {
          userId: session.user.id,
          action: 'EXPORT',
          entityType: type,
          description: `Exported ${data.length} ${type} records as JSON`,
        },
      });

      return NextResponse.json({ data });
    }
  } catch (error) {
    console.error('Error exporting data:', error);
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    );
  }
}
