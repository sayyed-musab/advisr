import { Link } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper.jsx';
import { SignupForm } from '../components/auth/SignupForm.jsx';
import { Logo } from '../components/layout/Logo.jsx';

export const SignupPage = () => {
  return (
    <PageWrapper hideNavbar>
      <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Logo />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-black hover:text-gray-700">
              Log in
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <SignupForm />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
