import React from "react";
// Import all the icons you need
import {
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaPython,
} from "react-icons/fa";
import {
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
} from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import { CgCPlusPlus } from "react-icons/cg";
import { TbApi } from "react-icons/tb";
import { GiArtificialIntelligence } from "react-icons/gi";
import { PiFlowArrowBold } from "react-icons/pi"; // Corrected import for Zustand

// Updated data structure to hold the component directly
const skillsList = [
  { name: "Java", icon: <FaJava color="#ED8B00" /> },
  { name: "C++", icon: <CgCPlusPlus color="#00599C" /> },
  { name: "Python", icon: <FaPython color="#3776AB" /> },
  { name: "HTML", icon: <FaHtml5 color="#E34F26" /> },
  { name: "CSS", icon: <FaCss3Alt color="#1572B6" /> },
  { name: "JavaScript", icon: <FaJsSquare color="#F7DF1E" /> },
  { name: "React", icon: <FaReact color="#61DAFB" /> },
  { name: "Node.js", icon: <FaNodeJs color="#339933" /> },
  { name: "Express.js", icon: <SiExpress color="#000000" /> },
  { name: "MongoDB", icon: <SiMongodb color="#47A248" /> },
  { name: "PostgreSQL", icon: <SiPostgresql color="#336791" /> },
  { name: "SQL", icon: <GrMysql color="#4479A1" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss color="#06B6D4" /> },
  { name: "Zustand", icon: <PiFlowArrowBold color="#000000" /> }, // Replaced SiZustand with a suitable icon
  { name: "Git", icon: <FaGitAlt color="#F05032" /> },
  { name: "GitHub", icon: <FaGithub color="#181717" /> },
  { name: "RESTful APIs", icon: <TbApi color="#2F855A" /> },
  { name: "Generative AI", icon: <GiArtificialIntelligence color="#8B5CF6" /> },
];

const SkillBadge = ({ skill }) => (
  <div className="flex flex-col items-center text-center gap-2 p-4 bg-slate-800 rounded-lg shadow-md transition-all duration-300 cursor-pointer hover:bg-emerald-600 hover:-translate-y-1 w-32">
    <div className="text-4xl">{skill.icon}</div>
    <span className="text-slate-300 font-medium text-sm">{skill.name}</span>
  </div>
);

const Skills = () => {
  return (
    <section id="skills" className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-white">My Tech Stack</h2>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
          A few of the technologies and tools I've been working with recently to
          bring ideas to life.
        </p>
        <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4 rounded"></div>
      </div>
      <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
        {skillsList.map((skill) => (
          <SkillBadge key={skill.name} skill={skill} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
