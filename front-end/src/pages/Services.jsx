import React,{useState,useEffect} from "react";
import ServiceCard from "../components/ServiceCard";
import image from "./../assets/image.jpg";
import logo from "./../assets/Logo.PNG";
import api from "../api/axios";
const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
   const hexagons = [
     { id: 1, top: "-15%", left: "48%", rotation: "90deg" },
     { id: 2, top: "30%", left: "58%", rotation: "90deg" },
     { id: 3, top: "60%", left: "83%", rotation: "90deg" },
     { id: 4, top: "75%", left: "50%", rotation: "90deg" },
   ];
 useEffect(() => {
   const fetchServices = async () => {
     try {

       const response = await api.get("/services/get?page=1&limit=3");

       const formattedServices = response.data.services.map((s) => ({
         title: s.title,
         desc: s.description,
        
         image: s.image
       }));

       setServices(formattedServices);
     } catch (err) {
       console.error("Error fetching services:", err);
     } finally {
       setLoading(false);
     }
   };

   fetchServices();
 }, []);

  return (
    <section className="min-h-screen bg-black py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-5 max-w-3xl">
          <h1 className="text-white text-4xl font-bold leading-tight">
            Premium{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DD9735] to-[#f9d423]">
              Solutions
            </span>
          </h1>
          <div className="w-24 h-1.5 bg-[#DD9735] mx-auto mt-8 rounded-full shadow-[0_0_15px_rgba(221,151,53,0.5)]"></div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center mt-20 space-y-4">
            <div className="w-10 h-10 border-2 border-stone-200 border-t-[#DD9735] rounded-full animate-spin" />
            <p className=" uppercase tracking-[0.2em] text-[#DD9735] text-xs  ">
              Services...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                index={index}
                title={service.title}
                desc={service.desc}
                // Pass the image if your ServiceCard supports it
                image={service.image}
              />
            ))}
          </div>
        )}

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
