import { Link } from 'react-router-dom';
import { Button } from '../ui/Button.jsx';
import { Lightbulb } from 'lucide-react';

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-6">
        <Lightbulb className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">No consultations yet</h3>
      <p className="max-w-sm text-gray-500 mb-8">
        Start your first AI business consultation to get an actionable plan tailored to your needs.
      </p>
      <Link to="/consult">
        <Button size="lg">Start Consultation</Button>
      </Link>
    </div>
  );
};
