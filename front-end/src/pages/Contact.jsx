import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Facebook,
  Twitter,
  CheckCircle, // Added for success icon
} from "lucide-react";
import image from "./../assets/image.jpg";
import api from "../api/axios";

const Contact = () => {
  // 1. Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "Idea Submission",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  // 2. Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Submit logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    // Split Full Name into First and Last for the Backend Entity
    const nameParts = formData.fullName.trim().split(" ");
    const firstName = nameParts[0] || "Anonymous";
    const lastName = nameParts.slice(1).join(" ") || "User";

    try {
      // Endpoint adjusted to match your router setup (contactS/create)
      const response = await api.post("contactS/create", {
        firstName,
        lastName,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      if (response.status === 201 || response.status === 200) {
        setStatus({ loading: false, error: null, success: true });
        // Clear form fields
        setFormData({
          fullName: "",
          email: "",
          subject: "Idea Submission",
          message: "",
        });
      }
    } catch (err) {
      setStatus({
        loading: false,
        error:
          err.response?.data?.message ||
          "Failed to send. Please check your connection.",
        success: false,
      });
    }
  };

  const hexagons = [
    { id: 1, top: "-15%", left: "48%", rotation: "90deg" },
    { id: 2, top: "30%", left: "58%", rotation: "90deg" },
    { id: 3, top: "60%", left: "83%", rotation: "90deg" },
    { id: 4, top: "75%", left: "50%", rotation: "90deg" },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white pt-10 pb-10 font-itim overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-10 md:px-20 relative">
        {/* Main Title */}
        <h1 className="bg-gradient-to-r from-[#DD9735] to-[#f9d423] bg-clip-text text-transparent text-center text-4xl mb-8 uppercase">
          Contact Us
        </h1>

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10">
          {/* LEFT SIDE: Slanted Contact Info */}
          <div className="w-full lg:w-1/2 space-y-12 py-5 pl-4 md:pl-10">
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

          {/* RIGHT SIDE: Compact Orange Box (Dynamic Form/Success State) */}
          <div className="w-full lg:w-[450px] bg-[#B37216] p-8 md:p-10 rounded-sm shadow-2xl z-10 min-h-[420px] flex flex-col justify-center">
            {status.success ? (
              /* --- SUCCESS MESSAGE VIEW --- */
              <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center border-2 border-white">
                    <CheckCircle size={40} className="text-white" />
                  </div>
                </div>
                <h2 className="text-white text-3xl font-itim">Message Sent!</h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  Thank you for reaching out. We have received your idea and we
                  will contact you soon!
                </p>
                <button
                  onClick={() => setStatus({ ...status, success: false })}
                  className="text-white/80 underline text-sm hover:text-white transition-colors pt-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              /* --- FORM VIEW --- */
              <>
                <h2 className="text-white text-2xl text-center mb-8 font-itim tracking-wide">
                  Send message
                </h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="border-b border-white/40 pb-1">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Full Name"
                      className="w-full bg-transparent outline-none placeholder:text-white/70 text-lg py-1"
                    />
                  </div>
                  <div className="border-b border-white/40 pb-1">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Email"
                      className="w-full bg-transparent outline-none placeholder:text-white/70 text-lg py-1"
                    />
                  </div>

                  <div className="pt-2">
                    <p className="mb-2 text-white/90 text-sm">
                      Type your message...
                    </p>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border border-white/40 rounded-sm p-3 h-24 outline-none resize-none text-sm"
                    />
                  </div>

                  {status.error && (
                    <p className="text-red-100 bg-red-900/30 p-2 rounded text-xs text-center border border-red-500/50">
                      {status.error}
                    </p>
                  )}

                  <div className="flex justify-center pt-4">
                    <button
                      disabled={status.loading}
                      type="submit"
                      className="bg-[#D1D5DB] text-[#B37216] px-12 py-2 rounded-full font-bold text-xl hover:bg-white transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center gap-2"
                    >
                      {status.loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#B37216] border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        "Send"
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-row justify-between items-end">
          <div className="flex-1 hidden lg:block"></div>
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
          <div className="flex-1 flex justify-end">
            <div className="text-[#DD9735] text-md font-sans text-right space-y-1 opacity-80">
              <p className="tracking-widest">+25173636789</p>
              <p>semenaworq@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hexagons Background */}
      {hexagons.map((hex) => (
        <div
          key={hex.id}
          className="hexagon pointer-events-none"
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
  );
};

export default Contact;
