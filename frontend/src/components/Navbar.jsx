import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LayoutDashboard, Laptop } from "lucide-react";
import useAuthStore from "../store/useAuthStore"; // Import the auth store

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authUser } = useAuthStore(); // Get the authenticated user
  const navLinks = ["projects", "skills", "contact"];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // If element not on page (e.g., coming from admin page), navigate first
      window.location.href = `/#${id}`;
    }
    setIsOpen(false);
  };

  return (
    <header className="bg-slate-900/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b border-slate-700">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <Laptop
            alt="Logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="text-xl font-bold text-white tracking-wider">
            Ashutosh Kumar
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollToSection(link)}
              className="capitalize text-slate-300 hover:text-emerald-400 transition-colors duration-300 font-medium"
            >
              {link}
            </button>
          ))}
          {/* Conditionally render Dashboard link */}
          {authUser && (
            <Link
              to="/admin/dashboard"
              className="bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-emerald-700 transition-colors flex items-center gap-2"
            >
              <LayoutDashboard size={18} /> Dashboard
            </Link>
          )}
        </nav>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="md:hidden bg-slate-900 pb-4">
          <ul className="flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <li key={link}>
                <button
                  onClick={() => scrollToSection(link)}
                  className="capitalize text-slate-300 hover:text-emerald-400 font-medium py-2"
                >
                  {link}
                </button>
              </li>
            ))}
            {/* Conditionally render Dashboard link in mobile menu */}
            {authUser && (
              <li>
                <Link
                  to="/admin/dashboard"
                  className="bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
                >
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
