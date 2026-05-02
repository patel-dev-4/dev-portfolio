"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Keyboard } from "lucide-react";

const KEYBOARD_SOUNDS = {
  regular: "https://assets.mixkit.co/sfx/preview/mixkit-mechanical-keyboard-single-click-2034.mp3",
  space: "https://assets.mixkit.co/sfx/preview/mixkit-keyboard-typing-single-hit-1382.mp3",
  enter: "https://assets.mixkit.co/sfx/preview/mixkit-typewriter-hard-return-1375.mp3",
  backspace: "https://assets.mixkit.co/sfx/preview/mixkit-mechanical-keyboard-single-click-2034.mp3"
};

const KEY_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"]
];

export default function KeyboardSimulator() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [typedText, setTypedText] = useState("");
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  const playSound = useCallback((type: keyof typeof KEYBOARD_SOUNDS) => {
    const audio = audioRefs.current[type];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  }, []);

  const handleKeyPress = useCallback((key: string) => {
    setActiveKey(key);
    setTimeout(() => setActiveKey(null), 100);

    if (key === " ") {
      playSound("space");
      setTypedText(prev => prev + " ");
    } else if (key === "Enter") {
      playSound("enter");
      setTypedText(prev => prev + "\n");
    } else if (key === "Backspace") {
      playSound("backspace");
      setTypedText(prev => prev.slice(0, -1));
    } else {
      playSound("regular");
      if (key.length === 1) {
        setTypedText(prev => prev + key);
      }
    }
  }, [playSound]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let key = e.key;
      if (key === " ") key = "Space";
      handleKeyPress(key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyPress]);

  return (
    <div className="flex flex-col h-full items-center justify-center gap-12 py-8">
      <div className="text-center">
        <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter flex items-center justify-center gap-3">
           <Keyboard className="text-primary" /> ASMR Keyboard Simulator
        </h2>
        <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
           Type on your physical keyboard or use the virtual keys
        </p>
      </div>

      {/* Typing Display */}
      <div className="w-full max-w-3xl glass-card rounded-3xl p-8 min-h-[120px] relative border border-primary/10 overflow-hidden">
        <div className="absolute top-4 left-6 flex gap-1.5">
           <div className="w-2 h-2 rounded-full bg-red-500/50" />
           <div className="w-2 h-2 rounded-full bg-amber-500/50" />
           <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
        </div>
        <p className="mt-4 font-mono text-xl text-foreground break-all whitespace-pre-wrap">
          {typedText}
          <motion.span 
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-6 bg-primary ml-1 align-middle"
          />
        </p>
      </div>

      {/* Virtual Keyboard */}
      <div className="flex flex-col gap-3 p-6 bg-secondary/20 rounded-[2.5rem] border border-border">
        {KEY_ROWS.map((row, i) => (
          <div key={i} className="flex justify-center gap-2">
            {row.map(key => (
              <motion.button
                key={key}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleKeyPress(key)}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-xl border-2 flex items-center justify-center font-black transition-all ${
                  activeKey === key 
                    ? "bg-primary border-white text-white shadow-[0_0_20px_rgba(var(--primary),0.4)]" 
                    : "bg-background border-border hover:border-primary/50"
                }`}
              >
                {key}
              </motion.button>
            ))}
          </div>
        ))}
        <div className="flex justify-center gap-2">
           <motion.button 
             whileTap={{ scale: 0.95 }}
             onClick={() => handleKeyPress("Space")}
             className={`h-14 w-64 rounded-xl border-2 transition-all ${
               activeKey === "Space" ? "bg-primary border-white" : "bg-background border-border hover:border-primary/50"
             }`}
           />
           <motion.button 
             whileTap={{ scale: 0.95 }}
             onClick={() => handleKeyPress("Enter")}
             className={`h-14 px-6 rounded-xl border-2 font-black uppercase text-[10px] tracking-widest transition-all ${
               activeKey === "Enter" ? "bg-primary border-white text-white" : "bg-background border-border hover:border-primary/50"
             }`}
           >
             Enter
           </motion.button>
        </div>
      </div>

      {/* Hidden Audio Elements */}
      <audio ref={el => { if (el) audioRefs.current.regular = el; }} src={KEYBOARD_SOUNDS.regular} preload="auto" />
      <audio ref={el => { if (el) audioRefs.current.space = el; }} src={KEYBOARD_SOUNDS.space} preload="auto" />
      <audio ref={el => { if (el) audioRefs.current.enter = el; }} src={KEYBOARD_SOUNDS.enter} preload="auto" />
      <audio ref={el => { if (el) audioRefs.current.backspace = el; }} src={KEYBOARD_SOUNDS.backspace} preload="auto" />
    </div>
  );
}
