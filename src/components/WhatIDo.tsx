"use client";

import { motion } from "framer-motion";
import { Code2, Database, Layout,  Shield, Cpu, Cloud} from "lucide-react";

const expertise = [
  {
    icon: <Code2 size={18} />,
    title: "Backend Systems",
    desc: "Architecting high-performance Java Spring Boot & Node.js microservices with distributed transactions.",
    skills: ["Java", "Spring Boot", "Node.js", "Express"],
    color: "primary"
  },
  {
    icon: <Layout size={18} />,
    title: "Modern Frontend",
    desc: "Crafting pixel-perfect web interfaces using React, Next.js, and high-fidelity Tailwind architectures.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind"],
    color: "accent"
  },
  {
    icon: <Database size={18} />,
    title: "Data Architecture",
    desc: "Engineering scalable database solutions with PostgreSQL, MongoDB, and Redis for real-time systems.",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
    color: "primary"
  },
  {
    icon: <Cpu size={18} />,
    title: "System Integration",
    desc: "Developing enterprise-grade APIs and middleware to synchronize complex financial ecosystems.",
    skills: ["REST", "GraphQL", "Webhooks", "Kafka"],
    color: "accent"
  },
  {
    icon: <Cloud size={18} />,
    title: "Cloud Solutions",
    desc: "Deploying and managing scalable infrastructure on AWS and Vercel with robust CI/CD pipelines.",
    skills: ["AWS", "Vercel", "Docker", "CI/CD"],
    color: "primary"
  },
  {
    icon: <Shield size={18} />,
    title: "Security & QA",
    desc: "Implementing secure authentication patterns and comprehensive testing suites for system integrity.",
    skills: ["OAuth", "JWT", "Jest", "Cypress"],
    color: "accent"
  }
];

export default function WhatIDo() {
  return (
    <section id="expertise" className="py-6 md:py-10 bg-secondary/5 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-4 md:mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[8px] font-black uppercase tracking-[0.3em] mb-2"
          >
            Capabilities
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-3xl font-display font-black tracking-tighter mb-1.5"
          >
            TECHNICAL <span className="text-primary text-gradient">COMMAND.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[12px] md:text-sm text-muted-foreground/80 font-medium leading-relaxed max-w-xl mx-auto"
          >
            A multi-disciplinary approach to software engineering, focused on stability, 
            scalability, and user-centric design.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {expertise.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
              className="glass-card group p-4 md:p-5 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -translate-y-12 translate-x-12 group-hover:bg-primary/10 transition-colors" />
              
              <div className={`w-9 h-9 rounded-lg ${item.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'} flex items-center justify-center mb-3 border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
                {item.icon}
              </div>
              
              <h3 className="text-base md:text-lg font-display font-black tracking-tighter mb-1.5 group-hover:text-primary transition-colors leading-none">
                {item.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-3 font-medium text-[12px] md:text-[13px] line-clamp-2">
                {item.desc}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {item.skills.map((skill, sIndex) => (
                  <span 
                    key={sIndex}
                    className="px-2 py-0.5 rounded-md bg-secondary/50 border border-white/5 text-[8px] font-black uppercase tracking-widest text-foreground/60 group-hover:text-primary transition-colors"
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
