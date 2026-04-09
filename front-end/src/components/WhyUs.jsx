import React from "react";
import { Zap, Users, Maximize, ArrowRight } from "lucide-react";
import whyus from "./../assets/why3.png";

const WhyUs = () => {
  const points = [
    {
      icon: <Zap size={24} />,
      title: "Agile Methodology",
      desc: "We deliver iterative results, ensuring flexibility and transparency throughout the entire development lifecycle.",
    },
    {
      icon: <Users size={24} />,
      title: "Dedicated Expert Teams",
      desc: "Our engineers, designers, and project managers are specialized in modern stacks and industry best practices.",
    },
    {
      icon: <Maximize size={24} />,
      title: "Scalability Focus",
      desc: "We design solutions that can effortlessly grow with your business, handling massive future workloads.",
    },
  ];

  return (
    <section className="py-22 md:py-20 px-6 md:px-20 bg-[#050505] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* HEADER - Increased spacing and scale */}
        <div className="text-center mb-8 md:mb-8">
          <p className="text-[#DD9735] font-mono text-xs uppercase tracking-[0.6em] mb-4">
            The Semenaworq Difference
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-[1.1]">
            Why Choose Our <br />
            <span className="block text-[#DD9735] mt-4">
              Technology Partner
            </span>
          </h2>
          <div className="flex justify-center mt-2">
            <div className="w-20 h-[1px] bg-[#DD9735]/40"></div>
          </div>
        </div>

        {/* BALANCED GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* LEFT SIDE: THE POINTS */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            {points.map((point, i) => (
              <div
                key={i}
                className="group relative flex flex-col p-5 md:p-12 bg-[#080808]/40 border-l border-white/10 hover:border-[#DD9735] transition-all duration-500"
              >
                {/* Background Glow Effect */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#DD9735]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-[#DD9735] p-3 bg-[#DD9735]/5 border  border-[#DD9735]/10 group-hover:bg-[#DD9735] group-hover:text-black transition-all duration-300">
                      {point.icon}
                    </div>

                    <ArrowRight
                      size={20}
                      className="text-white/5 group-hover:text-[#DD9735] group-hover:translate-x-2 transition-all"
                    />
                  </div>

                  <h4 className="text-2xl font-bold tracking-tighter uppercase text-[#DD9735] transition-colors">
                    {point.title}
                  </h4>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg group-hover:text-gray-200 transition-colors">
                    {point.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE: THE IMAGE */}
          <div className="relative group overflow-hidden border border-white/10 order-1 lg:order-2 h-[450px] lg:h-auto">
            {/* 1. Subtle Gold Tint (Visible only on hover) */}
            <div className="absolute inset-0 bg-[#DD9735]/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"></div>

            {/* 2. Bottom Gradient for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10"></div>

            {/* 3. The Image - Simple transition from muted to clear */}
            <img
              src={whyus}
              alt="Data Architecture"
              className="w-full h-full object-cover grayscale-[0.5] brightness-[0.7] transition-all duration-1000 
               group-hover:grayscale-0 group-hover:brightness-100"
            />

            <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-[#DD9735]/60 z-20 group-hover:border-[#DD9735] transition-colors"></div>
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-[#DD9735]/60 z-20 group-hover:border-[#DD9735] transition-colors"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
