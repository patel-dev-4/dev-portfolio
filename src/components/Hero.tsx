"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";

export default function Hero() {
  // Safe scroll function that verifies the element exists before scrolling
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] text-center px-4">
      {/* Premium glowing background effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <span className="px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm text-sm font-medium border border-border flex items-center gap-2 w-max mx-auto shadow-sm">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Available for new opportunities
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Hi, I'm{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
            Dev Patel
          </span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-xl text-muted-foreground max-w-[700px] mb-4 mx-auto leading-relaxed">
          An Electronics & Communication Engineering graduate transitioning into
          software development. I specialize in building real-time,
          high-performance web applications.
        </p>
        <p className="text-sm text-muted-foreground mb-10 mx-auto">
          (Have questions? Use the AI chat widget in the bottom right corner!)
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
      >
        <Button
          size="lg"
          className="rounded-full px-8 gap-2 shadow-lg"
          onClick={scrollToProjects}
        >
          View My Work <ArrowRight size={18} />
        </Button>

        {/* The href points directly to the public folder */}
        <a href="/resume.pdf" download="Dev_Patel_Resume.pdf">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 gap-2 w-full sm:w-auto shadow-sm border-primary/20 hover:bg-primary/5"
          >
            <Download size={18} /> Download Resume
          </Button>
        </a>
      </motion.div>
    </section>
  );
}
