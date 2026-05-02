"use client";

import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  Settings, 
  ShieldAlert, 
  LayoutDashboard, 
  Search,
  ChevronRight,
  Database,
  ExternalLink,
  Code2
} from "lucide-react";

const projects = [
  {
    id: "msme",
    title: "MSME Financial Manager",
    subtitle: "Enterprise Loan Configuration",
    description: "A comprehensive management system enabling administrators to configure complex loan parameters with real-time optimistic UI updates.",
    icon: <Database size={24} />,
    tags: ["React", "TanStack", "Axios", "Shadcn"],
    color: "bg-blue-500",
    gradient: "from-blue-500/20 to-indigo-500/20"
  },
  {
    id: "lms",
    title: "Banking Workflow (LMS)",
    subtitle: "Operations & Compliance",
    description: "A configurable workflow platform where loan applications move through dynamic stages with maker-checker security protocols.",
    icon: <Settings size={24} />,
    tags: ["Java", "Spring Boot", "Workflows"],
    color: "bg-emerald-500",
    gradient: "from-emerald-500/20 to-teal-500/20"
  },
  {
    id: "ews",
    title: "Early Warning & Monitoring",
    subtitle: "Risk Management Dashboard",
    description: "A high-performance banking platform for tracking risky accounts, credit signals, and branch-level performance metrics.",
    icon: <ShieldAlert size={24} />,
    tags: ["PostgreSQL", "React", "MIS Reports"],
    color: "bg-orange-500",
    gradient: "from-orange-500/20 to-amber-500/20"
  },
  {
    id: "fraud",
    title: "Money Mule & Fraud Flow",
    subtitle: "Risk Resolution Module",
    description: "A specialized security module for managing money mule alerts, branch-level reviews, and detailed resolution history.",
    icon: <Search size={24} />,
    tags: ["RBAC", "History Timeline", "Alerts"],
    color: "bg-red-500",
    gradient: "from-red-500/20 to-rose-500/20"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-secondary/10 relative">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              Selected Works
            </div>
            <h3 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter">Case Studies.</h3>
            <p className="text-xl md:text-2xl text-muted-foreground/80 font-medium leading-relaxed">
              A deep dive into the complex enterprise systems I&apos;ve architected, 
              balancing technical complexity with exceptional usability.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative flex flex-col h-full rounded-[3.5rem] border border-border bg-background overflow-hidden hover-lift"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="relative p-10 md:p-14 flex flex-col h-full">
                <div className="flex items-center justify-between mb-12">
                  <div className={`p-5 rounded-2xl ${project.color} text-white shadow-xl shadow-inherit/20`}>
                    {project.icon}
                  </div>
                  <div className="flex gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-4 py-1.5 rounded-xl bg-secondary text-[10px] font-black uppercase tracking-widest border border-border/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-grow">
                  <h4 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-3">{project.subtitle}</h4>
                  <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">{project.title}</h3>
                  <p className="text-lg text-muted-foreground font-medium leading-relaxed mb-8">
                    {project.description}
                  </p>
                </div>

                <div className="mt-auto pt-8 border-t border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-black text-foreground">
                    <Code2 size={16} className="text-primary" />
                    Case Study Ready
                  </div>
                  <button className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 -rotate-45 group-hover:rotate-0">
                    <ArrowUpRight size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <button className="px-10 py-5 bg-background border-2 border-border/50 rounded-2xl font-black text-lg hover:bg-secondary hover:border-primary/20 transition-all shadow-xl">
            Browse All Archive
          </button>
        </div>
      </div>
    </section>
  );
}
