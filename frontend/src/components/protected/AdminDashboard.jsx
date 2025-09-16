import React, { useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import usePortfolioStore from "../../store/usePortfolioStore";
import { LoaderCircle } from "lucide-react";

const AdminDashboard = () => {
  const { authUser, logout } = useAuthStore();
  const { addProject } = usePortfolioStore();

  // State for text inputs
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    githubUrl: "",
    liveUrl: "",
  });
  // Separate state for the image file
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please select an image file.");
      return;
    }
    setIsLoading(true);

    // --- Use FormData for file uploads ---
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    // Convert skills string to array and append each skill
    const skillsArray = formData.skills.split(",").map((skill) => skill.trim());
    skillsArray.forEach((skill) => data.append("skills[]", skill));

    data.append("githubUrl", formData.githubUrl);
    data.append("liveUrl", formData.liveUrl);
    data.append("image", imageFile); // Append the file

    const success = await addProject(data);

    if (success) {
      // Reset form
      setFormData({
        title: "",
        description: "",
        skills: "",
        githubUrl: "",
        liveUrl: "",
      });
      setImageFile(null);
      document.getElementById("image-input").value = null; // Clear file input
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-emerald-400">Welcome, {authUser?.username}!</p>
        </div>
        <button
          onClick={logout}
          className="bg-rose-600 hover:bg-rose-700 font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Logout
        </button>
      </header>

      <div className="max-w-2xl mx-auto bg-slate-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Add a New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ... other text inputs ... */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Project Title"
            required
            className="w-full bg-slate-700 p-3 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Project Description"
            rows="4"
            required
            className="w-full bg-slate-700 p-3 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          ></textarea>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Skills (comma-separated)"
            required
            className="w-full bg-slate-700 p-3 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          {/* --- Updated Image Input --- */}
          <div>
            <label
              htmlFor="image-input"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Project Image
            </label>
            <input
              type="file"
              id="image-input"
              name="image"
              onChange={handleFileChange}
              required
              className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
            />
          </div>

          <input
            type="text"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            placeholder="GitHub URL"
            className="w-full bg-slate-700 p-3 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="text"
            name="liveUrl"
            value={formData.liveUrl}
            onChange={handleChange}
            placeholder="Live URL"
            className="w-full bg-slate-700 p-3 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-600 font-semibold p-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:bg-slate-600"
          >
            {isLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Add Project"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
