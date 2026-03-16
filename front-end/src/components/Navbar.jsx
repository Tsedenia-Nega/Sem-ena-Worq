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
    <header className="w-full h-20  bg-black dark:border-gray-800 flex items-center justify-between px-8 sticky top-0 z-50 transition-colors duration-100">
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
        className={`fixed inset-0 dark:bg-stone-950/95 top-[79px] z-40 md:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-5"
        }`}
      >
        {/* The Background Layer with Blur to match Desktop */}
        <div className="absolute inset-0  dark:bg-stone-950/95 backdrop-blur-xl transition-colors duration-100" />

        <nav className="relative flex flex-col items-center pt-12 space-y-10 h-full">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `text-xl font-bold uppercase tracking-[0.3em] transition-all duration-300 ${
                  isActive
                    ? "text-[#DD9735]"
                    : "text-stone-600 dark:text-stone-400 hover:text-[#DD9735]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* 4. MOBILE ADMIN LINK */}
          {user && (
            <div className="pt-10 w-full px-12">
              <Link
                to="/admin/portfolios"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center space-x-3 text-[#DD9735] font-bold text-lg py-5 border-t border-stone-100 dark:border-stone-900"
              >
                <LayoutDashboard size={22} />
                <span className="uppercase tracking-widest">Admin Panel</span>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
