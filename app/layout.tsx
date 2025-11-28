import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JustRichard - Your Trusted Service Platform',
  description: 'Discover verified professionals for all your needs',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
