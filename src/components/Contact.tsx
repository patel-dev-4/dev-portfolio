"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, Download, Phone, MapPin, Sparkles } from "lucide-react";
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
    { icon: <Mail size={24} />, label: "Email", value: "pateldev6622@gmail.com", href: "mailto:pateldev6622@gmail.com" },
    { icon: <Linkedin size={24} />, label: "LinkedIn", value: "linkedin.com/in/dev-patel-n", href: "https://www.linkedin.com/in/dev-patel-n/" },
    { icon: <Github size={24} />, label: "GitHub", value: "github.com/dev-patel-n", href: "https://github.com/dev-patel-n" },
    { icon: <Phone size={24} />, label: "Phone", value: "+91 82006 99887", href: "tel:+918200699887" },
  ];

  return (
    <section id="contact" className="section-padding bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6 md:mb-8">
              Get In Touch
            </div>
            <h3 className="text-4xl md:text-7xl font-black mb-8 md:mb-10 leading-[1.1] tracking-tighter">
              Let&apos;s Build <br />
              Something <span className="text-primary text-gradient">Great.</span>
            </h3>
            <p className="text-lg md:text-xl text-muted-foreground/80 font-medium leading-relaxed mb-12 md:mb-16 max-w-lg">
              Whether you have a specific project in mind or just want to discuss the future of Fintech, my inbox is always open.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
              {contactInfo.map((info, index) => (
                <a 
                  key={index}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-3 md:gap-4 p-6 md:p-8 rounded-2xl md:rounded-3xl bg-secondary/50 border border-border/50 hover:bg-primary hover:text-white transition-all duration-500 shadow-sm"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-background flex items-center justify-center text-primary group-hover:bg-white/20 group-hover:text-white transition-all">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{info.label}</p>
                    <p className="text-sm font-bold truncate">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-12 md:mt-16 flex flex-wrap items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] md:text-xs">
                <MapPin size={16} /> Gandhinagar, Gujarat
              </div>
              <div className="hidden sm:block h-4 w-px bg-border/50" />
              <a href="/resume.pdf" target="_blank" className="flex items-center gap-2 font-black uppercase tracking-widest text-[10px] md:text-xs hover:text-primary transition-colors">
                <Download size={16} /> Download Resume
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="p-8 md:p-14 rounded-[2rem] md:rounded-[3.5rem] bg-background border border-border shadow-2xl relative z-10 overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Sparkles className="w-20 h-20 md:w-32 md:h-32" />
              </div>

              {status === "success" ? (
                <div className="py-12 md:py-20 flex flex-col items-center text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6 md:mb-8 animate-bounce">
                    <Send className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                  <h4 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">Message Sent!</h4>
                  <p className="text-muted-foreground font-medium mb-8 md:mb-10 text-base md:text-lg">Thank you for reaching out. I&apos;ll get back to you within 24 hours.</p>
                  <button 
                    onClick={() => setStatus("idle")}
                    className="px-8 md:px-10 py-4 bg-secondary rounded-2xl font-black hover:bg-primary hover:text-white transition-all shadow-xl"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-2 md:space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80 ml-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe"
                        className="w-full px-6 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-secondary/50 border border-border/50 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-base md:text-lg"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                        disabled={status === "loading"}
                      />
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80 ml-1">Email</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full px-6 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-secondary/50 border border-border/50 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-base md:text-lg"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                        disabled={status === "loading"}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80 ml-1">Phone Number (Optional)</label>
                    <input 
                      type="tel" 
                      placeholder="+91 00000 00000"
                      className="w-full px-6 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-secondary/50 border border-border/50 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-base md:text-lg"
                      value={formState.phone}
                      onChange={(e) => setFormState({...formState, phone: e.target.value})}
                      disabled={status === "loading"}
                    />
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80 ml-1">Message</label>
                    <textarea 
                      required
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="w-full px-6 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-secondary/50 border border-border/50 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-base md:text-lg resize-none"
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      disabled={status === "loading"}
                    />
                  </div>
                  <button 
                    disabled={status === "loading"}
                    type="submit"
                    className="w-full py-5 md:py-6 bg-primary text-white rounded-xl md:rounded-2xl font-black text-lg md:text-xl flex items-center justify-center gap-4 hover:bg-primary/90 transition-all hover:translate-y-[-4px] active:scale-95 shadow-2xl shadow-primary/30 disabled:opacity-70 group"
                  >
                    {status === "loading" ? "Sending..." : <>Send Message <Send className="w-5 h-5 md:w-[22px] md:h-[22px] group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" /></>}
                  </button>
                  {status === "error" && (
                    <p className="text-red-500 text-sm text-center font-bold">{errorMsg}</p>
                  )}
                </form>
              )}
            </div>
            {/* Background floating element */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
