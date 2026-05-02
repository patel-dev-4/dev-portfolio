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
    <section className="py-32 bg-primary text-white overflow-hidden relative">
      {/* Decorative background patterns */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]" />
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/3">
            <h2 className="text-sm uppercase tracking-[0.4em] text-white/70 font-bold mb-6">Personal Strengths</h2>
            <h3 className="text-5xl font-bold mb-8 leading-tight">What I Bring <br />to the Table.</h3>
            <p className="text-white/80 text-xl leading-relaxed">
              Beyond technical skills, I focus on the soft skills and mindsets 
              necessary for delivering successful enterprise software projects.
            </p>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {strengths.map((strength, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-5 p-7 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all group"
              >
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                  {strength.icon}
                </div>
                <span className="font-bold text-lg">{strength.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
