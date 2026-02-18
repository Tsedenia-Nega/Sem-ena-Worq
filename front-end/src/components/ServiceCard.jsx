import React, { useState } from "react";
import { motion } from "framer-motion";
import { Diamond } from "lucide-react";
import { IMAGE_PATH } from "../api/axios";

const ServiceCard = ({ title, desc, index, image }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;
    const centerX = card.width / 2;
    const centerY = card.height / 2;
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;
    setRotate({ x: rotateX, y: rotateY });
  };

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="relative h-[380px] w-full rounded-[24px] cursor-pointer perspective-1000 group"
    >
      {/* Main Container with constant subtle glow */}
      <div className="relative h-full w-full overflow-hidden rounded-[24px] bg-[#050505] border border-[#DD9735]/20 transition-all duration-500 group-hover:border-[#DD9735]/60 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_40px_rgba(221,151,53,0.1)]">
        {/* IMAGE BACKGROUND */}
        {image && (
          <div className="absolute inset-0 z-0">
            <img
              src={`${IMAGE_PATH}/${image}`}
              alt={title}
              className="w-full h-full object-cover opacity-40 grayscale-[0.3] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-60"
            />
            {/* Dark Overlay for Text Pop */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90" />
          </div>
        )}

        {/* TOP CONTENT: Icon & Index */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
          <div className="w-10 h-10 rounded-lg bg-[#DD9735]/10 backdrop-blur-md border border-[#DD9735]/30 flex items-center justify-center group-hover:bg-[#DD9735] transition-all duration-500 shadow-[0_0_15px_rgba(221,151,53,0.2)]">
            <Diamond
              className="text-[#DD9735] group-hover:text-black transition-colors"
              size={18}
            />
          </div>
          <span className="text-[#DD9735]/10 font-black text-5xl select-none group-hover:text-[#DD9735]/20 transition-colors duration-500 italic">
            0{index + 1}
          </span>
        </div>

        {/* MAIN CONTENT: Centered & Lifted Position */}
        <div className="relative z-10 h-full p-8 flex flex-col justify-center items-center text-center -mt-4">
          <h3 className="text-white text-xl md:text-2xl font-bold uppercase tracking-[0.2em] mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] group-hover:text-[#DD9735] transition-colors duration-300">
            {title}
          </h3>

          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#DD9735] to-transparent mb-6 group-hover:w-32 transition-all duration-700" />

          <p className="text-gray-300 text-sm md:text-base leading-relaxed tracking-wide transition-colors line-clamp-3 max-w-[280px] drop-shadow-md">
            {desc}
          </p>
        </div>

        {/* Constant Radial Glow in the background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(221,151,53,0.08),_transparent_70%)]" />

        {/* Animated Light Sweep */}
        <motion.div
          animate={{ x: ["-200%", "200%"] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 4,
          }}
          className="absolute inset-0 z-5 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
        />
      </div>
    </motion.div>
  );
};

export default ServiceCard;
