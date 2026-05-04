"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Hero() {
  const [activeColorTheme, setActiveColorTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const classes = document.documentElement.className;
      if (classes.includes("theme-rose")) return "theme-rose";
      if (classes.includes("theme-gold")) return "theme-gold";
      if (classes.includes("theme-sapphire")) return "theme-sapphire";
    }
    return "theme-emerald";
  });

  useEffect(() => {
    // Sync with global theme (Navbar handles localStorage)
    const observer = new MutationObserver(() => {
      const classes = document.documentElement.className;
      if (classes.includes("theme-rose")) setActiveColorTheme("theme-rose");
      else if (classes.includes("theme-gold"))
        setActiveColorTheme("theme-gold");
      else if (classes.includes("theme-sapphire"))
        setActiveColorTheme("theme-sapphire");
      else setActiveColorTheme("theme-emerald");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const getLogoPath = () => {
    switch (activeColorTheme) {
      case "theme-rose":
        return "/logorose.png";
      case "theme-gold":
        return "/logogold.png";
      case "theme-sapphire":
        return "/logosaphire.png";
      default:
        return "/logo.png";
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
      className="relative min-h-[70vh] flex items-start pt-16 md:pt-24 pb-6 md:pb-10 overflow-hidden"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[10%] right-[5%] w-[45vw] h-[45vw] bg-primary/15 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[5%] left-[5%] w-[40vw] h-[40vw] bg-accent/10 rounded-full blur-[120px]" />

        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 noise opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

        {/* Morphing blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[700px] h-[300px] md:h-[700px] bg-primary/5 dark:bg-primary/10 animate-morph opacity-40 blur-3xl" />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-24">
          {/* Floating Logo/Identity - Hidden on mobile, visible and shifted UP on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-1 justify-center relative perspective-1000 lg:order-last mb-0 lg:-mt-11 lg:translate-x-20"
          >
            <div className="relative w-[480px] h-[480px] group">
              {/* Complex Background Rings */}
              <div className="absolute inset-0 rounded-full border-[25px] border-primary/5 animate-[spin_25s_linear_infinite]" />
              <div className="absolute inset-[8%] rounded-full border-[2px] border-dashed border-primary/20 animate-[spin_40s_linear_infinite_reverse]" />
              <div className="absolute inset-[-10%] bg-primary/5 rounded-full blur-[80px] animate-pulse" />

              <motion.div
                whileHover={{ rotateX: 10, rotateY: 10, scale: 1.05 }}
                className="absolute inset-[12%] glass-card rounded-4xl p-1 flex items-center justify-center shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-700 hover:shadow-primary/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10 opacity-40 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative w-full h-full bg-black/40 rounded-[2.5rem] overflow-hidden flex items-center justify-center">
                  <Image
                    key={getLogoPath()}
                    src={getLogoPath()}
                    alt="Dev Patel Professional Identity"
                    fill
                    className="object-contain p-10 scale-160 transition-all duration-1000 group-hover:scale-150"
                    priority
                    unoptimized
                  />
                </div>
              </motion.div>

              {/* Floating Tech Chips */}
              <motion.div
                animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-5 right-5 p-5 glass rounded-3xl shadow-2xl border border-primary/30 backdrop-blur-2xl z-10"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-black text-xl">
                  JS
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 left-0 p-5 glass rounded-3xl shadow-2xl border border-accent/30 backdrop-blur-2xl z-10"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent font-black text-xl">
                  TS
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-[1.2] max-w-4xl text-center lg:text-left"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/20 border border-primary/40 text-primary text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-6 md:mb-8 shadow-[0_10px_30px_-5px_rgba(var(--primary),0.2)] backdrop-blur-xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] animate-[shimmer_3s_infinite]" />
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--primary),1)]" />
              Next-Gen Full Stack Architect
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-4 md:mb-6 leading-[0.9] text-balance"
            >
              CRAFT.
              <br />
              <span className="text-primary text-gradient drop-shadow-[0_0_30px_rgba(var(--primary),0.2)]">
                CODE.
              </span>{" "}
              <br />
              CONQUER.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-sm md:text-lg lg:text-xl text-muted-foreground/90 mb-6 md:mb-10 max-w-3xl mx-auto lg:mx-0 leading-relaxed font-medium px-4 lg:px-0"
            >
              I&apos;m{" "}
              <span className="text-foreground font-bold italic underline decoration-primary/40 decoration-4 md:decoration-6 underline-offset-[4px] md:underline-offset-[8px]">
                Dev Patel
              </span>
              . Engineering elite digital experiences through high-performance
              enterprise systems and visionary UI/UX.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6 mb-12 md:mb-16 px-4 sm:px-0"
            >
              <Link
                href="#projects"
                className="group relative px-6 md:px-10 py-3 md:py-5 bg-primary text-white rounded-xl font-black text-sm md:text-lg flex items-center gap-4 hover:bg-primary/90 transition-all hover:translate-y-[-4px] shadow-[0_15px_30px_-12px_rgba(var(--primary),0.4)] active:scale-95 w-full sm:w-auto justify-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-20deg]" />
                Explore Portfolio
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                className="px-6 md:px-10 py-3 md:py-5 bg-background/40 backdrop-blur-xl border-2 border-primary/20 rounded-xl font-black text-sm md:text-lg flex items-center gap-4 hover:bg-secondary transition-all hover:translate-y-[-4px] active:scale-95 shadow-2xl w-full sm:w-auto justify-center"
              >
                <Download size={18} /> Resume
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-12 pt-8 md:pt-12 border-t border-border/30"
            >
              <div className="flex flex-col items-center lg:items-start group">
                <span className="text-2xl md:text-4xl font-black text-foreground tracking-tighter group-hover:text-primary transition-colors duration-500">
                  1+
                </span>
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/60 group-hover:text-muted-foreground transition-colors duration-500">
                  Years Exp
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start group">
                <span className="text-2xl md:text-4xl font-black text-foreground tracking-tighter group-hover:text-primary transition-colors duration-500">
                  10+
                </span>
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/60 group-hover:text-muted-foreground transition-colors duration-500">
                  Global Projects
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start group hidden sm:flex">
                <span className="text-2xl md:text-4xl font-black text-foreground tracking-tighter group-hover:text-primary transition-colors duration-500">
                  BFSI
                </span>
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/60 group-hover:text-muted-foreground transition-colors duration-500">
                  Domain
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
