import Contact from "../models/contact.model.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Please fill out all fields." });
    }
    const newContactMessage = new Contact({ name, email, subject, message });
    await newContactMessage.save();
    res.status(201).json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to get all contact messages
export const getContactMessages = async (req, res) => {
  try {
    // Find all messages and sort by newest first
    const messages = await Contact.find({}).sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getContactMessages controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};