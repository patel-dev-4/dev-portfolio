"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, Download, Phone, MapPin, Sparkles, ArrowUpRight } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(formState),
        headers: { "Content-Type": "application/json" },
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setStatus("success");
        setFormState({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(json.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={18} />,
      label: "Email",
      value: "pateldev6622@gmail.com",
      href: "mailto:pateldev6622@gmail.com",
    },
    {
      icon: <Linkedin size={18} />,
      label: "LinkedIn",
      value: "dev-patel-n",
      href: "https://www.linkedin.com/in/dev-patel-n/",
    },
    {
      icon: <Github size={18} />,
      label: "GitHub",
      value: "dev-patel-n",
      href: "https://github.com/patel-dev-4",
    },
    {
      icon: <Phone size={18} />,
      label: "Phone",
      value: "+91 82006 99887",
      href: "tel:+918200699887",
    },
  ];

  return (
    <section id="contact" className="section-padding bg-background relative overflow-hidden">
      {/* Background Architectural Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[160px] rounded-full -mr-400 -mt-400 opacity-40" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 blur-[140px] rounded-full -ml-300 -mb-300 opacity-30" />
      <div className="absolute inset-0 noise opacity-[0.02] pointer-events-none" />

      <div className="container mx-auto relative z-10 px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-[8px] font-black uppercase tracking-[0.4em] shadow-sm backdrop-blur-md"
              >
                Connectivity
              </motion.div>
              <div className="h-[1px] flex-grow bg-gradient-to-r from-primary/20 to-transparent" />
            </div>

            <h3 className="text-3xl md:text-5xl font-display font-black mb-6 md:mb-8 leading-[0.9] tracking-tighter">
              INITIATE <br />
              <span className="text-primary text-gradient">DIALOGUE.</span>
            </h3>
            
            <p className="text-sm md:text-lg text-muted-foreground/80 font-medium max-w-md mb-8 md:mb-12 leading-relaxed">
              Available for <span className="text-foreground font-black italic">strategic engineering</span> collaborations and high-stakes system architecture projects.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-10">
              {contactInfo.map((info, index) => (
                <motion.a 
                  key={index}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-card/40 border border-white/5 backdrop-blur-3xl hover:border-primary/40 transition-all duration-500 shadow-xl overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="w-9 h-9 rounded-lg bg-secondary/80 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg relative z-10">
                    {info.icon}
                  </div>
                  <div className="relative z-10 flex-1 min-w-0">
                    <p className="text-[7px] font-black uppercase tracking-[0.2em] opacity-30 mb-0.5">{info.label}</p>
                    <p className="text-[13px] font-display font-black truncate tracking-tighter group-hover:text-primary transition-colors">{info.value}</p>
                  </div>
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.a>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-6 md:gap-8 pt-6 border-t border-white/5">
              <div className="flex items-center gap-2.5 text-primary font-black uppercase tracking-[0.3em] text-[9px]">
                <MapPin size={14} className="animate-bounce" />
                Ahmedabad, India
              </div>
              <a href="/resume.pdf" target="_blank" className="flex items-center gap-2.5 font-black uppercase tracking-[0.3em] text-[9px] hover:text-primary transition-all group">
                <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
                Technical Resume
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-12 lg:mt-0"
          >
            {/* Ambient Form Glow */}
            <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full opacity-50 pointer-events-none" />
            
            <div className="p-6 md:p-10 rounded-3xl bg-card/60 backdrop-blur-4xl border-2 border-primary/20 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.5)] relative z-10 overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-[0.08] pointer-events-none">
                <Sparkles className="w-32 h-32 md:w-48 md:h-48 text-primary" />
              </div>

              {status === "success" ? (
                <div className="py-12 md:py-16 flex flex-col items-center text-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-6 shadow-2xl shadow-primary/20"
                  >
                    <Send className="w-8 h-8 md:w-10 md:h-10" />
                  </motion.div>
                  <h4 className="text-2xl md:text-4xl font-display font-black mb-3 tracking-tighter">SUCCESS.</h4>
                  <p className="text-muted-foreground/80 font-medium mb-8 text-sm md:text-base max-w-xs">The transmission was successful. Expect a response shortly.</p>
                  <button 
                    onClick={() => setStatus("idle")}
                    className="px-8 py-3 bg-secondary/80 rounded-xl font-black uppercase tracking-[0.2em] text-[9px] hover:bg-primary hover:text-white transition-all shadow-xl active:scale-[0.98]"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/80 ml-1">Identity</label>
                      <input 
                        required
                        type="text" 
                        placeholder="NAME"
                        className="w-full px-5 py-3.5 rounded-xl bg-background/90 border-2 border-black/20 focus:border-primary/60 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-display font-black text-[15px] tracking-tighter uppercase placeholder:opacity-30 text-foreground"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                        disabled={status === "loading"}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/80 ml-1">Terminal</label>
                      <input 
                        required
                        type="email" 
                        placeholder="EMAIL@DOMAIN.COM"
                        className="w-full px-5 py-3.5 rounded-xl bg-background/90 border-2 border-black/20 focus:border-primary/60 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-display font-black text-[15px] tracking-tighter uppercase placeholder:opacity-30 text-foreground"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                        disabled={status === "loading"}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/80 ml-1">Brief</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="MESSAGE..."
                      className="w-full px-5 py-3.5 rounded-xl bg-background/90 border-2 border-black/20 focus:border-primary/60 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-display font-black text-[15px] tracking-tighter uppercase placeholder:opacity-30 text-foreground resize-none"
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      disabled={status === "loading"}
                    />
                  </div>
                  <button 
                    disabled={status === "loading"}
                    type="submit"
                    className="group relative w-full py-5 md:py-3 bg-foreground text-background rounded-xl font-black text-base tracking-[0.4em] uppercase flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all duration-700 shadow-2xl active:scale-[0.98] disabled:opacity-70 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-[-20deg]" />
                    {status === "loading" ? "TRANSMITTING..." : <>ESTABLISH CONTACT <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>}
                  </button>
                  {status === "error" && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-500 text-[8px] text-center font-black uppercase tracking-widest mt-2"
                    >
                      {errorMsg}
                    </motion.p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
