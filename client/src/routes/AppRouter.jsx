import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';

// Pages
import { LoginPage } from '../pages/LoginPage.jsx';
import { SignupPage } from '../pages/SignupPage.jsx';
import { VerifyEmailPage } from '../pages/VerifyEmailPage.jsx';
import { DashboardPage } from '../pages/DashboardPage.jsx';
import { ConsultPage } from '../pages/ConsultPage.jsx';
import { SessionPage } from '../pages/SessionPage.jsx';

// Routes
import { ProtectedRoute } from './ProtectedRoute.jsx';

export const AppRouter = () => {
  const { user } = useAuthStore();

  return (
    <Routes>
      {/* Public / Redirect root */}
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      
      {/* Auth Routes */}
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignupPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/consult" element={<ConsultPage />} />
        <Route path="/session/:id" element={<SessionPage />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
