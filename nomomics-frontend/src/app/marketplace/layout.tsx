import type { Metadata } from 'next';
import Header from '@/components/Headers';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'NOMOMICS',
  description: 'Nomomics | Market Place Page',
};

export default function MarketPlaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={` `}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
