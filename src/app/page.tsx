import Hero from "@/components/Hero";
<<<<<<< HEAD
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
=======
import Projects from "@/components/Projects";
import Contact from "@/components/Contact"; // Import Contact

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Background ambient glow effect */}
      <div className="absolute top-0 -z-10 h-full w-full bg-white dark:bg-zinc-950">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>
      <Hero />
      <Projects />
      <Contact /> {/* Add Contact here */}
    </main>
>>>>>>> d17808455001810d193735fa22286161634336f6
  );
}
