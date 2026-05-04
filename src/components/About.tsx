"use client";

import { motion } from "framer-motion";
import { GraduationCap, Code2, Rocket, Heart, CheckCircle2 } from "lucide-react";

const stats = [
  { icon: <GraduationCap size={20} />, label: "B.E. Graduate", sub: "Electronics & Comm." },
  { icon: <Code2 size={20} />, label: "Full Stack", sub: "End-to-End Dev" },
  { icon: <Rocket size={20} />, label: "Innovation", sub: "Modern Tech" },
  { icon: <Heart size={20} />, label: "UI/UX", sub: "Human Centric" },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden bg-background">
      {/* Dynamic Background Noise and Grid */}
      <div className="absolute inset-0 noise opacity-[0.02] dark:opacity-[0.04] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-[0.4em] mb-6 md:mb-8 shadow-sm backdrop-blur-md"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              THE PHILOSOPHY
            </motion.div>
            <h3 className="text-3xl md:text-6xl font-display font-black mb-8 md:mb-10 leading-[0.9] tracking-tighter">
              CRAFTING DIGITAL <br />
              <span className="text-primary text-gradient">EXPERIENCES</span> <br />
              WITH PRECISION.
            </h3>
            <div className="space-y-6 md:space-y-8 text-sm md:text-lg text-muted-foreground/90 leading-relaxed font-medium">
              <p className="border-l-3 border-primary/30 pl-6">
                As an <span className="text-foreground font-black">Electronics & Communication</span> architect, I bridge the gap between low-level logic and software ecosystems.
              </p>
              <p>
                Currently leading the architectural evolution at <span className="text-foreground font-black underline decoration-primary/30 decoration-2 underline-offset-4">SSBI Group</span>, specialized in high-stakes BFSI workflow engines.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 pt-6">
                {["System Architecture", "UI/UX Vision", "API Resilience", "Database Optimization"].map((item, idx) => (
                  <motion.li 
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    className="flex items-center gap-3 text-[10px] md:text-xs font-black text-foreground bg-card/40 backdrop-blur-3xl p-3.5 rounded-xl border border-white/5 shadow-lg hover:border-primary/30 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <CheckCircle2 size={16} />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <div className="relative mt-12 lg:mt-0">
            <div className="grid grid-cols-2 gap-4 md:gap-6 relative z-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-6 md:p-8 rounded-2xl glass-card hover-lift group ${index % 2 !== 0 ? "lg:mt-8" : ""}`}
                >
                  <motion.div 
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-secondary/80 flex items-center justify-center text-primary mb-6 md:mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-lg"
                  >
                    <div className="scale-110">{stat.icon}</div>
                  </motion.div>
                  <h4 className="text-lg md:text-xl font-display font-black mb-1.5 tracking-tighter leading-tight">{stat.label}</h4>
                  <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.2em] opacity-60">{stat.sub}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[140px] -z-10 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
