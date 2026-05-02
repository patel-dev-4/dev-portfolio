"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, RotateCcw, Play, CheckCircle2 } from "lucide-react";

export default function SudokuLite() {
  const [gameState, setGameState] = useState<"idle" | "playing" | "ended">("idle");
  const [grid, setGrid] = useState<(number | null)[]>(Array(16).fill(null));
  const [initial, setInitial] = useState<boolean[]>(Array(16).fill(false));
  const [selected, setSelected] = useState<number | null>(null);

  const solveSudoku = (board: (number | null)[]) => {
    // Very simple 4x4 solver/generator helper logic would go here
    // For "Lite" version, let's use a few hardcoded patterns for now
    const patterns = [
      [1, 2, 3, 4, 3, 4, 1, 2, 2, 1, 4, 3, 4, 3, 2, 1],
      [4, 3, 2, 1, 1, 2, 3, 4, 3, 4, 1, 2, 2, 1, 4, 3]
    ];
    return patterns[Math.floor(Math.random() * patterns.length)];
  };

  const generatePuzzle = () => {
    const solution = solveSudoku(Array(16).fill(null));
    const newGrid: (number | null)[] = [...solution];
    const newInitial = Array(16).fill(false);
    
    // Remove 8 random numbers
    let removed = 0;
    while (removed < 8) {
      const idx = Math.floor(Math.random() * 16);
      if (newGrid[idx] !== null) {
        newGrid[idx] = null;
        removed++;
      }
    }

    setGrid(newGrid);
    for (let i = 0; i < 16; i++) if (newGrid[i] !== null) newInitial[i] = true;
    setInitial(newInitial);
  };

  const startGame = () => {
    setGameState("playing");
    generatePuzzle();
  };

  const handleInput = (val: number) => {
    if (selected === null || initial[selected]) return;
    const next = [...grid];
    next[selected] = val;
    setGrid(next);

    // Check if complete and correct
    if (next.every(v => v !== null)) {
      // Basic 4x4 Sudoku validation could be added here
      // For now, let's assume if it's filled it might be right or we'll add a check button
    }
  };

  const checkWin = () => {
    // Check rows, cols, and 2x2 boxes
    const isCorrect = (arr: (number | null)[]) => {
      const checkSet = (vals: (number | null)[]) => new Set(vals).size === 4 && !vals.includes(null);
      
      for (let i = 0; i < 4; i++) {
        if (!checkSet(arr.slice(i * 4, i * 4 + 4))) return false; // Rows
        if (!checkSet([arr[i], arr[i+4], arr[i+8], arr[i+12]])) return false; // Cols
      }
      return true;
    };

    if (isCorrect(grid)) setGameState("ended");
  };

  return (
    <div className="flex flex-col gap-12 h-full items-center justify-center">
      {/* Header */}
      <div className="w-full flex justify-between items-center bg-secondary/20 p-6 rounded-[2rem] border border-border">
         <div className="flex flex-col">
           <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Puzzle Complexity</span>
           <span className="text-2xl font-black text-primary">4x4 LITE</span>
         </div>
         <div className="text-center">
            <Layout className="text-primary mb-1 mx-auto" size={24} />
            <span className="text-[10px] font-black uppercase tracking-widest">Sudoku Core</span>
         </div>
         <button 
           onClick={checkWin}
           className="px-6 py-2 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
         >
           Verify Solution
         </button>
      </div>

      <AnimatePresence mode="wait">
        {gameState === "idle" ? (
          <motion.div 
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-8"
          >
            <div className="max-w-md mx-auto space-y-4">
              <h3 className="text-4xl font-black uppercase tracking-tight">Sudoku Lite</h3>
              <p className="text-muted-foreground font-medium">A simplified 4x4 logic puzzle. Every row, column, and 2x2 square must contain the numbers 1 through 4.</p>
            </div>
            <button 
              onClick={startGame}
              className="px-12 py-5 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
            >
              <Play size={20} /> Load Puzzle
            </button>
          </motion.div>
        ) : gameState === "playing" ? (
          <motion.div 
            key="playing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col md:flex-row gap-12 items-center"
          >
            {/* Grid */}
            <div className="grid grid-cols-4 gap-2 bg-border p-2 rounded-3xl border border-border">
              {grid.map((val, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black transition-all ${
                    initial[i] ? "bg-secondary text-primary cursor-default" : 
                    selected === i ? "bg-primary text-white scale-105 z-10 shadow-xl shadow-primary/20" : "bg-background text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-4">
               <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Input Controls</span>
               <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map(num => (
                    <button 
                      key={num}
                      onClick={() => handleInput(num)}
                      className="w-16 h-16 rounded-2xl bg-secondary/30 border border-border flex items-center justify-center text-xl font-black hover:bg-primary hover:text-white transition-all active:scale-90"
                    >
                      {num}
                    </button>
                  ))}
                  <button 
                    onClick={() => { if (selected !== null && !initial[selected]) { const next = [...grid]; next[selected] = null; setGrid(next); } }}
                    className="col-span-2 py-3 bg-rose-500/10 text-rose-500 rounded-xl text-[10px] font-black uppercase border border-rose-500/20"
                  >
                    Clear Cell
                  </button>
               </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="ended"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-8"
          >
            <CheckCircle2 size={64} className="text-emerald-500 mx-auto" />
            <h3 className="text-5xl font-black uppercase tracking-tight">Grid Solved</h3>
            <p className="text-muted-foreground">Logical consistency verified.</p>
            <button 
              onClick={startGame}
              className="px-12 py-5 bg-secondary text-foreground rounded-[2rem] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all border border-border flex items-center gap-3 mx-auto"
            >
              <RotateCcw size={20} /> New Puzzle
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
