import React, { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const AdminSignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    signup({ username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-800 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Admin Account Setup</h1>
          <p className="text-slate-400">
            Create your single admin account. This can only be done once.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Choose a Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full bg-slate-700 p-3 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="password"
            placeholder="Choose a Secure Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-slate-700 p-3 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={isSigningUp}
            className="w-full bg-emerald-600 font-semibold p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            {isSigningUp ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Create Admin Account"
            )}
          </button>
        </form>
        <div className="text-center text-slate-400">
          <p>
            Already have an account?{" "}
            <Link
              to="/admin/login"
              className="text-emerald-400 hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSignupPage;
