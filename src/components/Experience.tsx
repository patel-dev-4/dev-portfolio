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
    <section id="experience" className="section-padding bg-background relative overflow-hidden">
      {/* Background ambient elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[140px] rounded-full -mr-300 -mt-300" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full -ml-200 -mb-200" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-black uppercase tracking-[0.4em] mb-10 shadow-sm backdrop-blur-md"
          >
            Chronicle
          </motion.div>
          <h2 className="text-6xl md:text-9xl font-display font-black mb-12 tracking-tighter leading-[0.85]">
            THE CAREER <br /><span className="text-primary text-gradient">TRAJECTORY.</span>
          </h2>
          <p className="text-xl md:text-3xl text-muted-foreground/80 font-medium mb-16 md:mb-32 max-w-3xl leading-relaxed">
            A precise record of growth and engineering contributions within the 
            enterprise software ecosystem.
          </p>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-[50%] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/80 via-white/5 to-transparent -translate-x-1/2 hidden md:block" />

            <div className="space-y-20 md:space-y-40">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex flex-col md:flex-row gap-12 md:gap-0 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot/Icon */}
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.8 }}
                    className="absolute left-0 md:left-1/2 top-0 w-16 h-16 rounded-3xl bg-card border-2 border-primary/40 flex items-center justify-center text-primary shadow-[0_20px_40px_-10px_rgba(var(--primary),0.3)] -translate-x-1/2 z-20 backdrop-blur-3xl"
                  >
                    <div className="scale-125">{exp.icon}</div>
                  </motion.div>

                  {/* Content Card */}
                  <div className={`w-full md:w-[45%] ${index % 2 === 0 ? "md:pl-0" : "md:pr-0"}`}>
                    <div className="p-10 md:p-16 rounded-4xl border border-white/10 bg-card/30 backdrop-blur-4xl hover:border-primary/40 transition-all duration-700 group relative overflow-hidden shadow-2xl">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      <div className="flex flex-wrap items-center gap-4 mb-10">
                        <span className="px-5 py-2 rounded-xl bg-primary/10 text-primary text-[11px] font-black uppercase tracking-[0.3em] border border-primary/20 shadow-lg">
                          {exp.period}
                        </span>
                        {exp.isPromoted && (
                          <span className="px-5 py-2 rounded-xl bg-accent/20 text-accent text-[11px] font-black uppercase tracking-[0.3em] border border-accent/30 animate-pulse shadow-lg shadow-accent/10">
                            PROMOTION
                          </span>
                        )}
                      </div>

                      <h3 className="text-3xl md:text-5xl font-display font-black mb-4 tracking-tighter group-hover:text-primary transition-colors duration-500 leading-none">
                        {exp.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-6 text-muted-foreground/60 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] mb-10">
                        <span className="flex items-center gap-2 text-foreground"><Briefcase size={16} className="text-primary" /> {exp.company}</span>
                        <span className="flex items-center gap-2"><MapPin size={16} className="text-primary" /> {exp.location}</span>
                      </div>

                      <p className="text-xl md:text-2xl text-muted-foreground/90 font-medium leading-relaxed mb-12 italic border-l-2 border-white/10 pl-8">
                        {exp.description}
                      </p>

                      <div className="space-y-6 md:space-y-8">
                        {exp.duties.map((duty, dIndex) => (
                          <motion.div 
                            key={dIndex} 
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + dIndex * 0.1 }}
                            className="flex items-start gap-5"
                          >
                            <div className="mt-2.5 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)] shrink-0" />
                            <p className="text-muted-foreground/80 font-medium leading-relaxed text-sm md:text-base">{duty}</p>
                          </motion.div>
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
