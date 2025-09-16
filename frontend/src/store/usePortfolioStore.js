import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const usePortfolioStore = create((set) => ({
  // --- STATE ---
  projects: [],
  contactMessages: [], // New state for messages
  isLoadingProjects: false,
  isSendingMessage: false,
  isLoadingMessages: false, // New loading state

  // --- ACTIONS ---
  fetchProjects: async () => {
    set({ isLoadingProjects: true });
    try {
      const res = await axiosInstance.get("/projects");
      set({ projects: res.data });
    } catch (error) {
      toast.error("Failed to load projects.");
      console.error("Fetch Projects Error:", error);
    } finally {
      set({ isLoadingProjects: false });
    }
  },

  submitContactForm: async (formData) => {
    set({ isSendingMessage: true });
    try {
      const res = await axiosInstance.post("/contact", formData);
      toast.success(res.data.message);
      return true; // Indicate success
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong!");
      return false; // Indicate failure
    } finally {
      set({ isSendingMessage: false });
    }
  },

  addProject: async (projectData) => {
    try {
      const res = await axiosInstance.post("/projects", projectData);
      // Add the new project to the start of the projects array
      set((state) => ({ projects: [res.data, ...state.projects] }));
      toast.success("Project added successfully!");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to add project.");
      return false;
    }
  },

  fetchContactMessages: async () => {
    set({ isLoadingMessages: true });
    try {
        const res = await axiosInstance.get('/contact');
        set({ contactMessages: res.data });
    } catch (error) {
        toast.error('Failed to load messages.');
        console.error("Fetch Messages Error:", error);
    } finally {
        set({ isLoadingMessages: false });
    }
  },
}));

export default usePortfolioStore;
