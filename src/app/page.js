"use client";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("../app/components/Hero"), { ssr: false });
export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
