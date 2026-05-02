"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crosshair, RotateCcw } from "lucide-react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export default function PrecisionClick() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [gameState, setGameState] = useState<"idle" | "playing" | "finished">("idle");
  const [timeLeft, setTimeLeft] = useState(30);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("precision-click-best");
      return saved ? parseInt(saved) : 0;
    }
    return 0;
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  const spawnParticles = useCallback((count: number) => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * (width - 20),
      y: Math.random() * (height - 20),
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      size: Math.random() * 10 + 8 // 8-18px
    }));
    setParticles(newParticles);
  }, []);

  const update = useCallback(() => {
    if (gameState !== "playing" || !containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();

    setParticles(prev => prev.map(p => {
      const nx = p.x + p.vx;
      const ny = p.y + p.vy;
      let nvx = p.vx;
      let nvy = p.vy;

      if (nx <= 0 || nx >= width - p.size) nvx *= -1;
      if (ny <= 0 || ny >= height - p.size) nvy *= -1;

      return { ...p, x: nx, y: ny, vx: nvx, vy: nvy };
    }));
  }, [gameState]);

  useEffect(() => {
    if (gameState !== "playing") return;
    
    let frameId: number;
    const loop = () => {
      update();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [gameState, update]);

  const startGame = () => {
    setScore(0);
    setMisses(0);
    setTimeLeft(30);
    setGameState("playing");
    spawnParticles(5);
  };

  const handleHit = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (gameState !== "playing") return;
    setScore(prev => prev + 1);
    setParticles(prev => prev.filter(p => p.id !== id));
    
    if (particles.length <= 1) {
      spawnParticles(5 + Math.floor(score / 10));
    }
  };

  const handleMiss = () => {
    if (gameState !== "playing") return;
    setMisses(prev => prev + 1);
  };

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
    if (gameState === "finished") {
      cancelAnimationFrame(requestRef.current);
      if (score > highScore) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHighScore(score);
        localStorage.setItem("precision-click-best", score.toString());
      }
    }
  }, [gameState, score, highScore]);

  const accuracy = score + misses === 0 ? 0 : Math.round((score / (score + misses)) * 100);

  return (
    <div className="flex flex-col h-full items-center justify-center gap-8 py-4">
      <div className="text-center">
        <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter flex items-center justify-center gap-3">
           <Crosshair className="text-primary" /> Precision Click Challenge
        </h2>
        <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
           Hit the tiny moving targets. Every miss counts.
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
        {particles.map(p => (
          <motion.button
            key={p.id}
            onClick={(e) => handleHit(e, p.id)}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
            }}
            className="rounded-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)] border border-white/20 hover:scale-125 transition-transform"
          />
        ))}

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
                    <h3 className="text-4xl font-black uppercase mb-2">Results</h3>
                    <div className="flex gap-8 justify-center">
                       <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">Score</span>
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
                  className="flex items-center gap-2 px-12 py-6 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl shadow-primary/40"
                >
                  {gameState === "idle" ? "Start Session" : "Restart Trainer"} <RotateCcw size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
