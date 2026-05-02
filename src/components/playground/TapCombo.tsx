"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Keyboard, RotateCcw, Flame } from "lucide-react";

const KEYS = ["A", "S", "D", "F", "J", "K", "L", ";"];

export default function TapCombo() {
  const [targetSequence, setTargetSequence] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [combo, setCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState<"idle" | "playing" | "finished">("idle");
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("tap-combo-best");
      return saved ? parseInt(saved) : 0;
    }
    return 0;
  });
  const [lastKeyPressed, setLastKeyPressed] = useState<string | null>(null);

  const generateSequence = useCallback(() => {
    const seq = Array.from({ length: 4 }, () => KEYS[Math.floor(Math.random() * KEYS.length)]);
    setTargetSequence(seq);
    setCurrentIndex(0);
  }, []);

  const startGame = () => {
    setScore(0);
    setCombo(0);
    setTimeLeft(30);
    setGameState("playing");
    generateSequence();
  };

  const handleKeyPress = useCallback((key: string) => {
    if (gameState !== "playing") return;
    
    setLastKeyPressed(key);
    setTimeout(() => setLastKeyPressed(null), 100);

    if (key.toUpperCase() === targetSequence[currentIndex]) {
      if (currentIndex === targetSequence.length - 1) {
        setScore(prev => prev + 10 * (combo + 1));
        setCombo(prev => prev + 1);
        generateSequence();
      } else {
        setCurrentIndex(prev => prev + 1);
      }
    } else {
      setCombo(0);
      setCurrentIndex(0);
    }
  }, [gameState, targetSequence, currentIndex, combo, generateSequence]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let key = e.key.toUpperCase();
      if (key === ";") key = ";";
      if (KEYS.includes(key)) {
        handleKeyPress(key);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyPress]);

  useEffect(() => {
    if (gameState === "playing") {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameState("finished");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === "finished" && score > highScore) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHighScore(score);
      localStorage.setItem("tap-combo-best", score.toString());
    }
  }, [gameState, score, highScore]);

  return (
    <div className="flex flex-col h-full items-center justify-center gap-8 py-4">
      <div className="text-center">
        <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter flex items-center justify-center gap-3">
           <Keyboard className="text-primary" /> Tap Combo Challenge
        </h2>
        <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
           Rapidly type the sequence to build your combo
        </p>
      </div>

      <div className="flex gap-12 mb-4">
         <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Score</span>
            <span className="text-3xl font-black text-primary">{score}</span>
         </div>
         <div className="flex flex-col items-center relative">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Combo</span>
            <span className="text-3xl font-black text-orange-500 flex items-center gap-2">
               x{combo} {combo > 5 && <Flame size={24} className="animate-bounce" />}
            </span>
         </div>
         <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Time</span>
            <span className="text-3xl font-black text-foreground">{timeLeft}s</span>
         </div>
         <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Record</span>
            <span className="text-3xl font-black text-yellow-500">{highScore}</span>
         </div>
      </div>

      <div className="relative w-full max-w-2xl p-12 bg-secondary/20 rounded-[3rem] border border-border flex flex-col items-center justify-center gap-12 overflow-hidden">
        <div className="flex gap-6">
          {targetSequence.map((key, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: i === currentIndex ? 1.2 : 1,
                opacity: i < currentIndex ? 0.3 : 1,
                borderColor: i === currentIndex ? "var(--primary)" : "rgba(255,255,255,0.1)"
              }}
              className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl border-4 flex items-center justify-center text-3xl font-black transition-all ${
                i === currentIndex ? "bg-primary/10 shadow-[0_0_20px_rgba(var(--primary),0.3)]" : "bg-background"
              }`}
            >
              {key}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
           {KEYS.map(key => (
             <motion.div
               key={key}
               animate={{ 
                 backgroundColor: lastKeyPressed === key ? "var(--primary)" : "var(--secondary)",
                 scale: lastKeyPressed === key ? 0.9 : 1
               }}
               className="w-10 h-12 rounded-lg flex items-center justify-center text-xs font-bold border border-border/50"
             >
               {key}
             </motion.div>
           ))}
        </div>

        <AnimatePresence>
          {gameState !== "playing" && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            >
              <div className="text-center p-8">
                {gameState === "finished" && (
                  <div className="mb-6">
                    <h3 className="text-4xl font-black uppercase mb-2">Session Ended</h3>
                    <p className="text-primary font-bold text-2xl uppercase tracking-tighter">Score: {score}</p>
                  </div>
                )}
                <button 
                  onClick={startGame}
                  className="flex items-center gap-2 px-12 py-6 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl shadow-primary/40"
                >
                  {gameState === "idle" ? "Begin Tapping" : "Retry Combo"} <RotateCcw size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
