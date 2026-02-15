import React, { useState } from "react";
import { MoveUpRight, ArrowLeft, Calendar, Tag, Cpu } from "lucide-react";
import img11 from "../assets/img11.jpg";
import img12 from "../assets/img12.jpg";
import img13 from "../assets/img13.jpg";

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Nano Banana",
      category: "Golden Helix Study",
      image: img11,
      date: "Feb 2026",
      description:
        "A deep dive into the molecular structure of the Golden Helix. This project involved high-fidelity 3D rendering and data visualization for the agricultural tech sector. We focused on the intersection of biology and premium branding.",
      stack: ["React", "Three.js", "Tailwind CSS"],
    },
    // ... rest of your projects
  ];

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6 md:px-12 font-itim relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {!selectedProject ? (
          /* GRID VIEW */
          <div className="animate-in fade-in duration-700">
            {/* Header */}
            <div className="mb-16">
              <h1 className="text-[#DD9735] text-4xl mb-2 tracking-widest uppercase">
                Portfolio
              </h1>
              <div className="h-1 w-16 bg-[#DD9735]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/5 bg-[#111]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all" />
                  </div>
                  <div className="mt-4">
                    <p className="text-[#DD9735] text-[10px] uppercase tracking-[0.3em] mb-1">
                      {project.category}
                    </p>
                    <h3 className="text-xl text-white group-hover:text-[#DD9735] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* COMPACT DETAIL VIEW */
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <button
              onClick={() => setSelectedProject(null)}
              className="flex items-center gap-2 text-gray-500 hover:text-[#DD9735] transition-colors mb-8 uppercase tracking-tighter text-xs"
            >
              <ArrowLeft size={16} /> Back
            </button>

            <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start bg-[#0A0A0A] p-6 md:p-10 rounded-3xl border border-white/5 shadow-2xl">
              {/* IMAGE COLUMN: Constrained Height */}
              <div className="w-full lg:w-5/12 max-h-[60vh] overflow-hidden rounded-2xl shadow-inner border border-[#DD9735]/20">
                <img
                  src={selectedProject.image}
                  className="w-full h-full object-cover"
                  alt={selectedProject.title}
                />
              </div>

              {/* CONTENT COLUMN */}
              <div className="w-full lg:w-7/12 flex flex-col justify-center">
                <span className="text-[#DD9735] text-xs font-bold uppercase tracking-widest mb-2">
                  {selectedProject.category}
                </span>
                <h2 className="text-white text-4xl md:text-5xl font-bold mb-6">
                  {selectedProject.title}
                </h2>

                <div className="flex gap-4 mb-8">
                  <div className="bg-white/5 px-3 py-1 rounded text-[10px] text-gray-400 flex items-center gap-2">
                    <Calendar size={12} /> {selectedProject.date}
                  </div>
                  <div className="bg-white/5 px-3 py-1 rounded text-[10px] text-gray-400 flex items-center gap-2">
                    <Cpu size={12} /> Tech Driven
                  </div>
                </div>

                <p className="text-gray-400 text-lg leading-relaxed mb-8 border-l-2 border-[#DD9735]/30 pl-6 italic">
                  {selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {selectedProject.stack?.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] border border-white/10 px-3 py-1 rounded text-gray-500 uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
