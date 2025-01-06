import SignUp from '@/components/Signup';
import React, { Suspense } from 'react';

const SignUpPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SignUp />
      </Suspense>
    </div>
  );
};

export default SignUpPage;
