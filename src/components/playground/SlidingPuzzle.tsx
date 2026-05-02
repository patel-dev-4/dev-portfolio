"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid3X3, RotateCcw, Check } from "lucide-react";

export default function SlidingPuzzle() {
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [finishTime, setFinishTime] = useState<number | null>(null);
  const [bestMoves, setBestMoves] = useState<number | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sliding-puzzle-best");
      return saved ? parseInt(saved) : null;
    }
    return null;
  });
  const [isSolved, setIsSolved] = useState(false);

  const initPuzzle = useCallback(() => {
    const newTiles = Array.from({ length: 16 }, (_, i) => (i === 15 ? 0 : i + 1));
    
    // Shuffle tiles (ensure solvable)
    for (let i = 0; i < 200; i++) {
      const emptyIndex = newTiles.indexOf(0);
      const row = Math.floor(emptyIndex / 4);
      const col = emptyIndex % 4;
      const possibleMoves = [];
      if (row > 0) possibleMoves.push(emptyIndex - 4);
      if (row < 3) possibleMoves.push(emptyIndex + 4);
      if (col > 0) possibleMoves.push(emptyIndex - 1);
      if (col < 3) possibleMoves.push(emptyIndex + 1);
      
      const moveIndex = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      [newTiles[emptyIndex], newTiles[moveIndex]] = [newTiles[moveIndex], newTiles[emptyIndex]];
    }

    setTiles(newTiles);
    setMoves(0);
    setStartTime(performance.now());
    setFinishTime(null);
    setIsSolved(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    initPuzzle();
  }, [initPuzzle]);

  const handleTileClick = (index: number) => {
    if (isSolved) return;

    const emptyIndex = tiles.indexOf(0);
    const row = Math.floor(index / 4);
    const col = index % 4;
    const emptyRow = Math.floor(emptyIndex / 4);
    const emptyCol = emptyIndex % 4;

    const isAdjacent = (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
                      (Math.abs(col - emptyCol) === 1 && row === emptyRow);

    if (isAdjacent) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      setMoves(prev => prev + 1);

      // Check if solved
      const isCorrect = newTiles.every((val, i) => (i === 15 ? val === 0 : val === i + 1));
      if (isCorrect) {
        setIsSolved(true);
        // eslint-disable-next-line react-hooks/purity
        const end = performance.now();
        setFinishTime((end - startTime!) / 1000);
        if (bestMoves === null || moves + 1 < bestMoves) {
          setBestMoves(moves + 1);
          localStorage.setItem("sliding-puzzle-best", (moves + 1).toString());
        }
      }
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-center gap-8 py-4">
      <div className="text-center">
        <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter flex items-center justify-center gap-3">
           <Grid3X3 className="text-primary" /> 15 Puzzle Challenge
        </h2>
        <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
           Organize the tiles in ascending order (1-15)
        </p>
      </div>

      <div className="flex gap-12 mb-4">
         <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Moves</span>
            <span className="text-3xl font-black text-primary">{moves}</span>
         </div>
         <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Best Moves</span>
            <span className="text-3xl font-black text-yellow-500">{bestMoves || "--"}</span>
         </div>
      </div>

      <div className="relative">
        <div className="grid grid-cols-4 gap-2 p-4 bg-secondary/20 rounded-[2.5rem] border border-border">
          {tiles.map((num, i) => (
            <motion.button
              key={num}
              layout
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTileClick(i)}
              className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 font-black text-xl transition-all ${
                num === 0 
                  ? "opacity-0 pointer-events-none" 
                  : "bg-background border-border/50 hover:border-primary shadow-xl"
              } ${isSolved && num !== 0 ? "bg-emerald-500/10 border-emerald-500 text-emerald-500" : ""}`}
            >
              {num !== 0 && num}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {isSolved && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-[2.5rem]"
            >
              <div className="text-center p-8">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4 text-emerald-500">
                   <Check size={40} strokeWidth={3} />
                </div>
                <h3 className="text-4xl font-black uppercase mb-2">Solved!</h3>
                <p className="text-muted-foreground font-bold uppercase tracking-widest mb-6">
                  {moves} moves in {finishTime?.toFixed(2)}s
                </p>
                <button 
                  onClick={initPuzzle}
                  className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl shadow-primary/40"
                >
                  New Game <RotateCcw size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
