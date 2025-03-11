"use client";
import Navbar from "./components/Navabar";
import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#1a0b2e] text-white vsc-initialized ">
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  );
}
