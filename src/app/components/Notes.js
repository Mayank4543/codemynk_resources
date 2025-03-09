"use client";
import {
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaEye,
  FaDownload,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const jobs = [
  {
    position: "Software Engineer",
    company: "Tech Corp",
    location: "New York",
    type: "Full-time",
  },
  {
    position: "Product Manager",
    company: "Innovate Ltd",
    location: "San Francisco",
    type: "Remote",
  },
  {
    position: "Data Analyst",
    company: "Data Insights",
    location: "Chicago",
    type: "Contract",
  },
  {
    position: "UX Designer",
    company: "Creative Studio",
    location: "Los Angeles",
    type: "Freelance",
  },
];

export default function Notes() {
  return (
    <section className="bg-[#1a0b2e] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-3xl font-bold">
          Best Job <span className="text-purple-400">Opportunities</span>
        </h2>
        <p className="text-gray-300 mt-2 max-w-2xl mx-auto">
          Find your dream job among hundreds of openings in various industries.
        </p>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <div className="bg-[#2c1a4e] p-6 rounded-lg flex flex-col items-center">
            <FaBriefcase className="text-purple-400 text-3xl" />
            <h3 className="text-xl font-semibold mt-2">200+ Jobs</h3>
            <p className="text-gray-400 text-sm">
              Explore diverse job opportunities
            </p>
          </div>
          <div className="bg-[#2c1a4e] p-6 rounded-lg flex flex-col items-center">
            <FaBuilding className="text-purple-400 text-3xl" />
            <h3 className="text-xl font-semibold mt-2">40+ Employers</h3>
            <p className="text-gray-400 text-sm">Top companies hiring now</p>
          </div>
          <div className="bg-[#2c1a4e] p-6 rounded-lg flex flex-col items-center">
            <FaMapMarkerAlt className="text-purple-400 text-3xl" />
            <h3 className="text-xl font-semibold mt-2">20+ Locations</h3>
            <p className="text-gray-400 text-sm">Work from anywhere</p>
          </div>
        </div>

        {/* Job Listings */}
        <h3 className="text-2xl font-semibold mt-10 text-left">Newest Jobs</h3>
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
              <div className="bg-[#2c1a4e] p-5 rounded-lg flex flex-col gap-2">
                <h4 className="text-lg font-semibold">{job.position}</h4>
                <p className="text-gray-300 text-sm">{job.company}</p>
                <p className="text-gray-400 text-sm">
                  {job.location} - {job.type}
                </p>
                <div className="mt-4 flex justify-between text-purple-400">
                  <button className="flex items-center gap-1">
                    <FaEye /> View
                  </button>
                  <button className="flex items-center gap-1">
                    <FaDownload /> Download
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
