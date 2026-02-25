"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Hi, welcome to <span className="text-primary">Dev Portfolio</span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-xl text-muted-foreground max-w-[600px] mb-8 mx-auto">
          I build high-performance, exclusive web experiences using React,
          TypeScript, and modern backend technologies.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button size="lg" className="rounded-full px-8">
          View My Work
        </Button>
        <Button size="lg" variant="outline" className="rounded-full px-8">
          Chat with AI
        </Button>
      </motion.div>
    </section>
  );
}
