import { Link } from 'react-router-dom';
import { useConsultStore } from '../../store/consultStore.js';
import { ReportSection } from '../report/ReportSection.jsx';
import { Button } from '../ui/Button.jsx';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const StepReport = () => {
  const { report, reset } = useConsultStore();

  if (!report) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Your AI Consultation Report is Ready</h2>
        <p className="text-gray-500 mt-2">Based on your business profile, here is our analysis.</p>
      </div>

      <div className="space-y-6">
        <ReportSection 
          type="diagnosis" 
          title="Diagnosis" 
          content={report.diagnosis} 
        />
        <ReportSection 
          type="actionPlan" 
          title="Action Plan" 
          content={report.actionPlan} 
        />
        <ReportSection 
          type="prioritySteps" 
          title="Priority Steps" 
          content={report.prioritySteps} 
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 pt-8 border-t border-gray-200">
        <Link to="/dashboard">
          <Button variant="outline" className="w-full sm:w-auto" onClick={reset}>
            Back to Dashboard
          </Button>
        </Link>
        <Link to={`/session/${report.sessionId}`}>
          <Button className="w-full sm:w-auto" onClick={reset}>
            Ask Follow-up Questions <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
