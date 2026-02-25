import Hero from "@/components/Hero";
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
  );
}
