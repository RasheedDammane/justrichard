import { Metadata } from 'next';
import MovingServiceForm from '../components/MovingServiceForm';

export const metadata: Metadata = {
  title: 'New Moving Service | Admin',
  description: 'Create a new moving service',
};

export default async function NewMovingServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin
  

  return (
    <div className="p-6">
      <MovingServiceForm locale={locale} />
    </div>
  );
}
