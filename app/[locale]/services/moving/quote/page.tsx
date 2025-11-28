import { Metadata } from 'next';
import MovingQuoteForm from '@/components/moving/MovingQuoteForm';

export const metadata: Metadata = {
  title: 'Get Moving Quote | JustRichard',
  description: 'Request a free quote for your moving needs',
};

export default async function MovingQuotePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl font-bold text-center mb-4">Get Your Free Moving Quote</h1>
          <p className="text-center text-gray-600 text-lg">
            Fill out the form below and we'll get back to you with a detailed quote within 24 hours
          </p>
        </div>

        <MovingQuoteForm locale={locale} />
      </div>
    </div>
  );
}
