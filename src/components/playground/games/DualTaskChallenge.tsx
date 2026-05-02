"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Play, RotateCcw, AlertCircle, CheckCircle2 } from "lucide-react";

export default function DualTaskChallenge() {
  const [gameState, setGameState] = useState<"idle" | "playing" | "ended">("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [leftColor, setLeftColor] = useState("");
  const [leftWord, setLeftWord] = useState("");
  const [rightEquation, setRightEquation] = useState({ q: "", a: 0 });
  const [rightOptions, setRightOptions] = useState<number[]>([]);

  const colors = ["emerald-500", "blue-500", "rose-500", "amber-500"];
  const colorNames = ["GREEN", "BLUE", "RED", "YELLOW"];

  const generateLeft = useCallback(() => {
    const wordIdx = Math.floor(Math.random() * colorNames.length);
    const colorIdx = Math.floor(Math.random() * colors.length);
    setLeftWord(colorNames[wordIdx]);
    setLeftColor(colors[colorIdx]);
  }, []);

  const generateRight = useCallback(() => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const op = Math.random() > 0.5 ? "+" : "-";
    const ans = op === "+" ? a + b : a - b;
    setRightEquation({ q: `${a} ${op} ${b}`, a: ans });

    const options = [ans];
    while (options.length < 3) {
      const wrong = ans + (Math.floor(Math.random() * 5) - 2);
      if (!options.includes(wrong)) options.push(wrong);
    }
    setRightOptions(options.sort(() => Math.random() - 0.5));
  }, []);

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setTimeLeft(30);
    generateLeft();
    generateRight();
  };

  useEffect(() => {
    if (gameState !== "playing") return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState("ended");
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState]);

  const handleLeftClick = (colorName: string) => {
    const isCorrect = leftColor.includes(colorName.toLowerCase()) || 
                     (leftColor === "rose-500" && colorName === "RED") ||
                     (leftColor === "amber-500" && colorName === "YELLOW") ||
                     (leftColor === "emerald-500" && colorName === "GREEN");
    
    if (isCorrect) {
      setScore(s => s + 10);
      generateLeft();
    } else {
      setScore(s => Math.max(0, s - 5));
    }
  };

  const handleRightClick = (val: number) => {
    if (val === rightEquation.a) {
      setScore(s => s + 10);
      generateRight();
    } else {
      setScore(s => Math.max(0, s - 5));
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-center gap-12">
      {/* Game Header */}
      <div className="w-full flex justify-between items-center bg-secondary/20 p-6 rounded-[2rem] border border-border">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Global Score</span>
          <span className="text-3xl font-black text-primary">{score}</span>
        </div>
        <div className="text-center">
           <Zap className="text-primary animate-pulse mx-auto mb-1" size={24} />
           <span className="text-xs font-black uppercase tracking-[0.2em]">Active Task</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Time Remaining</span>
          <span className={`text-3xl font-black ${timeLeft < 10 ? "text-rose-500 animate-bounce" : "text-foreground"}`}>
            {timeLeft}s
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {gameState === "idle" ? (
          <motion.div 
            key="idle"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <div className="max-w-md mx-auto space-y-4">
              <h3 className="text-4xl font-black uppercase tracking-tight">The Dual Challenge</h3>
              <p className="text-muted-foreground font-medium">Test your cognitive switching. Manage a Stroop test on the left and math equations on the right simultaneously.</p>
            </div>
            <button 
              onClick={startGame}
              className="px-12 py-5 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/30 flex items-center gap-3 mx-auto"
            >
              <Play size={20} /> Start Training
            </button>
          </motion.div>
        ) : gameState === "playing" ? (
          <motion.div 
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full"
          >
            {/* Stroop Test Section */}
            <div className="glass-card rounded-[3rem] p-10 border border-border flex flex-col items-center gap-8 bg-black/10">
               <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Task 1: Stroop Color</span>
               <motion.div 
                 key={leftWord + leftColor}
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 className={`text-6xl font-black text-${leftColor} drop-shadow-lg`}
               >
                 {leftWord}
               </motion.div>
               <div className="grid grid-cols-2 gap-4 w-full">
                 {colorNames.map(name => (
                   <button 
                     key={name}
                     onClick={() => handleLeftClick(name)}
                     className="py-4 bg-secondary/30 rounded-2xl font-black text-xs uppercase tracking-widest border border-border hover:bg-primary hover:text-white transition-all active:scale-95"
                   >
                     {name}
                   </button>
                 ))}
               </div>
            </div>

            {/* Math Section */}
            <div className="glass-card rounded-[3rem] p-10 border border-border flex flex-col items-center gap-8 bg-black/10">
               <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Task 2: Rapid Math</span>
               <motion.div 
                 key={rightEquation.q}
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 className="text-6xl font-black text-primary drop-shadow-lg"
               >
                 {rightEquation.q}
               </motion.div>
               <div className="grid grid-cols-3 gap-4 w-full">
                 {rightOptions.map(opt => (
                   <button 
                     key={opt}
                     onClick={() => handleRightClick(opt)}
                     className="py-6 bg-secondary/30 rounded-2xl font-black text-xl border border-border hover:bg-primary hover:text-white transition-all active:scale-95"
                   >
                     {opt}
                   </button>
                 ))}
               </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="ended"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <div className="w-24 h-24 rounded-[2.5rem] bg-emerald-500/10 flex items-center justify-center text-emerald-500 mx-auto mb-6">
               <CheckCircle2 size={48} />
            </div>
            <div className="space-y-2">
              <h3 className="text-5xl font-black uppercase tracking-tight">Session Ended</h3>
              <p className="text-xl font-medium text-muted-foreground">You achieved a multitasking score of</p>
              <div className="text-7xl font-black text-primary my-4">{score}</div>
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

      <div className="flex items-center gap-3 text-muted-foreground">
        <AlertCircle size={16} />
        <p className="text-[10px] font-black uppercase tracking-widest">Training focus: Cognitive load & Task switching</p>
      </div>
    </div>
  );
}
