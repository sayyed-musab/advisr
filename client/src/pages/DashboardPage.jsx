import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper.jsx';
import { EmptyState } from '../components/dashboard/EmptyState.jsx';
import { SessionCard } from '../components/dashboard/SessionCard.jsx';
import { useConsultStore } from '../store/consultStore.js';
import { useAuthStore } from '../store/authStore.js';
import { Button } from '../components/ui/Button.jsx';
import { Spinner } from '../components/ui/Spinner.jsx';
import { Plus } from 'lucide-react';

export const DashboardPage = () => {
  const { user } = useAuthStore();
  const { sessions, fetchSessions, isLoading, reset } = useConsultStore();

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const handleStartConsult = () => {
    reset();
  };

  return (
    <PageWrapper>
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Welcome back, {user?.name.split(' ')[0]}
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Manage your business consultations and reports.
            </p>
          </div>
          
          {sessions.length > 0 && (
            <Link to="/consult" onClick={handleStartConsult}>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> New Consultation
              </Button>
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Spinner size="lg" />
          </div>
        ) : sessions.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};
