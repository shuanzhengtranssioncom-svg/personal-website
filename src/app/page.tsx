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
      <main className="flex-1">
        <HeroBand />
        <GrowthPath />
        <Skills />
        <Footer />
      </main>
    </>
  );
}
