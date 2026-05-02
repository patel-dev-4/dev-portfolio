"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Target as TargetIcon, Zap } from "lucide-react";

export default function TrajectoryShooter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "ended">("idle");
  const [score, setScore] = useState(0);
  const [shots, setShots] = useState(10);
  const [angle, setAngle] = useState(45);
  const [power, setPower] = useState(50);
  const [isFiring, setIsFiring] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const targetRef = useRef({ x: 0, y: 0, size: 30 });
  const ballRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, active: false });

  const resetTarget = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    targetRef.current = {
      x: canvas.width * (0.6 + Math.random() * 0.3),
      y: canvas.height * (0.2 + Math.random() * 0.6),
      size: 25 + Math.random() * 15
    };
  }, []);

  const fire = () => {
    if (isFiring || shots <= 0) return;
    
    setIsFiring(true);
    setShots(s => s - 1);
    
    const rad = (angle * Math.PI) / 180;
    const p = power * 0.3;
    ballRef.current = {
      x: 50,
      y: canvasRef.current!.height - 50,
      vx: Math.cos(rad) * p,
      vy: -Math.sin(rad) * p,
      active: true
    };
  };

  useEffect(() => {
    if (gameState !== "playing") return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Ground
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 50);
      ctx.lineTo(canvas.width, canvas.height - 50);
      ctx.stroke();

      // Draw Launcher
      ctx.fillStyle = "#3b82f6";
      ctx.beginPath();
      ctx.arc(50, canvas.height - 50, 20, 0, Math.PI * 2);
      ctx.fill();

      // Draw Aim Line
      if (!isFiring) {
        const rad = (angle * Math.PI) / 180;
        ctx.strokeStyle = "rgba(59, 130, 246, 0.4)";
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(50, canvas.height - 50);
        ctx.lineTo(50 + Math.cos(rad) * power * 2, canvas.height - 50 - Math.sin(rad) * power * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw Target
      const grad = ctx.createRadialGradient(
        targetRef.current.x, targetRef.current.y, 0,
        targetRef.current.x, targetRef.current.y, targetRef.current.size
      );
      grad.addColorStop(0, "#f43f5e");
      grad.addColorStop(0.5, "#fb7185");
      grad.addColorStop(1, "transparent");
      
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(targetRef.current.x, targetRef.current.y, targetRef.current.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw Bullseye
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(targetRef.current.x, targetRef.current.y, 5, 0, Math.PI * 2);
      ctx.stroke();

      // Update & Draw Ball
      if (ballRef.current.active) {
        ballRef.current.vy += 0.15; // Gravity
        ballRef.current.x += ballRef.current.vx;
        ballRef.current.y += ballRef.current.vy;

        ctx.fillStyle = "white";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#3b82f6";
        ctx.beginPath();
        ctx.arc(ballRef.current.x, ballRef.current.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Collision Check
        const dist = Math.hypot(ballRef.current.x - targetRef.current.x, ballRef.current.y - targetRef.current.y);
        if (dist < targetRef.current.size + 6) {
          setScore(s => s + 100);
          setFeedback("BULLSEYE!");
          ballRef.current.active = false;
          setIsFiring(false);
          resetTarget();
          setTimeout(() => setFeedback(null), 1000);
        }

        // Out of bounds
        if (ballRef.current.x > canvas.width || ballRef.current.y > canvas.height - 50) {
          ballRef.current.active = false;
          setIsFiring(false);
          setFeedback("MISSED");
          setTimeout(() => setFeedback(null), 1000);
        }
      }

      if (shots === 0 && !ballRef.current.active) {
        setGameState("ended");
      }

      animationFrame = requestAnimationFrame(update);
    };

    resetTarget();
    update();

    return () => cancelAnimationFrame(animationFrame);
  }, [gameState, isFiring, angle, power, resetTarget, shots]);

  return (
    <div className="flex flex-col gap-8 h-full items-center">
      {/* HUD */}
      <div className="w-full flex justify-between items-center bg-secondary/20 p-6 rounded-[2rem] border border-border">
         <div className="flex flex-col">
           <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Accuracy Score</span>
           <span className="text-3xl font-black text-primary">{score}</span>
         </div>
         <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Projectiles</span>
            <div className="flex gap-1 mt-1">
               {Array.from({ length: 10 }).map((_, i) => (
                 <div key={i} className={`w-3 h-6 rounded-sm ${i < shots ? "bg-primary" : "bg-muted"}`} />
               ))}
            </div>
         </div>
         <div className="flex flex-col items-end">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Feedback</span>
            <AnimatePresence>
               {feedback && (
                 <motion.span 
                   initial={{ opacity: 0, scale: 0.5 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0 }}
                   className={`text-xl font-black uppercase tracking-tighter ${feedback === "BULLSEYE!" ? "text-emerald-500" : "text-rose-500"}`}
                 >
                   {feedback}
                 </motion.span>
               )}
            </AnimatePresence>
         </div>
      </div>

      <div className="relative w-full max-w-4xl aspect-[2/1] bg-black/40 rounded-[2.5rem] border border-border overflow-hidden">
        {gameState === "idle" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-10 text-center p-8">
            <TargetIcon size={64} className="text-rose-500 mb-6 animate-pulse" />
            <h3 className="text-4xl font-black uppercase tracking-tight mb-4">Trajectory Shooter</h3>
            <p className="text-muted-foreground max-w-md mb-8">Master the physics of parabolic flight. Adjust your angle and power to hit the target in 10 shots.</p>
            <button 
              onClick={() => { setGameState("playing"); setScore(0); setShots(10); }}
              className="px-12 py-5 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
            >
              Start Mission
            </button>
          </div>
        ) : gameState === "ended" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-10 text-center p-8">
            <h3 className="text-5xl font-black uppercase tracking-tight mb-2">Mission Over</h3>
            <p className="text-xl text-muted-foreground mb-4">Final Score</p>
            <div className="text-7xl font-black text-primary mb-8">{score}</div>
            <button 
              onClick={() => { setGameState("playing"); setScore(0); setShots(10); }}
              className="px-12 py-5 bg-secondary text-foreground rounded-[2rem] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all border border-border flex items-center gap-3"
            >
              <RotateCcw size={20} /> Retry
            </button>
          </div>
        ) : null}
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={400} 
          className="w-full h-full"
        />
      </div>

      {/* Controls */}
      {gameState === "playing" && (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Angle: {angle}°</label>
            <input 
              type="range" min="0" max="90" value={angle}
              onChange={(e) => setAngle(parseInt(e.target.value))}
              className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
            />
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Power: {power}</label>
            <input 
              type="range" min="10" max="100" value={power}
              onChange={(e) => setPower(parseInt(e.target.value))}
              className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
            />
          </div>
          <button 
            onClick={fire}
            disabled={isFiring || shots === 0}
            className="h-full bg-primary text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
          >
            <Zap size={20} /> Launch Projectile
          </button>
        </div>
      )}
    </div>
  );
}
