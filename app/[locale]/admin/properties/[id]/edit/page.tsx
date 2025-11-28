import PropertyFormComplete from '../../PropertyFormComplete';

interface EditPropertyPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const { locale, id } = await params;
  

  return (
    
      <PropertyFormComplete locale={locale} propertyId={id} />
    
  );
}
