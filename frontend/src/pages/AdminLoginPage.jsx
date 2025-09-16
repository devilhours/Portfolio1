import React, { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link

const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return;
    login({ username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-800 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Admin Login</h1>
          <p className="text-slate-400">Access your portfolio dashboard.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form inputs remain the same */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full bg-slate-700 p-3 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-slate-700 p-3 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-emerald-600 font-semibold p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            {isLoggingIn ? <LoaderCircle className="animate-spin" /> : "Login"}
          </button>
        </form>
        {/* Add link to signup page */}
        <div className="text-center text-slate-400">
          <p>
            First time here?{" "}
            <Link
              to="/admin/signup"
              className="text-emerald-400 hover:underline"
            >
              Create Admin Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
