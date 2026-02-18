import React, { useState, useEffect } from "react";
import api,{IMAGE_PATH}from "../api/axios"; // Importing your custom axios instance
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const res = await api.get("/portfolio/get");
        setProjects(res.data.portfolios || []);
      } catch (err) {
        console.error("Error loading portfolio:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolios();
  }, []);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);

  if (loading)
    return (
      <div className="flex items-center justify-center py-40 text-[#DD9735]">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );

  return (
    <div className="relative w-full bg-[#0d0d0d] flex flex-col items-center py-5 px-4 font-itim">
      <h1 className="text-white text-5xl font-bold mb-6 tracking-tight">
        Portfolio
      </h1>

      <div className="relative w-full max-w-4xl flex items-center justify-center px-4">
        <button
          onClick={prevSlide}
          className="absolute left-0 md:left-[-40px] z-50 p-2 text-[#DD9735] hover:scale-110 transition-all bg-black/40 rounded-full border border-white/5 backdrop-blur-md"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <ChevronLeft size={44} strokeWidth={1.5} />
        </button>

        <div className="flex gap-4 items-center justify-center w-full relative">
          {projects.length > 0 ? (
            projects.map((project, index) => {
              const isCenter = index === currentIndex;
              const isLeft =
                index ===
                (currentIndex - 1 + projects.length) % projects.length;
              const isRight = index === (currentIndex + 1) % projects.length;

              if (!isCenter && !isLeft && !isRight) return null;

              return (
                <div
                  key={project._id}
                  className={`transition-all duration-700 ease-in-out rounded-2xl overflow-hidden flex flex-col ${isCenter ? "w-[300px] sm:w-[340px] h-[65vh] max-h-[480px] min-h-[400px] z-20 opacity-100 shadow-2xl scale-100" : "w-[240px] h-[55vh] max-h-[400px] min-h-[350px] opacity-20 scale-90 blur-[1px] hidden md:flex"} bg-gradient-to-b from-[#A67C45] via-[#734f26] to-[#1a1107] border border-white/10`}
                >
                  <div className="h-[40%] w-full bg-black/40">
                    <img
               
                      src={`${IMAGE_PATH}/${project.image}`}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-grow text-white">
                    <h3 className="text-xl font-bold mb-2 truncate">
                      {project.title}
                    </h3>
                    <p className="text-xs leading-relaxed font-light text-white/80 line-clamp-4 italic border-l-2 border-[#DD9735]/40 pl-4">
                      {project.description}
                    </p>
                    <div className="mt-auto flex justify-between items-center opacity-30 pt-2">
                      <span className="text-[10px] font-serif italic">r</span>
                      <span className="text-[10px] font-mono">
                        0{index + 1}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-white/20 uppercase tracking-[0.3em]">
              Database empty
            </div>
          )}
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 md:right-[-40px] z-50 p-2 text-[#DD9735] hover:scale-110 transition-all bg-black/40 rounded-full border border-white/5 backdrop-blur-md"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <ChevronRight size={44} strokeWidth={1.5} />
        </button>
      </div>

      
<div className="flex gap-3 mt-12">
        {projects.map((_, i) => (
          <button
            key={i}
            className={`transition-all duration-500 rounded-full h-2 
              ${i === currentIndex ? "w-10 bg-[#DD9735]" : "w-2 bg-white/10"}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
