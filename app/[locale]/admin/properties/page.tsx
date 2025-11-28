import PropertiesClient from './PropertiesClient';

export default async function PropertiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin
  

  return (
    
      <PropertiesClient />
    
  );
}
