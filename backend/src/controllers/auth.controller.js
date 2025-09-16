import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../lib/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      return res
        .status(403)
        .json({
          error: "An admin account already exists. Signup is disabled.",
        });
    }

    const newUser = new User({ username, password });
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({ _id: newUser._id, username: newUser.username });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({ _id: user._id, username: user.username });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const checkAuth = async (req, res) => {
    try {
        // The protectRoute middleware already found the user and attached it to the request.
        // If it hadn't, it would have returned an error.
        // So, if we reach this point, the user is authenticated.
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.error("Error in checkAuth controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};