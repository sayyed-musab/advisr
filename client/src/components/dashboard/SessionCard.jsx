import { Link } from 'react-router-dom';
import { Button } from '../ui/Button.jsx';
import { Badge } from '../ui/Badge.jsx';
import { ArrowRight, Calendar, MapPin, Briefcase } from 'lucide-react';

export const SessionCard = ({ session }) => {
  const date = new Date(session.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-serif text-xl font-bold text-gray-900 mb-1">{session.businessType}</h3>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {session.city}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {date}</span>
          </div>
        </div>
        <Badge variant="primary">Consultation</Badge>
      </div>
      
      <div className="mb-6 flex-1">
        <p className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
          <Briefcase className="h-4 w-4" /> Focus Area
        </p>
        <p className="text-sm text-gray-600 line-clamp-2">{session.problemArea}</p>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-100 flex justify-end">
        <Link to={`/session/${session.id}`}>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            View Report <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
