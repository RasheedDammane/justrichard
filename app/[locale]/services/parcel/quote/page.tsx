import { Metadata } from 'next';
import ParcelQuoteForm from '@/components/parcel/ParcelQuoteForm';

export const metadata: Metadata = {
  title: 'Get Parcel Quote | JustRichard',
  description: 'Calculate instant pricing for your parcel delivery',
};

export default async function ParcelQuotePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl font-bold text-center mb-4">Get Instant Parcel Quote</h1>
          <p className="text-center text-gray-600 text-lg">
            Enter your parcel details below to get an instant price estimate
          </p>
        </div>

        <ParcelQuoteForm locale={locale} />
      </div>
    </div>
  );
}
