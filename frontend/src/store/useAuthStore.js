import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
  // --- STATE ---
  authUser: null,
  isCheckingAuth: true,
  isLoggingIn: false,
  isLoggingOut: false,
  isSigningUp: false, // Added for signup loading state

  // --- ACTIONS ---
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
      console.error("Auth check failed:", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", credentials);
      set({ authUser: res.data });
      toast.success("Admin account created successfully!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Signup failed");
      set({ authUser: null });
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", credentials);
      set({ authUser: res.data });
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed");
      set({ authUser: null });
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.error || "Logout failed");
    } finally {
      set({ isLoggingOut: false });
    }
  },
}));

export default useAuthStore;
