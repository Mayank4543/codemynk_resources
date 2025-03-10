import AboutUs from "../components/About";

export default function Hero() {
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
          />
          <button className="bg-purple-500 px-6 py-3 rounded-md">Search</button>
        </div>
      </section>

      {/* Add AboutUs section below Hero */}
      <AboutUs />
    </>
  );
}
