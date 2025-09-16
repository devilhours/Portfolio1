import express from "express";
import { getProjects, addProject } from "../controllers/project.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import multer from "multer";

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", getProjects);

// The 'upload.single("image")' middleware will handle the file upload
// It must come AFTER auth but BEFORE the main controller logic
router.post("/", protectRoute, upload.single("image"), addProject);

export default router;