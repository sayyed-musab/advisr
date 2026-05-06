import { Activity, Target, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export const ReportSection = ({ title, content, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'diagnosis': return <Activity className="h-5 w-5 text-[#76b900]" />;
      case 'actionPlan': return <Target className="h-5 w-5 text-green-600" />;
      case 'prioritySteps': return <Zap className="h-5 w-5 text-yellow-500" />;
      default: return null;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'diagnosis': return 'bg-green-50/50 border-green-100';
      case 'actionPlan': return 'bg-emerald-50/50 border-emerald-100';
      case 'prioritySteps': return 'bg-yellow-50/50 border-yellow-100';
      default: return 'bg-gray-50 border-gray-100';
    }
  };

  const formattedContent = typeof content === 'string'
    ? content
        .replace(/<br\s*\/?>/gi, '\n')   // convert <br> tags to newlines
        .replace(/(?<=[\w.!?])\s+([*-])\s+/g, '\n\n$1 ')  // separate inline bullets
    : content;

  return (
    <div className={`rounded-xl border p-6 ${getBgColor()}`}>
      <div className="flex items-center gap-2 mb-4">
        {getIcon()}
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>
      <div className="prose prose-sm max-w-none text-gray-700">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{formattedContent}</ReactMarkdown>
      </div>
    </div>
  );
};
