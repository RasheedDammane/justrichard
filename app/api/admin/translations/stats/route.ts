import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/admin/translations/stats:
 *   get:
 *     summary: Get translation statistics
 *     description: Get comprehensive statistics about all translations in the system
 *     tags:
 *       - Admin - Translations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: locale
 *         schema:
 *           type: string
 *           enum: [en, fr, ar, de, es, ru, ko, th, vi]
 *         description: Filter stats by specific language
 *     responses:
 *       200:
 *         description: Translation statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 overview:
 *                   type: object
 *                 byLanguage:
 *                   type: object
 *                 byType:
 *                   type: object
 *                 coverage:
 *                   type: object
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get('locale');

    const where = locale ? { locale } : {};

    // Compter toutes les traductions par type
    const [
      categoryCount,
      serviceCount,
      cmsPageCount,
      vehicleCount,
      transferCount,
      propertyCount,
      handymanCount,
    ] = await Promise.all([
      prisma.categoryTranslation.count({ where }),
      prisma.serviceTranslation.count({ where }),
      prisma.cMSPageTranslation.count({ where }),
      prisma.vehicleTranslation.count({ where }),
      prisma.transferTranslation.count({ where }),
      prisma.propertyTranslation.count({ where }),
      prisma.handymanServiceTranslation.count({ where }),
    ]);

    // Compter les entités totales
    const [
      totalCategories,
      totalServices,
      totalPages,
      totalVehicles,
      totalTransfers,
      totalProperties,
      totalHandyman,
    ] = await Promise.all([
      prisma.category.count(),
      prisma.service.count(),
      prisma.cMSPage.count(),
      prisma.vehicle.count(),
      prisma.transfer.count(),
      prisma.property.count(),
      prisma.handymanService.count(),
    ]);

    const totalTranslations = categoryCount + serviceCount + cmsPageCount + 
                              vehicleCount + transferCount + propertyCount + handymanCount;

    // Statistiques par langue
    const languages = ['en', 'fr', 'ar', 'de', 'es', 'ru', 'ko', 'th', 'vi'];
    const byLanguage: any = {};

    if (!locale) {
      for (const lang of languages) {
        const langWhere = { locale: lang };
        const [cat, srv, cms, veh, tra, pro, han] = await Promise.all([
          prisma.categoryTranslation.count({ where: langWhere }),
          prisma.serviceTranslation.count({ where: langWhere }),
          prisma.cMSPageTranslation.count({ where: langWhere }),
          prisma.vehicleTranslation.count({ where: langWhere }),
          prisma.transferTranslation.count({ where: langWhere }),
          prisma.propertyTranslation.count({ where: langWhere }),
          prisma.handymanServiceTranslation.count({ where: langWhere }),
        ]);

        byLanguage[lang] = {
          total: cat + srv + cms + veh + tra + pro + han,
          categories: cat,
          services: srv,
          pages: cms,
          vehicles: veh,
          transfers: tra,
          properties: pro,
          handyman: han,
        };
      }
    }

    // Couverture par type
    const coverage = {
      categories: totalCategories > 0 ? {
        total: totalCategories,
        translated: categoryCount,
        percentage: ((categoryCount / (totalCategories * languages.length)) * 100).toFixed(1),
      } : { total: 0, translated: 0, percentage: '0' },
      services: totalServices > 0 ? {
        total: totalServices,
        translated: serviceCount,
        percentage: ((serviceCount / (totalServices * languages.length)) * 100).toFixed(1),
      } : { total: 0, translated: 0, percentage: '0' },
      pages: totalPages > 0 ? {
        total: totalPages,
        translated: cmsPageCount,
        percentage: ((cmsPageCount / (totalPages * languages.length)) * 100).toFixed(1),
      } : { total: 0, translated: 0, percentage: '0' },
      vehicles: totalVehicles > 0 ? {
        total: totalVehicles,
        translated: vehicleCount,
        percentage: ((vehicleCount / (totalVehicles * languages.length)) * 100).toFixed(1),
      } : { total: 0, translated: 0, percentage: '0' },
      transfers: totalTransfers > 0 ? {
        total: totalTransfers,
        translated: transferCount,
        percentage: ((transferCount / (totalTransfers * languages.length)) * 100).toFixed(1),
      } : { total: 0, translated: 0, percentage: '0' },
      properties: totalProperties > 0 ? {
        total: totalProperties,
        translated: propertyCount,
        percentage: ((propertyCount / (totalProperties * languages.length)) * 100).toFixed(1),
      } : { total: 0, translated: 0, percentage: '0' },
      handyman: totalHandyman > 0 ? {
        total: totalHandyman,
        translated: handymanCount,
        percentage: ((handymanCount / (totalHandyman * languages.length)) * 100).toFixed(1),
      } : { total: 0, translated: 0, percentage: '0' },
    };

    return NextResponse.json({
      overview: {
        totalTranslations,
        totalLanguages: languages.length,
        categories: categoryCount,
        services: serviceCount,
        pages: cmsPageCount,
        vehicles: vehicleCount,
        transfers: transferCount,
        properties: propertyCount,
        handyman: handymanCount,
      },
      byLanguage,
      byType: {
        categories: { count: categoryCount, total: totalCategories },
        services: { count: serviceCount, total: totalServices },
        pages: { count: cmsPageCount, total: totalPages },
        vehicles: { count: vehicleCount, total: totalVehicles },
        transfers: { count: transferCount, total: totalTransfers },
        properties: { count: propertyCount, total: totalProperties },
        handyman: { count: handymanCount, total: totalHandyman },
      },
      coverage,
      languages,
    });
  } catch (error: any) {
    console.error('Error fetching translation stats:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
