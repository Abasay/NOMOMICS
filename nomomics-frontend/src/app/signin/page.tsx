import SignIn from '@/components/SignIn';
import React from 'react';
import { Suspense } from 'react';

const SignInPage = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<SignIn />
		</Suspense>
	);
};

export default SignInPage;
