"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, RotateCcw, XCircle, CheckCircle2 } from "lucide-react";

const COLORS = [
  { name: "RED", value: "#ef4444" },
  { name: "BLUE", value: "#3b82f6" },
  { name: "GREEN", value: "#10b981" },
  { name: "YELLOW", value: "#f59e0b" },
  { name: "PURPLE", value: "#8b5cf6" },
  { name: "PINK", value: "#ec4899" },
];

export default function ColorMatch() {
  const [targetWord, setTargetWord] = useState("");
  const [targetColor, setTargetColor] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState<"idle" | "playing" | "finished">("idle");
  const [highScore, setHighScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("color-match-best");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const nextChallenge = useCallback(() => {
    const wordIdx = Math.floor(Math.random() * COLORS.length);
    const colorIdx = Math.floor(Math.random() * COLORS.length);
    setTargetWord(COLORS[wordIdx].name);
    setTargetColor(COLORS[colorIdx].value);
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameState("playing");
    nextChallenge();
  };

  const handleChoice = (colorValue: string) => {
    if (gameState !== "playing") return;

    if (colorValue === targetColor) {
      setScore(prev => prev + 1);
      setFeedback("correct");
      nextChallenge();
    } else {
      setScore(prev => Math.max(0, prev - 2));
      setFeedback("wrong");
    }
    setTimeout(() => setFeedback(null), 500);
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
      localStorage.setItem("color-match-best", score.toString());
    }
  }, [gameState, score, highScore]);

  return (
    <div className="flex flex-col h-full items-center justify-center gap-8 py-4">
      <div className="text-center">
        <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter flex items-center justify-center gap-3">
           <Palette className="text-primary" /> Color Match Chaos
        </h2>
        <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
           Click the color of the text, not the word itself!
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

      <div className="relative w-full max-w-2xl aspect-video glass-card rounded-[3rem] border border-border flex flex-col items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {gameState === "playing" ? (
            <motion.div
              key={targetWord + targetColor}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              className="text-7xl md:text-9xl font-black italic tracking-tighter transition-colors"
              style={{ color: targetColor }}
            >
              {targetWord}
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-8"
            >
              {gameState === "finished" && (
                <div className="mb-6">
                  <h3 className="text-4xl font-black uppercase mb-2">Chaos Ended</h3>
                  <p className="text-primary font-bold text-2xl uppercase tracking-tighter">Score: {score}</p>
                </div>
              )}
              <button 
                onClick={startGame}
                className="flex items-center gap-2 px-12 py-6 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl shadow-primary/40"
              >
                {gameState === "idle" ? "Start Chaos" : "Try Again"} <RotateCcw size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feedback Overlay */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
            >
              {feedback === "correct" ? (
                <CheckCircle2 size={120} className="text-emerald-500/40" />
              ) : (
                <XCircle size={120} className="text-rose-500/40" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 w-full max-w-2xl mt-4">
        {COLORS.map((color) => (
          <motion.button
            key={color.value}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleChoice(color.value)}
            disabled={gameState !== "playing"}
            className="h-16 rounded-2xl border-2 border-border/50 shadow-lg transition-all"
            style={{ backgroundColor: color.value }}
          />
        ))}
      </div>
    </div>
  );
}
