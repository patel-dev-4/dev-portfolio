"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crosshair, RotateCcw } from "lucide-react";

interface Target {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function AimTrainer() {
  const [targets, setTargets] = useState<Target[]>([]);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState<"idle" | "playing" | "finished">("idle");
  const [highScore, setHighScore] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("aim-trainer-best");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const spawnTarget = useCallback(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const size = Math.random() * 40 + 30; // 30-70px
    const x = Math.random() * (width - size);
    const y = Math.random() * (height - size);
    
    setTargets([{ id: Date.now(), x, y, size }]);
  }, []);

  const startGame = () => {
    setScore(0);
    setMisses(0);
    setTimeLeft(30);
    setGameState("playing");
    spawnTarget();
  };

  const handleHit = (e: React.MouseEvent, targetId: number) => {
    e.stopPropagation();
    if (gameState !== "playing") return;
    setScore(prev => prev + 1);
    setTargets(prev => prev.filter(t => t.id !== targetId));
    spawnTarget();
  };

  const handleMiss = () => {
    if (gameState !== "playing") return;
    setMisses(prev => prev + 1);
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
      localStorage.setItem("aim-trainer-best", score.toString());
    }
  }, [gameState, score, highScore]);

  const accuracy = score + misses === 0 ? 0 : Math.round((score / (score + misses)) * 100);

  return (
    <div className="flex flex-col h-full items-center justify-center gap-8 py-4">
      <div className="text-center">
        <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter flex items-center justify-center gap-3">
           <Crosshair className="text-primary" /> Aim Trainer
        </h2>
        <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
           Hit the targets as fast as possible. Accuracy matters.
        </p>
      </div>

      <div className="flex gap-12 mb-4">
         <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Hits</span>
            <span className="text-3xl font-black text-primary">{score}</span>
         </div>
         <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Accuracy</span>
            <span className="text-3xl font-black text-foreground">{accuracy}%</span>
         </div>
         <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Time</span>
            <span className="text-3xl font-black text-foreground">{timeLeft}s</span>
         </div>
      </div>

      <div 
        ref={containerRef}
        onClick={handleMiss}
        className="relative w-full max-w-4xl aspect-video bg-secondary/20 rounded-[3rem] border border-border cursor-crosshair overflow-hidden"
      >
        <AnimatePresence>
          {targets.map(target => (
            <motion.button
              key={target.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={(e) => handleHit(e, target.id)}
              style={{
                position: "absolute",
                left: target.x,
                top: target.y,
                width: target.size,
                height: target.size
              }}
              className="rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/40 border-4 border-white/20"
            >
              <div className="w-1/2 h-1/2 rounded-full bg-white/30" />
            </motion.button>
          ))}
        </AnimatePresence>

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
                    <h3 className="text-4xl font-black uppercase mb-2">Trainer Complete</h3>
                    <div className="flex gap-8 justify-center mb-4">
                       <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">Hits</span>
                          <span className="text-2xl font-black">{score}</span>
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">Accuracy</span>
                          <span className="text-2xl font-black">{accuracy}%</span>
                       </div>
                    </div>
                  </div>
                )}
                <button 
                  onClick={startGame}
                  className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl shadow-primary/40"
                >
                  {gameState === "idle" ? "Start Training" : "Restart Session"} <RotateCcw size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
