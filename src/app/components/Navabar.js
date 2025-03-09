"use client"; // Required for event handling in Next.js App Router

import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons from Lucide

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#1a0b2e] text-white px-6 py-4 md:px-10">
      <div className=" flex justify-between items-center">
       
        <h1 className="text-xl font-bold">Codemynk Resources</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          <li className="cursor-pointer hover:text-purple-400">Home</li>
          <li className="cursor-pointer hover:text-purple-400">Notes</li>
          <li className="cursor-pointer hover:text-purple-400">Questions</li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col gap-4 bg-[#2a0f3b] p-4 mt-2 rounded-md">
          <li className="cursor-pointer hover:text-purple-400">Home</li>
          <li className="cursor-pointer hover:text-purple-400">Notes</li>
          <li className="cursor-pointer hover:text-purple-400">Questions</li>
        </ul>
      )}
    </nav>
  );
}
