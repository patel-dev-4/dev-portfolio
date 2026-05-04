"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, Download, Phone, MapPin, Sparkles, ExternalLink } from "lucide-react";
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
      icon: <Mail size={20} />, 
      label: "Email", 
      value: "pateldev6622@gmail.com", 
      href: "mailto:pateldev6622@gmail.com",
      description: "Direct correspondence"
    },
    { 
      icon: <Linkedin size={20} />, 
      label: "LinkedIn", 
      value: "dev-patel-n", 
      href: "https://www.linkedin.com/in/dev-patel-n/",
      description: "Professional network"
    },
    { 
      icon: <Github size={20} />, 
      label: "GitHub", 
      value: "dev-patel-n", 
      href: "https://github.com/dev-patel-n",
      description: "Source code"
    },
    { 
      icon: <Phone size={20} />, 
      label: "Phone", 
      value: "+91 82006 99887", 
      href: "tel:+918200699887",
      description: "Direct line"
    },
  ];

  return (
    <section id="contact" className="section-padding bg-background relative overflow-hidden">
      {/* Background Architectural Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[160px] rounded-full -mr-400 -mt-400" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 blur-[140px] rounded-full -ml-300 -mb-300" />
      <div className="absolute inset-0 noise opacity-[0.02] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-8 md:mb-10 shadow-sm backdrop-blur-md"
            >
              Connectivity
            </motion.div>
            <h3 className="text-5xl md:text-9xl font-display font-black mb-8 md:mb-12 leading-[0.85] tracking-tighter">
              INITIATE <br />
              <span className="text-primary text-gradient">DIALOGUE.</span>
            </h3>
            <p className="text-lg md:text-3xl text-muted-foreground/80 font-medium leading-relaxed mb-12 md:mb-20 max-w-xl">
              Engineering high-stakes fintech solutions. <br className="hidden md:block" />
              <span className="text-foreground font-black italic">Available for global ventures.</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {contactInfo.map((info, index) => (
                <motion.a 
                  key={index}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group flex items-center gap-5 p-6 rounded-3xl bg-card/40 border border-white/5 backdrop-blur-3xl hover:border-primary/40 transition-all duration-500 shadow-xl overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="w-12 h-12 rounded-2xl bg-secondary/80 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg relative z-10">
                    {info.icon}
                  </div>
                  <div className="relative z-10 flex-1 min-w-0">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 mb-1">{info.label}</p>
                    <p className="text-sm font-display font-black truncate tracking-tighter group-hover:text-primary transition-colors">{info.value}</p>
                  </div>
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-40 transition-opacity" />
                </motion.a>
              ))}
            </div>

            <div className="mt-12 md:mt-20 flex flex-wrap items-center gap-8 md:gap-12">
              <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                <MapPin size={16} />
                Ahmedabad, India
              </div>
              <a href="/resume.pdf" target="_blank" className="flex items-center gap-3 font-black uppercase tracking-[0.2em] text-[10px] hover:text-primary transition-all group">
                <Download size={16} className="group-hover:translate-y-1 transition-transform" />
                Engineering Resume
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-12 lg:mt-0"
          >
            <div className="p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] bg-card/20 backdrop-blur-4xl border border-white/10 shadow-3xl relative z-10 overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Sparkles className="w-32 h-32 md:w-64 md:h-64" />
              </div>

              {status === "success" ? (
                <div className="py-16 md:py-24 flex flex-col items-center text-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-8 shadow-2xl shadow-primary/20"
                  >
                    <Send className="w-10 h-10 md:w-14 md:h-14" />
                  </motion.div>
                  <h4 className="text-3xl md:text-5xl font-display font-black mb-4 tracking-tighter">SUCCESS.</h4>
                  <p className="text-muted-foreground/80 font-medium mb-10 text-base md:text-lg max-w-xs">The transmission was successful. I will respond shortly.</p>
                  <button 
                    onClick={() => setStatus("idle")}
                    className="px-10 py-4 bg-secondary/80 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary hover:text-white transition-all shadow-xl"
                  >
                    New Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 ml-2">Your Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="DEV"
                        className="w-full px-6 py-4 rounded-2xl bg-background/20 border border-white/5 focus:border-primary/40 focus:bg-background/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all font-display font-black text-lg tracking-tighter uppercase placeholder:opacity-20"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                        disabled={status === "loading"}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 ml-2">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="SECURE@MAIL.COM"
                        className="w-full px-6 py-4 rounded-2xl bg-background/20 border border-white/5 focus:border-primary/40 focus:bg-background/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all font-display font-black text-lg tracking-tighter uppercase placeholder:opacity-20"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                        disabled={status === "loading"}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 ml-2">Message</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="YOUR BRIEF..."
                      className="w-full px-6 py-4 rounded-2xl bg-background/20 border border-white/5 focus:border-primary/40 focus:bg-background/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all font-display font-black text-lg tracking-tighter uppercase placeholder:opacity-20 resize-none"
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      disabled={status === "loading"}
                    />
                  </div>
                  <button 
                    disabled={status === "loading"}
                    type="submit"
                    className="group relative w-full py-6 md:py-8 bg-foreground text-background rounded-2xl font-black text-lg tracking-[0.3em] uppercase flex items-center justify-center gap-4 hover:bg-primary hover:text-white transition-all duration-700 shadow-2xl active:scale-[0.98] disabled:opacity-70 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-[-20deg]" />
                    {status === "loading" ? "TRANSMITTING..." : <>ESTABLISH CONTACT <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>}
                  </button>
                  {status === "error" && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-500 text-[10px] text-center font-black uppercase tracking-widest"
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
