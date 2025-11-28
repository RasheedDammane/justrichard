import ImportRentalsClient from './ImportRentalsClient';

export default async function ImportRentalsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <ImportRentalsClient locale={locale} />;
}
