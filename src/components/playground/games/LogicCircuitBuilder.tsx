"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Zap, RotateCcw, CheckCircle2 } from "lucide-react";

type GateType = "AND" | "OR" | "XOR";

interface Puzzle {
  inputs: boolean[];
  gates: GateType[];
  target: boolean;
}

export default function LogicCircuitBuilder() {
  const [gameState, setGameState] = useState<"idle" | "playing" | "ended">("idle");
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [userInputs, setUserInputs] = useState<boolean[]>([false, false, false]);
  const [userGates, setUserGates] = useState<GateType[]>(["AND", "AND"]);
  const [level, setLevel] = useState(1);

  const puzzles: Puzzle[] = [
    { inputs: [true, false, true], gates: ["AND", "OR"], target: true },
    { inputs: [true, true, false], gates: ["XOR", "AND"], target: false },
    { inputs: [false, true, true], gates: ["OR", "XOR"], target: false },
  ];

  const calculate = (inputs: boolean[], gates: GateType[]) => {
    let result = inputs[0];
    for (let i = 0; i < gates.length; i++) {
      const nextInput = inputs[i + 1];
      const gate = gates[i];
      if (gate === "AND") result = result && nextInput;
      if (gate === "OR") result = result || nextInput;
      if (gate === "XOR") result = result !== nextInput;
    }
    return result;
  };

  const output = calculate(userInputs, userGates);

  const toggleInput = (idx: number) => {
    const next = [...userInputs];
    next[idx] = !next[idx];
    setUserInputs(next);
  };

  const cycleGate = (idx: number) => {
    const types: GateType[] = ["AND", "OR", "XOR"];
    const currentIdx = types.indexOf(userGates[idx]);
    const next = [...userGates];
    next[idx] = types[(currentIdx + 1) % types.length];
    setUserGates(next);
  };

  const checkSolution = () => {
    if (output === puzzles[currentPuzzle].target) {
      if (level < 10) {
        setLevel(l => l + 1);
        setCurrentPuzzle(p => (p + 1) % puzzles.length);
        // In a real game, I'd generate a solvable one. For now let's just cycle.
      } else {
        setGameState("ended");
      }
    }
  };

  return (
    <div className="flex flex-col gap-12 h-full items-center justify-center">
      {/* Header */}
      <div className="w-full flex justify-between items-center bg-secondary/20 p-6 rounded-[2rem] border border-border">
         <div className="flex flex-col">
           <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Logical Level</span>
           <span className="text-3xl font-black text-primary">{level}/10</span>
         </div>
         <div className="text-center">
            <Cpu className="text-primary mb-1 animate-pulse mx-auto" size={24} />
            <span className="text-[10px] font-black uppercase tracking-widest">Logic Engine Active</span>
         </div>
         <div className="flex flex-col items-end">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Target Output</span>
            <div className={`px-4 py-1 rounded-full text-xs font-black uppercase ${puzzles[currentPuzzle].target ? "bg-emerald-500/20 text-emerald-500" : "bg-rose-500/20 text-rose-500"}`}>
               {puzzles[currentPuzzle].target ? "HIGH (1)" : "LOW (0)"}
            </div>
         </div>
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
              <h3 className="text-4xl font-black uppercase tracking-tight">Logic Circuit Builder</h3>
              <p className="text-muted-foreground font-medium">Configure the inputs and logic gates to achieve the target output signal. Master AND, OR, and XOR operations.</p>
            </div>
            <button 
              onClick={() => setGameState("playing")}
              className="px-12 py-5 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/30 flex items-center gap-3 mx-auto"
            >
              <Zap size={20} /> Initialize Core
            </button>
          </motion.div>
        ) : gameState === "playing" ? (
          <motion.div 
            key="playing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl bg-black/20 rounded-[3rem] p-12 border border-border relative overflow-hidden"
          >
            {/* Background Lines */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
               <svg width="100%" height="100%">
                 <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="currentColor" strokeWidth="2" />
               </svg>
            </div>

            <div className="flex items-center justify-between relative z-10">
              {/* Inputs */}
              <div className="flex flex-col gap-8">
                {userInputs.map((val, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <button 
                      onClick={() => toggleInput(i)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-black transition-all border-2 ${
                        val ? "bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/20" : "bg-secondary text-muted-foreground border-border"
                      }`}
                    >
                      {val ? "1" : "0"}
                    </button>
                    <div className="w-12 h-0.5 bg-border" />
                  </div>
                ))}
              </div>

              {/* Gates */}
              <div className="flex flex-col gap-20">
                {userGates.map((gate, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <button 
                      onClick={() => cycleGate(i)}
                      className="w-24 h-24 rounded-2xl bg-secondary/50 border-2 border-primary/30 flex flex-col items-center justify-center gap-2 hover:border-primary transition-all group"
                    >
                      <span className="text-xs font-black text-primary group-hover:scale-110 transition-transform">{gate}</span>
                      <Zap size={14} className="text-muted-foreground" />
                    </button>
                    <div className="w-12 h-0.5 bg-border" />
                  </div>
                ))}
              </div>

              {/* Output */}
              <div className="flex items-center gap-6">
                <div className="w-16 h-0.5 bg-border" />
                <div className={`w-24 h-24 rounded-full flex flex-col items-center justify-center border-4 transition-all duration-500 ${
                  output === puzzles[currentPuzzle].target ? "bg-emerald-500/10 border-emerald-500 text-emerald-500 shadow-2xl shadow-emerald-500/20" : "bg-secondary border-border text-muted-foreground"
                }`}>
                  <span className="text-[10px] font-black uppercase tracking-widest mb-1">Result</span>
                  <span className="text-3xl font-black">{output ? "1" : "0"}</span>
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-center">
               <button 
                 onClick={checkSolution}
                 className={`px-12 py-4 rounded-2xl font-black uppercase tracking-widest transition-all ${
                   output === puzzles[currentPuzzle].target 
                     ? "bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 hover:scale-105" 
                     : "bg-secondary text-muted-foreground cursor-not-allowed opacity-50"
                 }`}
               >
                 Submit Solution
               </button>
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
            <h3 className="text-4xl font-black uppercase tracking-tight">Circuit Complete</h3>
            <p className="text-muted-foreground">You have mastered all logical levels.</p>
            <button 
              onClick={() => { setGameState("playing"); setLevel(1); }}
              className="px-12 py-5 bg-secondary text-foreground rounded-[2rem] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all border border-border flex items-center gap-3 mx-auto"
            >
              <RotateCcw size={20} /> Restart
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
