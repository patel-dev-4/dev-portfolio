"use client";

import { motion } from "framer-motion";
import { 
  Globe, 
  Palette, 
  Server, 
  Settings, 
  LayoutDashboard, 
  Database, 
  Cpu, 
  FileText 
} from "lucide-react";

const services = [
  {
    icon: <Globe size={28} />,
    title: "Full Stack Web Development",
    description: "Building end-to-end web applications with modern stacks like React, TypeScript, and Java Spring Boot."
  },
  {
    icon: <Palette size={28} />,
    title: "Frontend UI/UX Development",
    description: "Crafting pixel-perfect, responsive interfaces with Tailwind CSS and premium component libraries."
  },
  {
    icon: <Server size={28} />,
    title: "Backend API Development",
    description: "Designing scalable, secure RESTful APIs with robust validation and role-based access control."
  },
  {
    icon: <Settings size={28} />,
    title: "Workflow & Approval Systems",
    description: "Implementing complex maker-checker flows and dynamic configuration-driven business processes."
  },
  {
    icon: <LayoutDashboard size={28} />,
    title: "Dashboard & Reporting Modules",
    description: "Creating data-rich MIS dashboards with advanced filtering and optimized report generation."
  },
  {
    icon: <Database size={28} />,
    title: "Database Design & Optimization",
    description: "Architecting efficient relational schemas and optimizing SQL queries for high-performance applications."
  },
  {
    icon: <Cpu size={28} />,
    title: "Deployment & Support",
    description: "Managing deployments with Docker/Nginx and providing ongoing production support and debugging."
  },
  {
    icon: <FileText size={28} />,
    title: "Technical Documentation",
    description: "Preparing technical proposals, project notes, and client-ready documentation for enterprise projects."
  }
];

export default function WhatIDo() {
  return (
    <section id="expertise" className="section-padding bg-secondary/5 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-black uppercase tracking-[0.4em] mb-10 shadow-sm"
          >
            Capabilities
          </motion.div>
          <h3 className="text-5xl md:text-8xl font-display font-black mb-10 tracking-tighter leading-[0.85]">
            ENGINEERING <br /><span className="text-primary text-gradient">QUANTUM LEAPS.</span>
          </h3>
          <p className="text-xl md:text-2xl text-muted-foreground/80 font-medium max-w-3xl mx-auto leading-relaxed">
            Specialized engineering services focused on high-stakes production environments
            where failure is not an option.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="p-10 md:p-12 rounded-4xl border border-white/10 bg-card/30 backdrop-blur-3xl hover:border-primary/40 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(var(--primary),0.15)] group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-secondary/80 flex items-center justify-center text-primary mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-2xl relative z-10"
              >
                <div className="scale-125">{service.icon}</div>
              </motion.div>
              
              <h4 className="text-xl md:text-2xl font-display font-black mb-4 tracking-tighter relative z-10">{service.title}</h4>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed relative z-10 font-medium group-hover:text-foreground/80 transition-colors">
                {service.description}
              </p>
              
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-20 transition-opacity duration-700 rotate-12">
                {service.icon}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-x-1/2" />
    </section>
  );
}
