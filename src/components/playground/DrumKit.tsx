"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music } from "lucide-react";

const DRUM_SAMPLES = [
  { key: "A", name: "Clap", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", color: "bg-rose-500" },
  { key: "S", name: "Hi-Hat", url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3", color: "bg-blue-500" },
  { key: "D", name: "Kick", url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", color: "bg-emerald-500" },
  { key: "F", name: "Open-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3", color: "bg-amber-500" },
  { key: "G", name: "Snare", url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3", color: "bg-purple-500" },
  { key: "H", name: "Tom", url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3", color: "bg-cyan-500" },
];

export default function DrumKit() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  const playSound = useCallback((key: string) => {
    const audio = audioRefs.current[key];
    if (audio) {
      audio.currentTime = 0;
      audio.volume = isMuted ? 0 : volume;
      audio.play().catch(() => {}); // Ignore errors from rapid firing
      setActiveKey(key);
      setTimeout(() => setActiveKey(null), 100);
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (DRUM_SAMPLES.find(s => s.key === key)) {
        playSound(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playSound]);

  return (
    <div className="flex flex-col h-full items-center justify-center gap-12 py-8">
      <div className="text-center">
        <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter flex items-center justify-center gap-3">
           <Music className="text-primary" /> Beat Master Drum Kit
        </h2>
        <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
           Use keys [A S D F G H] or click to play
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full max-w-4xl">
        {DRUM_SAMPLES.map((sample) => (
          <motion.button
            key={sample.key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => playSound(sample.key)}
            className={`relative h-32 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 overflow-hidden group ${
              activeKey === sample.key 
                ? `${sample.color} border-white shadow-[0_0_30px_rgba(255,255,255,0.3)]` 
                : "bg-secondary/30 border-border/50 hover:border-primary/50"
            }`}
          >
            <span className={`text-2xl font-black transition-colors ${activeKey === sample.key ? "text-white" : "text-foreground"}`}>
              {sample.key}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${activeKey === sample.key ? "text-white/80" : "text-muted-foreground"}`}>
              {sample.name}
            </span>
            
            {/* Ripple Effect Background */}
            <AnimatePresence>
               {activeKey === sample.key && (
                 <motion.div 
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white rounded-full pointer-events-none"
                 />
               )}
            </AnimatePresence>

            <audio 
              ref={(el) => { if (el) audioRefs.current[sample.key] = el; }}
              src={sample.url}
              preload="auto"
            />
          </motion.button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 bg-secondary/50 p-6 rounded-[2rem] border border-border">
         <button 
           onClick={() => setIsMuted(!isMuted)}
           className="p-3 rounded-xl bg-background hover:bg-primary hover:text-white transition-all"
         >
           {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
         </button>
         
         <div className="flex flex-col gap-2 w-48">
            <div className="flex justify-between">
               <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Volume</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-primary">{Math.round(volume * 100)}%</span>
            </div>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-background rounded-full appearance-none cursor-pointer accent-primary"
            />
         </div>
      </div>
    </div>
  );
}
