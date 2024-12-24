import React from "react";
import { useAuth } from "../hooks/useAuth.ts";
import Login from "../components/admin/Login.tsx";

const Admin: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return <Login />;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      {/* Admin content will go here */}
    </div>
  );
};

export default Admin;
