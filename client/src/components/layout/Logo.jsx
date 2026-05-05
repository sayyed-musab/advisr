import { Link } from 'react-router-dom';

export const Logo = ({ className }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className || ''}`}>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
        <span className="font-serif text-xl font-bold">Z</span>
      </div>
      <span className="font-serif text-xl font-bold tracking-tight text-gray-900">
        Zuvio
      </span>
    </Link>
  );
};
