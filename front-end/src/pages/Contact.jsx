import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Facebook,
  Twitter,
} from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-white pt-10 pb-10 font-itim overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-10 md:px-20 relative">
        {/* Main Title */}
        <h1 className="text-[#DD9735] text-center text-3xl mb-8 -tracking-tighter">
          CONTACT US
        </h1>

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10">
          {/* LEFT SIDE: Slanted Contact Info with increased padding */}
          <div className="w-full lg:w-1/2 space-y-12 py-5 pl-4 md:pl-10">
            {/* Address */}
            <div className="flex items-center gap-6 transition-transform hover:scale-105">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#B87333] rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                <MapPin size={28} />
              </div>
              <div className="space-y-1">
                <p className="text-[#B87333] text-lg leading-none">Address</p>
                <p className="text-sm md:text-base opacity-90 font-sans">
                  25 street, Bole, addis ababa
                </p>
              </div>
            </div>

            {/* Phone - Slanted right */}
            <div className="flex items-center gap-6 lg:ml-20 transition-transform hover:scale-105">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#B87333] rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                <Phone size={28} />
              </div>
              <div className="space-y-1">
                <p className="text-[#B87333] text-lg leading-none">Phone</p>
                <p className="text-xl font-sans tracking-tighter">
                  +25173636789
                </p>
              </div>
            </div>

            {/* Email - Slanted further right */}
            <div className="flex items-center gap-6 lg:ml-40 transition-transform hover:scale-105">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#B87333] rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                <Mail size={28} />
              </div>
              <div className="space-y-1">
                <p className="text-[#B87333] text-lg leading-none">Email</p>
                <p className="text-sm md:text-base opacity-90 font-sans">
                  semenaworq@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Compact Orange Box */}
          <div className="w-full lg:w-[450px] bg-[#B37216] p-8 md:p-10 rounded-sm shadow-2xl z-10">
            <h2 className="text-white text-2xl text-center mb-8 font-itim tracking-wide">
              Send message
            </h2>

            <form className="space-y-5">
              <div className="border-b border-white/40 pb-1">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-transparent outline-none placeholder:text-white/70 text-lg py-1"
                />
              </div>
              <div className="border-b border-white/40 pb-1">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent outline-none placeholder:text-white/70 text-lg py-1"
                />
              </div>

              <div className="pt-2">
                <p className="mb-2 text-white/90 text-sm">
                  Type your message...
                </p>
                <textarea className="w-full bg-transparent border border-white/40 rounded-sm p-3 h-24 outline-none resize-none text-sm" />
              </div>

              <div className="flex justify-center pt-4">
                <button className="bg-[#D1D5DB] text-[#B37216] px-12 py-2 rounded-full font-bold text-xl hover:bg-white transition-all shadow-md active:scale-95">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* FOOTER */}
    
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-row justify-between items-end">
          {/* Empty space to balance the right side if needed, or keep it as is for the layout */}
          <div className="flex-1 hidden lg:block"></div>

          {/* CENTER SECTION: Name & Socials */}
          <div className="flex flex-col items-center flex-1">
            <h4 className="text-[#DD9735] font-itim text-lg uppercase tracking-[0.1em] mb-4">
              SEM ENA WORQ
            </h4>
            <div className="flex gap-8 items-center text-[#DD9735]">
              <Linkedin
                size={22}
                className="cursor-pointer hover:text-white transition-colors"
              />
              <Facebook
                size={22}
                className="cursor-pointer hover:text-white transition-colors"
              />
              <Github
                size={22}
                className="cursor-pointer hover:text-white transition-colors"
              />
              <Twitter
                size={22}
                className="cursor-pointer hover:text-white transition-colors"
              />
            </div>
          </div>

          {/* RIGHT SECTION: Contact Details Parallel to Socials */}
          <div className="flex-1 flex justify-end">
            <div className="text-[#DD9735] text-md font-sans text-right space-y-1 opacity-80">
              <p className="tracking-widest">+25173636789</p>
              <p>semenaworq@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
