"use client";

import { motion } from "framer-motion";
import { 
  Code2, 
  Database, 
  Server, 
  Wrench, 
  ShieldCheck, 
  Laptop
} from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Tech",
    icon: <Laptop size={20} />,
    skills: ["React", "Next.js", "TypeScript", "Tailwind", "shadcn/ui", "TanStack", "Framer Motion", "Zod"],
  },
  {
    title: "Backend Core",
    icon: <Server size={20} />,
    skills: ["Java", "Spring Boot", "REST APIs", "Spring Security", "JPA", "Node.js", "API Design", "RBAC"],
  },
  {
    title: "Data Systems",
    icon: <Database size={20} />,
    skills: ["MySQL", "PostgreSQL", "SQL", "Schema Design", "Procedures", "Report Queries", "Validation"],
  },
  {
    title: "Dev Tools",
    icon: <Wrench size={20} />,
    skills: ["Git", "Postman", "IntelliJ", "Docker", "Redis", "Coolify", "Caddy/Nginx", "MIS Tools"],
  },
  {
    title: "Domain Stack",
    icon: <ShieldCheck size={20} />,
    skills: ["Banking", "Loan Mgmt", "Fraud Risk", "Maker-Checker", "Audit", "SLA", "FinTech"],
  },
  {
    title: "Core Found.",
    icon: <Code2 size={20} />,
    skills: ["Java SE", "Python", "Problem Solving", "Debugging", "Electronics", "Req Analysis"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-[0.4em] mb-6 md:mb-8 shadow-sm backdrop-blur-md"
          >
            Stack
          </motion.div>
          <h3 className="text-2xl md:text-5xl font-display font-black mb-6 tracking-tighter leading-[0.9]">
            THE TECHNICAL <br /><span className="text-primary text-gradient">ECOSYSTEM.</span>
          </h3>
          <p className="text-[13px] md:text-base text-muted-foreground/80 font-medium max-w-2xl mx-auto leading-relaxed">
            A comprehensive architectural stack engineered for resilience, 
            scalability, and high-performance financial systems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.05 }}
              className="p-6 md:p-8 rounded-2xl border border-white/5 bg-card/30 backdrop-blur-3xl hover:border-primary/40 transition-all duration-700 hover:shadow-xl group flex flex-col h-full"
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-12 h-12 rounded-xl bg-secondary/80 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-md"
                >
                  <div className="scale-110">{category.icon}</div>
                </motion.div>
                <h4 className="text-lg md:text-xl font-display font-black tracking-tighter leading-tight">{category.title}</h4>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="px-3 py-1 rounded-lg bg-background/40 text-foreground text-[9px] md:text-[10px] font-black uppercase tracking-widest border border-white/5 hover:border-primary/30 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-primary/5 blur-[160px] rounded-full -mb-300 opacity-50" />
    </section>
  );
}
