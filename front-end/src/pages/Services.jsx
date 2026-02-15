import React from "react";
import ServiceCard from "../components/ServiceCard";
import image from "./../assets/image.jpg";
const Services = () => {
   const hexagons = [
     { id: 1, top: "-15%", left: "48%", rotation: "90deg" },
     { id: 2, top: "30%", left: "58%", rotation: "90deg" },
     { id: 3, top: "60%", left: "83%", rotation: "90deg" },
     { id: 4, top: "75%", left: "50%", rotation: "90deg" },
   ];
  const sampleServices = [
    {
      title: "Visual Branding",
      desc: "Identity systems designed to command attention and define your market position.",
    },
    {
      title: "Digital Systems",
      desc: "High-performance architectures built to scale with zero-latency user experiences.",
    },
    {
      title: "UX Strategy",
      desc: "Mapping the perfect psychological path from initial visitor to loyal customer.",
    },
  ];

  return (
    <section className="min-h-screen bg-black py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Perfectly Centered Header */}
        <div className="text-center mb-5 max-w-3xl">
          {/* <h2 className="text-[#DD9735] font-itim text-lg uppercase tracking-[0.4em] mb-4">
            Elite Expertise
          </h2> */}
          <h1 className="text-white text-7xl md:text-4xl font-bold leading-tight">
            Premium{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DD9735] to-[#f9d423]">
              Solutions
            </span>
          </h1>
          <div className="w-24 h-1.5 bg-[#DD9735] mx-auto mt-8 rounded-full shadow-[0_0_15px_rgba(221,151,53,0.5)]"></div>
        </div>

        {/* 3-Card Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          {sampleServices.map((service, index) => (
            <ServiceCard
              key={index}
              index={index}
              title={service.title}
              desc={service.desc}
            />
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
  );
};

export default Services;
