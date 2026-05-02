"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Play, CheckCircle2 } from "lucide-react";

export default function BinaryConversionRace() {
  const [gameState, setGameState] = useState<"idle" | "playing" | "ended">("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [targetBinary, setTargetBinary] = useState("");
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const generateProblem = useCallback(() => {
    const num = Math.floor(Math.random() * 63) + 1; // 1 to 63 (up to 6 bits)
    setCurrentNumber(num);
    setTargetBinary(num.toString(2));
    setUserInput("");
    setFeedback(null);
  }, []);

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setTimeLeft(60);
    generateProblem();
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

  const checkAnswer = (val: string) => {
    setUserInput(val);
    if (val === targetBinary) {
      setFeedback("correct");
      setScore(s => s + 100);
      setTimeout(generateProblem, 300);
    } else if (val.length >= targetBinary.length && val !== targetBinary) {
      // Don't mark wrong immediately, let them finish or fix
    }
  };

  return (
    <div className="flex flex-col gap-12 h-full items-center justify-center">
      {/* Header */}
      <div className="w-full flex justify-between items-center bg-secondary/20 p-6 rounded-[2rem] border border-border">
         <div className="flex flex-col">
           <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Race Score</span>
           <span className="text-3xl font-black text-primary">{score}</span>
         </div>
         <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Time Left</span>
            <span className={`text-3xl font-black ${timeLeft < 10 ? "text-rose-500 animate-pulse" : "text-foreground"}`}>{timeLeft}s</span>
         </div>
         <div className="flex flex-col items-end">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Bit Depth</span>
            <span className="text-xs font-black uppercase tracking-widest text-primary">6-BIT MODE</span>
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
              <h3 className="text-4xl font-black uppercase tracking-tight">Binary Conversion Race</h3>
              <p className="text-muted-foreground font-medium">Convert the decimal numbers to their binary representation as fast as possible. Efficiency is key.</p>
            </div>
            <button 
              onClick={startGame}
              className="px-12 py-5 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
            >
              <Play size={20} /> Start Race
            </button>
          </motion.div>
        ) : gameState === "playing" ? (
          <motion.div 
            key="playing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xl text-center space-y-12"
          >
            <div className="space-y-4">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Decimal Number</span>
               <div className="text-8xl font-black text-primary drop-shadow-2xl">{currentNumber}</div>
            </div>

            <div className="relative">
              <input 
                autoFocus
                type="text"
                value={userInput}
                onChange={(e) => checkAnswer(e.target.value.replace(/[^01]/g, ""))}
                placeholder="010101"
                className={`w-full bg-secondary/30 border-2 rounded-[2rem] px-8 py-8 text-6xl font-mono font-black text-center focus:outline-none transition-all ${
                  feedback === "correct" ? "border-emerald-500 text-emerald-500 shadow-lg shadow-emerald-500/20" : "border-border text-foreground"
                }`}
              />
              <div className="absolute -bottom-8 left-0 w-full flex justify-center gap-4">
                 {[32, 16, 8, 4, 2, 1].map(bit => (
                   <span key={bit} className="text-[10px] font-black text-muted-foreground/30 uppercase">{bit}</span>
                 ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <button 
                 onClick={() => checkAnswer(userInput + "0")}
                 className="py-8 bg-secondary/50 rounded-3xl text-4xl font-black hover:bg-primary hover:text-white transition-all active:scale-95 border border-border"
               >
                 0
               </button>
               <button 
                 onClick={() => checkAnswer(userInput + "1")}
                 className="py-8 bg-secondary/50 rounded-3xl text-4xl font-black hover:bg-primary hover:text-white transition-all active:scale-95 border border-border"
               >
                 1
               </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="ended"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-8"
          >
            <CheckCircle2 size={64} className="text-emerald-500 mx-auto" />
            <h3 className="text-5xl font-black uppercase tracking-tight">Race Finished</h3>
            <div className="space-y-2">
              <p className="text-xl text-muted-foreground font-medium">Final Score</p>
              <div className="text-7xl font-black text-primary">{score}</div>
            </div>
            <button 
              onClick={startGame}
              className="px-12 py-5 bg-secondary text-foreground rounded-[2rem] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all border border-border flex items-center gap-3 mx-auto"
            >
              <RotateCcw size={20} /> Restart Race
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
