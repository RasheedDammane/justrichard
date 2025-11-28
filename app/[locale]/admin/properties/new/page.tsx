import PropertyFormComplete from '../PropertyFormComplete';

export default async function NewPropertyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin
  // Pas besoin de vérifier la session ici
  
  return <PropertyFormComplete locale={locale} />;
}
