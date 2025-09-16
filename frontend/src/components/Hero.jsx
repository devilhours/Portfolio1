import React from "react";
import { TypeAnimation } from "react-type-animation";
import photo from "../assets/ashu.png";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-24 md:pt-0">
      <div className="grid md:grid-cols-2 items-center gap-12">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Hi! I'm Ashutosh Kumar
          </h1>
          <div className="text-2xl md:text-3xl font-semibold text-slate-300 mt-3 mb-6 h-9">
            I am a{" "}
            <TypeAnimation
              sequence={[
                "Full Stack Developer",
                1500,
                "Web Developer",
                1500,
                "Backend Developer",
                1500,
                "Coder",
                1500,
              ]}
              wrapper="span"
              speed={50}
              className="text-emerald-400"
              repeat={Infinity}
            />
          </div>
          <p className="text-slate-400 max-w-lg mx-auto md:mx-0">
            With a Bachelor's degree in Computer Science and Engineering and
            direct experience as a Software Engineering Intern at Ericsson, I
            have deployed full-stack applications using JavaScript, React.js,
            Node.js, and MongoDB and Some Projects in GenAI using Python. My
            strong foundation in data structures and algorithms, demonstrated by
            solving over 500 problems on Leetcode, equips me to write efficient,
            scalable, and robust code. This combination of practical project
            experience and core theoretical knowledge makes me a capable and
            effective software engineer.
          </p>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-8 bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-emerald-700 transition-transform duration-300 hover:scale-105"
          >
            Hire Me
          </button>
        </div>

        <div className="flex justify-center">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-emerald-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <img
              src={photo}
              alt="Ashutosh Kumar"
              className="relative w-full h-full rounded-full object-cover border-4 border-slate-700 shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
