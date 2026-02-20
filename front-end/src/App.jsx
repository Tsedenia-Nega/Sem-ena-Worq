import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route,Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Navbar from "./components/Navbar"; 
import api from "./api/axios";
import { ThemeProvider } from "./contexts/ThemeContext";
import Portfolio from "./pages/portfolio"
import Login from "./pages/Login";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Testimonials from "./pages/Testimonials"; 
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./components/admin/AdminLayout";
import ServicesManager from "./components/admin/contentManager/ServicesManager";
import BlogManager from "./components/admin/contentManager/BlogManager";
import PortfolioManager from "./components/admin/contentManager/PortfolioManager";
import TestimonialManager from "./components/admin/contentManager/TestimonialManager";
import Profile from "./components/admin/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext"; // Import the hook
const MainLayout = () => (
  <>
    <Navbar />
    <Outlet /> 
  </>
);

function App() {
 const { user, setUser, loading } = useAuth(); // Get everything from Context

 if (loading)
   return (
     <div className="bg-black min-h-screen text-white flex items-center justify-center">
       Loading...
     </div>
   );
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* PUBLIC USER FACING ROUTES */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/service" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            {/* <Route path="/testimonials" element={<Testimonials />} /> */}
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* LOGIN PAGE (No Navbar) */}
          <Route path="/login" element={<Login setUser={setUser} />} />

          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/admin" element={<AdminLayout setUser={setUser} />}>
              <Route path="portfolios" element={<PortfolioManager />} />
              <Route path="services" element={<ServicesManager />} />
              <Route path="testimonials" element={<TestimonialManager />} />
              <Route path="profile" element={<Profile />} />
              <Route path="blog" element={<BlogManager />} />
            </Route>
          </Route>

          {/* CATCH-ALL 404 */}
          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
