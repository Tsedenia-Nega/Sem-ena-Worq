import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Sun, Moon, Menu, X, LayoutDashboard } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/Logo.PNG";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      {/* Brand Logo */}
      <Link to="/" className="flex items-center shrink-0">
        <img src={logo} alt="Logo" className="w-16 h-auto" />
      </Link>

      {/* 1. DESKTOP NAVIGATION (Hidden on mobile) */}
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

      {/* Desktop & Mobile Actions */}
      <div className="flex items-center space-x-4 md:space-x-9">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
        >
          {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        {/* 2. DESKTOP ADMIN LINK (Hidden on mobile) */}
        {user && (
          <Link
            to="/admin/portfolios"
            className="hidden md:flex items-center space-x-2 text-[#DD9735] font-bold hover:scale-105 transition-transform"
          >
            <LayoutDashboard size={24} />
            <span>Admin Panel</span>
          </Link>
        )}

        {/* Hamburger Menu Icon */}
        <button
          className="md:hidden p-2 text-gray-600 dark:text-gray-300"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 3. MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 top-20 bg-white dark:bg-black z-40 md:hidden transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-center pt-10 space-y-8 h-full">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
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

          {/* 4. MOBILE ADMIN LINK (Bottom of the mobile list) */}
          {user && (
            <div className="pt-8 w-full px-10">
              <Link
                to="/admin/portfolios"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center space-x-3 text-[#DD9735] font-bold text-2xl py-4 border-t border-gray-100 dark:border-gray-800"
              >
                <LayoutDashboard size={28} />
                <span>Admin Panel</span>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
