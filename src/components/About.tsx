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
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Decorative dots background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              The Background
            </div>
            <h3 className="text-5xl md:text-6xl font-black mb-10 leading-[1.1] tracking-tighter">
              Crafting Digital <br />
              <span className="text-primary text-gradient">Experiences</span> that Matter.
            </h3>
            <div className="space-y-8 text-xl text-muted-foreground/90 leading-relaxed font-medium">
              <p>
                As an <strong>Electronics & Communication Engineering</strong> graduate (Class of 2025), I bring a unique perspective to software development—blending hardware-level logic with high-level software architecture.
              </p>
              <p>
                My professional focus lies in building enterprise modules that are not just functional, but optimized for scale and human interaction. At <strong>SSBI Group</strong>, I&apos;ve lead the development of complex financial dashboards and workflow systems.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {["System Architecture", "UI/UX Optimization", "API Security", "Database Scaling"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-bold text-foreground bg-secondary/50 p-4 rounded-2xl border border-border/50">
                    <CheckCircle2 size={18} className="text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-6 relative z-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className={`p-10 rounded-[2.5rem] glass-card hover-lift group ${index % 2 !== 0 ? "md:mt-10" : ""}`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                    {stat.icon}
                  </div>
                  <h4 className="text-xl font-black mb-2 tracking-tight">{stat.label}</h4>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">{stat.sub}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-primary/5 rounded-full blur-[100px] -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
