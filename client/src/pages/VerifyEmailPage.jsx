import { useEffect, useState, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { authApi } from '../api/auth.api.js';
import { PageWrapper } from '../components/layout/PageWrapper.jsx';
import { Logo } from '../components/layout/Logo.jsx';
import { Spinner } from '../components/ui/Spinner.jsx';
import { Button } from '../components/ui/Button.jsx';
import { CheckCircle, XCircle } from 'lucide-react';

export const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');
  
  const hasCalledAPI = useRef(false);

  useEffect(() => {
    const verify = async () => {
      if (!token || hasCalledAPI.current) return;
      hasCalledAPI.current = true;
      
      try {
        const res = await authApi.verifyEmail(token);
        setStatus('success');
        setMessage(res.message);
      } catch (err) {
        setStatus('error');
        setMessage(err.message || 'Verification failed');
      }
    };

    if (token) {
      verify();
    } else {
      setStatus('error');
      setMessage('No token provided');
    }
  }, [token]);

  return (
    <PageWrapper hideNavbar>
      <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="flex justify-center mb-8">
            <Logo />
          </div>

          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10 flex flex-col items-center">
            {status === 'loading' && (
              <>
                <Spinner size="lg" className="mb-4 text-black" />
                <h3 className="text-lg font-medium">Verifying your email...</h3>
              </>
            )}

            {status === 'success' && (
              <>
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Email Verified</h3>
                <p className="text-gray-600 mb-6">{message}</p>
                <Link to="/login" className="w-full">
                  <Button className="w-full">Go to Login</Button>
                </Link>
              </>
            )}

            {status === 'error' && (
              <>
                <XCircle className="h-16 w-16 text-red-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Verification Failed</h3>
                <p className="text-gray-600 mb-6">{message}</p>
                <Link to="/login" className="w-full">
                  <Button variant="outline" className="w-full">Back to Login</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
