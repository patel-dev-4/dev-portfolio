"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-white/5 pt-32 pb-16 relative overflow-hidden">
      {/* Background Architectural Text */}
      <div className="absolute -bottom-20 -left-20 text-[30vw] font-black text-foreground/[0.02] select-none pointer-events-none leading-none tracking-tighter">
        DEV
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-24 mb-32">
          <div className="md:col-span-2">
            <Link
              href="#home"
              className="text-4xl font-display font-black tracking-tighter flex items-center gap-3 mb-10 group"
            >
              <span className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-primary/30 group-hover:rotate-12 transition-transform duration-500">
                D
              </span>
              DEV PATEL.
            </Link>
            <p className="text-muted-foreground/60 text-xl font-medium max-w-sm mb-12 leading-relaxed">
              Architecting scalable enterprise ecosystems with a focus on 
              <span className="text-foreground italic font-bold"> high-fidelity</span> logic and 
              <span className="text-foreground italic font-bold"> premium</span> user experiences.
            </p>
            <div className="flex gap-6">
              {[
                { icon: <Github size={24} />, href: "https://github.com/dev-patel-n" },
                { icon: <Linkedin size={24} />, href: "https://www.linkedin.com/in/dev-patel-n/" },
                { icon: <Mail size={24} />, href: "mailto:pateldev6622@gmail.com" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  className="w-14 h-14 rounded-2xl bg-secondary/50 border border-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-500 shadow-xl"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-black mb-10 text-[11px] uppercase tracking-[0.4em] text-primary">
              Navigation
            </h4>
            <ul className="space-y-6">
              {[
                { label: "Genesis", href: "#home" },
                { label: "Biography", href: "#about" },
                { label: "Ecosystem", href: "#skills" },
                { label: "Archive", href: "#projects" }
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground/60 hover:text-primary transition-all duration-300 font-bold text-lg tracking-tight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-black mb-10 text-[11px] uppercase tracking-[0.4em] text-accent">
              Assets & Docs
            </h4>
            <ul className="space-y-6">
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="text-muted-foreground/60 hover:text-accent transition-all duration-300 font-bold text-lg tracking-tight"
                >
                  Technical Resume
                </a>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-muted-foreground/60 hover:text-accent transition-all duration-300 font-bold text-lg tracking-tight"
                >
                  Collaboration
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground/40 font-bold text-lg tracking-tight cursor-not-allowed">Protocol</span>
              </li>
              <li>
                <span className="text-muted-foreground/40 font-bold text-lg tracking-tight cursor-not-allowed">Terms</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">
            © {currentYear} PATEL SYSTEMS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">SYSTEM STATUS: OPTIMAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
