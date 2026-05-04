"use client";

import { motion } from "framer-motion";
import { 
  Zap, 
  Bug, 
  Puzzle, 
  Code2, 
  MousePointer2, 
  FileText, 
  TrendingUp,
  Brain
} from "lucide-react";

const strengths = [
  { icon: <TrendingUp size={20} />, text: "Fast learner & adaptable to new tech" },
  { icon: <Bug size={20} />, text: "Strong debugging & problem-solving mindset" },
  { icon: <Brain size={20} />, text: "Good understanding of real business workflows" },
  { icon: <Puzzle size={20} />, text: "Able to work seamlessly on Frontend & Backend" },
  { icon: <MousePointer2 size={20} />, text: "Comfortable with complex forms & dashboards" },
  { icon: <Code2 size={20} />, text: "Good at converting requirements into modules" },
  { icon: <Zap size={20} />, text: "Focused on clean UI & practical usability" },
  { icon: <FileText size={20} />, text: "Able to prepare quality technical documentation" }
];

export default function Strengths() {
  return (
    <section className="section-padding bg-primary text-white overflow-hidden relative">
      <div className="absolute inset-0 noise opacity-[0.1] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[160px]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-[140px]" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-24 md:gap-32">
          <div className="lg:w-2/5">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-black uppercase tracking-[0.4em] mb-10 backdrop-blur-xl"
            >
              The Mindset
            </motion.div>
            <h3 className="text-6xl md:text-8xl font-display font-black mb-10 leading-[0.85] tracking-tighter">
              BEYOND THE <br /><span className="text-white/40">CODEBASE.</span>
            </h3>
            <p className="text-white/80 text-xl md:text-2xl font-medium leading-relaxed max-w-xl">
              Engineering is about more than just syntax. It&apos;s about 
              <span className="text-white font-black italic"> adaptability</span>, 
              <span className="text-white font-black italic"> intuition</span>, and the 
              <span className="text-white font-black italic"> resilience</span> to solve the impossible.
            </p>
          </div>
          
          <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {strengths.map((strength, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-6 p-8 rounded-4xl bg-white/10 backdrop-blur-3xl border border-white/10 hover:bg-white/15 transition-all duration-700 group shadow-2xl"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="shrink-0 w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-primary transition-all duration-700 shadow-xl"
                >
                  <div className="scale-125">{strength.icon}</div>
                </motion.div>
                <span className="font-display font-black text-lg md:text-xl tracking-tighter leading-tight">{strength.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
