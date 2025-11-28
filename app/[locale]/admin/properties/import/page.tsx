import PropertyImportClient from './PropertyImportClient';

interface ImportPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function PropertyImportPage({ params }: ImportPageProps) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin
  

  return (
    
      <PropertyImportClient locale={locale} />
    
  );
}
