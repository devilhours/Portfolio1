import { uploadOnCloudinary } from "../lib/cloudinary.js";
import Project from "../models/project.model.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addProject = async (req, res) => {
  try {
    const { title, description, skills, githubUrl, liveUrl } = req.body;

    // --- 1. Validation ---
    if (!title || !description || !skills) {
      return res
        .status(400)
        .json({ error: "Title, description, and skills are required." });
    }

    const imageLocalPath = req.file?.path;
    if (!imageLocalPath) {
      return res.status(400).json({ error: "Project image is required." });
    }

    // --- 2. Upload to Cloudinary ---
    const image = await uploadOnCloudinary(imageLocalPath);
    if (!image) {
      return res.status(500).json({ error: "Failed to upload image." });
    }

    // --- 3. Create and Save Project to DB ---
    const newProject = new Project({
      title,
      description,
      skills, // Skills are now sent pre-formatted from the frontend
      imageUrl: image.secure_url, // Use the URL from Cloudinary
      githubUrl,
      liveUrl,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error in addProject controller:", error.message);
    res.status(500).json({ error: "Server error while adding project." });
  }
};