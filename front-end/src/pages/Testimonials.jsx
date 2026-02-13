import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Amiy kolby",
    role: "Director at xyz",
    text: "The technical expertise and attention to detail were beyond our expectations. Highly recommended for premium projects.",
    image: "https://i.pravatar.cc/150?u=11",
  },
  {
    id: 2,
    name: "Sara Jensen",
    role: "CEO at ABC",
    text: "Innovative designs and a pleasure to work with. They really understand modern aesthetics and branding.",
    image: "https://i.pravatar.cc/150?u=22",
  },
  {
    id: 3,
    name: "Marcus Thorne",
    role: "Manager at Tech",
    text: "They transformed our vision into a stunning reality. The workflow was seamless and very professional.",
    image: "https://i.pravatar.cc/150?u=33",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "Founder at Bloom",
    text: "Excellent service and professional approach. They are truly the best in the industry for digital farming.",
    image: "https://i.pravatar.cc/150?u=44",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % (testimonials.length - 2));
  const prev = () =>
    setIndex(
      (prev) =>
        (prev - 1 + (testimonials.length - 2)) % (testimonials.length - 2),
    );

  return (
    <div className="min-h-screen bg-black text-white py-24 px-10 relative overflow-hidden font-itim">
      {/* Decorative Hexagon Patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#DD9735]/5 clip-hexagon -z-10 translate-x-20 -translate-y-20" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#DD9735]/5 clip-hexagon -z-10 -translate-x-10 translate-y-10" />

      <h2 className="text-center text-[#DD9735] text-5xl mb-24 tracking-widest uppercase">
        Testimonials
      </h2>

      <div className="max-w-7xl mx-auto flex items-center justify-center relative">
        {/* Creative Circular Arrows */}
        <button
          onClick={prev}
          className="absolute left-[-20px] z-50 w-14 h-14 rounded-full bg-[#DD9735] text-black flex items-center justify-center shadow-[0_0_20px_rgba(221,151,53,0.5)] hover:scale-110 transition-transform active:scale-90"
        >
          <ChevronLeft size={30} strokeWidth={3} />
        </button>

        <button
          onClick={next}
          className="absolute right-[-20px] z-50 w-14 h-14 rounded-full bg-[#DD9735] text-black flex items-center justify-center shadow-[0_0_20px_rgba(221,151,53,0.5)] hover:scale-110 transition-transform active:scale-90"
        >
          <ChevronRight size={30} strokeWidth={3} />
        </button>

        {/* The Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full overflow-hidden">
          <AnimatePresence mode="wait">
            {testimonials.slice(index, index + 3).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ rotateY: 10, rotateX: 5 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative bg-gradient-to-b from-[#DD9735]/20 to-[#B37216]/60 p-1 rounded-sm group overflow-hidden"
              >
                {/* Inner Card Content */}
                <div className="bg-[#111] p-8 md:p-10 h-full flex flex-col items-center text-center group-hover:bg-transparent transition-colors duration-500">
                  {/* Standardized Circular Headshot */}
                  <div className="relative mb-8">
                    <div className="w-24 h-24 rounded-full p-1 bg-[#DD9735]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full rounded-full object-cover filter contrast-125"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-[#DD9735] p-2 rounded-full text-black">
                      <Quote size={14} fill="currentColor" />
                    </div>
                  </div>

                  <p className="text-gray-300 italic mb-8 min-h-[80px] leading-relaxed">
                    "{item.text}"
                  </p>

                  <div className="mt-auto">
                    <h3 className="text-[#DD9735] text-xl font-bold">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-sm uppercase tracking-widest mt-1">
                      {item.role}
                    </p>
                  </div>
                </div>

                {/* Decorative Hover Glow */}
                <div className="absolute inset-0 bg-[#DD9735]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        .clip-hexagon {
          clip-path: polygon(
            25% 0%,
            75% 0%,
            100% 50%,
            75% 100%,
            25% 100%,
            0% 50%
          );
        }
      `}</style>
    </div>
  );
};

export default Testimonials;
