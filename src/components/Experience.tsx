"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

const experiences = [
  {
    title: "Software Development Intern",
    company: "SSBI Group of Companies",
    location: "Ahmedabad, India",
    period: "Jan 2025 - Present",
    description: "Contributing to enterprise-grade financial systems and workflow modules.",
    duties: [
      "Developed a comprehensive MSME Financial Product Management System with dynamic configuration.",
      "Architected robust data grids using TanStack Table and TanStack Query with server-side pagination.",
      "Optimized API communication layers using custom Axios interceptors and error handling middleware.",
      "Built frontend screens using React, TypeScript, and reusable shadcn/ui components.",
      "Worked on dynamic forms, approval flows, and real-time MIS reporting dashboards.",
      "Implemented role-based access control (RBAC) and maker-checker security flows."
    ]
  },
  {
    title: "Intern",
    company: "Amnex Infotechnologies Pvt. Ltd.",
    location: "Ahmedabad, Gujarat",
    period: "Jan 2025 - April 2025",
    description: "Gained exposure to professional web development workflows and project lifecycles.",
    duties: [
      "Gained exposure to Python-Django and professional backend workflows.",
      "Understood Software Development Life Cycle (SDLC) and client-based project delivery.",
      "Assisted in designing database models and handling complex API integrations.",
      "Implemented admin-user modules and frontend tools (HTML, CSS, JavaScript).",
      "Participated in professional team setups and deployment procedures.",
      "Debugged UI bugs and data-related issues in a production-like environment."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm uppercase tracking-[0.3em] text-primary font-bold mb-4">Work Experience</h2>
          <h3 className="text-4xl font-bold mb-6">Professional Internship Journey.</h3>
          <p className="text-lg text-muted-foreground">
            Practical experience gained at leading technology firms, focusing on 
            enterprise-grade software and real-world business requirements.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 md:p-12 rounded-[2.5rem] border border-border bg-background hover:border-primary/30 transition-all group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                      {exp.period}
                    </span>
                  </div>
                  <h4 className="text-3xl font-bold mb-2 group-hover:text-primary transition-colors">{exp.title}</h4>
                  <div className="flex flex-wrap items-center gap-6 text-muted-foreground font-medium">
                    <span className="flex items-center gap-1.5"><Briefcase size={16} className="text-primary" /> {exp.company}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={16} className="text-primary" /> {exp.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4">
                {exp.duties.map((duty, dIndex) => (
                  <div key={dIndex} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-primary mt-1 shrink-0" />
                    <p className="text-muted-foreground leading-relaxed text-sm">{duty}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
