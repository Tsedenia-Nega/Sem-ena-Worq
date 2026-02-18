import React, { useState } from "react"; // Added useState
import { NavLink, Link } from "react-router-dom";
import { Sun, Moon, UserCircle, Menu, X } from "lucide-react"; // Added Menu and X
import { useTheme } from "../contexts/ThemeContext";
import logo from "../assets/Logo.PNG";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/service" },
    { name: "Blog", path: "/blog" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="w-full h-20 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-8 sticky top-0 z-50 transition-colors duration-300">
      <Link to="/" className="flex items-center shrink-0">
        <img src={logo} alt="Logo" className="w-16 h-auto" />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:block ml-auto pr-14">
        <ul className="flex space-x-10">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-lg font-medium transition-all relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#DD9735] after:transition-all after:duration-300 ${
                    isActive
                      ? "text-[#DD9735] after:w-full"
                      : "text-gray-600 dark:text-gray-300 after:w-0 hover:text-[#DD9735] hover:after:w-full"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center space-x-4 md:space-x-9">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        <Link
          to="/login"
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-[#DD9735] transition-colors"
        >
          <UserCircle size={26} />
          <span className="hidden sm:inline font-medium">Login</span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden p-2 text-gray-600 dark:text-gray-300"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-20 bg-white dark:bg-black z-40 md:hidden transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <nav className="flex flex-col items-center pt-10 space-y-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)} // Close menu on click
              className={({ isActive }) =>
                `text-2xl font-medium transition-colors ${
                  isActive
                    ? "text-[#DD9735]"
                    : "text-gray-600 dark:text-gray-300"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
