"use client";

import { useState, useEffect } from "react";
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
  Zap,
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
    description:
      "A comprehensive management system enabling administrators to configure complex loan parameters with real-time optimistic UI updates.",
    longDescription:
      "This enterprise-grade application was built to solve the complexity of loan product configuration in the MSME sector. It allows bank administrators to define multi-tier interest rates, tenure rules, and eligibility criteria through a highly intuitive interface.",
    icon: <Database size={24} />,
    tags: ["React", "TanStack", "Axios", "Shadcn"],
    color: "bg-blue-500",
    gradient: "from-blue-500/20 to-indigo-500/20",
    details: {
      challenge:
        "Handling hundreds of interdependent loan configuration fields with real-time validation and zero latency.",
      solution:
        "Implemented a robust state management system using TanStack Query and optimistic UI updates for an 'instant' feel.",
      result:
        "Reduced configuration errors by 40% and improved admin efficiency by 2.5x compared to the legacy spreadsheet system.",
      techStack: [
        "React 18",
        "TypeScript",
        "TanStack Table",
        "Zod Validation",
        "Custom Axios Hooks",
      ],
    },
  },
  {
    id: "lms",
    title: "Banking Workflow (LMS)",
    subtitle: "Operations & Compliance",
    description:
      "A configurable workflow platform where loan applications move through dynamic stages with maker-checker security protocols.",
    longDescription:
      "The Loan Management System (LMS) is a heavy-duty workflow engine designed for high-security banking environments. It automates the progression of loan applications from intake to disbursement, ensuring compliance at every step.",
    icon: <Settings size={24} />,
    tags: ["Java", "Spring Boot", "Workflows"],
    color: "bg-emerald-500",
    gradient: "from-emerald-500/20 to-teal-500/20",
    details: {
      challenge:
        "Managing complex maker-checker permissions across 10+ stages of a loan lifecycle.",
      solution:
        "Architected a dynamic workflow engine that uses state machine logic and strict RBAC (Role-Based Access Control).",
      result:
        "Achieved 100% audit compliance and decreased application processing time from 5 days to 48 hours.",
      techStack: [
        "Java 17",
        "Spring Boot",
        "PostgreSQL",
        "Camunda Workflow",
        "REST API Architecture",
      ],
    },
  },
  {
    id: "ews",
    title: "Early Warning & Monitoring",
    subtitle: "Risk Management Dashboard",
    description:
      "A high-performance banking platform for tracking risky accounts, credit signals, and branch-level performance metrics.",
    longDescription:
      "EWS is a risk-mitigation dashboard that monitors credit health across thousands of accounts. It aggregates data from multiple sources to provide branch managers with actionable signals on potential defaults.",
    icon: <ShieldAlert size={24} />,
    tags: ["PostgreSQL", "React", "MIS Reports"],
    color: "bg-orange-500",
    gradient: "from-orange-500/20 to-amber-500/20",
    details: {
      challenge:
        "Visualizing large-scale relational data without compromising dashboard performance or clarity.",
      solution:
        "Developed custom data grid components with server-side virtualization and highly optimized SQL aggregation queries.",
      result:
        "Enabled early identification of risky assets, leading to a 15% reduction in NPA (Non-Performing Assets) for target branches.",
      techStack: [
        "React",
        "PostgreSQL",
        "Material UI",
        "Chart.js",
        "Server-Side Pagination",
      ],
    },
  },
  {
    id: "fraud",
    title: "Money Mule & Fraud Flow",
    subtitle: "Risk Resolution Module",
    description:
      "A specialized security module for managing money mule alerts, branch-level reviews, and detailed resolution history.",
    longDescription:
      "This security module focuses on identifying and resolving suspected fraudulent accounts. It provides a detailed timeline of events and requires dual-level authorization for account freezing and unfreezing.",
    icon: <Search size={24} />,
    tags: ["RBAC", "History Timeline", "Alerts"],
    color: "bg-red-500",
    gradient: "from-red-500/20 to-rose-500/20",
    details: {
      challenge:
        "Creating a transparent and unalterable audit trail for critical security decisions.",
      solution:
        "Built a timeline-based resolution module that logs every user action with encrypted metadata and immutable history logs.",
      result:
        "Streamlined the fraud investigation process, allowing security teams to resolve 30% more alerts per month.",
      techStack: [
        "React",
        "Django REST Framework",
        "PostgreSQL Audit Logs",
        "Framer Motion",
        "Shadcn UI",
      ],
    },
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Lock body scroll when case study is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  return (
    <section
      id="projects"
      className="section-padding bg-secondary/5 relative overflow-hidden"
    >
      {/* Abstract background decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full -ml-48 -mb-48" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm backdrop-blur-md"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Engineering Excellence
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-display font-black mb-6 leading-[0.9] tracking-tighter"
            >
              SELECTED <br />
              <span className="text-primary text-gradient">CASE STUDIES.</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground/90 font-medium leading-relaxed max-w-2xl"
            >
              Architecting high-performance systems for the BFSI sector, where
              <span className="text-foreground font-bold italic">
                {" "}
                absolute precision
              </span>{" "}
              is the only standard.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 1,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => setSelectedProject(project)}
              className="group relative flex flex-col h-full rounded-3xl border border-white/10 bg-card/40 backdrop-blur-3xl overflow-hidden cursor-pointer hover:border-primary/40 transition-all duration-700 shadow-xl hover:shadow-primary/20"
            >
              {/* Card Background Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-1000`}
              />

              <div className="relative p-4 md:p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6 md:mb-8">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`p-3 rounded-xl ${project.color} text-white shadow-lg group-hover:shadow-primary/40 transition-all duration-700`}
                  >
                    <div className="scale-75 md:scale-90">{project.icon}</div>
                  </motion.div>
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-md bg-secondary/80 text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] border border-white/5 backdrop-blur-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-grow">
                  <h4 className="text-[9px] md:text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 md:mb-3">
                    {project.subtitle}
                  </h4>
                  <h3 className="text-xl md:text-3xl font-display font-black mb-3 md:mb-4 tracking-tighter group-hover:text-primary transition-colors duration-500 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-[12px] md:text-sm text-muted-foreground/80 font-medium leading-relaxed mb-6 md:mb-8">
                    {project.description}
                  </p>
                </div>

                <div className="mt-auto pt-4 md:pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[10px] md:text-xs font-black text-foreground uppercase tracking-[0.3em]">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700">
                      <Code2 size={16} />
                    </div>
                    Deep Dive
                  </div>
                  <motion.div
                    whileHover={{ x: 5, scale: 1.1 }}
                    className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-foreground text-background flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-700 -rotate-45 group-hover:rotate-0 shadow-xl"
                  >
                    <ArrowUpRight className="w-6 h-6 md:w-9 md:h-9" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-15 md:mt-20 text-center">
          <button className="group relative px-10 md:px-20 py-3 md:py-3 bg-foreground text-background rounded-full font-black text-xl md:text-2xl hover:bg-primary hover:text-white transition-all duration-700 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.5)] hover:translate-y-[-8px] active:scale-95 overflow-hidden">
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-[-20deg]" />
            EXPLORE ARCHIVE
          </button>
        </div>
      </div>

      {/* Case Study Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 lg:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-background/95 backdrop-blur-[40px]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 100, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 100, rotateX: 20 }}
              className="relative w-full max-w-7xl h-full md:h-[95vh] bg-card/30 border border-white/10 rounded-4xl shadow-[0_100px_200px_-50px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col lg:flex-row perspective-1000"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 z-50 w-14 h-14 rounded-full bg-secondary/80 backdrop-blur-xl border border-white/10 hover:bg-red-500 hover:text-white transition-all duration-500 flex items-center justify-center shadow-2xl group"
              >
                <X
                  size={24}
                  className="group-hover:rotate-90 transition-transform duration-500"
                />
              </button>

               {/* Sidebar Info */}
              <div
                className={`w-full lg:w-2/5 p-8 md:p-14 bg-gradient-to-br ${selectedProject.gradient} flex flex-col relative overflow-y-auto lg:overflow-hidden`}
                data-lenis-prevent
              >
                <div className="absolute inset-0 noise opacity-[0.05] pointer-events-none" />
                <div className="relative z-10 flex flex-col h-full">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className={`w-16 h-16 md:w-24 md:h-24 rounded-2xl ${selectedProject.color} text-white flex items-center justify-center mb-8 md:mb-10 shadow-xl`}
                  >
                    {selectedProject.icon &&
                      (typeof selectedProject.icon === "object" ? (
                        <div className="scale-125">{selectedProject.icon}</div>
                      ) : (
                        selectedProject.icon
                      ))}
                  </motion.div>
                  <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-3 md:mb-4">
                    {selectedProject.subtitle}
                  </h4>
                  <h2 className="text-3xl md:text-5xl font-display font-black mb-6 md:mb-10 tracking-tighter leading-[0.95]">
                    {selectedProject.title}
                  </h2>

                  <div className="mt-auto space-y-8">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 mb-4">
                        TECHNOLOGICAL FOUNDATION
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.details.techStack.map((tech, idx) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + idx * 0.05 }}
                            className="px-4 py-2 rounded-lg bg-background/40 backdrop-blur-xl border border-white/5 text-[10px] font-black uppercase tracking-widest"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div 
                className="flex-1 p-8 md:p-16 overflow-y-auto custom-scrollbar bg-card/10 relative"
                data-lenis-prevent
              >
                <div className="max-w-4xl">
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-12 md:mb-16"
                  >
                    <h5 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6 flex items-center gap-3">
                      <Globe size={16} /> THE ARCHITECTURE
                    </h5>
                    <p className="text-xl md:text-2xl font-display font-medium leading-relaxed text-foreground/90 italic border-l-2 border-primary pl-6">
                      {selectedProject.longDescription}
                    </p>
                  </motion.section>

                  <div className="grid grid-cols-1 gap-10 md:gap-14">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-4 md:space-y-6"
                    >
                      <h5 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] flex items-center gap-3">
                        <ShieldAlert size={16} /> MISSION CRITICAL CHALLENGE
                      </h5>
                      <p className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed font-medium">
                        {selectedProject.details.challenge}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="space-y-4 md:space-y-6"
                    >
                      <h5 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] flex items-center gap-3">
                        <Cpu size={16} /> ENGINEERING STRATEGY
                      </h5>
                      <p className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed font-medium">
                        {selectedProject.details.solution}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 }}
                      className="p-8 md:p-12 rounded-[2.5rem] bg-primary/5 border border-primary/20 space-y-6 md:space-y-8 shadow-xl relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-6 text-primary opacity-20">
                        <Zap size={80} strokeWidth={1} />
                      </div>
                      <h5 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] flex items-center gap-3">
                        <Zap size={16} /> BUSINESS QUANTUM LEAP
                      </h5>
                      <p className="text-xl md:text-3xl font-display font-black text-foreground relative z-10">
                        {selectedProject.details.result}
                      </p>
                    </motion.div>
                  </div>

                  <div className="mt-16 md:mt-24 pt-8 md:pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                      <CheckCircle2 size={20} />
                      PRODUCTION GRADE VERIFIED
                    </div>
                    <button className="px-6 py-3 rounded-xl bg-secondary/50 border border-white/5 text-[9px] font-black uppercase tracking-[0.4em] hover:bg-primary hover:text-white transition-all duration-500">
                      TECHNICAL DOCUMENTATION
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
