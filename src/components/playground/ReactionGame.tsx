"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, RotateCcw, Trophy, Timer } from "lucide-react";

type GameState = "waiting" | "pending" | "active" | "result";

export default function ReactionGame() {
  const [gameState, setGameState] = useState<GameState>("waiting");
  const [startTime, setStartTime] = useState<number>(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestScore, setBestScore] = useState<number | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("reaction-best-score");
      return saved ? parseInt(saved) : null;
    }
    return null;
  });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = useCallback(() => {
    setGameState("pending");
    const delay = Math.random() * 3000 + 2000; // 2-5 seconds
    timerRef.current = setTimeout(() => {
      setGameState("active");
      setStartTime(performance.now());
    }, delay);
  }, []);

  const handleClick = useCallback(() => {
    if (gameState === "pending") {
      if (timerRef.current) clearTimeout(timerRef.current);
      setGameState("result");
      setReactionTime(-1); // Tool soon
    } else if (gameState === "active") {
      const endTime = performance.now();
      const time = Math.round(endTime - startTime);
      setReactionTime(time);
      setGameState("result");
      
      if (!bestScore || time < bestScore) {
        setBestScore(time);
        localStorage.setItem("reaction-best-score", time.toString());
      }
    } else if (gameState === "waiting" || gameState === "result") {
      startGame();
    }
  }, [gameState, startTime, bestScore, startGame]);


  return (
    <div className="flex flex-col h-full items-center justify-center gap-8 py-8 select-none">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter flex items-center justify-center gap-3">
           <Zap className="text-primary" /> Lightning Reflexes
        </h2>
        <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
           Test your reaction time. Fast clicks only.
        </p>
      </div>

      <motion.div
        onClick={handleClick}
        animate={{
          backgroundColor: 
            gameState === "pending" ? "var(--secondary)" :
            gameState === "active" ? "var(--primary)" :
            gameState === "result" && reactionTime === -1 ? "#ef4444" :
            "var(--secondary)"
        }}
        className={`w-full max-w-2xl aspect-video rounded-[3rem] border-4 border-border/50 cursor-pointer flex flex-col items-center justify-center text-center p-12 transition-colors duration-200 relative overflow-hidden`}
      >
        <AnimatePresence mode="wait">
          {gameState === "waiting" && (
            <motion.div
              key="waiting"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary">
                <Timer size={40} />
              </div>
              <div>
                <h3 className="text-3xl font-black uppercase mb-2">Ready?</h3>
                <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">Click anywhere to start</p>
              </div>
            </motion.div>
          )}

          {gameState === "pending" && (
            <motion.div
              key="pending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="flex gap-2">
                 <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-3 h-3 rounded-full bg-primary" />
                 <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-3 h-3 rounded-full bg-primary" />
                 <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-3 h-3 rounded-full bg-primary" />
              </div>
              <h3 className="text-4xl font-black uppercase">Wait for Green...</h3>
            </motion.div>
          )}

          {gameState === "active" && (
            <motion.div
              key="active"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <h3 className="text-6xl font-black uppercase text-white drop-shadow-lg">CLICK NOW!</h3>
            </motion.div>
          )}

          {gameState === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-6"
            >
              {reactionTime === -1 ? (
                <>
                  <h3 className="text-5xl font-black uppercase text-white">Too Soon!</h3>
                  <p className="text-white/80 font-bold uppercase tracking-widest">Wait for the green screen.</p>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-2">Your Time</span>
                    <h3 className="text-7xl font-black uppercase text-primary tracking-tighter">
                      {reactionTime}<span className="text-2xl ml-2">ms</span>
                    </h3>
                  </div>
                  <button 
                    onClick={startGame}
                    className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform"
                  >
                    Try Again <RotateCcw size={18} />
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Stats */}
      <div className="flex gap-8">
        <div className="flex flex-col items-center">
           <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Trophy size={14} className="text-yellow-500" />
              <span className="text-[10px] font-black uppercase tracking-widest">Personal Best</span>
           </div>
           <span className="text-2xl font-black text-foreground">
             {bestScore ? `${bestScore}ms` : "--"}
           </span>
        </div>
      </div>
    </div>
  );
}
