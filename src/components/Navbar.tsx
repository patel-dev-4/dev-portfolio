"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  Menu,
  X,
  Palette,
  Check,
  Sparkles,
  ArrowUpRight as ArrowUpRightIcon,
} from "lucide-react";
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
  {
    name: "Emerald",
    color: "bg-[#10b981]",
    theme: "theme-emerald",
    logo: "/logo.png",
  },
  {
    name: "Sapphire",
    color: "bg-[#3b82f6]",
    theme: "theme-sapphire",
    logo: "/logosaphire.png",
  },
  {
    name: "Rose",
    color: "bg-[#f43f5e]",
    theme: "theme-rose",
    logo: "/logorose.png",
  },
  {
    name: "Gold",
    color: "bg-[#f59e0b]",
    theme: "theme-gold",
    logo: "/logogold.png",
  },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeColorTheme, setActiveColorTheme] = useState("theme-emerald");
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const paletteRef = useRef<HTMLDivElement>(null);

  // Prevent hydration mismatch and initialize theme
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("color-theme") || "theme-emerald";
    setActiveColorTheme(savedTheme);
  }, []);

  // Update theme classes on document - efficient syncing
  useEffect(() => {
    if (mounted) {
      const root = document.documentElement;
      // Remove all color themes first
      const themes = colorPresets.map(p => p.theme);
      root.classList.remove(...themes);
      // Add active one
      root.classList.add(activeColorTheme);
    }
  }, [activeColorTheme, mounted]);

  // Handle click outside to close palette
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        paletteRef.current &&
        !paletteRef.current.contains(event.target as Node)
      ) {
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const changeColorTheme = (newTheme: string) => {
    setActiveColorTheme(newTheme);
    localStorage.setItem("color-theme", newTheme);
  };

  const getActiveLogo = () => {
    const preset = colorPresets.find((p) => p.theme === activeColorTheme);
    return preset?.logo || "/logo.png";
  };

  // Render a stable skeleton for SSR to avoid layout shifts
  const navbarContent = (
    <div className="container mx-auto px-4 md:px-12 flex justify-center">
      <div
        className={`flex flex-nowrap items-center justify-between w-full max-w-7xl px-4 md:px-8 py-2 md:py-2.5 rounded-full transition-all duration-700 border ${
          scrolled || isOpen
            ? "glass-card shadow-[0_30px_70px_-15px_rgba(0,0,0,0.4)] border-white/10"
            : "bg-transparent border-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 md:gap-4 group shrink-0">
          <div className="relative w-8 h-7 md:w-12 md:h-10 rounded-lg overflow-hidden bg-zinc-950 border border-white/10 shadow-2xl transition-all duration-700 group-hover:rotate-3">
            {mounted ? (
              <Image
                src={getActiveLogo()}
                alt="Dev Patel Logo"
                fill
                className="object-contain p-1"
                priority
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-primary/10" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm md:text-xl font-display font-black tracking-tighter text-foreground whitespace-nowrap">
              DEV PATEL
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-8">
          <div className="flex items-center gap-1 bg-white/[0.03] dark:bg-black/20 backdrop-blur-3xl p-1 rounded-full border border-white/5 shadow-inner">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 xl:px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-full hover:text-primary transition-all duration-500 relative group/item"
              >
                <span className="relative z-10">{link.name}</span>
                <motion.div
                  layoutId="nav-hover"
                  className="absolute inset-0 bg-primary/10 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity"
                />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative" ref={paletteRef}>
              <button
                onClick={() => setIsPaletteOpen(!isPaletteOpen)}
                className={`group flex items-center gap-3 px-5 py-2.5 rounded-full transition-all duration-700 border ${
                  isPaletteOpen
                    ? "bg-primary text-white border-primary shadow-2xl"
                    : "bg-secondary/50 border-white/5 text-foreground hover:border-primary/30"
                }`}
              >
                <Palette size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  System
                </span>
              </button>

              <AnimatePresence>
                {isPaletteOpen && mounted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 mt-6 p-6 rounded-[2rem] bg-background/95 backdrop-blur-4xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] border border-white/10 min-w-[320px] z-[60]"
                  >
                    <div className="flex items-center justify-between mb-6 px-1">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2 mb-1">
                          <Sparkles size={14} /> Intelligence
                        </p>
                        <h4 className="text-xs font-black uppercase tracking-widest">Settings</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                          className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-lg"
                        >
                          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {colorPresets.map((p) => (
                        <button
                          key={p.theme}
                          onClick={() => changeColorTheme(p.theme)}
                          className={`flex items-center justify-between p-3.5 rounded-xl transition-all border ${
                            activeColorTheme === p.theme
                              ? "bg-primary/10 border-primary/40"
                              : "border-transparent hover:bg-secondary/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-lg ${p.color} shadow-lg`} />
                            <span className="text-[9px] font-black uppercase tracking-widest">{p.name}</span>
                          </div>
                          {activeColorTheme === p.theme && <Check size={14} className="text-primary" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2.5 rounded-xl transition-all border ${
              isOpen ? "bg-primary text-white border-primary shadow-lg" : "bg-white/5 border-white/10"
            }`}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 mx-auto max-w-[2000px] z-50 transition-all duration-700 ${
        scrolled ? "py-2" : "py-4 md:py-6"
      }`}
    >
      {navbarContent}

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="lg:hidden fixed inset-0 bg-background z-[100] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/5">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">System Navigation</span>
              <button
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 rounded-2xl bg-secondary/50 border border-white/5 flex items-center justify-center shadow-2xl"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-8 md:p-12 custom-scrollbar">
              <div className="space-y-6 md:space-y-8 mb-16">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between py-2 group"
                  >
                    <span className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter group-hover:text-primary transition-colors">
                      {link.name}
                    </span>
                    <ArrowUpRightIcon size={24} className="opacity-20 group-hover:opacity-100 group-hover:text-primary transition-all" />
                  </Link>
                ))}
              </div>

              <div className="mt-auto border-t border-white/5 pt-12">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-8">Interface Settings</p>
                
                <div className="flex items-center justify-between mb-8 p-6 rounded-3xl bg-white/5 border border-white/5">
                  <span className="text-xs font-black uppercase tracking-widest">Dark Mode</span>
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-lg"
                  >
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {colorPresets.map((p) => (
                    <button
                      key={p.theme}
                      onClick={() => changeColorTheme(p.theme)}
                      className={`flex flex-col items-center gap-3 p-6 rounded-[2rem] border transition-all ${
                        activeColorTheme === p.theme
                          ? "bg-primary/10 border-primary/30 shadow-[inset_0_0_20px_rgba(var(--primary),0.1)]"
                          : "bg-white/5 border-white/5"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl ${p.color} shadow-lg`} />
                      <span className="text-[9px] font-black uppercase tracking-widest">{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-8 border-t border-white/5 bg-secondary/20 text-center">
               <p className="text-[9px] font-black uppercase tracking-[0.5em] text-muted-foreground/50">Designed & Engineered by Dev Patel</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
