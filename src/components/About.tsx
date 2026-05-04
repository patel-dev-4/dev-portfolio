"use client";

import { motion } from "framer-motion";
import { GraduationCap, Code2, Rocket, Heart, CheckCircle2 } from "lucide-react";

const stats = [
  { icon: <GraduationCap size={24} />, label: "B.E. Graduate", sub: "Electronics & Comm." },
  { icon: <Code2 size={24} />, label: "Full Stack", sub: "End-to-End Dev" },
  { icon: <Rocket size={24} />, label: "Innovation", sub: "Modern Tech" },
  { icon: <Heart size={24} />, label: "UI/UX", sub: "Human Centric" },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden bg-background">
      {/* Dynamic Background Noise and Grid */}
      <div className="absolute inset-0 noise opacity-[0.02] dark:opacity-[0.04] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-black uppercase tracking-[0.4em] mb-10 shadow-sm backdrop-blur-md"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              THE PHILOSOPHY
            </motion.div>
            <h3 className="text-5xl md:text-8xl font-display font-black mb-10 md:mb-14 leading-[0.85] tracking-tighter">
              CRAFTING DIGITAL <br />
              <span className="text-primary text-gradient">EXPERIENCES</span> <br />
              WITH PRECISION.
            </h3>
            <div className="space-y-8 md:space-y-12 text-lg md:text-2xl text-muted-foreground/90 leading-relaxed font-medium">
              <p className="border-l-4 border-primary/30 pl-8">
                As an <span className="text-foreground font-black">Electronics & Communication</span> architect, I bridge the gap between low-level logic and high-level software ecosystems.
              </p>
              <p>
                Currently leading the architectural evolution at <span className="text-foreground font-black underline decoration-primary/30 decoration-4 underline-offset-4">SSBI Group</span>, where I was accelerated to Jr. Software Developer for my work on complex BFSI workflow engines.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-8">
                {["System Architecture", "UI/UX Vision", "API Resilience", "Database Optimization"].map((item, idx) => (
                  <motion.li 
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="flex items-center gap-4 text-xs md:text-sm font-black text-foreground bg-card/40 backdrop-blur-3xl p-5 rounded-3xl border border-white/5 shadow-xl hover:border-primary/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <CheckCircle2 size={20} />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <div className="relative mt-20 lg:mt-0">
            <div className="grid grid-cols-2 gap-6 md:gap-10 relative z-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className={`p-8 md:p-14 rounded-4xl glass-card hover-lift group ${index % 2 !== 0 ? "lg:mt-16" : ""}`}
                >
                  <motion.div 
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="w-16 h-16 md:w-24 md:h-24 rounded-3xl bg-secondary/80 flex items-center justify-center text-primary mb-8 md:mb-12 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)]"
                  >
                    <div className="scale-150">{stat.icon}</div>
                  </motion.div>
                  <h4 className="text-xl md:text-3xl font-display font-black mb-2 md:mb-4 tracking-tighter">{stat.label}</h4>
                  <p className="text-[10px] md:text-xs text-muted-foreground font-black uppercase tracking-[0.2em] opacity-60">{stat.sub}</p>
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
