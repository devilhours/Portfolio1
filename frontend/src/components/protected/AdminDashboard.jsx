import React, { useState, useEffect } from "react";
import useAuthStore from "../../store/useAuthStore";
import usePortfolioStore from "../../store/usePortfolioStore";
import {
  LoaderCircle,
  User,
  Mail,
  MessageSquare,
  Calendar,
} from "lucide-react";

const AdminDashboard = () => {
  const { authUser, logout } = useAuthStore();
  const {
    addProject,
    contactMessages,
    isLoadingMessages,
    fetchContactMessages,
  } = usePortfolioStore();

  // State for the "Add Project" form
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    githubUrl: "",
    liveUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  // Fetch contact messages when the component first loads
  useEffect(() => {
    fetchContactMessages();
  }, [fetchContactMessages]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please select an image file.");
      return;
    }
    setIsAddingProject(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);

    const skillsArray = formData.skills.split(",").map((skill) => skill.trim());
    skillsArray.forEach((skill) => data.append("skills[]", skill));

    data.append("githubUrl", formData.githubUrl);
    data.append("liveUrl", formData.liveUrl);
    data.append("image", imageFile);

    const success = await addProject(data);

    if (success) {
      // Reset form fields
      setFormData({
        title: "",
        description: "",
        skills: "",
        githubUrl: "",
        liveUrl: "",
      });
      setImageFile(null);
      if (document.getElementById("image-input")) {
        document.getElementById("image-input").value = null;
      }
    }
    setIsAddingProject(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Section 1: Add Project Form */}
        <div className="bg-slate-800 p-8 rounded-lg shadow-lg self-start">
          <h2 className="text-2xl font-bold mb-6">Add a New Project</h2>
          <form onSubmit={handleProjectSubmit} className="space-y-4">
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
              disabled={isAddingProject}
              className="w-full bg-emerald-600 font-semibold p-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:bg-slate-600"
            >
              {isAddingProject ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Add Project"
              )}
            </button>
          </form>
        </div>

        {/* Section 2: Display Contact Messages */}
        <div className="bg-slate-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Contact Messages</h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {isLoadingMessages && (
              <div className="flex justify-center">
                <LoaderCircle className="animate-spin" />
              </div>
            )}
            {!isLoadingMessages && contactMessages.length === 0 && (
              <p className="text-slate-400 text-center">No messages yet.</p>
            )}
            {!isLoadingMessages &&
              contactMessages.map((msg) => (
                <div
                  key={msg._id}
                  className="bg-slate-700 p-4 rounded-lg border-l-4 border-emerald-500"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-bold text-lg text-white">
                      {msg.subject}
                    </p>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm space-y-2 text-slate-300">
                    <p className="flex items-center gap-2">
                      <User size={14} /> <strong>From:</strong> {msg.name}
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail size={14} /> <strong>Email:</strong> {msg.email}
                    </p>
                    <p className="flex items-start gap-2 pt-2 border-t border-slate-600 mt-2">
                      <MessageSquare size={14} /> {msg.message}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;