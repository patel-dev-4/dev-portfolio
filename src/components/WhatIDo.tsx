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
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm uppercase tracking-[0.3em] text-primary font-bold mb-4">Core Expertise</h2>
          <h3 className="text-4xl font-bold mb-6">Bridging Code and Business.</h3>
          <p className="text-lg text-muted-foreground">
            Specialized services focused on delivering high-quality, production-ready software solutions 
            for enterprise and financial sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-[2rem] border border-border bg-background hover:border-primary/40 transition-all hover:shadow-xl hover:shadow-primary/5 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h4 className="text-lg font-bold mb-3">{service.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
