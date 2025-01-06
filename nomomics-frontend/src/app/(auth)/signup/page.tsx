import { AuthProvider } from '@/app/contexts/Auth';
import SignUp from '@/components/Signup';
import React from 'react';

const SignUpPage = () => {
  return (
    <div>
      <AuthProvider>
        <SignUp />
      </AuthProvider>
    </div>
  );
};

export default SignUpPage;
