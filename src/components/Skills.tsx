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
    <section id="skills" className="section-padding bg-secondary/10">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm uppercase tracking-[0.3em] text-primary font-bold mb-4">Technical Arsenal</h2>
          <h3 className="text-4xl font-bold mb-6">Tools & Technologies I Master.</h3>
          <p className="text-lg text-muted-foreground">
            A comprehensive stack built through rigorous engineering education and 
            real-world enterprise internship experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="p-8 rounded-3xl border border-border bg-background hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/5 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  {category.icon}
                </div>
                <h4 className="text-xl font-bold">{category.title}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-bold border border-transparent hover:border-primary/20 transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
