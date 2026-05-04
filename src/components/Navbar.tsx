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

  const changeColorTheme = (newTheme: string) => {
    setActiveColorTheme(newTheme);
    localStorage.setItem("color-theme", newTheme);
  };

  const getActiveLogo = () => {
    const preset = colorPresets.find((p) => p.theme === activeColorTheme);
    return preset?.logo || "/logo.png";
  };

  if (!mounted) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "py-4" : "py-8"
      }`}
    >
      <div className="container mx-auto px-4 md:px-12 flex justify-center">
        <div
          className={`flex items-center justify-between w-full max-w-7xl px-6 md:px-10 py-3.5 rounded-full transition-all duration-700 border ${
            scrolled
              ? "glass-card shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-white/10"
              : "bg-transparent border-transparent"
          }`}
        >
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 shadow-2xl group-hover:scale-110 transition-all duration-700 group-hover:rotate-6">
              <Image
                src={getActiveLogo()}
                alt="Dev Patel Logo"
                fill
                className="object-contain p-2"
                priority
                unoptimized
              />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-xl md:text-2xl font-display font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                DEV PATEL
              </span>
              <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] text-primary drop-shadow-sm">
                ARCHITECT & ENGINEER
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-2 bg-white/[0.03] dark:bg-black/20 backdrop-blur-2xl p-1.5 rounded-full border border-white/5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-6 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-full hover:text-primary transition-all duration-500 relative group/item"
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
                  className={`group flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-700 border ${
                    isPaletteOpen
                      ? "bg-primary text-white border-primary shadow-[0_10px_30px_-5px_rgba(var(--primary),0.5)]"
                      : "bg-secondary/50 border-white/5 text-foreground hover:border-primary/30"
                  }`}
                >
                  <Palette
                    size={18}
                    className={`${isPaletteOpen ? "animate-spin-slow" : "group-hover:rotate-12 transition-transform"}`}
                  />
                  <span className="text-[11px] font-black uppercase tracking-widest">
                    System
                  </span>
                </button>

                <AnimatePresence>
                  {isPaletteOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 20, rotateX: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20, rotateX: -10 }}
                      className="absolute right-0 mt-6 p-8 rounded-[3rem] bg-background/95 backdrop-blur-[50px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10 min-w-[360px] z-[60]"
                    >
                      <div className="flex items-center justify-between mb-8 px-2">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2 mb-1">
                            <Sparkles size={14} /> Core Config
                          </p>
                          <h4 className="text-sm font-black uppercase tracking-widest">
                            Interface Settings
                          </h4>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              setTheme(theme === "dark" ? "light" : "dark")
                            }
                            className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-500 shadow-xl group/btn"
                            title="Toggle Light/Dark"
                          >
                            {theme === "dark" ? (
                              <Sun
                                size={18}
                                className="group-hover:rotate-90 transition-transform"
                              />
                            ) : (
                              <Moon
                                size={18}
                                className="group-hover:-rotate-12 transition-transform"
                              />
                            )}
                          </button>
                          <button
                            onClick={() => setIsPaletteOpen(false)}
                            className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-500 shadow-xl"
                            title="Close"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        {colorPresets.map((p) => (
                          <button
                            key={p.theme}
                            onClick={() => changeColorTheme(p.theme)}
                            className={`flex items-center justify-between p-5 rounded-3xl transition-all duration-500 border group/theme ${
                              activeColorTheme === p.theme
                                ? "bg-primary/10 border-primary/40 shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)]"
                                : "border-transparent hover:bg-secondary/80 hover:border-white/5"
                            }`}
                          >
                            <div className="flex items-center gap-5">
                              <div
                                className={`w-10 h-10 rounded-2xl ${p.color} shadow-2xl flex items-center justify-center group-hover/theme:scale-110 transition-transform`}
                              >
                                {activeColorTheme === p.theme && (
                                  <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
                                )}
                              </div>
                              <span
                                className={`text-[11px] font-black uppercase tracking-widest ${activeColorTheme === p.theme ? "text-primary" : "text-foreground"}`}
                              >
                                {p.name} Theme
                              </span>
                            </div>
                            {activeColorTheme === p.theme && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"
                              >
                                <Check
                                  size={16}
                                  className="text-primary"
                                  strokeWidth={4}
                                />
                              </motion.div>
                            )}
                          </button>
                        ))}
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <p className="text-[9px] font-black text-muted-foreground/50 uppercase tracking-[0.4em]">
                          Designed for Modernity
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setIsPaletteOpen(!isPaletteOpen)}
              className={`p-4 rounded-2xl transition-all border ${isPaletteOpen ? "bg-primary text-white border-primary shadow-xl" : "bg-white/5 border-white/10 backdrop-blur-md"}`}
            >
              <Palette size={20} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-4 rounded-2xl transition-all border ${isOpen ? "bg-primary text-white border-primary shadow-xl" : "bg-white/5 border-white/10 backdrop-blur-md"}`}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
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
              className="fixed inset-0 bg-black/80 backdrop-blur-md lg:hidden z-[90]"
            />
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="lg:hidden fixed inset-y-0 right-0 w-full max-w-[320px] bg-background border-l border-white/10 z-[100] shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="h-full flex flex-col p-8 pt-24 overflow-y-auto">
                {/* Close Button Inside Drawer */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-secondary/50 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-lg active:scale-90"
                >
                  <X size={24} />
                </button>

                <div className="flex items-center justify-between mb-10">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-1">
                      Appearance
                    </span>
                    <span className="text-sm font-black uppercase tracking-widest">
                      {theme === "dark" ? "Deep Obsidian" : "Atmospheric Light"}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className="w-12 h-12 rounded-2xl bg-secondary/80 border border-white/10 flex items-center justify-center transition-all active:scale-90 shadow-xl"
                  >
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-12">
                  {colorPresets.map((p) => (
                    <button
                      key={p.theme}
                      onClick={() => changeColorTheme(p.theme)}
                      className={`flex flex-col items-center gap-3 p-5 rounded-[2.5rem] transition-all border ${
                        activeColorTheme === p.theme
                          ? "bg-primary/10 border-primary/30"
                          : "bg-white/5 border-white/5"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-2xl ${p.color} shadow-2xl`}
                      />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {p.name}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="space-y-4 py-8 border-t border-white/5">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="px-6 py-6 text-2xl font-black uppercase tracking-widest hover:text-primary transition-all flex items-center justify-between group border-b border-white/5"
                      >
                        {link.name}
                        <ArrowUpRightIcon
                          size={24}
                          className="text-primary opacity-30 group-hover:opacity-100 transition-opacity"
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto p-6 bg-primary/5 rounded-[2.5rem] border border-primary/10 text-center">
                  <p className="text-[11px] font-black text-primary uppercase tracking-[0.3em]">
                    Built for the Future
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
