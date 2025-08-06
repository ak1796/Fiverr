import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col bg-slate-50 items-center justify-around w-full py-5 text-sm text-gray-800/70">
      <div className="flex items-center gap-8">
        <NavLink
          to="/"
          className="font-medium text-gray-500 hover:text-black transition-all"
        >
          Home
        </NavLink>
        <NavLink
          to="#"
          className="font-medium text-gray-500 hover:text-black transition-all"
        >
          About
        </NavLink>
        <NavLink
          to="#"
          className="font-medium text-gray-500 hover:text-black transition-all"
        >
          Services
        </NavLink>
        <NavLink
          to="#"
          className="font-medium text-gray-500 hover:text-black transition-all"
        >
          Contact
        </NavLink>
        <NavLink
          to="#"
          className="font-medium text-gray-500 hover:text-black transition-all"
        >
          Help
        </NavLink>
      </div>

      <p className="mt-8 text-center">Copyright © 2025 . All rights reservered.</p>
    </footer>
  );
};

export default Footer;
