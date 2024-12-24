// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Blog from './pages/Blog.tsx';
import Login from './components/admin/Login.tsx';
// import ProtectedRoute from './components/shared/ProtectedRoute.tsx';
import AdminLayout from './components/admin/AdminLayout.tsx';
import AdminDashboard from './components/admin/AdminDashboard.tsx';
import AdminProjects from './components/admin/AdminProjects.tsx';
import AdminSkills from './components/admin/AdminSkills.tsx';
import AdminBlog from './components/admin/AdminBlog.tsx';
import AdminAbout from './components/admin/AdminAbout.tsx';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            //<ProtectedRoute>
              <AdminLayout />
            //</ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="about" element={<AdminAbout />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;