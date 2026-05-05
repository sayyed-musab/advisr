import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore.js';
import { AppRouter } from './routes/AppRouter.jsx';

export default function App() {
  const { fetchMe } = useAuthStore();

  useEffect(() => {
    // Check session on mount
    fetchMe();
  }, [fetchMe]);

  return (
    <BrowserRouter>
      <AppRouter />
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}