"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, RotateCcw, Zap } from "lucide-react";

interface Obstacle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
}

export default function DodgeGame() {
  const [playerX, setPlayerX] = useState(50);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<"idle" | "playing" | "finished">("idle");
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dodge-chaos-best");
      return saved ? parseInt(saved) : 0;
    }
    return 0;
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const lastSpawnRef = useRef<number>(0);

  const update = useCallback((time: number) => {
    if (gameState !== "playing") return;

    // Spawn new obstacles
    if (time - lastSpawnRef.current > Math.max(200, 1000 - score * 5)) {
      const size = Math.random() * 30 + 20;
      const x = Math.random() * 90;
      setObstacles(prev => [...prev, { id: time, x, y: -10, size, speed: Math.random() * 2 + 2 + score / 100 }]);
      lastSpawnRef.current = time;
    }

    // Move obstacles and check collisions
    setObstacles(prev => {
      const next = prev.map(o => ({ ...o, y: o.y + o.speed })).filter(o => o.y < 110);
      
      const playerY = 90;
      for (const o of next) {
        // Simple bounding box collision
        if (o.y > playerY - 5 && o.y < playerY + 5 && playerX > o.x - 5 && playerX < o.x + o.size/2) {
          setGameState("finished");
          return next;
        }
      }

      setScore(s => s + 1);
      return next;
    });
  }, [gameState, playerX, score]);

  useEffect(() => {
    if (gameState !== "playing") return;
    
    let frameId: number;
    const loop = (time: number) => {
      update(time);
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [gameState, update]);

  const startGame = () => {
    setScore(0);
    setObstacles([]);
    setGameState("playing");
    lastSpawnRef.current = performance.now();
  };

  useEffect(() => {
    if (gameState === "finished") {
      cancelAnimationFrame(requestRef.current);
      if (score > highScore) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHighScore(score);
        localStorage.setItem("dodge-chaos-best", score.toString());
      }
    }
  }, [gameState, score, highScore]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    setPlayerX(Math.max(5, Math.min(95, x)));
  };

  return (
    <div className="flex flex-col h-full items-center justify-center gap-8 py-4">
      <div className="text-center">
        <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter flex items-center justify-center gap-3">
           <ShieldAlert className="text-rose-500" /> Dodge Chaos
        </h2>
        <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
           Move your mouse to dodge falling obstacles
        </p>
      </div>

      <div className="flex gap-12 mb-4">
         <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Survival Score</span>
            <span className="text-3xl font-black text-primary">{score}</span>
         </div>
         <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Best</span>
            <span className="text-3xl font-black text-yellow-500">{highScore}</span>
         </div>
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full max-w-lg aspect-[3/4] bg-secondary/20 rounded-[3rem] border border-border cursor-none overflow-hidden"
      >
        {/* Player */}
        <motion.div
          animate={{ left: `${playerX}%` }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="absolute bottom-[10%] w-10 h-10 -ml-5 rounded-xl bg-primary border-2 border-white shadow-[0_0_20px_rgba(var(--primary),0.5)] z-10 flex items-center justify-center"
        >
          <Zap size={20} className="text-white fill-white" />
        </motion.div>

        {/* Obstacles */}
        {obstacles.map(o => (
          <div
            key={o.id}
            style={{
              position: "absolute",
              left: `${o.x}%`,
              top: `${o.y}%`,
              width: `${o.size}px`,
              height: `${o.size}px`
            }}
            className="rounded-lg bg-rose-500/80 shadow-lg shadow-rose-500/20 border border-white/10"
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
                    <h3 className="text-4xl font-black uppercase mb-2">Eliminated</h3>
                    <p className="text-primary font-bold text-xl uppercase tracking-widest">Score: {score}</p>
                  </div>
                )}
                <button 
                  onClick={startGame}
                  className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl shadow-primary/40"
                >
                  {gameState === "idle" ? "Enter the Chaos" : "Respawn"} <RotateCcw size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
