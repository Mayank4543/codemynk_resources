import React from "react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#1a0b2e] text-white px-6 py-4 md:px-10">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Codemynk Resources</h1>        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          <li className="cursor-pointer hover:text-purple-400">
            <Link to="/">Home</Link>
          </li>
          <li className="cursor-pointer hover:text-purple-400">
            <Link to="/notes">Notes</Link>
          </li>
           <li className="cursor-pointer hover:text-purple-400">
            <Link to="/question">Questions</Link>
          </li>          
          <li className="cursor-pointer hover:text-purple-400">
            <Link to="/editor">Notes Editor</Link>
          </li>
          <li className="cursor-pointer ml-4">
            <Link to="/login" className="bg-purple-700 hover:bg-purple-800 px-4 py-1 rounded-md">
              Sign In
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu with Animation */}
      <ul
        className={`md:hidden flex flex-col gap-4 bg-[#2a0f3b] p-4 mt-2 rounded-md transition-all duration-300 ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 hidden"
        }`}
      >
        <li className="cursor-pointer hover:text-purple-400">
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
        </li>        <li className="cursor-pointer hover:text-purple-400">
          <Link to="/notes" onClick={() => setIsOpen(false)}>
            Notes
          </Link>
        </li>
        <li className="cursor-pointer hover:text-purple-400">
          <Link to="/question" onClick={() => setIsOpen(false)}>
            Questions
          </Link>
        </li>
        <li className="cursor-pointer hover:text-purple-400">
          <Link to="/editor" onClick={() => setIsOpen(false)}>
            Notes Editor
          </Link>
        </li>
        <li className="cursor-pointer hover:text-purple-400 mt-2">
          <Link to="/login" onClick={() => setIsOpen(false)} className="bg-purple-700 hover:bg-purple-800 px-4 py-1 rounded-md">
            Sign In
          </Link>
        </li>
      </ul>
    </nav>
  );
}
