import type { Metadata } from 'next';
import Header from '@/components/Headers';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'NOMOMICS',
    description: 'Nomomics | Details Comics',
};

export default function DetailsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <Header />
            <body className={` `}>{children}</body>
            <Footer />
        </html>
    );
}
