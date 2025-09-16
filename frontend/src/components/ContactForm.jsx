import React, { useState } from "react";
import toast from "react-hot-toast";
import { Send } from "lucide-react";
import usePortfolioStore from "../store/usePortfolioStore";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  // Get actions and state from the Zustand store
  const { submitContactForm, isSendingMessage } = usePortfolioStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await submitContactForm(formData);
    if (success) {
      // Reset form only on successful submission
      setFormData({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent successfully!");
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-white">Contact Me</h2>
        <p className="text-slate-400 mt-4">
          Questions, thoughts, or just want to say hello?
        </p>
        <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4 rounded"></div>
      </div>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full bg-slate-800 p-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full bg-slate-800 p-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full bg-slate-800 p-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full bg-slate-800 p-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        ></textarea>
        <button
          type="submit"
          disabled={isSendingMessage}
          className="w-full bg-emerald-600 font-semibold p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          {isSendingMessage ? "Sending..." : "Send Message"} <Send size={18} />
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
