import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    skills: { type: [String], required: true },
    imageUrl: { type: String, required: true },
    githubUrl: { type: String },
    liveUrl: { type: String },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
