"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeColorTheme, setActiveColorTheme] = useState("theme-emerald");

  useEffect(() => {
    setMounted(true);
    // Initial sync with localStorage
    const savedTheme = localStorage.getItem("color-theme") || "theme-emerald";
    setActiveColorTheme(savedTheme);

    // Sync with global theme changes
    const handleStorageChange = () => {
      const updatedTheme = localStorage.getItem("color-theme") || "theme-emerald";
      setActiveColorTheme(updatedTheme);
    };

    // Use a MutationObserver as a fallback to catch class changes from Navbar
    const observer = new MutationObserver(() => {
      const classes = document.documentElement.className;
      const themes = ["theme-rose", "theme-gold", "theme-sapphire", "theme-emerald"];
      const currentTheme = themes.find(t => classes.includes(t)) || "theme-emerald";
      setActiveColorTheme(currentTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      observer.disconnect();
    };
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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // If not mounted, render a stable skeleton to avoid hydration mismatch
  if (!mounted) {
    return (
      <section id="home" className="relative min-h-[70vh] pt-16 md:pt-24 pb-10 overflow-hidden bg-background">
        <div className="container mx-auto px-6 md:px-12 opacity-0">
          Loading...
        </div>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex items-center pt-20 md:pt-32 pb-12 md:pb-20 overflow-hidden"
    >
      {/* Dynamic Background - Refined for 'Old Money' Aesthetic */}
      <div className="absolute inset-0 -z-10 bg-background">
        <div className="absolute top-[10%] right-[5%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[5%] left-[5%] w-[35vw] h-[35vw] bg-accent/5 rounded-full blur-[120px]" />

        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 noise opacity-[0.02] pointer-events-none" />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-[1.2] max-w-4xl text-center lg:text-left"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-8 shadow-sm backdrop-blur-xl relative overflow-hidden group"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Full Stack Architect
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-display font-black tracking-tighter mb-6 md:mb-8 leading-[0.85] text-balance"
            >
              CRAFT.
              <br />
              <span className="text-primary text-gradient italic drop-shadow-[0_0_30px_rgba(var(--primary),0.1)]">
                CODE.
              </span>{" "}
              <br />
              CONQUER.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground/80 mb-10 md:mb-14 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              I am{" "}
              <span className="text-foreground font-black italic underline decoration-primary/30 decoration-4 underline-offset-8">
                Dev Patel
              </span>
              . Architecting high-performance enterprise systems with absolute precision and visionary design.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 mb-16"
            >
              <Link
                href="#projects"
                className="group relative px-10 py-4 bg-primary text-white rounded-xl font-black text-sm uppercase tracking-widest flex items-center gap-4 hover:translate-y-[-4px] shadow-2xl shadow-primary/30 transition-all active:scale-95 w-full sm:w-auto justify-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-20deg]" />
                Case Studies
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                className="px-10 py-4 bg-secondary/50 backdrop-blur-xl border border-white/5 rounded-xl font-black text-sm uppercase tracking-widest flex items-center gap-4 hover:bg-secondary hover:translate-y-[-4px] active:scale-95 shadow-xl transition-all w-full sm:w-auto justify-center"
              >
                <Download size={18} /> Credentials
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-16 pt-12 border-t border-border/10"
            >
              {[
                { label: "Experience", value: "1+ YR" },
                { label: "Deployment", value: "10+ PRJ" },
                { label: "Specialization", value: "BFSI" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center lg:items-start group">
                  <span className="text-2xl md:text-4xl font-display font-black text-foreground tracking-tighter group-hover:text-primary transition-colors duration-500">
                    {stat.value}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/50 group-hover:text-muted-foreground transition-colors duration-500">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Premium Floating Identity - Optimized for Performance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-1 justify-center relative perspective-2000"
          >
            <div className="relative w-[500px] h-[500px] group">
              {/* Refined Orbitals */}
              <div className="absolute inset-0 rounded-full border-[1px] border-primary/10 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-[15%] rounded-full border-[1px] border-dashed border-primary/5 animate-[spin_40s_linear_infinite_reverse]" />
              
              <motion.div
                whileHover={{ rotateX: 5, rotateY: 5, scale: 1.02 }}
                className="absolute inset-[10%] glass-card rounded-[3rem] p-1 flex items-center justify-center shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden transition-all duration-1000"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 opacity-40" />
                <div className="relative w-full h-full bg-black/60 rounded-[2.8rem] overflow-hidden flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeColorTheme}
                      initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                      animate={{ opacity: 1, scale: 1.2, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                      transition={{ duration: 0.8 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={getLogoPath()}
                        alt="Professional Identity"
                        fill
                        className="object-contain p-12 transition-transform duration-1000 group-hover:scale-110"
                        priority
                        unoptimized
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Floating Tech Artifacts */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 p-5 glass rounded-3xl shadow-2xl border border-primary/20 backdrop-blur-3xl z-10"
              >
                <div className="text-primary font-black text-xs uppercase tracking-widest">TS</div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 p-5 glass rounded-3xl shadow-2xl border border-accent/20 backdrop-blur-3xl z-10"
              >
                <div className="text-accent font-black text-xs uppercase tracking-widest">REACT</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
