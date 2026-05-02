"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Hero() {
  const [activeColorTheme, setActiveColorTheme] = useState("theme-emerald");

  useEffect(() => {
    // Sync with global theme (Navbar handles localStorage)
    const observer = new MutationObserver(() => {
      const classes = document.documentElement.className;
      if (classes.includes("theme-rose")) setActiveColorTheme("theme-rose");
      else if (classes.includes("theme-gold")) setActiveColorTheme("theme-gold");
      else if (classes.includes("theme-sapphire")) setActiveColorTheme("theme-sapphire");
      else setActiveColorTheme("theme-emerald");
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    
    // Initial sync
    const initialClasses = document.documentElement.className;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (initialClasses.includes("theme-rose")) setActiveColorTheme("theme-rose");
    else if (initialClasses.includes("theme-gold")) setActiveColorTheme("theme-gold");
    else if (initialClasses.includes("theme-sapphire")) setActiveColorTheme("theme-sapphire");

    return () => observer.disconnect();
  }, []);

  const getLogoPath = () => {
    switch (activeColorTheme) {
      case "theme-rose": return "/logorose.png";
      case "theme-gold": return "/logogold.png";
      case "theme-sapphire": return "/logosaphire.png";
      default: return "/logo.png";
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[10%] right-[5%] w-[45vw] h-[45vw] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[5%] left-[5%] w-[40vw] h-[40vw] bg-accent/10 rounded-full blur-[100px]" />
        
        {/* Morphing blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/10 animate-morph opacity-50 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 max-w-4xl"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-2xl bg-secondary/80 border border-border/50 text-primary text-xs font-black uppercase tracking-[0.2em] mb-10 shadow-sm backdrop-blur-sm"
            >
              <Sparkles size={16} />
              Full Stack Innovator
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-9xl font-black tracking-tight mb-10 leading-[0.95] text-balance"
            >
              Design. <br />
              <span className="text-primary text-gradient">Develop.</span>{" "}
              <br />
              Deliver.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-3xl text-muted-foreground/80 mb-14 max-w-3xl leading-relaxed font-medium"
            >
              I&apos;m{" "}
              <span className="text-foreground font-bold underline decoration-primary/30 decoration-4 underline-offset-8">
                Dev Patel
              </span>
              , a Full Stack Architect crafting high-performance enterprise
              systems with a focus on human-centric UI/UX.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-6 mb-20"
            >
              <Link
                href="#projects"
                className="group px-10 py-5 bg-primary text-white rounded-2xl font-black text-lg flex items-center gap-3 hover:bg-primary/90 transition-all hover:translate-y-[-4px] shadow-2xl shadow-primary/30 active:scale-95"
              >
                Explore My Work
                <ArrowRight
                  size={22}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                className="px-10 py-5 bg-background/50 backdrop-blur-md border-2 border-border/50 rounded-2xl font-black text-lg flex items-center gap-3 hover:bg-secondary transition-all hover:translate-y-[-4px] active:scale-95 shadow-lg"
              >
                <Download size={22} /> Resume
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-12 pt-12 border-t border-border/50"
            >
              <div className="flex flex-col">
                <span className="text-4xl font-black text-foreground tracking-tighter">
                  1+
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                  Years Experience
                </span>
              </div>
              <div className="w-px h-10 bg-border/50 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-4xl font-black text-foreground tracking-tighter">
                  10+
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                  Successful Projects
                </span>
              </div>
              <div className="w-px h-10 bg-border/50 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-4xl font-black text-foreground tracking-tighter">
                  BFSI
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                  Specialization
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Logo/Identity */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-1 justify-center relative"
          >
            <div className="relative w-[500px] h-[500px]">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 rounded-full border-[20px] border-primary/5 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-[10%] rounded-full border-[1px] border-dashed border-primary/20 animate-[spin_30s_linear_infinite_reverse]" />

              <div className="absolute inset-[15%] glass-card rounded-[3rem] p-12 flex items-center justify-center shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] group overflow-hidden bg-black/40">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative w-full h-full">
                  <Image
                    key={getLogoPath()}
                    src={getLogoPath()}
                    alt="Dev Patel Professional Identity"
                    fill
                    className="object-contain rounded-[3rem] scale-190 transition-all duration-700 group-hover:scale-150"
                    priority
                    unoptimized
                  />
                </div>
              </div>

              {/* Floating tech nodes */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-0 right-0 p-4 glass rounded-2xl shadow-xl border border-primary/20"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black">
                  JS
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-10 left-0 p-4 glass rounded-2xl shadow-xl border border-accent/20"
              >
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-black">
                  TS
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
