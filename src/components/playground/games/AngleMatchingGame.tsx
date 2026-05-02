"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shapes, RotateCcw, CheckCircle2 } from "lucide-react";

export default function AngleMatchingGame() {
  const [gameState, setGameState] = useState<"idle" | "playing" | "ended">("idle");
  const [targetAngle, setTargetAngle] = useState(0);
  const [userAngle, setUserAngle] = useState(0);
  const [score, setScore] = useState(0);
  const [rounds, setRounds] = useState(1);
  const [feedback, setFeedback] = useState<{ diff: number, score: number } | null>(null);

  const generateTarget = useCallback(() => {
    setTargetAngle(Math.floor(Math.random() * 180));
    setUserAngle(90);
    setFeedback(null);
  }, []);

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setRounds(1);
    generateTarget();
  };

  const submitChoice = () => {
    const diff = Math.abs(targetAngle - userAngle);
    const roundScore = Math.max(0, 100 - diff * 2);
    setScore(s => s + roundScore);
    setFeedback({ diff, score: roundScore });

    setTimeout(() => {
      if (rounds < 5) {
        setRounds(r => r + 1);
        generateTarget();
      } else {
        setGameState("ended");
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-12 h-full items-center justify-center">
      {/* Header */}
      <div className="w-full flex justify-between items-center bg-secondary/20 p-6 rounded-[2rem] border border-border">
         <div className="flex flex-col">
           <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Precision Score</span>
           <span className="text-3xl font-black text-primary">{score}</span>
         </div>
         <div className="text-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Round</span>
            <div className="text-2xl font-black">{rounds}/5</div>
         </div>
         <div className="flex flex-col items-end">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</span>
            <span className="text-xs font-black uppercase text-emerald-500">Estimating...</span>
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
              <h3 className="text-4xl font-black uppercase tracking-tight">Angle Matching</h3>
              <p className="text-muted-foreground font-medium">Test your visual estimation skills. Adjust the line to match the target angle shown in the reference box.</p>
            </div>
            <button 
              onClick={startGame}
              className="px-12 py-5 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
            >
              <Shapes size={20} /> Begin Calibration
            </button>
          </motion.div>
        ) : gameState === "playing" ? (
          <motion.div 
            key="playing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex flex-col md:flex-row gap-12 items-center justify-center"
          >
            {/* Target Display */}
            <div className="space-y-4 text-center">
               <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Target Angle</span>
               <div className="w-64 h-64 rounded-[3rem] bg-secondary/20 border border-border relative overflow-hidden flex items-center justify-center">
                  <div 
                    className="w-1 h-32 bg-primary rounded-full origin-bottom"
                    style={{ transform: `rotate(${targetAngle - 90}deg)` }}
                  />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full" />
               </div>
            </div>

            {/* User Control */}
            <div className="space-y-8 flex-1 max-w-sm text-center">
               <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Your Adjustment: {userAngle}°</span>
                  <div className="w-full h-2 bg-secondary rounded-full relative">
                     <input 
                       type="range" min="0" max="180" value={userAngle}
                       onChange={(e) => setUserAngle(parseInt(e.target.value))}
                       className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                     />
                     <motion.div 
                        className="absolute h-full bg-primary rounded-full"
                        style={{ width: `${(userAngle / 180) * 100}%` }}
                     />
                  </div>
               </div>

               <button 
                 onClick={submitChoice}
                 disabled={!!feedback}
                 className="w-full py-5 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
               >
                 Confirm Angle
               </button>

               <AnimatePresence>
                 {feedback && (
                   <motion.div
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0 }}
                     className="bg-black/20 p-6 rounded-3xl border border-border space-y-1"
                   >
                     <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Result</p>
                     <p className="text-2xl font-black text-emerald-500">+{feedback.score} pts</p>
                     <p className="text-[10px] font-bold text-muted-foreground uppercase">Difference: {feedback.diff}°</p>
                   </motion.div>
                 )}
               </AnimatePresence>
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
            <h3 className="text-5xl font-black uppercase tracking-tight">Calibration Over</h3>
            <div className="space-y-2">
              <p className="text-xl text-muted-foreground font-medium">Final Precision Score</p>
              <div className="text-7xl font-black text-primary">{score}</div>
            </div>
            <button 
              onClick={startGame}
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
