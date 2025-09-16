import Contact from "../models/contact.model.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Please fill out all fields." });
    }
    const newContactMessage = new Contact({ name, email, subject, message });
    await newContactMessage.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Your message has been sent successfully!",
      });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
