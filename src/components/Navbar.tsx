"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, Palette, Check, Sparkles, ArrowUpRight as ArrowUpRightIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Expertise", href: "/#expertise" },
  { name: "Experience", href: "/#experience" },
  { name: "Projects", href: "/#projects" },
  { name: "Playground", href: "/playground" },
  { name: "Contact", href: "/#contact" },
];

const colorPresets = [
  { name: "Emerald", color: "bg-[#10b981]", theme: "theme-emerald", logo: "/logo.png" },
  { name: "Sapphire", color: "bg-[#3b82f6]", theme: "theme-sapphire", logo: "/logosaphire.png" },
  { name: "Rose", color: "bg-[#f43f5e]", theme: "theme-rose", logo: "/logorose.png" },
  { name: "Gold", color: "bg-[#f59e0b]", theme: "theme-gold", logo: "/logogold.png" },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeColorTheme, setActiveColorTheme] = useState("theme-emerald");
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const paletteRef = useRef<HTMLDivElement>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const savedTheme = localStorage.getItem("color-theme") || "theme-emerald";
    setActiveColorTheme(savedTheme);
  }, []);

  // Update theme classes on document
  useEffect(() => {
    if (mounted) {
      document.documentElement.className = `${theme} ${activeColorTheme}`;
    }
  }, [theme, activeColorTheme, mounted]);

  // Handle click outside to close palette
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (paletteRef.current && !paletteRef.current.contains(event.target as Node)) {
        setIsPaletteOpen(false);
      }
    };
    if (isPaletteOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPaletteOpen]);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeColorTheme = (newTheme: string) => {
    setActiveColorTheme(newTheme);
    localStorage.setItem("color-theme", newTheme);
  };

  const getActiveLogo = () => {
    const preset = colorPresets.find(p => p.theme === activeColorTheme);
    return preset?.logo || "/logo.png";
  };

  if (!mounted) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-12 flex justify-center">
        <div 
          className={`flex items-center justify-between w-full max-w-7xl px-4 md:px-8 py-3 rounded-[2.5rem] transition-all duration-500 border ${
            scrolled 
              ? "bg-background/70 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.15)] border-border/60" 
              : "bg-background/20 backdrop-blur-lg border-white/10 shadow-lg"
          }`}
        >
          <Link href="/" className="flex items-center gap-3 md:gap-4 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 shadow-xl group-hover:scale-105 transition-transform duration-500">
              <Image 
                src={getActiveLogo()} 
                alt="Dev Patel Logo" 
                fill 
                className="object-contain p-1.5 md:p-1"
                priority
                unoptimized
              />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-lg md:text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">Dev Patel</span>
              <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Software Developer</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-1 bg-white/5 backdrop-blur-md p-1.5 rounded-2xl border border-white/5 shadow-inner">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 relative group/item overflow-hidden"
                >
                  <span className="relative z-10">{link.name}</span>
                  <div className="absolute inset-0 bg-primary/0 group-hover/item:bg-primary/5 transition-colors" />
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-2 p-1.5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/5 shadow-inner">
              <div className="relative" ref={paletteRef}>
                <button
                  onClick={() => setIsPaletteOpen(!isPaletteOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isPaletteOpen ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-background text-foreground"
                  }`}
                >
                  <Palette size={16} strokeWidth={2.5} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Theme</span>
                </button>
                
                <AnimatePresence>
                  {isPaletteOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 mt-4 p-6 rounded-[2.5rem] bg-background/95 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-border min-w-[320px]"
                    >
                      <div className="flex items-center justify-between mb-6 px-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                          <Sparkles size={12} className="text-primary" /> Customization
                        </p>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"
                            title="Toggle Light/Dark"
                          >
                             {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                          </button>
                          <button 
                            onClick={() => setIsPaletteOpen(false)}
                            className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                            title="Close"
                          >
                            <X size={15} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5">
                        {colorPresets.map((p) => (
                          <button
                            key={p.theme}
                            onClick={() => changeColorTheme(p.theme)}
                            className={`flex items-center justify-between p-4 rounded-2xl transition-all border ${
                              activeColorTheme === p.theme 
                                ? "bg-primary/10 border-primary/40 shadow-inner" 
                                : "border-transparent hover:bg-secondary/50"
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-8 h-8 rounded-xl ${p.color} shadow-lg flex items-center justify-center`}>
                                {activeColorTheme === p.theme && <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />}
                              </div>
                              <span className={`text-[10px] font-black uppercase tracking-widest ${activeColorTheme === p.theme ? "text-primary" : "text-foreground"}`}>
                                {p.name}
                              </span>
                            </div>
                            {activeColorTheme === p.theme && (
                              <div className="flex items-center gap-2">
                                <Check size={14} className="text-primary" strokeWidth={3} />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>

                      <div className="mt-6 pt-4 border-t border-border/50 text-center">
                        <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Crafted for Excellence</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex lg:hidden items-center gap-2">
             <button
              onClick={() => setIsPaletteOpen(!isPaletteOpen)}
              className={`p-3 rounded-2xl transition-all border ${isPaletteOpen ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-white/5 border-white/10 backdrop-blur-md"}`}
            >
              <Palette size={18} />
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`p-3 rounded-2xl transition-all border ${isOpen ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-white/5 border-white/10 backdrop-blur-md"}`}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm lg:hidden z-[-1]"
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="lg:hidden container mx-auto px-4 mt-4"
            >
              <div className="bg-background/90 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden p-6 flex flex-col gap-6">
                <div className="flex items-center justify-between p-5 bg-white/5 rounded-3xl border border-white/5">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary">Appearance</span>
                      <span className="text-xs font-bold">{theme === "dark" ? "Deep Space" : "Daylight"}</span>
                   </div>
                   <button 
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="w-12 h-12 rounded-2xl bg-background border border-white/10 flex items-center justify-center transition-all active:scale-95 shadow-sm"
                    >
                      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {colorPresets.map((p) => (
                    <button
                      key={p.theme}
                      onClick={() => changeColorTheme(p.theme)}
                      className={`flex items-center gap-3 p-4 rounded-2xl transition-all border ${
                        activeColorTheme === p.theme ? "bg-primary/10 border-primary/30" : "bg-white/5 border-white/5"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-lg ${p.color} shadow-sm`} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{p.name}</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-2 py-2 border-t border-border/50">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="px-6 py-5 text-sm font-black uppercase tracking-widest hover:bg-primary/10 rounded-2xl transition-all flex items-center justify-between group"
                    >
                      {link.name}
                      <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRightIcon size={16} className="text-primary" />
                      </div>
                    </Link>
                  ))}
                </div>
                
                <div className="p-4 bg-primary/5 rounded-3xl border border-primary/10 text-center">
                   <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Ready for Collaboration</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
