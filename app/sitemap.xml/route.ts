import { prisma } from '@/lib/prisma';

export async function GET() {
  const baseUrl = 'https://justrichard.com';
  
  // Static pages
  const staticPages = [
    '',
    '/en',
    '/fr',
    '/en/about',
    '/fr/about',
    '/en/contact',
    '/fr/contact',
    '/en/faq',
    '/fr/faq',
    '/en/help',
    '/fr/help',
    '/en/careers',
    '/fr/careers',
    '/en/blog',
    '/fr/blog',
    '/en/press',
    '/fr/press',
    '/en/partnerships',
    '/fr/partnerships',
    '/en/safety',
    '/fr/safety',
    '/en/terms',
    '/fr/terms',
    '/en/privacy',
    '/fr/privacy',
    '/en/cookies',
    '/fr/cookies',
    '/en/services/legal',
    '/fr/services/legal',
    '/en/activities',
    '/fr/activities',
    '/en/suppliers',
    '/fr/suppliers',
  ];

  // Dynamic pages
  let dynamicPages: string[] = [];

  try {
    // Doctors
    const doctors = await prisma.doctor.findMany({
      select: { slug: true },
      where: { isActive: true },
    });
    doctors.forEach((doc) => {
      dynamicPages.push(`/en/doctors/${doc.slug}`);
      dynamicPages.push(`/fr/doctors/${doc.slug}`);
    });

    // Car Rental
    const cars = await prisma.rentalCar.findMany({
      select: { slug: true },
      where: { isActive: true },
    });
    cars.forEach((car) => {
      dynamicPages.push(`/en/car-rental/${car.slug}`);
      dynamicPages.push(`/fr/car-rental/${car.slug}`);
    });

    // Yachts
    const yachts = await prisma.yacht.findMany({
      select: { slug: true },
      where: { isActive: true },
    });
    yachts.forEach((yacht) => {
      dynamicPages.push(`/en/yachts/${yacht.slug}`);
      dynamicPages.push(`/fr/yachts/${yacht.slug}`);
    });

    // Properties
    const properties = await prisma.property.findMany({
      select: { slug: true },
      where: { isActive: true },
    });
    properties.forEach((property) => {
      dynamicPages.push(`/en/properties/${property.slug}`);
      dynamicPages.push(`/fr/properties/${property.slug}`);
    });

    // Coaches
    const coaches = await prisma.coach.findMany({
      select: { slug: true },
      where: { isActive: true },
    });
    coaches.forEach((coach) => {
      dynamicPages.push(`/en/coaches/${coach.slug}`);
      dynamicPages.push(`/fr/coaches/${coach.slug}`);
    });

    // Lawyers
    const lawyers = await prisma.lawyer.findMany({
      select: { slug: true },
      where: { isActive: true },
    });
    lawyers.forEach((lawyer) => {
      dynamicPages.push(`/en/lawyers/${lawyer.slug}`);
      dynamicPages.push(`/fr/lawyers/${lawyer.slug}`);
    });

    // Maids
    const maids = await prisma.domesticWorker.findMany({
      select: { slug: true },
      where: { isActive: true },
    });
    maids.forEach((maid) => {
      dynamicPages.push(`/en/maids/${maid.slug}`);
      dynamicPages.push(`/fr/maids/${maid.slug}`);
    });

    // Suppliers
    const suppliers = await prisma.supplier.findMany({
      select: { slug: true },
      where: { isActive: true },
    });
    suppliers.forEach((supplier) => {
      dynamicPages.push(`/en/suppliers/${supplier.slug}`);
      dynamicPages.push(`/fr/suppliers/${supplier.slug}`);
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }

  const allPages = [...staticPages, ...dynamicPages];
  const currentDate = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' || page === '/en' || page === '/fr' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
