import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.ts';

const AdminDashboard: React.FC = () => {
 const { user } = useAuth();

 const sections = [
   { title: 'Projects', path: '/admin/projects', description: 'Manage your portfolio projects' },
   { title: 'Skills', path: '/admin/skills', description: 'Update your technical skills' },
   { title: 'Blog Posts', path: '/admin/blog', description: 'Manage your blog content' },
   { title: 'About', path: '/admin/about', description: 'Update your personal information' }
 ];

 return (
   <div className="space-y-6">
     <div className="bg-white p-4 rounded-lg shadow">
       <h2 className="text-2xl font-bold">Welcome, {user?.displayName}</h2>
       <p className="text-gray-600">Manage your portfolio content from here</p>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       {sections.map((section) => (
         <Link
           key={section.title}
           to={section.path}
           className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
         >
           <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
           <p className="text-gray-600">{section.description}</p>
         </Link>
       ))}
     </div>
   </div>
 );
};

export default AdminDashboard;