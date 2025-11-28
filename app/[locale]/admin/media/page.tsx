import MediaLibraryClient from './MediaLibraryClient';

export default async function AdminMediaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin


  return (
    
      <MediaLibraryClient locale={locale} />
    
  );
}
