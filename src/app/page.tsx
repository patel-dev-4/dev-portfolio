import Hero from "@/components/Hero";
import About from "@/components/About";
import WhatIDo from "@/components/WhatIDo";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import TechnicalWork from "@/components/TechnicalWork";
import Experience from "@/components/Experience";
import Strengths from "@/components/Strengths";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="relative">
      {/* Background ambient glow effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-accent/5 blur-[100px]" />
      </div>
      
      <Hero />
      <About />
      <WhatIDo />
      <Skills />
      <Projects />
      <TechnicalWork />
      <Strengths />
      <Experience />
      <Contact />
    </div>
  );
}
