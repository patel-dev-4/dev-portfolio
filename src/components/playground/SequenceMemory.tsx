"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, RotateCcw } from "lucide-react";

const getRandomTile = () => Math.floor(Math.random() * 9);

export default function SequenceMemory() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [activeTile, setActiveTile] = useState<number | null>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "failed">("idle");
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sequence-memory-best");
      return saved ? parseInt(saved) : 0;
    }
    return 0;
  });

  const startGame = () => {
    const firstTile = getRandomTile();
    setSequence([firstTile]);
    setUserSequence([]);
    setGameState("playing");
    playSequence([firstTile]);
  };

  const playSequence = async (seq: number[]) => {
    setIsShowingSequence(true);
    for (const tile of seq) {
      await new Promise(r => setTimeout(r, 400));
      setActiveTile(tile);
      await new Promise(r => setTimeout(r, 600));
      setActiveTile(null);
    }
    setIsShowingSequence(false);
  };

  const handleTileClick = (index: number) => {
    if (isShowingSequence || gameState !== "playing") return;

    const nextUserSeq = [...userSequence, index];
    setUserSequence(nextUserSeq);

    if (index !== sequence[userSequence.length]) {
      setGameState("failed");
      if (sequence.length - 1 > highScore) {
        setHighScore(sequence.length - 1);
        localStorage.setItem("sequence-memory-best", (sequence.length - 1).toString());
      }
      return;
    }

    if (nextUserSeq.length === sequence.length) {
      const nextSequence = [...sequence, getRandomTile()];
      setSequence(nextSequence);
      setUserSequence([]);
      setTimeout(() => playSequence(nextSequence), 1000);
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-center gap-8 py-4">
      <div className="text-center">
        <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter flex items-center justify-center gap-3">
           <Brain className="text-primary" /> Sequence Memory
        </h2>
        <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
           Watch the sequence and repeat it accurately
        </p>
      </div>

      <div className="flex gap-12 mb-4">
         <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Level</span>
            <span className="text-3xl font-black text-primary">{sequence.length || 1}</span>
         </div>
         <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Best</span>
            <span className="text-3xl font-black text-yellow-500">{highScore}</span>
         </div>
      </div>

      <div className="relative">
        <div className="grid grid-cols-3 gap-4 p-6 bg-secondary/20 rounded-[2.5rem] border border-border">
          {Array(9).fill(0).map((_, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.95 }}
              disabled={isShowingSequence}
              onClick={() => handleTileClick(i)}
              className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl border-2 transition-all duration-300 ${
                activeTile === i 
                  ? "bg-primary border-white shadow-[0_0_40px_rgba(var(--primary),0.8)] scale-105" 
                  : "bg-background border-border/50 hover:border-primary/30"
              }`}
            />
          ))}
        </div>

        <AnimatePresence>
          {gameState !== "playing" && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-[2.5rem]"
            >
              <div className="text-center p-8">
                {gameState === "failed" && (
                  <div className="mb-6">
                    <h3 className="text-4xl font-black uppercase mb-2">Memory Failure</h3>
                    <p className="text-primary font-bold text-xl uppercase tracking-widest">Level Reached: {sequence.length - 1}</p>
                  </div>
                )}
                <button 
                  onClick={startGame}
                  className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl shadow-primary/40"
                >
                  {gameState === "idle" ? "Start Test" : "Retry Pattern"} <RotateCcw size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
