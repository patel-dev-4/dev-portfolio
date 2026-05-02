"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Trophy, Play, Square } from "lucide-react";

export default function TimePrediction() {
  const [targetTime] = useState(5.000);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  const [result, setResult] = useState<number | null>(null);
  const [bestDiff, setBestDiff] = useState<number | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("time-prediction-best");
      return saved ? parseFloat(saved) : null;
    }
    return null;
  });

  const startTimeRef = useRef<number>(0);
  const requestRef = useRef<number>(0);

  const animate = useCallback((time: number) => {
    const elapsed = (time - startTimeRef.current) / 1000;
    setElapsedTime(elapsed);
    
    // Hide timer after 2 seconds to make it harder
    if (elapsed > 2) {
      setShowTimer(false);
    }
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    
    let frameId: number;
    const loop = (time: number) => {
      animate(time);
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [isRunning, animate]);

  const startTimer = () => {
    setIsRunning(true);
    setShowTimer(true);
    setResult(null);
    setElapsedTime(0);
    startTimeRef.current = performance.now();
  };

  const stopTimer = () => {
    setIsRunning(false);
    cancelAnimationFrame(requestRef.current);
    const finalTime = elapsedTime;
    setResult(finalTime);
    
    const diff = Math.abs(finalTime - targetTime);
    if (bestDiff === null || diff < bestDiff) {
      setBestDiff(diff);
      localStorage.setItem("time-prediction-best", diff.toString());
    }
  };

  const handleAction = () => {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-center gap-12 py-8">
      <div className="text-center">
        <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter flex items-center justify-center gap-3">
           <Clock className="text-primary" /> Time Predictor
        </h2>
        <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
           Stop the clock at exactly {targetTime.toFixed(3)}s. It disappears after 2s!
        </p>
      </div>

      <div className="relative flex flex-col items-center gap-12">
        <div className="w-64 h-64 rounded-full border-8 border-secondary flex flex-center justify-center items-center relative overflow-hidden bg-secondary/10">
           <AnimatePresence mode="wait">
             {showTimer || result !== null ? (
               <motion.div
                 key="time"
                 initial={{ opacity: 0, scale: 0.5 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 1.5 }}
                 className="text-5xl font-black font-mono tracking-tighter text-primary"
               >
                 {(result !== null ? result : elapsedTime).toFixed(3)}s
               </motion.div>
             ) : (
               <motion.div
                 key="hidden"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="text-4xl font-black text-muted-foreground uppercase italic tracking-tighter"
               >
                 HIDDEN
               </motion.div>
             )}
           </AnimatePresence>
           
           {/* Visual progress ring */}
           <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="128" cy="128" r="120"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-primary/10"
              />
              <motion.circle
                cx="128" cy="128" r="120"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray="753.98"
                animate={{ strokeDashoffset: 753.98 - (Math.min(elapsedTime / targetTime, 1) * 753.98) }}
                className="text-primary"
              />
           </svg>
        </div>

        <button 
          onClick={handleAction}
          className={`px-12 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] transition-all transform hover:scale-105 active:scale-95 shadow-2xl ${
            isRunning 
              ? "bg-rose-500 text-white shadow-rose-500/40" 
              : "bg-primary text-white shadow-primary/40"
          }`}
        >
          {isRunning ? (
            <span className="flex items-center gap-3"><Square size={24} fill="currentColor" /> STOP NOW</span>
          ) : (
            <span className="flex items-center gap-3"><Play size={24} fill="currentColor" /> START CLOCK</span>
          )}
        </button>
      </div>

      <div className="flex gap-12">
        <div className="flex flex-col items-center">
           <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Last Diff</span>
           <span className={`text-2xl font-black ${result !== null ? (Math.abs(result - targetTime) < 0.1 ? "text-emerald-500" : "text-rose-500") : "text-foreground"}`}>
             {result !== null ? `${Math.abs(result - targetTime).toFixed(3)}s` : "--"}
           </span>
        </div>
        <div className="flex flex-col items-center">
           <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Trophy size={14} className="text-yellow-500" />
              <span className="text-[10px] font-black uppercase tracking-widest">Best Accuracy</span>
           </div>
           <span className="text-2xl font-black text-foreground">
             {bestDiff !== null ? `±${bestDiff.toFixed(3)}s` : "--"}
           </span>
        </div>
      </div>
    </div>
  );
}
