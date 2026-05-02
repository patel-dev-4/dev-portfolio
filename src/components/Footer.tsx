"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link
              href="#home"
              className="text-2xl font-bold tracking-tighter flex items-center gap-2 mb-6"
            >
              <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-lg">
                D
              </span>
              Dev Patel
            </Link>
            <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed">
              Full Stack Developer building scalable web applications and
              enterprise workflow systems with a focus on UI/UX, robust
              backends, and real-world business logic.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/dev-patel-n"
                target="_blank"
                className="p-3 rounded-xl bg-secondary hover:bg-primary hover:text-white transition-all"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/dev-patel-n/"
                target="_blank"
                className="p-3 rounded-xl bg-secondary hover:bg-primary hover:text-white transition-all"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:pateldev6622@gmail.com"
                className="p-3 rounded-xl bg-secondary hover:bg-primary hover:text-white transition-all"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#home"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  href="#skills"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Technical Skills
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">
              Legal & Docs
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Resume (PDF)
                </a>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground">Privacy Policy</span>
              </li>
              <li>
                <span className="text-muted-foreground">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Dev Patel. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <span className="text-red-500">♥</span> using React,
            Next.js & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
