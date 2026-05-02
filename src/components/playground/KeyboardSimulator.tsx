"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Keyboard, Volume2, Settings2 } from "lucide-react";

type SwitchType = "blue" | "brown" | "red";

const SWITCH_CONFIGS = {
  blue: {
    name: "Blue (Clicky)",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    sounds: {
      regular: "/sounds/keyboard/blue.mp3",
      space: "/sounds/keyboard/blue.mp3",
      enter: "/sounds/keyboard/blue.mp3",
    }
  },
  brown: {
    name: "Brown (Tactile)",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    sounds: {
      regular: "/sounds/keyboard/brown.mp3",
      space: "/sounds/keyboard/brown.mp3",
      enter: "/sounds/keyboard/brown.mp3",
    }
  },
  red: {
    name: "Red (Linear)",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    sounds: {
      regular: "/sounds/keyboard/red.mp3",
      space: "/sounds/keyboard/red.mp3",
      enter: "/sounds/keyboard/red.mp3",
    }
  }
};

const KEY_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"]
];

export default function KeyboardSimulator() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [typedText, setTypedText] = useState("");
  const [switchType, setSwitchType] = useState<SwitchType>("blue");
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  const playSound = useCallback((type: "regular" | "space" | "enter") => {
    const audio = audioRefs.current[type];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  }, []);

  const handleKeyPress = useCallback((key: string) => {
    // Normalize key for visual feedback
    const displayKey = key.length === 1 ? key.toUpperCase() : key;
    setActiveKey(displayKey);
    
    // Auto-clear active state after a short duration for the "click" effect
    setTimeout(() => setActiveKey(null), 150);

    if (key === "Space" || key === " ") {
      playSound("space");
      setTypedText(prev => prev + " ");
    } else if (key === "Enter") {
      playSound("enter");
      setTypedText(prev => prev + "\n");
    } else if (key === "Backspace") {
      playSound("regular");
      setTypedText(prev => prev.slice(0, -1));
    } else if (key.length === 1) {
      playSound("regular");
      setTypedText(prev => prev + key);
    }
  }, [playSound]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent double triggers from repeating keys
      if (e.repeat) return;
      
      let key = e.key;
      // Map hardware keys to virtual keyboard names
      if (key === " ") key = "Space";
      
      handleKeyPress(key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyPress]);

  return (
    <div className="flex flex-col h-full items-center justify-center gap-10 py-4">
      {/* Header & Controls */}
      <div className="w-full max-w-3xl flex flex-col md:flex-row items-center justify-between gap-6 px-4">
        <div className="flex flex-col gap-1 text-center md:text-left">
          <h2 className="text-4xl font-black uppercase tracking-tighter flex items-center justify-center md:justify-start gap-3">
             <Keyboard className="text-primary" size={32} /> ASMR Keyboard
          </h2>
          <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em]">
             Mechanical Typing Experience
          </p>
        </div>

        <div className="flex bg-secondary/30 p-1.5 rounded-2xl border border-border">
          {(Object.keys(SWITCH_CONFIGS) as SwitchType[]).map((type) => (
            <button
              key={type}
              onClick={() => setSwitchType(type)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                switchType === type 
                  ? `${SWITCH_CONFIGS[type].bg} ${SWITCH_CONFIGS[type].color} shadow-sm` 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Typing Display */}
      <div className="w-full max-w-3xl glass-card rounded-[2.5rem] p-10 min-h-[160px] relative border border-primary/10 shadow-2xl group transition-all duration-500 hover:border-primary/30">
        <div className="absolute top-6 left-8 flex gap-2">
           <div className="w-3 h-3 rounded-full bg-rose-500/30" />
           <div className="w-3 h-3 rounded-full bg-amber-500/30" />
           <div className="w-3 h-3 rounded-full bg-emerald-500/30" />
        </div>
        <div className="absolute top-6 right-8 opacity-20 group-hover:opacity-100 transition-opacity">
           <Volume2 className="text-primary" size={20} />
        </div>
        
        <p className="mt-6 font-mono text-2xl text-foreground break-all whitespace-pre-wrap leading-relaxed">
          {typedText}
          <motion.span 
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-3 h-8 bg-primary ml-1 align-middle"
          />
        </p>

        {typedText === "" && (
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-muted-foreground/30 font-black uppercase tracking-[0.5em] text-xs">Start Typing...</span>
           </div>
        )}
      </div>

      {/* Virtual Keyboard */}
      <div className="flex flex-col gap-4 p-8 bg-secondary/10 rounded-[3.5rem] border border-border backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
        
        {KEY_ROWS.map((row, i) => (
          <div key={i} className="flex justify-center gap-3">
            {row.map(key => (
              <motion.button
                key={key}
                animate={{ 
                  scale: activeKey === key ? 0.9 : 1,
                  y: activeKey === key ? 4 : 0
                }}
                onClick={() => handleKeyPress(key)}
                className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl border-b-4 flex items-center justify-center font-black transition-all ${
                  activeKey === key 
                    ? `bg-primary border-primary-foreground text-white shadow-inner` 
                    : "bg-background border-border hover:border-primary/30"
                }`}
              >
                {key}
              </motion.button>
            ))}
          </div>
        ))}
        
        <div className="flex justify-center gap-3">
           <motion.button 
             animate={{ 
               scale: activeKey === "Space" ? 0.98 : 1,
               y: activeKey === "Space" ? 4 : 0
             }}
             onClick={() => handleKeyPress("Space")}
             className={`h-16 w-80 rounded-2xl border-b-4 transition-all ${
               activeKey === "Space" ? "bg-primary border-primary-foreground" : "bg-background border-border hover:border-primary/30"
             }`}
           />
           <motion.button 
             animate={{ 
               scale: activeKey === "Enter" ? 0.95 : 1,
               y: activeKey === "Enter" ? 4 : 0
             }}
             onClick={() => handleKeyPress("Enter")}
             className={`h-16 px-8 rounded-2xl border-b-4 font-black uppercase text-xs tracking-widest transition-all ${
               activeKey === "Enter" ? "bg-primary border-primary-foreground text-white" : "bg-background border-border hover:border-primary/30"
             }`}
           >
             Enter
           </motion.button>
        </div>
      </div>

      {/* Switch Type Indicator */}
      <div className="flex items-center gap-2 text-muted-foreground/50">
         <Settings2 size={14} />
         <span className="text-[10px] font-black uppercase tracking-[0.2em]">Currently Active: <span className={SWITCH_CONFIGS[switchType].color}>{SWITCH_CONFIGS[switchType].name}</span></span>
      </div>

      {/* Hidden Audio Elements */}
      <AnimatePresence mode="wait">
        <audio 
          key={`${switchType}-regular`}
          ref={el => { if (el) audioRefs.current.regular = el; }} 
          src={SWITCH_CONFIGS[switchType].sounds.regular} 
          preload="auto" 
        />
        <audio 
          key={`${switchType}-space`}
          ref={el => { if (el) audioRefs.current.space = el; }} 
          src={SWITCH_CONFIGS[switchType].sounds.space} 
          preload="auto" 
        />
        <audio 
          key={`${switchType}-enter`}
          ref={el => { if (el) audioRefs.current.enter = el; }} 
          src={SWITCH_CONFIGS[switchType].sounds.enter} 
          preload="auto" 
        />
      </AnimatePresence>
    </div>
  );
}
