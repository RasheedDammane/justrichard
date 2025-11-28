import { Metadata } from 'next';
import ImportBulkClient from './ImportBulkClient';

export const metadata: Metadata = {
  title: 'Import Bulk Data | Admin',
  description: 'Import data in bulk from CSV/Excel files',
};

export default async function ImportBulkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin

  return <ImportBulkClient locale={locale} />;
}
