import { Navbar } from './Navbar.jsx';

export const PageWrapper = ({ children, hideNavbar = false }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      {!hideNavbar && <Navbar />}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
};
