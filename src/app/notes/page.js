"use client";
import { motion } from "framer-motion";
import {
  
  FaFilePdf,
  FaDatabase,
  FaCode,
  FaLinux,
  FaEye,
  FaDownload,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const jobs = [
  {
    position: "Resume",
    type: "ATS Score: 83",
    icon: <FaFilePdf size={24} />, 
    viewOnly: true,
    description: "View your ATS-friendly resume and analyze its score.",
    pdfPath: "/doc/MayankRathore_wetyugvbrgdb.pdf",
  },
  {
    position: "SQL",
    icon: <FaDatabase size={24} />, // Replace with an actual path
    description: "Learn essential SQL queries and database concepts.",
    pdfPath: "/doc/sql.pdf",
  },
  {
    position: "DSA",
    icon: <FaCode size={24} />, // Replace with an actual path
    description: "Master Data Structures and Algorithms with top resources.",
    pdfPath: "/docs/dsa.pdf",
  },
  {
    position: "Linux",
    icon: <FaLinux size={24} />, // Replace with an actual path
    description: "Get started with Linux commands and system administration.",
    pdfPath: "/doc/Linux.pdf",
  },
];

export default function Notes() {
  return (
    <section className="bg-[#1a0b2e] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold">
          Best Job <span className="text-purple-400">Opportunities</span>
        </h2>
        <p className="text-gray-300 mt-2 max-w-2xl mx-auto">
          Find your dream job among hundreds of openings in various industries.
        </p>

        <h3 className="text-2xl font-semibold mt-10 text-left">
          Best Resources
        </h3>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mt-6"
        >
          {jobs.map((job, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="bg-[#2c1a4e] p-5 rounded-lg flex flex-col gap-2 shadow-lg"
              >
                <div className="flex justify-center mb-2 text-purple-400">
                  {job.icon}
                </div>
                <h4 className="text-lg font-semibold">{job.position}</h4>
                <p className="text-gray-400 text-sm">{job.description}</p>
                <p className="text-gray-300 text-sm">{job.type}</p>
                <div className="mt-4 flex justify-between text-purple-400">
                  <a
                    href={job.pdfPath}
                    target="_blank"
                    className="flex items-center gap-1"
                  >
                    <FaEye /> View
                  </a>
                  {!job.viewOnly && (
                    <a
                      href={job.pdfPath}
                      download
                      className="flex items-center gap-1"
                    >
                      <FaDownload /> Download
                    </a>
                  )}
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
