"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Star, Rocket, Trophy } from "lucide-react";

const experiences = [
  {
    title: "Jr. Software Developer",
    company: "SSBI Group of Companies",
    location: "Ahmedabad, India",
    period: "December 2025 - Present",
    type: "Full-time Promotion",
    isPromoted: true,
    icon: <Trophy className="w-5 h-5" />,
    description: "Promoted to Junior Software Developer following a high-impact internship. Now spearheading the architecture of mission-critical banking modules.",
    duties: [
      "Architected the MSME Financial Product Management System with full dynamic configuration.",
      "Engineered high-performance data grids for complex financial monitoring.",
      "Developed secure API middleware and comprehensive error handling protocols.",
      "Leading frontend architecture using React, TypeScript, and premium UI components.",
      "Building real-time MIS reporting dashboards for branch-level performance tracking."
    ]
  },
  {
    title: "Software Development Intern",
    company: "SSBI Group of Companies",
    location: "Ahmedabad, India",
    period: "May 2025 - November 2025",
    type: "Internship",
    icon: <Star className="w-5 h-5" />,
    description: "Intensive internship focused on learning enterprise patterns and contributing to the core banking platform.",
    duties: [
      "Assisted in developing dynamic forms and approval workflow modules.",
      "Learned and implemented role-based access control (RBAC) security layers.",
      "Optimized data fetching patterns using TanStack Query.",
      "Participated in daily stand-ups and professional code review cycles."
    ]
  },
  {
    title: "Software Development Intern",
    company: "Amnex Infotechnologies Pvt. Ltd.",
    location: "Ahmedabad, Gujarat",
    period: "Jan 2025 - April 2025",
    type: "Internship",
    icon: <Rocket className="w-5 h-5" />,
    description: "Gained foundational experience in Python-Django and professional software engineering practices.",
    duties: [
      "Mastered backend workflows and database modeling with Django.",
      "Contributed to client-facing web application development.",
      "Collaborated on API integrations and administrative dashboard tools.",
      "Debugged production-level UI issues in an agile team environment."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="section-padding relative overflow-hidden bg-secondary/5">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />
      
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            Professional Timeline
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">Career Journey.</h2>
          <p className="text-xl md:text-2xl text-muted-foreground/80 font-medium mb-24 max-w-2xl leading-relaxed">
            A visual roadmap of my growth, from foundational internships to 
            architecting enterprise-grade financial systems.
          </p>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-border to-transparent -translate-x-1/2 hidden md:block" />

            <div className="space-y-24">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot/Icon */}
                  <div className="absolute left-0 md:left-1/2 top-0 w-12 h-12 rounded-2xl bg-background border-2 border-primary/30 flex items-center justify-center text-primary shadow-xl shadow-primary/10 -translate-x-1/2 z-20 transition-transform group-hover:scale-110">
                    {exp.icon}
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-[45%] ${index % 2 === 0 ? "md:pl-0" : "md:pr-0"}`}>
                    <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border border-border/50 hover:border-primary/30 transition-all group relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                      
                      <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                          {exp.period}
                        </span>
                        {exp.isPromoted && (
                          <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest border border-accent/20 animate-pulse">
                            Promotion
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl md:text-3xl font-black mb-2 tracking-tight group-hover:text-primary transition-colors">
                        {exp.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-muted-foreground font-bold text-xs mb-6">
                        <span className="flex items-center gap-1.5"><Briefcase size={14} className="text-primary" /> {exp.company}</span>
                        <span className="flex items-center gap-1.5"><MapPin size={14} className="text-primary" /> {exp.location}</span>
                      </div>

                      <p className="text-muted-foreground/90 font-medium leading-relaxed mb-8 text-sm italic">
                        &quot;{exp.description}&quot;
                      </p>

                      <div className="space-y-4">
                        {exp.duties.map((duty, dIndex) => (
                          <div key={dIndex} className="flex items-start gap-3">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            <p className="text-muted-foreground font-bold leading-relaxed text-xs">{duty}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for Desktop Timeline */}
                  <div className="hidden md:block w-[10%]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
