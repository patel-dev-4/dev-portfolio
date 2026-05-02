"use client";

import { motion } from "framer-motion";
import { 
  Palette, 
  MousePointer2, 
  Search, 
  Database,
  CheckCircle2,
  Bug,
  Zap,
  Terminal,
  Layers,
  Layout
} from "lucide-react";

export default function TechnicalWork() {
  return (
    <section className="section-padding bg-zinc-950 text-white overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* UI/UX Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary-foreground text-xs font-bold uppercase tracking-wider mb-6">
              <Palette size={14} /> UI/UX Work
            </div>
            <h3 className="text-4xl font-bold mb-8">Crafting Clean & <br />Productive Interfaces</h3>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-primary">
                  <Layout size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Modern Dashboards</h4>
                  <p className="text-zinc-400">Premium cards, responsive tables, and timeline-based history views for tracking complex business workflows.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-primary">
                  <MousePointer2 size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Optimized Interactions</h4>
                  <p className="text-zinc-400">Clean dialog forms, compact filter panels, and color-coded status badges that improve user efficiency.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-primary">
                  <Layers size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Role-Based Views</h4>
                  <p className="text-zinc-400">Branch/user role specific screens designed to restrict data access while maintaining a seamless user experience.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Backend Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-xs font-bold uppercase tracking-wider mb-6">
              <Terminal size={14} /> Backend & Problem Solving
            </div>
            <h3 className="text-4xl font-bold mb-8">Scalable Core & <br />Strategic Debugging</h3>
            <div className="space-y-6">
              {[
                { title: "API Integration & Design", desc: "Seamlessly connecting frontends with Spring Boot/Django backends and fixing payload mismatches." },
                { title: "Database Query Optimization", desc: "Fixing slow queries and designing efficient relational schemas for financial reports." },
                { title: "Permission & RBAC Issues", desc: "Debugging complex role/permission conflicts and data restriction logic." },
                { title: "Report Generation Optimization", desc: "Handling large Excel/PDF exports and ensuring data accuracy in MIS reports." },
                { title: "Deployment Support", desc: "Experience with Docker, Nginx, and Linux server troubleshooting for production apps." },
                { title: "Real-Time Bug Resolution", desc: "Identifying and fixing production UI bugs, API errors, and data-related anomalies." }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-zinc-900 transition-colors group">
                  <Bug size={18} className="mt-1 text-accent group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-sm text-zinc-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Learning Journey / Journey Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-12 rounded-[3rem] bg-zinc-900/50 border border-zinc-800 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h4 className="text-2xl font-bold mb-6 italic">&quot;I focus on building scalable, user-friendly, and production-ready applications with strong attention to UI/UX, validation, role-based access, and business logic.&quot;</h4>
            <p className="text-zinc-500 uppercase tracking-widest text-sm font-bold">— Resume Summary</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
