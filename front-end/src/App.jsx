import { BrowserRouter as Router, Routes, Route,Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Navbar from "./components/Navbar"; 
import { ThemeProvider } from "./contexts/ThemeContext";
import Portfolio from "./pages/portfolio"
import Login from "./pages/Login";
import Services from "./pages/Services";

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
         
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/service" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
