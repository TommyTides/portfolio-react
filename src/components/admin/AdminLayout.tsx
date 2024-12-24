import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.ts';

const AdminLayout: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/admin', label: 'Dashboard', exact: true },
    { path: '/admin/projects', label: 'Projects' },
    { path: '/admin/skills', label: 'Skills' },
    { path: '/admin/blog', label: 'Blog Posts' },
    { path: '/admin/about', label: 'About Me' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-ocean text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === item.path
                      ? 'bg-ocean-dark'
                      : 'hover:bg-ocean-light'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;