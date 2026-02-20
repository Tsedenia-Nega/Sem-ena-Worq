import React, { useState, useEffect } from "react";
import api, { IMAGE_PATH } from "../api/axios";
import "./../components/layout.css";
import image from "./../assets/image.jpg";
import Hexagons from "./../components/Hexagons";
import Footer from "./../components/Footer";
import { Link } from "react-router-dom";
import {
  Zap,
  ShieldCheck,
  Globe,
  Code2,
  Layers,
  BarChart3,
  ArrowRight,
  Rocket,
  Users,
  Database,
} from "lucide-react";
// import TestimonialManager from "../components/admin/contentManager/TestimonialManager";
import Testimonials from "./Testimonials";

const Home = () => {
  const [testimonials, setTestimonials] = useState([]);
 const hexagons = [
   { id: 1, top: "-15%", left: "48%", rotation: "90deg" },
   { id: 2, top: "30%", left: "58%", rotation: "90deg" },
   { id: 3, top: "60%", left: "83%", rotation: "90deg" },
   { id: 4, top: "75%", left: "50%", rotation: "90deg" },
 ];
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await api.get("/testimony/get");
        setTestimonials(Array.isArray(res.data) ? res.data.slice(0, 3) : []);
      } catch (err) {
        console.log("Error loading testimonials", err);
      }
    };
    fetchHomeData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-[#DD9735] selection:text-black">
      {/* --- HERO SECTION: HEXAGONS ONLY HERE --- */}
      <section className="relative h-screen w-full flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
          <Hexagons />
        </div>

        <div className="relative z-10 text-center max-w-5xl px-6">
          {/* PRE-TITLE - Centered */}
          <p className="text-[#DD9735] font-mono text-[10px] uppercase tracking-[0.8em] mb-4">
            Digital Architecture // Est. 2026
          </p>

          {/* MAIN TITLE - Centered */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-10 uppercase">
            SEM ENA <span className="text-[#DD9735]">WORQ</span>
          </h1>

          {/* DESCRIPTION - Shifted to the right using ml-auto and text-left */}
          <div className="flex justify-center w-full mb-12">
            <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-xl text-left border-l border-[#DD9735]/30 pl-8 ml-12 md:ml-24">
              <span className="text-white font-medium">
                Wax and <span className="text-[#DD9735]">Gold</span>:
              </span>{" "}
              We engineer complex digital ecosystems with precision, turning
              subsurface logic into high-performance tech realities.
            </p>
          </div>

          {/* BUTTON - Centered */}
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 border border-[#DD9735] text-[#DD9735] font-bold uppercase tracking-widest text-[10px] hover:bg-[#DD9735] hover:text-black transition-all"
          >
            Discuss Your Project <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-20 bg-[#080808] border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            {
              label: "Projects Built",
              val: "120+",
              icon: <Rocket size={20} />,
            },
            { label: "Engineers", val: "45+", icon: <Users size={20} /> },
            { label: "Global Reach", val: "15+", icon: <Globe size={20} /> },
            {
              label: "Data Integrity",
              val: "100%",
              icon: <Database size={20} />,
            },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-[#DD9735] mb-2 flex justify-center opacity-40">
                {stat.icon}
              </div>
              <p className="text-3xl font-bold tracking-tighter">{stat.val}</p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- CREATIVE CARDS: THE PILLARS (REDESIGNED) --- */}
      <section className="py-32 px-6 md:px-24 bg-[#050505] relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header: Strong Gold Branding */}
          <div className="mb-24 text-center md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-[#DD9735] uppercase tracking-[0.6em] text-[14px] font-black mb-4">
                Core Foundations
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tighter">
                The Pillars of{" "}
                <span className="text-[#DD9735]">Our Engineering.</span>
              </h3>
            </div>
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap />,
                title: "Velocity",
                desc: "Agile delivery cycles designed for rapid, stable market entry.",
              },
              {
                icon: <ShieldCheck />,
                title: "Integrity",
                desc: "Advanced security protocols integrated into every layer of our code.",
              },
              {
                icon: <Globe />,
                title: "Scalability",
                desc: "Elastic architectures built to handle high-concurrency traffic globally.",
              },
              {
                icon: <Code2 />,
                title: "Precision",
                desc: "Maintainable codebases following strict international engineering standards.",
              },
              {
                icon: <Layers />,
                title: "Full-Stack",
                desc: "From low-level database logic to pixel-perfect visual interfaces.",
              },
              {
                icon: <BarChart3 />,
                title: "Insights",
                desc: "Data-driven development providing actionable business analytics.",
              },
            ].map((item, i) => (
              <div
                key={i}
                /* DEFAULT: Clean, dark, rounded cards with a subtle gold border */
                className="relative group rounded-2xl bg-[#0a0a0a] border border-[#DD9735]/20 p-10 h-80 flex flex-col transition-all duration-500 
                     hover:bg-[#0f0f0f] hover:border-[#DD9735] hover:-translate-y-3 shadow-2xl"
              >
                {/* 1. THE ICON: Centered and Gold by default */}
                <div className="flex justify-center mb-8">
                  <div className="text-[#DD9735] p-4 bg-[#DD9735]/5 rounded-xl border border-[#DD9735]/10 group-hover:scale-110 group-hover:bg-[#DD9735] group-hover:text-black transition-all duration-500">
                    {React.cloneElement(item.icon, {
                      size: 24,
                      strokeWidth: 1.5,
                    })}
                  </div>
                </div>

                {/* 2. THE TEXT: Gold title, high description */}
                <div className="text-center relative z-10">
                  <h4 className="text-lg font-bold uppercase tracking-widest text-[#DD9735] mb-3">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed px-4 group-hover:text-gray-200 transition-colors">
                    {item.desc}
                  </p>
                </div>

                {/* 3. THE CREATIVE HOVER: Glowing "Scanning" Line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#DD9735] group-hover:w-1/2 transition-all duration-700 shadow-[0_0_15px_#DD9735]"></div>

                {/* Subtle Background Number */}
                <span className="absolute bottom-4 right-6 font-mono text-white/[0.02] text-6xl font-bold group-hover:text-[#DD9735]/5 transition-colors">
                  0{i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONY SECTION --- */}
      <section className="pt-6 pb-12 px-6 md:px-24 bg-[#080808] border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          
           <Testimonials />
           
          

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((t) => (
              <div
                key={t._id}
                className="p-10 bg-[#050505] border border-white/5 relative hover:shadow-[0_10px_30px_-15px_rgba(221,151,53,0.1)] transition-all"
              >
                <p className="text-gray-400 italic text-base leading-relaxed mb-10">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={
                      t.image
                        ? `${IMAGE_PATH}/${t.image}`
                        : "/api/placeholder/80/80"
                    }
                    className="w-10 h-10 rounded-full grayscale border border-white/10"
                    alt={t.name}
                  />
                  <div className="text-left">
                    <h5 className="font-bold text-[10px] uppercase tracking-widest">
                      {t.name}
                    </h5>
                    <p className="text-[#DD9735] text-[10px] uppercase font-mono">
                      {t.position}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {hexagons.map((hex) => (
            <div
              key={hex.id}
              className="hexagon"
              style={{
                position: "fixed",
                top: hex.top || "auto",
                bottom: hex.bottom || "auto",
                left: hex.left,
                transform: `rotate(${hex.rotation})`,
                zIndex: 1,
                opacity: 0.2,
              }}
            >
              <img
                src={image}
                alt={`Hexagon ${hex.id}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-32 text-center bg-black relative z-10 border-t border-white/5">
        <h2 className="text-3xl md:text-5xl font-bold mb-22 uppercase tracking-tighter">
          Ready to Build the Future?
        </h2>
        <Link
          to="/contact"
          className="px-10 py-5 border border-[#DD9735] text-[#DD9735] font-black uppercase tracking-widest text-xs hover:bg-[#DD9735] hover:text-black transition-all shadow-xl"
        >
          Get in Touch
        </Link>
      </section>
<hr />
      <Footer />
    </div>
  );
};

export default Home;
