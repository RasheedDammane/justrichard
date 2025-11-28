import ImportEventsClient from './ImportEventsClient';

export default async function ImportEventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <ImportEventsClient locale={locale} />;
}
