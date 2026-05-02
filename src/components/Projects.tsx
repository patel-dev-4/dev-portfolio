"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  Settings, 
  ShieldAlert, 
  Search,
  Database,
  Code2,
  X,
  CheckCircle2,
  Cpu,
  Globe,
  Zap
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  icon: React.ReactNode;
  tags: string[];
  color: string;
  gradient: string;
  details: {
    challenge: string;
    solution: string;
    result: string;
    techStack: string[];
  };
}

const projects: Project[] = [
  {
    id: "msme",
    title: "MSME Financial Manager",
    subtitle: "Enterprise Loan Configuration",
    description: "A comprehensive management system enabling administrators to configure complex loan parameters with real-time optimistic UI updates.",
    longDescription: "This enterprise-grade application was built to solve the complexity of loan product configuration in the MSME sector. It allows bank administrators to define multi-tier interest rates, tenure rules, and eligibility criteria through a highly intuitive interface.",
    icon: <Database size={24} />,
    tags: ["React", "TanStack", "Axios", "Shadcn"],
    color: "bg-blue-500",
    gradient: "from-blue-500/20 to-indigo-500/20",
    details: {
      challenge: "Handling hundreds of interdependent loan configuration fields with real-time validation and zero latency.",
      solution: "Implemented a robust state management system using TanStack Query and optimistic UI updates for an 'instant' feel.",
      result: "Reduced configuration errors by 40% and improved admin efficiency by 2.5x compared to the legacy spreadsheet system.",
      techStack: ["React 18", "TypeScript", "TanStack Table", "Zod Validation", "Custom Axios Hooks"]
    }
  },
  {
    id: "lms",
    title: "Banking Workflow (LMS)",
    subtitle: "Operations & Compliance",
    description: "A configurable workflow platform where loan applications move through dynamic stages with maker-checker security protocols.",
    longDescription: "The Loan Management System (LMS) is a heavy-duty workflow engine designed for high-security banking environments. It automates the progression of loan applications from intake to disbursement, ensuring compliance at every step.",
    icon: <Settings size={24} />,
    tags: ["Java", "Spring Boot", "Workflows"],
    color: "bg-emerald-500",
    gradient: "from-emerald-500/20 to-teal-500/20",
    details: {
      challenge: "Managing complex maker-checker permissions across 10+ stages of a loan lifecycle.",
      solution: "Architected a dynamic workflow engine that uses state machine logic and strict RBAC (Role-Based Access Control).",
      result: "Achieved 100% audit compliance and decreased application processing time from 5 days to 48 hours.",
      techStack: ["Java 17", "Spring Boot", "PostgreSQL", "Camunda Workflow", "REST API Architecture"]
    }
  },
  {
    id: "ews",
    title: "Early Warning & Monitoring",
    subtitle: "Risk Management Dashboard",
    description: "A high-performance banking platform for tracking risky accounts, credit signals, and branch-level performance metrics.",
    longDescription: "EWS is a risk-mitigation dashboard that monitors credit health across thousands of accounts. It aggregates data from multiple sources to provide branch managers with actionable signals on potential defaults.",
    icon: <ShieldAlert size={24} />,
    tags: ["PostgreSQL", "React", "MIS Reports"],
    color: "bg-orange-500",
    gradient: "from-orange-500/20 to-amber-500/20",
    details: {
      challenge: "Visualizing large-scale relational data without compromising dashboard performance or clarity.",
      solution: "Developed custom data grid components with server-side virtualization and highly optimized SQL aggregation queries.",
      result: "Enabled early identification of risky assets, leading to a 15% reduction in NPA (Non-Performing Assets) for target branches.",
      techStack: ["React", "PostgreSQL", "Material UI", "Chart.js", "Server-Side Pagination"]
    }
  },
  {
    id: "fraud",
    title: "Money Mule & Fraud Flow",
    subtitle: "Risk Resolution Module",
    description: "A specialized security module for managing money mule alerts, branch-level reviews, and detailed resolution history.",
    longDescription: "This security module focuses on identifying and resolving suspected fraudulent accounts. It provides a detailed timeline of events and requires dual-level authorization for account freezing and unfreezing.",
    icon: <Search size={24} />,
    tags: ["RBAC", "History Timeline", "Alerts"],
    color: "bg-red-500",
    gradient: "from-red-500/20 to-rose-500/20",
    details: {
      challenge: "Creating a transparent and unalterable audit trail for critical security decisions.",
      solution: "Built a timeline-based resolution module that logs every user action with encrypted metadata and immutable history logs.",
      result: "Streamlined the fraud investigation process, allowing security teams to resolve 30% more alerts per month.",
      techStack: ["React", "Django REST Framework", "PostgreSQL Audit Logs", "Framer Motion", "Shadcn UI"]
    }
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-padding bg-secondary/10 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              Portfolio Archive
            </div>
            <h3 className="text-5xl md:text-8xl font-black mb-8 leading-[0.95] tracking-tighter">Selected <br /><span className="text-primary">Case Studies.</span></h3>
            <p className="text-xl md:text-2xl text-muted-foreground/80 font-medium leading-relaxed">
              Engineering complex systems for the BFSI sector, where security, 
              scale, and precision are the only metrics that matter.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group relative flex flex-col h-full rounded-[2rem] md:rounded-[3.5rem] border border-border bg-background overflow-hidden cursor-pointer hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-2xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="relative p-8 md:p-14 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8 md:mb-12">
                  <div className={`p-4 md:p-5 rounded-2xl ${project.color} text-white shadow-xl shadow-inherit/20 group-hover:scale-110 transition-transform duration-500`}>
                    {project.icon}
                  </div>
                  <div className="flex gap-2">
                    {project.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-3 md:px-4 py-1.5 rounded-xl bg-secondary text-[8px] md:text-[10px] font-black uppercase tracking-widest border border-border/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-grow">
                  <h4 className="text-[10px] md:text-sm font-black text-primary uppercase tracking-[0.2em] mb-2 md:mb-3">{project.subtitle}</h4>
                  <h3 className="text-2xl md:text-5xl font-black mb-4 md:mb-6 tracking-tight group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-base md:text-lg text-muted-foreground font-medium leading-relaxed mb-8 md:mb-10">
                    {project.description}
                  </p>
                </div>

                <div className="mt-auto pt-8 md:pt-10 border-t border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[10px] md:text-sm font-black text-foreground uppercase tracking-widest">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                       <Code2 size={14} />
                    </div>
                    Full Case Study
                  </div>
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-foreground text-background flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 -rotate-45 group-hover:rotate-0 shadow-lg">
                    <ArrowUpRight className="w-5 h-5 md:w-7 md:h-7" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 md:mt-32 text-center">
          <button className="px-8 md:px-12 py-5 md:py-6 bg-foreground text-background rounded-2xl md:rounded-3xl font-black text-lg md:text-xl hover:bg-primary hover:text-white transition-all shadow-2xl hover:translate-y-[-4px] w-full sm:w-auto">
            Explore All Enterprise Work
          </button>
        </div>
      </div>

      {/* Case Study Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-background/90 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-background border border-border rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 md:top-8 md:right-8 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary hover:bg-primary hover:text-white transition-all flex items-center justify-center shadow-lg"
              >
                <X size={20} />
              </button>

              {/* Sidebar Info */}
              <div className={`w-full md:w-1/3 p-8 md:p-16 bg-gradient-to-br ${selectedProject.gradient} flex flex-col`}>
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl ${selectedProject.color} text-white flex items-center justify-center mb-6 md:mb-10 shadow-2xl shadow-inherit/40`}>
                  {selectedProject.icon}
                </div>
                <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 md:mb-4">{selectedProject.subtitle}</h4>
                <h2 className="text-3xl md:text-5xl font-black mb-6 md:mb-10 tracking-tight leading-tight">{selectedProject.title}</h2>
                
                <div className="hidden md:block mt-auto space-y-6">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">Core Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.details.techStack.map(tech => (
                        <span key={tech} className="px-3 py-1.5 rounded-lg bg-background/50 backdrop-blur-md border border-border/50 text-[10px] font-bold uppercase tracking-wider">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-8 md:p-20 overflow-y-auto custom-scrollbar">
                <div className="max-w-3xl">
                  <section className="mb-10 md:mb-16">
                    <h5 className="text-primary font-black uppercase tracking-[0.2em] text-[10px] md:text-xs mb-4 md:mb-6 flex items-center gap-2">
                      <Globe size={14} /> Project Overview
                    </h5>
                    <p className="text-xl md:text-2xl font-medium leading-relaxed text-foreground/90 italic">
                      {selectedProject.longDescription}
                    </p>
                  </section>

                  <div className="grid grid-cols-1 gap-8 md:gap-12">
                    <div className="space-y-4 md:space-y-6">
                      <h5 className="text-primary font-black uppercase tracking-[0.2em] text-[10px] md:text-xs flex items-center gap-2">
                        <ShieldAlert size={14} /> The Challenge
                      </h5>
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-medium">
                        {selectedProject.details.challenge}
                      </p>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                      <h5 className="text-primary font-black uppercase tracking-[0.2em] text-[10px] md:text-xs flex items-center gap-2">
                        <Cpu size={14} /> The Solution
                      </h5>
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-medium">
                        {selectedProject.details.solution}
                      </p>
                    </div>

                    <div className="p-6 md:p-10 rounded-2xl md:rounded-3xl bg-primary/5 border border-primary/10 space-y-4 md:space-y-6">
                      <h5 className="text-primary font-black uppercase tracking-[0.2em] text-[10px] md:text-xs flex items-center gap-2">
                        <Zap size={14} /> Key Impact
                      </h5>
                      <p className="text-lg md:text-xl font-black text-foreground">
                        {selectedProject.details.result}
                      </p>
                    </div>
                  </div>

                  <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]">
                      <CheckCircle2 size={16} className="text-primary" />
                      Production Verified
                    </div>
                    <button className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:underline">
                      View Technical Specs
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
