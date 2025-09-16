import React from "react";

const skillsList = [
  "Java",
  "C++",
  "Python",
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Node.js",
  "MongoDB",
  "SQL",
  "Tailwind CSS",
  "Zustand",
  "Git",
  "GitHub",
  "PHP",
  "Express.js",
];

const SkillBadge = ({ skill }) => (
  <div className="bg-slate-800 text-slate-300 font-medium py-2 px-4 rounded-lg shadow-md hover:bg-emerald-600 hover:text-white transition-all duration-300 cursor-pointer">
    {skill}
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
      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {skillsList.map((skill, index) => (
          <SkillBadge key={index} skill={skill} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
