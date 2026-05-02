"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Sword, Heart, RotateCcw, Play } from "lucide-react";

interface Enemy {
  id: string;
  word: string;
  x: number;
  y: number;
  speed: number;
}

const WORDS = [
  "async", "await", "promise", "callback", "closure", "hydrate", "render",
  "component", "hook", "state", "effect", "memo", "context", "props",
  "interface", "generic", "tuple", "union", "literal", "unknown",
  "middleware", "handler", "endpoint", "database", "query", "schema"
];

export default function SpeedTypingCombat() {
  const [gameState, setGameState] = useState<"idle" | "playing" | "ended">("idle");
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(5);
  const [input, setInput] = useState("");
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const gameLoopRef = useRef<number>();

  const spawnEnemy = useCallback(() => {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    const newEnemy: Enemy = {
      id: crypto.randomUUID(),
      word,
      x: Math.random() * 80 + 10, // 10% to 90%
      y: -50,
      speed: 1 + Math.random() * 1.5 + (score / 1000),
    };
    setEnemies(prev => [...prev, newEnemy]);
  }, [score]);

  useEffect(() => {
    if (gameState !== "playing") return;

    let lastSpawn = 0;
    const loop = (time: number) => {
      if (time - lastSpawn > Math.max(1000, 2500 - (score / 2))) {
        spawnEnemy();
        lastSpawn = time;
      }

      setEnemies(prev => {
        const next = prev.map(e => ({ ...e, y: e.y + e.speed }));
        const reachedBottom = next.filter(e => e.y > 500);
        if (reachedBottom.length > 0) {
          setHealth(h => {
            const nextH = h - reachedBottom.length;
            if (nextH <= 0) setGameState("ended");
            return nextH;
          });
        }
        return next.filter(e => e.y <= 500);
      });

      gameLoopRef.current = requestAnimationFrame(loop);
    };

    gameLoopRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(gameLoopRef.current!);
  }, [gameState, spawnEnemy, score]);

  const handleInput = (val: string) => {
    setInput(val);
    const targetEnemy = enemies.find(e => e.word === val.trim());
    if (targetEnemy) {
      setScore(s => s + targetEnemy.word.length * 10);
      setEnemies(prev => prev.filter(e => e.id !== targetEnemy.id));
      setInput("");
    }
  };

  return (
    <div className="flex flex-col gap-8 h-full items-center">
      {/* HUD */}
      <div className="w-full flex justify-between items-center bg-secondary/20 p-6 rounded-[2rem] border border-border">
         <div className="flex flex-col">
           <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Combat Score</span>
           <span className="text-3xl font-black text-primary">{score}</span>
         </div>
         <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Heart 
                key={i} 
                size={24} 
                className={i < health ? "text-rose-500 fill-rose-500" : "text-muted opacity-30"} 
              />
            ))}
         </div>
         <div className="flex flex-col items-end">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</span>
            <span className="text-sm font-black uppercase tracking-widest text-emerald-500">Defending...</span>
         </div>
      </div>

      <div className="relative w-full max-w-4xl h-[600px] bg-black/40 rounded-[3rem] border border-border overflow-hidden p-8">
        <AnimatePresence mode="wait">
          {gameState === "idle" ? (
            <motion.div 
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20 text-center p-8"
            >
              <Terminal size={64} className="text-primary mb-6" />
              <h3 className="text-4xl font-black uppercase tracking-tight mb-4">Speed Typing Combat</h3>
              <p className="text-muted-foreground max-w-md mb-8">Defend your system from rogue keywords. Type the falling words to destroy them before they reach the core.</p>
              <button 
                onClick={() => { setGameState("playing"); setScore(0); setHealth(5); setEnemies([]); }}
                className="px-12 py-5 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
              >
                <Sword size={20} /> Initialize Defense
              </button>
            </motion.div>
          ) : gameState === "ended" ? (
            <motion.div 
              key="ended"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20 text-center p-8"
            >
              <h3 className="text-5xl font-black uppercase tracking-tight mb-2 text-rose-500">System Breached</h3>
              <p className="text-xl text-muted-foreground mb-4">Final Combat Score</p>
              <div className="text-7xl font-black text-primary mb-8">{score}</div>
              <button 
                onClick={() => { setGameState("playing"); setScore(0); setHealth(5); setEnemies([]); }}
                className="px-12 py-5 bg-secondary text-foreground rounded-[2rem] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all border border-border flex items-center gap-3"
              >
                <RotateCcw size={20} /> Reboot Defense
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Enemies */}
        {enemies.map(e => (
          <div 
            key={e.id}
            className="absolute transition-all duration-100 ease-linear"
            style={{ left: `${e.x}%`, top: `${e.y}px` }}
          >
            <div className="bg-secondary/40 backdrop-blur-md border border-primary/30 px-4 py-2 rounded-xl">
               <span className="text-lg font-mono font-black tracking-tight text-white">{e.word}</span>
            </div>
            <div className="w-1 h-8 bg-gradient-to-b from-primary/50 to-transparent mx-auto" />
          </div>
        ))}

        {/* Input Area (Bottom) */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-md">
           <input 
             autoFocus
             type="text"
             value={input}
             onChange={(e) => handleInput(e.target.value)}
             className="w-full bg-background/80 backdrop-blur-xl border-2 border-primary/50 rounded-2xl px-8 py-5 text-2xl font-mono font-black text-center text-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all shadow-2xl"
             placeholder="Type words here..."
           />
        </div>
      </div>
    </div>
  );
}
