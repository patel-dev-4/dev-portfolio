"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ListOrdered, RotateCcw } from "lucide-react";

export default function SpeedSort() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [nextExpected, setNextExpected] = useState(1);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [finishTime, setFinishTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("speed-sort-best");
      return saved ? parseFloat(saved) : null;
    }
    return null;
  });
  const [gameState, setGameState] = useState<"idle" | "playing" | "finished">("idle");

  const startGame = () => {
    const nums = Array.from({ length: 20 }, (_, i) => i + 1);
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    setNumbers(nums);
    setNextExpected(1);
    setStartTime(performance.now());
    setFinishTime(null);
    setGameState("playing");
  };

  const handleNumberClick = (num: number) => {
    if (gameState !== "playing") return;

    if (num === nextExpected) {
      if (num === 20) {
        // eslint-disable-next-line react-hooks/purity
        const end = performance.now();
        const time = (end - startTime!) / 1000;
        setFinishTime(time);
        setGameState("finished");
        if (bestTime === null || time < bestTime) {
          setBestTime(time);
          localStorage.setItem("speed-sort-best", time.toString());
        }
      } else {
        setNextExpected(prev => prev + 1);
      }
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-center gap-8 py-4">
      <div className="text-center">
        <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter flex items-center justify-center gap-3">
           <ListOrdered className="text-primary" /> Number Speed Sort
        </h2>
        <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
           Click numbers 1 to 20 in ascending order as fast as possible
        </p>
      </div>

      <div className="flex gap-12 mb-4">
         <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Target</span>
            <span className="text-3xl font-black text-primary">{nextExpected}</span>
         </div>
         <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Record</span>
            <span className="text-3xl font-black text-yellow-500">{bestTime ? `${bestTime.toFixed(2)}s` : "--"}</span>
         </div>
      </div>

      <div className="relative">
        <div className="grid grid-cols-5 gap-3 p-6 bg-secondary/20 rounded-[2.5rem] border border-border">
          {numbers.map((num) => (
            <motion.button
              key={num}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleNumberClick(num)}
              className={`w-14 h-14 md:w-16 md:h-16 rounded-xl border-2 font-black transition-all duration-200 ${
                num < nextExpected 
                  ? "bg-primary/10 border-primary/20 text-primary/30" 
                  : num === nextExpected 
                    ? "bg-primary border-white text-white shadow-lg shadow-primary/30" 
                    : "bg-background border-border/50 hover:border-primary/30"
              }`}
            >
              {num}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {(gameState === "idle" || gameState === "finished") && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-[2.5rem]"
            >
              <div className="text-center p-8">
                {gameState === "finished" && (
                  <div className="mb-6">
                    <h3 className="text-4xl font-black uppercase mb-2">Sorted!</h3>
                    <p className="text-primary font-bold text-3xl uppercase tracking-tighter">{finishTime?.toFixed(3)}s</p>
                  </div>
                )}
                <button 
                  onClick={startGame}
                  className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl shadow-primary/40"
                >
                  {gameState === "idle" ? "Start Blitz" : "Try Again"} <RotateCcw size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
