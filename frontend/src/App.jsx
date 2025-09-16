import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/useAuthStore";

// Pages
import HomePage from "./pages/HomePage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminSignupPage from "./pages/AdminSignupPage"; // Import signup page

// Components
import AdminDashboard from "./components/protected/AdminDashboard";
import { LoaderCircle } from "lucide-react";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  return authUser ? children : <Navigate to="/admin/login" />;
};

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <LoaderCircle className="w-10 h-10 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Add the signup route */}
        <Route
          path="/admin/signup"
          element={
            !authUser ? <AdminSignupPage /> : <Navigate to="/admin/dashboard" />
          }
        />
        <Route
          path="/admin/login"
          element={
            !authUser ? <AdminLoginPage /> : <Navigate to="/admin/dashboard" />
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;
