import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/apropos" },
    { name: "Formulaires", path: "/formulaires" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-blue-800">
          Gabkut Pay
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex space-x-8 text-sm font-medium text-gray-700">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 border-b-2 border-blue-700 pb-1"
                  : "hover:text-blue-700 transition"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-700 focus:outline-none"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-md px-4 pb-4 pt-2 space-y-2 text-gray-700"
        >
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "block py-1 text-blue-700 font-semibold"
                    : "block py-1 hover:text-blue-700"
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </motion.ul>
      )}
    </nav>
  );
};

export default Navbar;
