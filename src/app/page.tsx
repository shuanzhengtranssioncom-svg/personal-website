"use client";

import NavBar from "@/components/NavBar";
import HeroBand from "@/components/HeroBand";
import GrowthPath from "@/components/GrowthPath";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import Particles from "@/components/Particles";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex-1 relative">
        {/* Particles — full page background */}
        <div className="fixed inset-0 z-10 pointer-events-none">
          <Particles
            particleCount={400}
            particleSpread={25}
            speed={0.1}
            particleColors={["#ffffff"]}
            moveParticlesOnHover
            particleHoverFactor={1}
            alphaParticles={false}
            particleBaseSize={110}
            sizeRandomness={1}
            cameraDistance={20}
            disableRotation={false}
            className="w-full h-full"
          />
        </div>
        {/* Ambient glow — shared across all sections */}
        <div className="absolute inset-0 pointer-events-none mesh-bg" />
        <div className="absolute top-[5%] left-1/2 w-[500px] h-[500px] -translate-x-1/2 pointer-events-none bg-[radial-gradient(circle,rgba(6,182,212,0.10)_0%,transparent_70%)] blur-[80px]" />
        <div className="absolute top-[45%] left-1/4 w-[350px] h-[350px] pointer-events-none bg-[radial-gradient(circle,rgba(168,85,247,0.05)_0%,transparent_70%)] blur-[80px]" />
        <div className="absolute top-[45%] right-1/4 w-[350px] h-[350px] pointer-events-none bg-[radial-gradient(circle,rgba(168,85,247,0.05)_0%,transparent_70%)] blur-[80px]" />
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
