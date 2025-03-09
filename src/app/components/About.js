"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; 
import { Player } from "@lottiefiles/react-lottie-player";

export default function AboutUs() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items = [
    {
      title: "Who we are?",
      content:
        "We are a team of passionate developers and designers, building innovative solutions to solve real-world problems.",
    },
    {
      title: "What do we do?",
      content:
        "We create modern web applications, UI frameworks, and data-driven solutions that help businesses and communities grow",
    },
    {
      title: "What do we care?",
      content:
        "We care about making a positive impact on society and helping businesses grow with sustainable solutions.",
    },
  ];

  return (
    <section className="bg-[#1a0b2e] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Section: Title + Accordion */}
        <div>
          <h2 className="text-3xl font-bold">
            Get to <span className="text-purple-400">Know Us</span>
          </h2>
          <p className="text-gray-300 mt-2">
            Learn more about our work, community, and impact.
          </p>

          <div className="mt-6 space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-[#2a0f3b] p-4 rounded-lg cursor-pointer"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="text-gray-300" />
                  ) : (
                    <ChevronDown className="text-gray-300" />
                  )}
                </div>

                {openIndex === index && (
                  <p className="text-gray-400 mt-2">{item.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Image */}
        <div>
          <Player
            autoplay
            loop
            src="https://lottie.host/7401522f-2d8b-4049-ad18-eb0edb6af224/CE9lFrNlEH.json"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
}
