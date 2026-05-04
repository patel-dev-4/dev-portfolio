"use client";

import { motion } from "framer-motion";
import { 
  Palette, 
  MousePointer2, 
  Bug,
  Terminal,
  Layers,
  Layout
} from "lucide-react";

export default function TechnicalWork() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-primary/5 blur-[160px] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[140px] rounded-full translate-x-1/4 translate-y-1/4 opacity-20" />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
          {/* UI/UX Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-[0.4em] mb-6 md:mb-8 shadow-sm backdrop-blur-md"
            >
              <Palette size={14} /> AESTHETIC LOGIC
            </motion.div>
            <h3 className="text-2xl md:text-5xl font-display font-black mb-8 tracking-tighter leading-[0.9]">
              CRAFTING CLEAN & <br /><span className="text-primary text-gradient">PRODUCTIVE</span> <br />INTERFACES.
            </h3>
            <div className="space-y-6 md:space-y-8">
              <div className="flex gap-6 group">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-card border border-white/5 flex items-center justify-center text-primary shadow-lg group-hover:bg-primary group-hover:text-white transition-all duration-700">
                  <Layout size={20} />
                </div>
                <div className="pt-1">
                  <h4 className="text-lg md:text-xl font-display font-black mb-1.5 tracking-tighter">MODERN DASHBOARDS</h4>
                  <p className="text-muted-foreground/80 text-[13px] md:text-sm font-medium leading-relaxed max-w-sm">Premium cards, responsive tables, and timeline-based history views for tracking complex business workflows.</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-card border border-white/5 flex items-center justify-center text-primary shadow-lg group-hover:bg-primary group-hover:text-white transition-all duration-700">
                  <MousePointer2 size={20} />
                </div>
                <div className="pt-1">
                  <h4 className="text-lg md:text-xl font-display font-black mb-1.5 tracking-tighter">OPTIMIZED INTERACTIONS</h4>
                  <p className="text-muted-foreground/80 text-[13px] md:text-sm font-medium leading-relaxed max-w-sm">Clean dialog forms, compact filter panels, and color-coded status badges that improve user efficiency.</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-card border border-white/5 flex items-center justify-center text-primary shadow-lg group-hover:bg-primary group-hover:text-white transition-all duration-700">
                  <Layers size={20} />
                </div>
                <div className="pt-1">
                  <h4 className="text-lg md:text-xl font-display font-black mb-1.5 tracking-tighter">ROLE-BASED ARCHITECTURE</h4>
                  <p className="text-muted-foreground/80 text-[13px] md:text-sm font-medium leading-relaxed max-w-sm">Branch/user role specific screens designed to restrict data access while maintaining a seamless user experience.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Backend Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-accent/20 text-accent text-[9px] font-black uppercase tracking-[0.4em] mb-6 md:mb-8 shadow-sm backdrop-blur-md"
            >
              <Terminal size={14} /> CORE INFRASTRUCTURE
            </motion.div>
            <h3 className="text-2xl md:text-5xl font-display font-black mb-8 tracking-tighter leading-[0.9]">
              SCALABLE CORE & <br /><span className="text-accent text-gradient">STRATEGIC</span> <br />DEBUGGING.
            </h3>
            <div className="grid grid-cols-1 gap-3 md:gap-4">
              {[
                { title: "API Integration & Design", desc: "Seamlessly connecting frontends with Spring Boot backends and fixing payload mismatches." },
                { title: "Query Optimization", desc: "Fixing slow queries and designing efficient relational schemas for financial reports." },
                { title: "Permission & RBAC", desc: "Debugging complex role/permission conflicts and data restriction logic." },
                { title: "MIS Report Systems", desc: "Handling large Excel/PDF exports and ensuring data accuracy in MIS reports." },
                { title: "Deployment Ops", desc: "Experience with Docker, Nginx, and Linux server troubleshooting for production." },
                { title: "Bug Resolution", desc: "Identifying and fixing production UI bugs, API errors, and data-related anomalies." }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-4 p-4 md:p-5 rounded-2xl border border-white/5 bg-card/40 backdrop-blur-3xl hover:border-accent/40 transition-all duration-500 group shadow-lg"
                >
                  <div className="mt-1 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-md">
                    <Bug size={16} />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-display font-black mb-1 tracking-tighter uppercase">{item.title}</h4>
                    <p className="text-[12px] text-muted-foreground/80 font-medium leading-snug">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Learning Journey Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 p-8 md:p-14 rounded-3xl border border-white/10 bg-card/20 backdrop-blur-3xl text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 noise opacity-[0.03] pointer-events-none" />
          <div className="max-w-3xl mx-auto relative z-10">
            <h4 className="text-xl md:text-3xl font-display font-black mb-6 italic leading-relaxed tracking-tighter">
              &quot;I focus on building <span className="text-primary">scalable</span>, user-friendly, and <span className="text-primary">production-ready</span> applications with strong attention to logic and business value.&quot;
            </h4>
            <div className="w-16 h-1 bg-primary/30 mx-auto rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
