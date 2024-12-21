import type { Metadata } from 'next';
import Header from '@/components/Headers';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
	title: 'NOMOMICS',
	description: 'Nomomics | Read Comics',
};

export default function ReadComicLayOut({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header />
			{children} <Footer />
		</>
	);
}
