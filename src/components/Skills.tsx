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
    icon: <Laptop size={24} />,
    skills: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "shadcn/ui", "TanStack Router", "TanStack Query", "React Hook Form", "Zod", "Framer Motion"],
  },
  {
    title: "Backend Core",
    icon: <Server size={24} />,
    skills: ["Java", "Spring Boot", "REST APIs", "Spring Security", "JPA/Hibernate", "Maven", "Node.js (basics)", "API Integration", "RBAC"],
  },
  {
    title: "Data Management",
    icon: <Database size={24} />,
    skills: ["MySQL", "PostgreSQL", "SQL Queries", "Schema Design", "Stored Procedures", "Report Queries", "Data Validation"],
  },
  {
    title: "Professional Tools",
    icon: <Wrench size={24} />,
    skills: ["Git / GitHub", "Postman", "IntelliJ IDEA", "VS Code", "Docker", "Redis", "Coolify", "Caddy/Nginx", "MIS Reporting Tools"],
  },
  {
    title: "Domain Knowledge",
    icon: <ShieldCheck size={24} />,
    skills: ["Banking Systems", "Loan Management (LMS)", "Early Warning (EWS)", "Fraud Risk Management", "Maker-Checker Flows", "Audit Trails", "SLA Tracking"],
  },
  {
    title: "Engineering Base",
    icon: <Code2 size={24} />,
    skills: ["Core Java", "C#", "Python", "Electronics & Comm.", "Problem Solving", "Debugging Mindset", "Requirement Analysis"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-black uppercase tracking-[0.4em] mb-10 shadow-sm backdrop-blur-md"
          >
            Capabilities
          </motion.div>
          <h3 className="text-5xl md:text-8xl font-display font-black mb-10 tracking-tighter leading-[0.85]">
            THE TECHNICAL <br /><span className="text-primary text-gradient">ECOSYSTEM.</span>
          </h3>
          <p className="text-xl md:text-2xl text-muted-foreground/80 font-medium max-w-3xl mx-auto leading-relaxed">
            A comprehensive architectural stack engineered for resilience, 
            scalability, and high-performance financial systems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: categoryIndex * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="p-10 md:p-14 rounded-4xl border border-white/10 bg-card/30 backdrop-blur-3xl hover:border-primary/40 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/10 group flex flex-col h-full"
            >
              <div className="flex items-center gap-6 mb-10 md:mb-12">
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-secondary/80 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-xl"
                >
                  <div className="scale-125">{category.icon}</div>
                </motion.div>
                <h4 className="text-2xl md:text-3xl font-display font-black tracking-tighter leading-tight">{category.title}</h4>
              </div>
              <div className="flex flex-wrap gap-3 mt-auto">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span 
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + (skillIndex * 0.05) }}
                    className="px-4 md:px-5 py-2 md:py-2.5 rounded-xl bg-background/40 text-foreground text-[10px] md:text-xs font-black uppercase tracking-widest border border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
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
