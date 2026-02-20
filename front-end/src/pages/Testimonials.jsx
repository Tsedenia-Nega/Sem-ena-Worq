import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api, { IMAGE_PATH } from "../api/axios";
import { User, Star } from "lucide-react";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicTestimonials = async () => {
      try {
        const res = await api.get(`/testimony/get?limit=10`);
        const publicOnly = res.data.testimonials.filter(
          (t) => t.visibility === "public",
        );
        setTestimonials([...publicOnly, ...publicOnly]);
      } catch (err) {
        console.error("Failed to load testimonials", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPublicTestimonials();
  }, []);

  if (loading || testimonials.length === 0) return null;

  return (
    <section className=" bg-black overflow-hidden relative">
    
      <div className="max-w-7xl mx-auto px-6 mb-22 text-center relative z-10">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white italic"
        >
          Voices of{" "}
          <span className="text-[#DD9735] drop-shadow-[0_0_15px_rgba(221,151,53,0.6)]">
            Partnership
          </span>
        </motion.h3>
        <div className="w-24 h-1.5 bg-[#DD9735] mx-auto mt-6 rounded-full shadow-[0_0_20px_#DD9735]"></div>
      </div>

      <div className="flex relative pt-20">
        <motion.div
          className="flex gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 18, // High-energy speed
            repeat: Infinity,
          }}
        >
          {testimonials.map((item, index) => (
            <div
              key={`${item._id}-${index}`}
              className="w-[350px] md:w-[450px] shrink-0 relative"
            >
              {/* --- THE CARD BODY --- */}
              <div
                className="
                relative bg-[#0A0A0A] 
                rounded-[3rem] p-10 pt-20 flex flex-col items-center text-center 
                /* DEFINED BORDER: Makes the card shape visible on black */
                border-2 border-[#DD9735]/30
                shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(221,151,53,0.05)]
              "
              >
                {/* --- FLOATING AVATAR --- */}
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-20">
                  <div className="w-28 h-28 rounded-full p-[4px] bg-gradient-to-b from-[#DD9735] to-transparent shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
                    <div className="w-full h-full rounded-full border-[6px] border-[#0A0A0A] bg-zinc-900 overflow-hidden">
                      {item.image ? (
                        <img
                          src={`${IMAGE_PATH}/${item.image}`}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          <User size={40} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* --- USER INFO --- */}
                <div className="mb-6">
                  <h4 className="text-2xl font-black text-white tracking-tight italic">
                    {item.name}
                  </h4>
                  <p className="text-[#DD9735] text-[11px] font-bold uppercase tracking-[0.3em] mt-2 opacity-90">
                    {item.company}
                  </p>
                </div>

                {/* --- TESTIMONY (ENHANCED VISIBILITY) --- */}
                <p className="text-white text-lg md:text-xl font-medium leading-snug tracking-tight mb-8 px-2 opacity-100">
                  “{item.content}”
                </p>

                {/* --- BOTTOM RATING --- */}
                <div className="flex gap-1.5 mt-auto bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-[#DD9735] text-[#DD9735] drop-shadow-[0_0_5px_rgba(221,151,53,0.5)]"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Edge Masking */}
        <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-black via-black/90 to-transparent z-30 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-black via-black/90 to-transparent z-30 pointer-events-none"></div>
      </div>
    </section>
  );
};

export default Testimonials;
