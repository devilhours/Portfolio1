import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import ContactForm from "../components/ContactForm"; // Assuming you create this component
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="bg-slate-900 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-white">
      <Navbar />
      <main className="container mx-auto px-6">
        <Hero />
        <Projects />
        <Skills />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
