"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
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
    <section id="home" className="relative min-h-[95vh] flex items-center pt-32 pb-20 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[10%] right-[5%] w-[45vw] h-[45vw] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[5%] left-[5%] w-[40vw] h-[40vw] bg-accent/10 rounded-full blur-[100px]" />
        
        {/* Morphing blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/10 animate-morph opacity-50 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-5 py-2 rounded-2xl bg-secondary/80 border border-border/50 text-primary text-xs font-black uppercase tracking-[0.2em] mb-10 shadow-sm backdrop-blur-sm">
            <Sparkles size={16} />
            Full Stack Innovator
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-9xl font-black tracking-tight mb-10 leading-[0.95] text-balance"
          >
            Design. <br />
            <span className="text-primary text-gradient">Develop.</span> <br />
            Deliver.
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-3xl text-muted-foreground/80 mb-14 max-w-3xl leading-relaxed font-medium"
          >
            I&apos;m <span className="text-foreground font-bold underline decoration-primary/30 decoration-4 underline-offset-8">Dev Patel</span>, 
            a Full Stack Architect crafting high-performance enterprise systems with a focus on human-centric UI/UX.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6 mb-20">
            <Link 
              href="#projects" 
              className="group px-10 py-5 bg-primary text-white rounded-2xl font-black text-lg flex items-center gap-3 hover:bg-primary/90 transition-all hover:translate-y-[-4px] shadow-2xl shadow-primary/30 active:scale-95"
            >
              Explore My Work 
              <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
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
              <span className="text-4xl font-black text-foreground tracking-tighter">1+</span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Years Experience</span>
            </div>
            <div className="w-px h-10 bg-border/50 hidden sm:block" />
            <div className="flex flex-col">
              <span className="text-4xl font-black text-foreground tracking-tighter">10+</span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Successful Projects</span>
            </div>
            <div className="w-px h-10 bg-border/50 hidden sm:block" />
            <div className="flex flex-col">
              <span className="text-4xl font-black text-foreground tracking-tighter">BFSI</span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Specialization</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
