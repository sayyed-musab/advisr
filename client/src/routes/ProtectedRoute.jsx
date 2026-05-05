import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';
import { Spinner } from '../components/ui/Spinner.jsx';
import { PageWrapper } from '../components/layout/PageWrapper.jsx';

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <PageWrapper hideNavbar>
        <div className="flex min-h-screen items-center justify-center">
          <Spinner size="xl" />
        </div>
      </PageWrapper>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
