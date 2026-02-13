import React, { useState } from "react";
import { motion } from "framer-motion";
import { Diamond, ArrowUpRight } from "lucide-react";

const ServiceCard = ({ title, desc, index }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;
    const centerX = card.width / 2;
    const centerY = card.height / 2;
    const rotateX = (y - centerY) / 7;
    const rotateY = (centerX - x) / 7;
    setRotate({ x: rotateX, y: rotateY });
  };

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative h-[350px] w-full rounded-[32px] cursor-pointer perspective-1000 group"
    >
      <div className="relative h-full w-full overflow-hidden rounded-[32px] bg-[#121212] border border-[#DD9735]/20 transition-all duration-500 group-hover:border-[#DD9735] shadow-2xl">
        {/* DEFAULT STATE: Subtle Inner Glow & Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(221,151,53,0.1),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] opacity-[0.15] mix-blend-overlay" />

        {/* HOVER STATE: Deep Gold Gradient "Ignition" */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#DD9735] via-[#b67b2a] to-[#5a3d12] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content */}
        <div className="relative z-10 h-full p-10 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="p-3 rounded-xl bg-[#DD9735]/10 group-hover:bg-black/20 transition-colors">
              <Diamond
                className="text-[#DD9735] group-hover:text-white"
                size={24}
              />
            </div>
            <span className="text-[#DD9735]/20 font-itim text-4xl group-hover:text-black/10 transition-colors">
              0{index + 1}
            </span>
          </div>

          <div>
            <h3 className="text-white text-2xl font-itim uppercase tracking-wider mb-3 group-hover:translate-x-1 transition-transform">
              {title}
            </h3>
            <p className="text-gray-400 text-base leading-relaxed group-hover:text-white/90 transition-colors line-clamp-3">
              {desc}
            </p>
          </div>

          <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            <span className="text-white text-xs font-bold uppercase tracking-widest">
              Discover More
            </span>
            <ArrowUpRight className="text-white" size={20} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
