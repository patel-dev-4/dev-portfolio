"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, CheckCircle2, Star, Rocket, Trophy } from "lucide-react";

const experiences = [
  {
    title: "Software Developer",
    company: "Zonewaves Information Technology",
    location: "Ahmedabad, India",
    period: "Nov 2025 - Present",
    isPromoted: true,
    icon: <Trophy className="w-4 h-4" />,
    description: "Rapidly transitioned from intern to lead contributor for high-stakes enterprise financial systems.",
    duties: [
      "Architected MSME Financial Product Management System with full dynamic configuration.",
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
    period: "Jan 2025 - Nov 2025",
    icon: <Star className="w-4 h-4" />,
    description: "Intensive internship focused on learning enterprise patterns and contributing to the core banking platform.",
    duties: [
      "Developed MSME Financial Product Management System with dynamic configuration.",
      "Architected data grids using TanStack Table & Query with server-side pagination.",
      "Optimized API layers using custom Axios interceptors & error middleware.",
      "Built high-fidelity screens using React, TypeScript, and shadcn/ui.",
      "Worked on dynamic forms, approval flows, and real-time MIS dashboards.",
      "Implemented role-based access control (RBAC) and maker-checker security."
    ]
  },
  {
    title: "Intern",
    company: "Amnex Infotechnologies Pvt. Ltd.",
    location: "Ahmedabad, Gujarat",
    period: "Jan 2025 - April 2025",
    icon: <Rocket className="w-4 h-4" />,
    description: "Gained foundational experience in Python-Django and professional software engineering practices.",
    duties: [
      "Mastered Python-Django patterns and professional backend workflows.",
      "Understood SDLC and client-based project delivery in an agile setup.",
      "Assisted in database modeling and complex enterprise API integrations.",
      "Implemented admin-user modules and frontend tools (HTML, JS, CSS).",
      "Participated in professional team deployments and code reviews.",
      "Debugged production-level UI issues in an agile team environment."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-10 md:py-16 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mb-8 md:mb-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-[0.3em] mb-4"
          >
            Chronicle
          </motion.div>
          <h2 className="text-2xl md:text-4xl font-display font-black mb-2 tracking-tighter leading-none">
            THE CAREER <br /><span className="text-primary text-gradient">TRAJECTORY.</span>
          </h2>
          <p className="text-[13px] md:text-sm text-muted-foreground/80 font-medium max-w-xl leading-relaxed">
            A record of growth and engineering contributions within the enterprise software ecosystem.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-5 md:p-8 rounded-2xl border border-white/5 bg-card/20 backdrop-blur-3xl hover:border-primary/30 transition-all group overflow-hidden shadow-xl"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -translate-y-12 translate-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest border border-primary/20">
                      {exp.period}
                    </span>
                    {exp.isPromoted && (
                      <span className="px-2 py-0.5 rounded-md bg-accent/20 text-accent text-[8px] font-black uppercase tracking-widest border border-accent/30 animate-pulse">
                        PROMOTION
                      </span>
                    )}
                  </div>
                  <h4 className="text-xl md:text-2xl font-display font-black mb-1 group-hover:text-primary transition-colors leading-none tracking-tighter">
                    {exp.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-muted-foreground/60 font-black text-[9px] uppercase tracking-[0.2em]">
                    <span className="flex items-center gap-1.5 text-foreground/80"><Briefcase size={12} className="text-primary" /> {exp.company}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={12} className="text-primary" /> {exp.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                {exp.duties.map((duty, dIndex) => (
                  <div key={dIndex} className="flex items-start gap-2.5 group/item">
                    <CheckCircle2 size={12} className="text-primary/60 mt-0.5 shrink-0 group-hover/item:text-primary transition-colors" />
                    <p className="text-muted-foreground/80 leading-relaxed text-[12px] font-medium group-hover/item:text-foreground transition-colors line-clamp-1 group-hover/item:line-clamp-none">{duty}</p>
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
