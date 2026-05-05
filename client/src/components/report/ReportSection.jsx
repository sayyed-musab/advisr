import { Activity, Target, Zap } from 'lucide-react';

export const ReportSection = ({ title, content, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'diagnosis': return <Activity className="h-5 w-5 text-blue-500" />;
      case 'actionPlan': return <Target className="h-5 w-5 text-purple-500" />;
      case 'prioritySteps': return <Zap className="h-5 w-5 text-yellow-500" />;
      default: return null;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'diagnosis': return 'bg-blue-50/50 border-blue-100';
      case 'actionPlan': return 'bg-purple-50/50 border-purple-100';
      case 'prioritySteps': return 'bg-yellow-50/50 border-yellow-100';
      default: return 'bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className={`rounded-xl border p-6 ${getBgColor()}`}>
      <div className="flex items-center gap-2 mb-4">
        {getIcon()}
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>
      <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
        {content}
      </div>
    </div>
  );
};
