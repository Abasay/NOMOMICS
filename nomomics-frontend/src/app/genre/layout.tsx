import type { Metadata } from 'next';
import Header from '@/components/Headers';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'NOMOMICS',
  description: 'Nomomics | Comics Genre',
};

export default function GenreLayOut({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={` `}>
        {' '}
        <Header />
        {children} <Footer />
      </body>
    </html>
  );
}
