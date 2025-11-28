import ImportProvidersClient from './ImportProvidersClient';

export default async function ImportProvidersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <ImportProvidersClient locale={locale} />;
}
