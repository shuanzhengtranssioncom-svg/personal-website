"use client";

import NavBar from "@/components/NavBar";
import HeroBand from "@/components/HeroBand";
import GrowthPath from "@/components/GrowthPath";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex-1 relative">
        {/* Ambient glow — shared across all sections */}
        <div className="absolute inset-0 pointer-events-none mesh-bg" />
        <div className="absolute top-[5%] left-1/2 w-[500px] h-[500px] -translate-x-1/2 pointer-events-none bg-[radial-gradient(circle,rgba(6,182,212,0.12)_0%,transparent_70%)] blur-[80px]" />
        <div className="absolute top-[50%] left-1/4 w-[400px] h-[400px] pointer-events-none bg-[radial-gradient(circle,rgba(168,85,247,0.06)_0%,transparent_70%)] blur-[80px]" />
        <div className="relative z-1">
          <HeroBand />
          <GrowthPath />
          <Skills />
        </div>
        <Footer />
      </main>
    </>
  );
}
