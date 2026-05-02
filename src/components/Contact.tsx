"use client";

<<<<<<< HEAD
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: "", email: "", phone: "", message: "" });
    }, 1500);
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

      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              Get In Touch
            </div>
            <h3 className="text-5xl md:text-7xl font-black mb-10 leading-[1.1] tracking-tighter">
              Let&apos;s Build <br />
              Something <span className="text-primary text-gradient">Great.</span>
            </h3>
            <p className="text-xl text-muted-foreground/80 font-medium leading-relaxed mb-16 max-w-lg">
              Whether you have a specific project in mind or just want to discuss the future of Fintech, my inbox is always open.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {contactInfo.map((info, index) => (
                <a 
                  key={index}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-4 p-8 rounded-3xl bg-secondary/50 border border-border/50 hover:bg-primary hover:text-white transition-all duration-500 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-primary group-hover:bg-white/20 group-hover:text-white transition-all">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{info.label}</p>
                    <p className="text-sm font-bold truncate">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-16 flex items-center gap-6">
              <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs">
                <MapPin size={16} /> Gandhinagar, Gujarat
              </div>
              <div className="h-4 w-px bg-border/50" />
              <a href="/resume.pdf" target="_blank" className="flex items-center gap-2 font-black uppercase tracking-widest text-xs hover:text-primary transition-colors">
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
            <div className="p-8 md:p-14 rounded-[3.5rem] bg-background border border-border shadow-2xl relative z-10 overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Sparkles size={120} />
              </div>

              {submitted ? (
                <div className="py-20 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-8 animate-bounce">
                    <Send size={40} />
                  </div>
                  <h4 className="text-4xl font-black mb-4 tracking-tight">Message Sent!</h4>
                  <p className="text-muted-foreground font-medium mb-10 text-lg">Thank you for reaching out. I&apos;ll get back to you within 24 hours.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="px-10 py-4 bg-secondary rounded-2xl font-black hover:bg-primary hover:text-white transition-all shadow-xl"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80 ml-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe"
                        className="w-full px-8 py-5 rounded-2xl bg-secondary/50 border border-border/50 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-lg"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80 ml-1">Email</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full px-8 py-5 rounded-2xl bg-secondary/50 border border-border/50 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-lg"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80 ml-1">Message</label>
                    <textarea 
                      required
                      rows={6}
                      placeholder="Tell me about your project..."
                      className="w-full px-8 py-5 rounded-2xl bg-secondary/50 border border-border/50 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-lg resize-none"
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                    />
                  </div>
                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-6 bg-primary text-white rounded-2xl font-black text-xl flex items-center justify-center gap-4 hover:bg-primary/90 transition-all hover:translate-y-[-4px] active:scale-95 shadow-2xl shadow-primary/30 disabled:opacity-70 group"
                  >
                    {isSubmitting ? "Sending..." : <>Send Message <Send size={22} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" /></>}
                  </button>
                </form>
              )}
            </div>
            {/* Background floating element */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
=======
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Contact() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(json.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  }

  return (
    <section className="py-20 px-4 md:px-8 max-w-3xl mx-auto flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <Card className="bg-card/50 backdrop-blur-sm shadow-xl border-primary/10">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Let's Connect</CardTitle>
            <CardDescription>
              Looking for a developer? Send me a message and I'll get back to
              you shortly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {status === "success" ? (
              <div className="text-center py-10 text-green-500 font-medium">
                Message sent successfully! I'll be in touch soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      required
                      disabled={status === "loading"}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      disabled={status === "loading"}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    required
                    disabled={status === "loading"}
                    className="resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </Button>
                {status === "error" && (
                  <p className="text-red-500 text-sm text-center">{errorMsg}</p>
                )}
              </form>
            )}
          </CardContent>
        </Card>
      </motion.div>
>>>>>>> d17808455001810d193735fa22286161634336f6
    </section>
  );
}
