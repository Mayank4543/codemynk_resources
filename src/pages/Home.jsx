import React, { useState, lazy, Suspense } from "react";


const AboutUs = lazy(() => import("../components/About"));

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Implement your search functionality here
    console.log("Searching for:", searchTerm);
  };

  return (
    <>
      <section className="text-center text-white py-20 bg-gradient-to-r from-[#1a0b2e] to-[#3b1c58]">
        <h1 className="text-5xl font-bold">
          Access Your <span className="text-purple-400">Resources</span> Anytime
        </h1>
        <p className="mt-4 text-gray-300">
          Easily access your notes, PDFs, and important questions from anywhere.
        </p>

        {/* Search Box */}
        <div className="mt-10 bg-[#2a1845] p-6 rounded-lg w-3/4 mx-auto flex justify-center gap-4">
          <input
            type="text"
            placeholder="Search Notes..."
            className="p-3 w-1/2 rounded-md bg-[#3b1c58] text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-purple-500 px-6 py-3 rounded-md"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </section>

      {/* AboutUs section */}
      <Suspense fallback={<div>Loading...</div>}>
        <AboutUs />
      </Suspense>
    </>
  );
}
