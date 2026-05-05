import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useConsultStore } from '../store/consultStore.js';
import { PageWrapper } from '../components/layout/PageWrapper.jsx';
import { ReportSection } from '../components/report/ReportSection.jsx';
import { FollowupChat } from '../components/report/FollowupChat.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Spinner } from '../components/ui/Spinner.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { ArrowLeft, Trash2, Calendar, MapPin, Users } from 'lucide-react';
import toast from 'react-hot-toast';

export const SessionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentSession, fetchSession, deleteSession, isLoading } = useConsultStore();

  useEffect(() => {
    if (id) {
      fetchSession(id);
    }
  }, [id, fetchSession]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this consultation report?')) {
      try {
        await deleteSession(id);
        toast.success('Session deleted');
        navigate('/dashboard');
      } catch (error) {
        toast.error('Failed to delete session');
      }
    }
  };

  if (isLoading && !currentSession) {
    return (
      <PageWrapper>
        <div className="flex min-h-screen items-center justify-center">
          <Spinner size="xl" />
        </div>
      </PageWrapper>
    );
  }

  if (!currentSession) {
    return (
      <PageWrapper>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Session Not Found</h2>
          <Link to="/dashboard">
            <Button>Return to Dashboard</Button>
          </Link>
        </div>
      </PageWrapper>
    );
  }

  const date = new Date(currentSession.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <PageWrapper>
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
          <Button variant="ghost" size="sm" onClick={handleDelete} className="text-red-500 hover:text-red-600 hover:bg-red-50">
            <Trash2 className="mr-2 h-4 w-4" /> Delete Report
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Report Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="primary">Business Report</Badge>
                <span className="text-sm text-gray-500 flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {date}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-2">
                {currentSession.businessType}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-100">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {currentSession.city}</span>
                <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {currentSession.teamSize}</span>
                <span className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">{currentSession.revenue}</span>
              </div>

              <div className="space-y-8">
                <ReportSection type="diagnosis" title="Diagnosis" content={currentSession.diagnosis} />
                <ReportSection type="actionPlan" title="Action Plan" content={currentSession.actionPlan} />
                <ReportSection type="prioritySteps" title="Priority Steps" content={currentSession.prioritySteps} />
              </div>
            </div>
          </div>

          {/* Sidebar Chat Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <FollowupChat sessionId={currentSession.id} followups={currentSession.followups} />
            </div>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
};
