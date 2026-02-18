import { BrowserRouter as Router, Routes, Route,Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Navbar from "./components/Navbar"; 
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
const MainLayout = () => (
  <>
    <Navbar />
    <Outlet /> 
  </>
);

function App() {
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
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* LOGIN PAGE (No Navbar) */}
          <Route path="/login" element={<Login />} />

          <Route path="/admin" element={<AdminLayout />}>
            {/* <Route index element={<AdminDashboard />} />  */}
            {/* <Route path="home" element={<HomeManager />} />  */}
            <Route path="services" element={<ServicesManager />} />{" "}
            {/* /admin/services */}
            <Route path="blog" element={<BlogManager />} /> 
            
          </Route>

          {/* CATCH-ALL 404 */}
          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
