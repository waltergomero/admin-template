import React from 'react';
import SignInForm from '@/components/auth/signinForm';

const SigninPage = () => {
  return (
    <div className="grid grid-rows items-center justify-items-center min-h-screen border-t border-gray-200 dark:border-gray-800 p-8 pb-20 gap-16 sm:p-20 font-geist-sans">
      <SignInForm/>
    </div>
  )
}

export default SigninPage