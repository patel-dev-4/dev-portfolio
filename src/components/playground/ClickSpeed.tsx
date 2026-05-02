"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointerClick, RotateCcw, Trophy } from "lucide-react";

export default function ClickSpeed() {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [clickCount, setClickCount] = useState(0);
  const [bestCPS, setBestCPS] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("click-speed-best");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setBestCPS(parseFloat(saved));
  }, []);

  const startTest = () => {
    setIsActive(true);
    setClickCount(1);
    setTimeLeft(5);
    setIsFinished(false);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0.1) {
          clearInterval(timerRef.current!);
          setIsActive(false);
          setIsFinished(true);
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);
  };

  const handleClick = () => {
    if (!isActive && !isFinished) {
      startTest();
    } else if (isActive) {
      setClickCount(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (isFinished) {
      const cps = clickCount / 5;
      if (cps > bestCPS) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setBestCPS(cps);
        localStorage.setItem("click-speed-best", cps.toString());
      }
    }
  }, [isFinished, clickCount, bestCPS]);

  const reset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsActive(false);
    setIsFinished(false);
    setClickCount(0);
    setTimeLeft(5);
  };

  return (
    <div className="flex flex-col h-full items-center justify-center gap-12 py-8 select-none">
      <div className="text-center">
        <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter flex items-center justify-center gap-3">
           <MousePointerClick className="text-primary" /> Click Speed Test
        </h2>
        <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
           How many times can you click in 5 seconds?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
         {/* Stats Left */}
         <div className="flex flex-col gap-4 justify-center">
            <div className="glass-card p-6 rounded-3xl border border-border flex flex-col items-center text-center">
               <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Time Left</span>
               <span className="text-4xl font-black text-primary font-mono">{timeLeft.toFixed(1)}s</span>
            </div>
            <div className="glass-card p-6 rounded-3xl border border-border flex flex-col items-center text-center">
               <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Total Clicks</span>
               <span className="text-4xl font-black text-foreground">{clickCount}</span>
            </div>
         </div>

         {/* Click Area */}
         <motion.div
           onClick={handleClick}
           whileTap={{ scale: 0.98 }}
           className={`relative aspect-square md:aspect-auto h-64 md:h-full rounded-[3rem] border-4 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
             isActive ? "bg-primary/5 border-primary border-solid" : "bg-secondary/20 border-border"
           }`}
         >
           <AnimatePresence mode="wait">
             {!isActive && !isFinished ? (
               <motion.div 
                 key="start"
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 className="flex flex-col items-center gap-4"
               >
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <MousePointerClick size={40} />
                  </div>
                  <span className="font-black uppercase tracking-widest">Click to Start</span>
               </motion.div>
             ) : isActive ? (
               <motion.div 
                 key="active"
                 initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                 className="text-7xl font-black text-primary"
               >
                  {clickCount}
               </motion.div>
             ) : (
               <motion.div 
                 key="finished"
                 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                 className="flex flex-col items-center gap-6"
               >
                  <div className="text-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Clicks Per Second</span>
                    <h3 className="text-6xl font-black text-primary">{(clickCount / 5).toFixed(2)}</h3>
                  </div>
                  <button 
                    onClick={reset}
                    className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-transform"
                  >
                    Reset <RotateCcw size={16} />
                  </button>
               </motion.div>
             )}
           </AnimatePresence>

           {/* Floating particles or ripples on click would be nice, but simple scale is good too */}
         </motion.div>

         {/* Stats Right */}
         <div className="flex flex-col gap-4 justify-center">
            <div className="glass-card p-6 rounded-3xl border border-border flex flex-col items-center text-center">
               <div className="flex items-center gap-2 mb-1">
                  <Trophy size={14} className="text-yellow-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Record CPS</span>
               </div>
               <span className="text-4xl font-black text-foreground">{bestCPS.toFixed(2)}</span>
            </div>
            <div className="glass-card p-6 rounded-3xl border border-border flex flex-col items-center text-center">
               <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Rank</span>
               <span className="text-2xl font-black text-primary italic">
                 {clickCount / 5 > 12 ? "Godspeed" : clickCount / 5 > 8 ? "Professional" : clickCount / 5 > 5 ? "Fast" : "Casual"}
               </span>
            </div>
         </div>
      </div>
    </div>
  );
}
