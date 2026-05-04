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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-32">
          {/* UI/UX Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-black uppercase tracking-[0.4em] mb-10 shadow-sm backdrop-blur-md"
            >
              <Palette size={16} /> AESTHETIC LOGIC
            </motion.div>
            <h3 className="text-5xl md:text-8xl font-display font-black mb-12 tracking-tighter leading-[0.85]">
              CRAFTING CLEAN & <br /><span className="text-primary text-gradient">PRODUCTIVE</span> <br />INTERFACES.
            </h3>
            <div className="space-y-12">
              <div className="flex gap-8 group">
                <div className="shrink-0 w-16 h-16 rounded-2xl bg-card border border-white/5 flex items-center justify-center text-primary shadow-xl group-hover:bg-primary group-hover:text-white transition-all duration-700">
                  <Layout size={28} />
                </div>
                <div className="pt-2">
                  <h4 className="text-2xl md:text-3xl font-display font-black mb-3 tracking-tighter">MODERN DASHBOARDS</h4>
                  <p className="text-muted-foreground/80 text-lg font-medium leading-relaxed max-w-md">Premium cards, responsive tables, and timeline-based history views for tracking complex business workflows.</p>
                </div>
              </div>
              <div className="flex gap-8 group">
                <div className="shrink-0 w-16 h-16 rounded-2xl bg-card border border-white/5 flex items-center justify-center text-primary shadow-xl group-hover:bg-primary group-hover:text-white transition-all duration-700">
                  <MousePointer2 size={28} />
                </div>
                <div className="pt-2">
                  <h4 className="text-2xl md:text-3xl font-display font-black mb-3 tracking-tighter">OPTIMIZED INTERACTIONS</h4>
                  <p className="text-muted-foreground/80 text-lg font-medium leading-relaxed max-w-md">Clean dialog forms, compact filter panels, and color-coded status badges that improve user efficiency.</p>
                </div>
              </div>
              <div className="flex gap-8 group">
                <div className="shrink-0 w-16 h-16 rounded-2xl bg-card border border-white/5 flex items-center justify-center text-primary shadow-xl group-hover:bg-primary group-hover:text-white transition-all duration-700">
                  <Layers size={28} />
                </div>
                <div className="pt-2">
                  <h4 className="text-2xl md:text-3xl font-display font-black mb-3 tracking-tighter">ROLE-BASED ARCHITECTURE</h4>
                  <p className="text-muted-foreground/80 text-lg font-medium leading-relaxed max-w-md">Branch/user role specific screens designed to restrict data access while maintaining a seamless user experience.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Backend Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-accent/20 text-accent text-[11px] font-black uppercase tracking-[0.4em] mb-10 shadow-sm backdrop-blur-md"
            >
              <Terminal size={16} /> CORE INFRASTRUCTURE
            </motion.div>
            <h3 className="text-5xl md:text-8xl font-display font-black mb-12 tracking-tighter leading-[0.85]">
              SCALABLE CORE & <br /><span className="text-accent text-gradient">STRATEGIC</span> <br />DEBUGGING.
            </h3>
            <div className="grid grid-cols-1 gap-6">
              {[
                { title: "API Integration & Design", desc: "Seamlessly connecting frontends with Spring Boot/Django backends and fixing payload mismatches." },
                { title: "Database Query Optimization", desc: "Fixing slow queries and designing efficient relational schemas for financial reports." },
                { title: "Permission & RBAC Issues", desc: "Debugging complex role/permission conflicts and data restriction logic." },
                { title: "Report Generation Systems", desc: "Handling large Excel/PDF exports and ensuring data accuracy in MIS reports." },
                { title: "Deployment Operations", desc: "Experience with Docker, Nginx, and Linux server troubleshooting for production apps." },
                { title: "Real-Time Bug Resolution", desc: "Identifying and fixing production UI bugs, API errors, and data-related anomalies." }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-6 p-6 md:p-8 rounded-3xl border border-white/5 bg-card/40 backdrop-blur-3xl hover:border-accent/40 transition-all duration-500 group"
                >
                  <div className="mt-1 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-lg">
                    <Bug size={20} />
                  </div>
                  <div>
                    <h4 className="text-xl font-display font-black mb-2 tracking-tighter uppercase">{item.title}</h4>
                    <p className="text-sm md:text-base text-muted-foreground/80 font-medium">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Learning Journey / Journey Summary */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-16 md:p-24 rounded-4xl border border-white/10 bg-card/20 backdrop-blur-3xl text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 noise opacity-[0.03] pointer-events-none" />
          <div className="max-w-4xl mx-auto relative z-10">
            <h4 className="text-3xl md:text-5xl font-display font-black mb-10 italic leading-relaxed tracking-tighter">
              &quot;I focus on building <span className="text-primary">scalable</span>, user-friendly, and <span className="text-primary">production-ready</span> applications with strong attention to logic and business value.&quot;
            </h4>
            <div className="w-24 h-1 bg-primary/30 mx-auto rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
