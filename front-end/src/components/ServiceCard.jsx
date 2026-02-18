import React, { useState } from "react";
import { motion } from "framer-motion";
import { Diamond } from "lucide-react";
import { IMAGE_PATH } from "../api/axios"; // 1. Import your central path

const ServiceCard = ({ title, desc, index, image }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;
    const centerX = card.width / 2;
    const centerY = card.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    setRotate({ x: rotateX, y: rotateY });
  };

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative h-[420px] w-full rounded-[32px] cursor-pointer perspective-1000 group"
    >
      <div className="relative h-full w-full overflow-hidden rounded-[32px] bg-[#0A0A0A] border border-[#DD9735]/40 transition-all duration-500 group-hover:border-[#DD9735] shadow-[0_0_40px_rgba(221,151,53,0.15)] group-hover:shadow-[0_0_50px_rgba(221,151,53,0.3)]">
        {/* 2. Updated Image Source Logic */}
        {image && (
          <div className="absolute inset-0 z-0">
            <img
              // Construct URL: http://localhost:5000/uploads/filename.jpg
              src={`${IMAGE_PATH}/${image}`}
              alt={title}
              loading="lazy"
              crossOrigin="anonymous" // Fixes the Opaque blocking error
              className="w-full h-full object-cover opacity-50 transition-transform duration-1000 group-hover:scale-110"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/600x400/0a0a0a/DD9735?text=Service";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#DD9735]/5 to-black/90" />
          </div>
        )}

        {/* TOP LAYER: Gold Diamond & Ghost Number */}
        <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-start z-20">
          <div className="p-3 rounded-xl bg-[#DD9735] border border-[#DD9735] transition-transform duration-500 group-hover:scale-110 shadow-[0_0_15px_rgba(221,151,53,0.5)]">
            <Diamond className="text-black" size={22} />
          </div>
          <span className="text-[#DD9735]/10 font-bold text-6xl select-none group-hover:text-[#DD9735]/20 transition-colors">
            0{index + 1}
          </span>
        </div>

        {/* MIDDLE LAYER: Centered Text */}
        <div className="relative z-10 h-full p-10 flex flex-col items-center justify-center text-center">
          <h3 className="text-[#DD9735] text-2xl font-bold uppercase tracking-[0.25em] mb-4 drop-shadow-[0_0_10px_rgba(221,151,53,0.3)]">
            {title}
          </h3>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#DD9735] to-transparent mb-6 group-hover:w-40 transition-all duration-700" />

          <p className="text-gray-200 text-sm md:text-base leading-relaxed tracking-wide transition-colors line-clamp-3 max-w-[300px]">
            {desc}
          </p>
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(221,151,53,0.15),_transparent_70%)]" />

        <motion.div
          animate={{ x: ["-200%", "200%"] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 2,
          }}
          className="absolute inset-0 z-5 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
        />
      </div>
    </motion.div>
  );
};

export default ServiceCard;
