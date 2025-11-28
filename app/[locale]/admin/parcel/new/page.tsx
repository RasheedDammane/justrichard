import { Metadata } from 'next';
import ParcelServiceForm from '../components/ParcelServiceForm';

export const metadata: Metadata = {
  title: 'New Parcel Service | Admin',
  description: 'Create a new parcel delivery service',
};

export default async function NewParcelServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin
  

  return (
    <div className="p-6">
      <ParcelServiceForm locale={locale} />
    </div>
  );
}
