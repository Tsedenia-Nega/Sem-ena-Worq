import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#080808] border-t border-white/5 pt-20 pb-10 px-10 md:px-32 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
          <h2 className="text-2xl font-bold mb-6 text-[#DD9735]">SEM ENA WORQ.</h2>
          <p className="text-gray-500 max-w-sm leading-relaxed">
            Bridging the gap between complex engineering and elegant digital solutions. 
            Crafting the future of tech, one line of code at a time.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-sm">Navigation</h4>
          <ul className="space-y-4 text-gray-500 text-md">
            <li><Link to="/" className="hover:text-[#DD9735] transition-colors">Home</Link></li>
            <li><Link to="/portfolio" className="hover:text-[#DD9735] transition-colors">Portfolio</Link></li>
            <li><Link to="/blog" className="hover:text-[#DD9735] transition-colors">Blogs</Link></li>
            <li><Link to="/testimonials" className="hover:text-[#DD9735] transition-colors">Testimonials</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-sm">Connect</h4>
          <div className="flex gap-4">
            <Facebook size={20} className="text-gray-500 hover:text-[#DD9735] cursor-pointer" />
            <Linkedin size={20} className="text-gray-500 hover:text-[#DD9735] cursor-pointer" />
            <Twitter size={20} className="text-gray-500 hover:text-[#DD9735] cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 pt-8 text-center text-gray-300 text-sm">
        © {new Date().getFullYear()} Sem ena Worq. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;