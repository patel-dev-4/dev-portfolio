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
  { icon: <TrendingUp size={16} />, text: "Fast learner & adaptable to new tech" },
  { icon: <Bug size={16} />, text: "Strong debugging & problem-solving" },
  { icon: <Brain size={16} />, text: "Understanding of real business workflows" },
  { icon: <Puzzle size={16} />, text: "Frontend & Backend proficiency" },
  { icon: <MousePointer2 size={16} />, text: "Complex forms & dashboard optimization" },
  { icon: <Code2 size={16} />, text: "Req-to-Module architecture mindset" },
  { icon: <Zap size={16} />, text: "Focused on clean UI & practical usability" },
  { icon: <FileText size={16} />, text: "Quality technical documentation skills" }
];

export default function Strengths() {
  return (
    <section className="section-padding bg-primary text-white overflow-hidden relative">
      <div className="absolute inset-0 noise opacity-[0.1] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[160px]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-[140px]" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
          <div className="lg:w-2/5">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[9px] font-black uppercase tracking-[0.4em] mb-6 backdrop-blur-xl"
            >
              The Mindset
            </motion.div>
            <h3 className="text-3xl md:text-6xl font-display font-black mb-6 leading-[0.9] tracking-tighter">
              BEYOND THE <br /><span className="text-white/40">CODEBASE.</span>
            </h3>
            <p className="text-white/80 text-sm md:text-lg font-medium leading-relaxed max-w-sm">
              Engineering is about more than just syntax. It&apos;s about 
              <span className="text-white font-black italic"> adaptability</span> and the 
              <span className="text-white font-black italic"> resilience</span> to solve the impossible.
            </p>
          </div>
          
          <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {strengths.map((strength, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-5 p-5 rounded-2xl bg-white/10 backdrop-blur-3xl border border-white/10 hover:bg-white/15 transition-all duration-700 group shadow-xl"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="shrink-0 w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-primary transition-all duration-700 shadow-lg"
                >
                  <div className="scale-100">{strength.icon}</div>
                </motion.div>
                <span className="font-display font-black text-sm md:text-base tracking-tighter leading-tight">{strength.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
