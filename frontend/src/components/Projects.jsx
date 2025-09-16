import React, { useEffect } from "react";
import { Github, Link as LinkIcon, LoaderCircle } from "lucide-react";
import usePortfolioStore from "../store/usePortfolioStore";

const ProjectCard = ({ project }) => (
  <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 group">
    <img
      src={project.imageUrl}
      alt={project.title}
      className="w-full h-52 object-cover"
    />
    <div className="p-6 flex flex-col h-[calc(100%-13rem)]">
      <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
      <p className="text-slate-400 mb-4 text-sm flex-grow">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.skills.map((skill, i) => (
          <span
            key={i}
            className="bg-emerald-900/50 text-emerald-300 text-xs font-semibold px-2.5 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-4 mt-auto">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <Github size={24} />
        </a>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <LinkIcon size={24} />
        </a>
      </div>
    </div>
  </div>
);

const Projects = () => {
  // Logic is now handled by the Zustand store
  const { projects, isLoadingProjects, fetchProjects } = usePortfolioStore();

  useEffect(() => {
    // Fetch projects when the component mounts
    fetchProjects();
  }, [fetchProjects]);

  return (
    <section id="projects" className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-white">My Projects</h2>
        <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4 rounded"></div>
      </div>

      {isLoadingProjects && (
        <div className="flex justify-center">
          <LoaderCircle className="w-10 h-10 animate-spin text-emerald-500" />
        </div>
      )}

      {!isLoadingProjects && projects.length === 0 && (
        <p className="text-center col-span-full text-slate-400">
          No projects found. Add one from the admin dashboard!
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {!isLoadingProjects &&
          projects.map((p) => <ProjectCard key={p._id} project={p} />)}
      </div>
    </section>
  );
};

export default Projects;
