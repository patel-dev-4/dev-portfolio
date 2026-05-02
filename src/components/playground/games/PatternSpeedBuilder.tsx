"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, RotateCcw } from "lucide-react";

export default function PatternSpeedBuilder() {
  const [gameState, setGameState] = useState<"idle" | "playing" | "ended">("idle");
  const [pattern, setPattern] = useState<number[]>([]);
  const [userInput, setUserInput] = useState<number[]>([]);
  const [isShowing, setIsShowing] = useState(false);
  const [score, setScore] = useState(0);
  const [activeBtn, setActiveBtn] = useState<number | null>(null);

  const showPattern = async (p: number[]) => {
    setIsShowing(true);
    for (const btn of p) {
      setActiveBtn(btn);
      await new Promise(r => setTimeout(r, 400));
      setActiveBtn(null);
      await new Promise(r => setTimeout(r, 200));
    }
    setIsShowing(false);
  };

  const generateNext = useCallback((currentPattern: number[]) => {
    const next = [...currentPattern, Math.floor(Math.random() * 4)];
    setPattern(next);
    setUserInput([]);
    showPattern(next);
  }, []);

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    generateNext([]);
  };

  const handleInput = (idx: number) => {
    if (isShowing || gameState !== "playing") return;

    const nextInput = [...userInput, idx];
    setUserInput(nextInput);

    if (idx !== pattern[userInput.length]) {
      setGameState("ended");
      return;
    }

    if (nextInput.length === pattern.length) {
      setScore(s => s + 100);
      setTimeout(() => generateNext(pattern), 500);
    }
  };

  return (
    <div className="flex flex-col gap-12 h-full items-center justify-center">
      {/* Header */}
      <div className="w-full flex justify-between items-center bg-secondary/20 p-6 rounded-[2rem] border border-border">
         <div className="flex flex-col">
           <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Combo Score</span>
           <span className="text-3xl font-black text-primary">{score}</span>
         </div>
         <div className="text-center">
            <Sparkles className="text-primary mb-1 mx-auto" size={24} />
            <span className="text-[10px] font-black uppercase tracking-widest">Cognitive Load</span>
         </div>
         <div className="flex flex-col items-end">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Pattern Length</span>
            <span className="text-2xl font-black">{pattern.length}</span>
         </div>
      </div>

      <AnimatePresence mode="wait">
        {gameState === "idle" ? (
          <motion.div 
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-8"
          >
            <div className="max-w-md mx-auto space-y-4">
              <h3 className="text-4xl font-black uppercase tracking-tight">Pattern Speed Builder</h3>
              <p className="text-muted-foreground font-medium">Replicate the growing sequence of visual patterns. Speed and accuracy are key as the pattern gets longer.</p>
            </div>
            <button 
              onClick={startGame}
              className="px-12 py-5 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/30 flex items-center gap-3 mx-auto"
            >
              <Zap size={20} /> Begin Sequence
            </button>
          </motion.div>
        ) : gameState === "playing" ? (
          <motion.div 
            key="playing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-2 gap-6 p-8 bg-black/20 rounded-[3rem] border border-border"
          >
            {[0, 1, 2, 3].map((idx) => (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleInput(idx)}
                className={`w-32 h-32 rounded-[2rem] border-4 transition-all duration-200 ${
                  activeBtn === idx 
                    ? "bg-primary border-primary shadow-2xl shadow-primary/40 scale-105" 
                    : "bg-secondary/30 border-border opacity-50 hover:opacity-80"
                } ${
                  idx === 0 ? "border-blue-500/50" :
                  idx === 1 ? "border-emerald-500/50" :
                  idx === 2 ? "border-rose-500/50" : "border-amber-500/50"
                }`}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="ended"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-8"
          >
            <h3 className="text-5xl font-black uppercase tracking-tight text-rose-500">Pattern Broken</h3>
            <div className="space-y-2">
              <p className="text-xl text-muted-foreground font-medium">Final Combo Score</p>
              <div className="text-7xl font-black text-primary">{score}</div>
            </div>
            <button 
              onClick={startGame}
              className="px-12 py-5 bg-secondary text-foreground rounded-[2rem] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all border border-border flex items-center gap-3 mx-auto"
            >
              <RotateCcw size={20} /> Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2 text-muted-foreground">
        <div className={`w-2 h-2 rounded-full ${isShowing ? "bg-amber-500 animate-pulse" : "bg-emerald-500"}`} />
        <span className="text-[10px] font-black uppercase tracking-widest">
          {isShowing ? "Observing Pattern..." : "Your Turn!"}
        </span>
      </div>
    </div>
  );
}
