import SignUp from '@/components/Signup';
import React from 'react';
import { AuthProvider } from '../contexts/Auth';

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
