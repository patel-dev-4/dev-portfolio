"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, RotateCcw } from "lucide-react";

export default function ReflexGrid() {
  const [grid] = useState<number[]>(Array(16).fill(0));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState<"idle" | "playing" | "finished">("idle");
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("reflex-grid-best");
      return saved ? parseInt(saved) : 0;
    }
    return 0;
  });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameState("playing");
    nextTarget();
  };

  const nextTarget = useCallback(() => {
    const newIndex = Math.floor(Math.random() * 16);
    setActiveIndex(newIndex);
  }, []);

  const handleHit = (index: number) => {
    if (gameState !== "playing") return;
    if (index === activeIndex) {
      setScore(prev => prev + 1);
      nextTarget();
    } else {
      // Penalty for miss
      setScore(prev => Math.max(0, prev - 1));
    }
  };

  useEffect(() => {
    if (gameState === "playing") {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setGameState("finished");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  useEffect(() => {
    if (gameState === "finished" && score > highScore) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHighScore(score);
      localStorage.setItem("reflex-grid-best", score.toString());
    }
  }, [gameState, score, highScore]);

  return (
    <div className="flex flex-col h-full items-center justify-center gap-8 py-4">
      <div className="text-center">
        <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter flex items-center justify-center gap-3">
           <Zap className="text-primary" /> Reflex Grid Challenge
        </h2>
        <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
           Hit the glowing tiles as fast as possible
        </p>
      </div>

      <div className="flex gap-12 mb-4">
         <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Score</span>
            <span className="text-3xl font-black text-primary">{score}</span>
         </div>
         <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Time Left</span>
            <span className="text-3xl font-black text-foreground">{timeLeft}s</span>
         </div>
         <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Best</span>
            <span className="text-3xl font-black text-yellow-500">{highScore}</span>
         </div>
      </div>

      <div className="relative">
        <div className="grid grid-cols-4 gap-3 p-4 bg-secondary/20 rounded-[2rem] border border-border">
          {grid.map((_, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleHit(i)}
              className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 transition-all duration-150 ${
                activeIndex === i 
                  ? "bg-primary border-white shadow-[0_0_30px_rgba(var(--primary),0.6)] z-10" 
                  : "bg-background border-border/50 hover:border-primary/30"
              }`}
            >
              {activeIndex === i && (
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <Zap size={24} className="text-white fill-white" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {gameState !== "playing" && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-[2rem]"
            >
              <div className="text-center p-8">
                {gameState === "finished" && (
                  <div className="mb-6">
                    <h3 className="text-4xl font-black uppercase mb-2">Game Over</h3>
                    <p className="text-primary font-bold text-xl uppercase tracking-widest">Final Score: {score}</p>
                  </div>
                )}
                <button 
                  onClick={startGame}
                  className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl shadow-primary/40"
                >
                  {gameState === "idle" ? "Start Challenge" : "Try Again"} <RotateCcw size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
