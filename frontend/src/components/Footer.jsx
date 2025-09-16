import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Instagram, Mail, Lock } from "lucide-react";
import useAuthStore from "../store/useAuthStore";

// Expanded the social links array for a complete example
const socialLinks = [
  {
    icon: <Linkedin />,
    href: "https://www.linkedin.com/in/ashutosh-kumar2510/",
    name: "LinkedIn",
  },
  {
    icon: <Github />,
    href: "https://github.com/devilhours",
    name: "GitHub",
  },
  {
    icon: <Instagram />,
    href: "https://www.instagram.com/ashutoshk.25/",
    name: "Instagram",
  },
  {
    icon: <Mail />,
    href: "mailto:ashutosh.kumar9037@gmail.com",
    name: "Email",
  },
];

const Footer = () => {
  const { authUser } = useAuthStore();

  return (
    <footer className="bg-slate-900 border-t border-slate-700 py-8">
      <div className="container mx-auto px-6 text-center text-slate-400">
        <div className="flex justify-center gap-6 mb-4">
          {/* Mapped over the socialLinks array to render each icon */}
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="hover:text-emerald-400 transition-colors"
            >
              {link.icon}
            </a>
          ))}
        </div>
        <p className="mb-4">
          &copy; {new Date().getFullYear()} Ashutosh Kumar. All rights reserved.
        </p>

        {/* Conditionally render Admin Login/Dashboard link */}
        <div className="flex justify-center items-center gap-2">
          <Lock size={16} />
          {authUser ? (
            <Link
              to="/admin/dashboard"
              className="hover:text-emerald-400 transition-colors"
            >
              Admin Dashboard
            </Link>
          ) : (
            <Link
              to="/admin/login"
              className="hover:text-emerald-400 transition-colors"
            >
              Admin Login
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;