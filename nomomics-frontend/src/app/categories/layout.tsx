import type { Metadata } from 'next';
import Header from '@/components/Headers';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
	title: 'NOMOMICS',
	description: 'Nomomics | Categories',
};

export default function CategoriesLayOut({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			{' '}
			<Header />
			{children} <Footer />
		</>
	);
}
