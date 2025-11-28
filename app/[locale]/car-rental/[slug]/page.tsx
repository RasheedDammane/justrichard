import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface RentalDetailPageProps {
  params: { locale: string; slug: string };
}

async function getRentalCar(slug: string) {
  const car = await prisma.RentalCar.findUnique({
    where: { slug },
    include: {
      City: true,
      Country: true,
    },
  });

  if (!car) {
    return null;
  }

  // Increment view count
  await prisma.RentalCar.update({
    where: { id: car.id },
    data: { viewCount: { increment: 1 } },
  });

  return car;
}

export default async function RentalDetailPage({ params }: RentalDetailPageProps) {
  const { locale, slug } = await params;
  const car = await getRentalCar(slug);

  if (!car) {
    notFound();
  }

  const translations = {
    en: {
      rentIn: 'Rent',
      inDubai: 'in Dubai',
      description: 'Description',
      carFeatures: 'Car Features',
      carSpecifications: 'Car specifications',
      rentalDuration: 'Rental Duration and Pricing',
      deliveryFee: 'Delivery Fee',
      mileage: 'Mileage',
      conditions: 'Conditions',
      minAge: 'Minimum age',
      minDays: 'Minimum Days',
      requiredDocs: 'Required documents',
      seeList: 'See the list',
      perDay: 'per day',
      perWeek: 'per week',
      perMonth: 'per month',
      fromPrice: 'From',
      priceVaries: 'Price varies by time',
      noDeposit: 'No deposit needed! Just add',
      noDepositDesc: 'Include additional service charges to avoid a rental car deposit.',
      freeDelivery: 'Free Delivery',
      instantBooking: 'instant booking',
      bookNow: 'Book Now',
      year: 'Year',
      color: 'Color',
      doors: 'Doors',
      seats: 'Seats',
      horsepower: 'Horsepower',
      fuelType: 'Fuel Type',
      acceleration: '0-100 Km/H',
      transmission: 'Transmission',
      category: 'Car Type',
      pickupFee: 'Pickup Fee',
      dropoffFee: 'Dropoff Fee',
      extraKmFee: 'For every extra Km fee',
      verified: 'Verified Partner',
      carsAvailable: 'Cars Available',
      whyRenting: 'why renting',
      bestChoice: 'is your best choice ?',
    },
    fr: {
      rentIn: 'Louer',
      inDubai: 'à Dubaï',
      description: 'Description',
      carFeatures: 'Caractéristiques',
      carSpecifications: 'Spécifications',
      rentalDuration: 'Durée et Tarification',
      deliveryFee: 'Frais de livraison',
      mileage: 'Kilométrage',
      conditions: 'Conditions',
      minAge: 'Âge minimum',
      minDays: 'Jours minimum',
      requiredDocs: 'Documents requis',
      seeList: 'Voir la liste',
      perDay: 'par jour',
      perWeek: 'par semaine',
      perMonth: 'par mois',
      fromPrice: 'À partir de',
      priceVaries: 'Le prix varie selon la durée',
      noDeposit: 'Sans caution ! Ajoutez seulement',
      noDepositDesc: 'Incluez des frais de service supplémentaires pour éviter une caution.',
      freeDelivery: 'Livraison gratuite',
      instantBooking: 'réservation instantanée',
      bookNow: 'Réserver',
      year: 'Année',
      color: 'Couleur',
      doors: 'Portes',
      seats: 'Sièges',
      horsepower: 'Puissance',
      fuelType: 'Carburant',
      acceleration: '0-100 Km/H',
      transmission: 'Transmission',
      category: 'Type',
      pickupFee: 'Frais de prise en charge',
      dropoffFee: 'Frais de retour',
      extraKmFee: 'Frais par km supplémentaire',
      verified: 'Partenaire vérifié',
      carsAvailable: 'Voitures disponibles',
      whyRenting: 'pourquoi louer',
      bestChoice: 'est votre meilleur choix ?',
    },
    th: {
      rentIn: 'เช่า',
      inDubai: 'ในดูไบ',
      description: 'คำอธิบาย',
      carFeatures: 'คุณสมบัติรถ',
      carSpecifications: 'ข้อมูลจำเพาะ',
      rentalDuration: 'ระยะเวลาและราคา',
      deliveryFee: 'ค่าจัดส่ง',
      mileage: 'ระยะทาง',
      conditions: 'เงื่อนไข',
      minAge: 'อายุขั้นต่ำ',
      minDays: 'จำนวนวันขั้นต่ำ',
      requiredDocs: 'เอกสารที่ต้องการ',
      seeList: 'ดูรายการ',
      perDay: 'ต่อวัน',
      perWeek: 'ต่อสัปดาห์',
      perMonth: 'ต่อเดือน',
      fromPrice: 'เริ่มต้น',
      priceVaries: 'ราคาแตกต่างตามระยะเวลา',
      noDeposit: 'ไม่ต้องวางเงินมัดจำ! เพียงเพิ่ม',
      noDepositDesc: 'รวมค่าบริการเพิ่มเติมเพื่อหลีกเลี่ยงเงินมัดจำ',
      freeDelivery: 'จัดส่งฟรี',
      instantBooking: 'จองทันที',
      bookNow: 'จองเลย',
      year: 'ปี',
      color: 'สี',
      doors: 'ประตู',
      seats: 'ที่นั่ง',
      horsepower: 'แรงม้า',
      fuelType: 'เชื้อเพลิง',
      acceleration: '0-100 กม./ชม.',
      transmission: 'เกียร์',
      category: 'ประเภท',
      pickupFee: 'ค่ารับรถ',
      dropoffFee: 'ค่าคืนรถ',
      extraKmFee: 'ค่าใช้จ่ายต่อกิโลเมตรเพิ่มเติม',
      verified: 'พาร์ทเนอร์ที่ยืนยันแล้ว',
      carsAvailable: 'รถที่มีให้บริการ',
      whyRenting: 'ทำไมต้องเช่า',
      bestChoice: 'คือตัวเลือกที่ดีที่สุดของคุณ?',
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  const features = car.features ? JSON.parse(car.features as string) : [];
  const images = car.images ? JSON.parse(car.images as string) : [];
  const faq = car.faq ? JSON.parse(car.faq as string) : [];
  const deliveryLocations = car.deliveryLocations ? JSON.parse(car.deliveryLocations as string) : [];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          {car.brandLogo && (
            <Image src={car.brandLogo} alt={car.brand} width={32} height={32} className="w-8" />
          )}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {t.rentIn} {car.name} {t.inDubai}
          </h1>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Rating */}
          {car.rating && (
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm underline">{car.reviewCount} Reviews</p>
              <span>|</span>
              <p className="text-sm font-medium">{car.rating}/5</p>
            </div>
          )}

          {car.noDeposit && (
            <span className="bg-green-50 text-green-700 text-sm px-3 py-1 rounded-lg flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No deposit
            </span>
          )}

          {car.freeDelivery && (
            <span className="bg-green-50 text-green-700 text-sm px-3 py-1 rounded-lg flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
              </svg>
              {t.freeDelivery}
            </span>
          )}

          <span className="bg-green-50 text-green-700 text-sm px-3 py-1 rounded-lg">
            Min {car.minDays} Day{car.minDays > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Image Gallery */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-96 bg-gray-100">
              {car.mainImage ? (
                <Image
                  src={car.mainImage}
                  alt={car.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-500 to-purple-600">
                  <span className="text-white text-4xl font-bold">{car.brand}</span>
                </div>
              )}

              {/* Badges on image */}
              <div className="absolute top-3 left-3">
                {car.instantBooking && (
                  <span className="bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                    {t.instantBooking}
                  </span>
                )}
              </div>

              {car.isNewArrival && (
                <span className="absolute bottom-3 left-3 bg-green-500 text-white px-3 py-1 rounded-md text-sm font-bold flex items-center gap-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  New Arrival
                </span>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-2 p-4">
                {images.slice(0, 4).map((img: string, idx: number) => (
                  <div key={idx} className="relative h-20 bg-gray-100 rounded overflow-hidden">
                    <Image src={img} alt={`${car.name} ${idx + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">{t.description}</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{car.description}</p>
          </div>

          {/* Car Features */}
          {features.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">{t.carFeatures}</h2>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Car Specifications */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">{t.carSpecifications}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <SpecCard icon="📅" label={t.year} value={car.year.toString()} />
              <SpecCard icon="🎨" label={t.color} value={car.color} />
              <SpecCard icon="🚪" label={t.doors} value={car.doors.toString()} />
              <SpecCard icon="💺" label={t.seats} value={car.seats.toString()} />
              {car.horsepower && <SpecCard icon="⚡" label={t.horsepower} value={`${car.horsepower} HP`} />}
              <SpecCard icon="⛽" label={t.fuelType} value={car.fuelType} />
              {car.acceleration && <SpecCard icon="🏎️" label={t.acceleration} value={car.acceleration} />}
              <SpecCard icon="⚙️" label={t.transmission} value={car.transmission} />
              <SpecCard icon="🚗" label={t.category} value={car.category} />
            </div>
          </div>

          {/* Rental Duration and Pricing */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">{t.rentalDuration}</h2>
            <div className="space-y-3">
              <PriceRow label="1 day" price={car.pricePerDay} currency={car.currency} />
              {car.pricePerWeek && <PriceRow label="1 week" price={car.pricePerWeek} currency={car.currency} />}
              {car.pricePerMonth && <PriceRow label="1 month" price={car.pricePerMonth} currency={car.currency} />}
            </div>
          </div>

          {/* Mileage */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">{t.mileage}</h2>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex-1 min-w-[150px] border border-gray-200 rounded-lg p-3 text-center">
                <p className="text-lg font-bold">{car.mileagePerDay} Km / <span className="font-normal">day</span></p>
              </div>
              {car.mileagePerWeek && (
                <div className="flex-1 min-w-[150px] border border-gray-200 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold">{car.mileagePerWeek} Km / <span className="font-normal">week</span></p>
                </div>
              )}
              {car.mileagePerMonth && (
                <div className="flex-1 min-w-[150px] border border-gray-200 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold">{car.mileagePerMonth} Km / <span className="font-normal">month</span></p>
                </div>
              )}
            </div>
            <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
              <span>{t.extraKmFee}</span>
              <span className="font-bold">{car.currency} {car.extraKmFee}/ Km</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:w-[400px] space-y-4">
          {/* Pricing Card */}
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold">{t.fromPrice} {car.currency} {car.pricePerDay.toLocaleString()}</p>
                <p className="text-sm text-gray-600">{t.perDay}</p>
              </div>
              <span className="text-xs text-gray-500">{t.priceVaries}</span>
            </div>

            {car.noDeposit && car.noDepositFee && (
              <>
                <hr className="my-4" />
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-900 mb-2">
                    {t.noDeposit} <span className="font-semibold">{car.currency} {car.noDepositFee}</span>
                  </p>
                  <p className="text-sm text-gray-600">{t.noDepositDesc}</p>
                </div>
              </>
            )}

            <hr className="my-4" />

            {/* Conditions */}
            <div className="space-y-3 mb-4">
              <h3 className="font-bold flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t.conditions}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.minAge}</span>
                  <span className="font-medium">{car.minAge}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.minDays}</span>
                  <span className="font-medium">{car.minDays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.requiredDocs}</span>
                  <button className="text-pink-600 underline">{t.seeList}</button>
                </div>
              </div>
            </div>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors">
              {t.bookNow}
            </button>

            {/* Provider Info */}
            {car.providerName && (
              <>
                <hr className="my-4" />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                        {car.providerName[0]}
                      </div>
                      <div>
                        <p className="font-semibold">{car.providerName}</p>
                        {car.providerRating && (
                          <div className="flex items-center gap-1 text-xs">
                            <span>{car.providerRating}</span>
                            <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-gray-500">({car.providerReviews})</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {car.providerVerified && (
                      <div className="text-xs text-blue-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {t.verified}
                      </div>
                    )}
                  </div>
                  {car.providerCarsCount && (
                    <p className="text-sm text-green-600">{car.providerCarsCount}+ {t.carsAvailable}</p>
                  )}
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

// Helper Components
function SpecCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex gap-3 border border-gray-200 rounded-lg p-3">
      <div className="text-2xl">{icon}</div>
      <div>
        <p className="text-xs text-gray-600">{label}</p>
        <p className="font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function PriceRow({ label, price, currency }: { label: string; price: number; currency: string }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-200">
      <span className="font-medium">{label}</span>
      <span className="text-gray-700">{currency} {price.toLocaleString()}</span>
    </div>
  );
}
