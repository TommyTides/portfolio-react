import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.ts';

interface ProtectedRouteProps {
 children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
 const { user, loading } = useAuth();

 if (loading) return <div>Loading...</div>;
 
 if (!user) return <Navigate to="/" replace />;

 return <>{children}</>;
};

export default ProtectedRoute;