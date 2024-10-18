import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Inter } from 'next/font/google';

const roboto = Inter({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'NOMOMICS',
    description: 'Nomomics | Latest Comics',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${roboto} antialiased`}>{children}</body>
        </html>
    );
}
