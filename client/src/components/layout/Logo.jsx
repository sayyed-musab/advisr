import { Link } from 'react-router-dom';

export const Logo = ({ className }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className || ''}`}>
      <img src='/logo.png' className='h-8'/>
      {/* <div className="flex h-8 w-8 items-center justify-center rounded-lg">
          <img src="/icon.png" alt="Logo" />
      </div>
      <span className="text-xl font-bold tracking-tight text-gray-900">
        Advisr
      </span> */}
    </Link>
  );
};
