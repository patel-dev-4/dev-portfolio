"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Play, CheckCircle2 } from "lucide-react";

export default function PrimeNumberHunter() {
  const [gameState, setGameState] = useState<"idle" | "playing" | "ended">("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<{ id: number, type: "correct" | "wrong" } | null>(null);

  const isPrime = (num: number) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const generateNumbers = useCallback(() => {
    const newNumbers: number[] = [];
    while (newNumbers.length < 9) {
      const num = Math.floor(Math.random() * 99) + 2;
      if (!newNumbers.includes(num)) newNumbers.push(num);
    }
    setNumbers(newNumbers);
  }, []);

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setTimeLeft(45);
    generateNumbers();
  };

  useEffect(() => {
    if (gameState !== "playing") return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState("ended");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState]);

  const handleChoice = (num: number) => {
    if (isPrime(num)) {
      setScore(s => s + 100);
      setFeedback({ id: num, type: "correct" });
      setTimeout(() => {
        setFeedback(null);
        generateNumbers();
      }, 300);
    } else {
      setScore(s => Math.max(0, s - 50));
      setFeedback({ id: num, type: "wrong" });
      setTimeout(() => setFeedback(null), 300);
    }
  };

  return (
    <div className="flex flex-col gap-12 h-full items-center justify-center">
      {/* Header */}
      <div className="w-full flex justify-between items-center bg-secondary/20 p-6 rounded-[2rem] border border-border">
         <div className="flex flex-col">
           <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Prime Hunter Score</span>
           <span className="text-3xl font-black text-primary">{score}</span>
         </div>
         <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Hunt Time</span>
            <span className={`text-3xl font-black ${timeLeft < 10 ? "text-rose-500 animate-pulse" : "text-foreground"}`}>{timeLeft}s</span>
         </div>
         <div className="flex flex-col items-end">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Target</span>
            <span className="text-xs font-black uppercase tracking-widest text-emerald-500">IDENTIFY PRIMES</span>
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
              <h3 className="text-4xl font-black uppercase tracking-tight">Prime Number Hunter</h3>
              <p className="text-muted-foreground font-medium">Quickly identify which numbers in the grid are prime. Accuracy and speed are critical for a high score.</p>
            </div>
            <button 
              onClick={startGame}
              className="px-12 py-5 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
            >
              <Play size={20} /> Begin Hunt
            </button>
          </motion.div>
        ) : gameState === "playing" ? (
          <motion.div 
            key="playing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-3 gap-6 w-full max-w-xl"
          >
            {numbers.map((num) => (
              <motion.button
                key={num}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleChoice(num)}
                className={`aspect-square rounded-[2rem] border-2 flex items-center justify-center text-4xl font-black transition-all ${
                  feedback?.id === num 
                    ? (feedback.type === "correct" ? "bg-emerald-500 border-emerald-400 text-white shadow-xl shadow-emerald-500/20" : "bg-rose-500 border-rose-400 text-white shadow-xl shadow-rose-500/20")
                    : "bg-secondary/30 border-border text-foreground hover:border-primary/50"
                }`}
              >
                {num}
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="ended"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-8"
          >
            <CheckCircle2 size={64} className="text-emerald-500 mx-auto" />
            <h3 className="text-5xl font-black uppercase tracking-tight">Hunt Concluded</h3>
            <div className="space-y-2">
              <p className="text-xl text-muted-foreground font-medium">Final Hunt Score</p>
              <div className="text-7xl font-black text-primary">{score}</div>
            </div>
            <button 
              onClick={startGame}
              className="px-12 py-5 bg-secondary text-foreground rounded-[2rem] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all border border-border flex items-center gap-3 mx-auto"
            >
              <RotateCcw size={20} /> Hunt Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
