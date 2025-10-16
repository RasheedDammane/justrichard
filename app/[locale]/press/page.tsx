import {useTranslations} from 'next-intl';

export default function Page() {
  const t = useTranslations('press');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">{t('title')}</h1>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">{t('intro')}</p>
            <p className="text-gray-600">Content for press page.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
