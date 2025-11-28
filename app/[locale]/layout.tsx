import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { locales } from '@/i18n';
import Header from '@/app/components/Header/Header';
import Navbar from '@/app/components/Navbar/Navbar';
import Footer from '@/app/components/Footer/Footer';
import HeaderLoading from '@/app/components/Header/loading';
import NavbarLoading from '@/app/components/Navbar/loading';
import FooterLoading from '@/app/components/Footer/loading';
// import ChatbotWidget from '@/components/ChatbotWidget';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction} className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <Suspense fallback={<HeaderLoading />}>
            <Header lang={locale} />
          </Suspense>
          
          <Suspense fallback={<NavbarLoading />}>
            <Navbar lang={locale} />
          </Suspense>
          
          <main className="flex-1">{children}</main>
          
          <Suspense fallback={<FooterLoading />}>
            <Footer lang={locale} />
          </Suspense>
          
          {/* <ChatbotWidget /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
