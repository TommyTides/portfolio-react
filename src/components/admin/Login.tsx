import React from "react";
import { useAuth } from "../../hooks/useAuth.ts";

const Login: React.FC = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-ocean-light">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <button
          onClick={signInWithGoogle}
          className="w-full bg-ocean hover:bg-ocean-dark text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
