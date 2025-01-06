import type { Metadata } from 'next';
import Header from '@/components/Headers';
import Footer from '@/components/Footer';
import { ProfileProvider } from '../contexts/Profile';
import '../globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'NOMOMICS',
  description: 'Nomomics | Comics Genre',
};

export default function SignipLayOut({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <Toaster />
        <ProfileProvider>{children}</ProfileProvider>
      </body>
    </html>
  );
}
