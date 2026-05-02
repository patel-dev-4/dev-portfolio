"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, RotateCcw, Play, AlertTriangle } from "lucide-react";

export default function GravityFlipRunner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "ended">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const playerRef = useRef({
    y: 0,
    isTop: false,
    width: 30,
    height: 30,
    targetY: 0
  });

  const obstaclesRef = useRef<{ x: number, y: number, width: number, height: number }[]>([]);

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    obstaclesRef.current = [];
    playerRef.current.isTop = false;
    playerRef.current.y = 350;
    playerRef.current.targetY = 350;
  };

  const flipGravity = () => {
    if (gameState !== "playing") return;
    playerRef.current.isTop = !playerRef.current.isTop;
    playerRef.current.targetY = playerRef.current.isTop ? 50 : 350;
  };

  useEffect(() => {
    if (gameState !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;
    let obstacleTimer = 0;

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth player movement
      playerRef.current.y += (playerRef.current.targetY - playerRef.current.y) * 0.2;

      // Draw Rails
      ctx.fillStyle = "rgba(255,255,255,0.1)";
      ctx.fillRect(0, 40, canvas.width, 10);
      ctx.fillRect(0, 350, canvas.width, 10);

      // Draw Player
      ctx.fillStyle = "#3b82f6";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#3b82f6";
      ctx.fillRect(50, playerRef.current.y - 15, playerRef.current.width, playerRef.current.height);
      ctx.shadowBlur = 0;

      // Spawn Obstacles
      obstacleTimer++;
      if (obstacleTimer > Math.max(30, 80 - (score / 100))) {
        const isTop = Math.random() > 0.5;
        obstaclesRef.current.push({
          x: canvas.width,
          y: isTop ? 50 : 350,
          width: 30,
          height: 40 + Math.random() * 40
        });
        obstacleTimer = 0;
      }

      // Update & Draw Obstacles
      obstaclesRef.current = obstaclesRef.current.filter(obs => {
        obs.x -= 5 + (score / 500);

        ctx.fillStyle = "#f43f5e";
        ctx.fillRect(obs.x, obs.y - (obs.y === 50 ? 0 : obs.height), obs.width, obs.height);

        // Collision Check
        const p = playerRef.current;
        const pRect = { x: 50, y: p.y - 15, w: p.width, h: p.height };
        const oRect = { x: obs.x, y: obs.y === 50 ? obs.y : obs.y - obs.height, w: obs.width, h: obs.height };

        if (
          pRect.x < oRect.x + oRect.w &&
          pRect.x + pRect.w > oRect.x &&
          pRect.y < oRect.y + oRect.h &&
          pRect.y + pRect.h > oRect.y
        ) {
          setGameState("ended");
        }

        return obs.x > -50;
      });

      setScore(s => s + 1);
      animationFrame = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(animationFrame);
  }, [gameState, score]);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  return (
    <div className="flex flex-col gap-8 h-full items-center">
      {/* HUD */}
      <div className="w-full flex justify-between items-center bg-secondary/20 p-6 rounded-[2rem] border border-border">
         <div className="flex flex-col">
           <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Current Distance</span>
           <span className="text-3xl font-black text-primary">{score}m</span>
         </div>
         <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Highest Record</span>
            <span className="text-xl font-black text-foreground">{highScore}m</span>
         </div>
         <div className="flex flex-col items-end">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Control</span>
            <span className="text-xs font-black uppercase text-primary">CLICK / SPACE TO FLIP</span>
         </div>
      </div>

      <div 
        className="relative w-full max-w-4xl h-[400px] bg-black/40 rounded-[2.5rem] border border-border overflow-hidden cursor-pointer"
        onClick={flipGravity}
      >
        <AnimatePresence mode="wait">
          {gameState === "idle" ? (
            <motion.div 
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20 text-center p-8"
            >
              <Zap size={64} className="text-blue-500 mb-6 animate-bounce" />
              <h3 className="text-4xl font-black uppercase tracking-tight mb-4">Gravity Flip Runner</h3>
              <p className="text-muted-foreground max-w-md mb-8">Defy physics. Flip gravity to switch between rails and avoid incoming obstacles. Speed increases over time.</p>
              <button 
                onClick={(e) => { e.stopPropagation(); startGame(); }}
                className="px-12 py-5 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
              >
                Launch Protocol
              </button>
            </motion.div>
          ) : gameState === "ended" ? (
            <motion.div 
              key="ended"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20 text-center p-8"
            >
              <AlertTriangle size={64} className="text-rose-500 mb-6" />
              <h3 className="text-5xl font-black uppercase tracking-tight mb-2">Impact Detected</h3>
              <p className="text-xl text-muted-foreground mb-4">Distance Traveled</p>
              <div className="text-7xl font-black text-primary mb-8">{score}m</div>
              <button 
                onClick={(e) => { e.stopPropagation(); startGame(); }}
                className="px-12 py-5 bg-secondary text-foreground rounded-[2rem] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all border border-border flex items-center gap-3"
              >
                <RotateCcw size={20} /> Attempt Reboot
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <canvas 
          ref={canvasRef} 
          width={800} 
          height={400} 
          className="w-full h-full"
        />
        
        {gameState === "playing" && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
             <span className="text-[10px] font-black uppercase tracking-[1em] text-white">GRAVITY FLIP SYSTEM ACTIVE</span>
          </div>
        )}
      </div>
    </div>
  );
}
