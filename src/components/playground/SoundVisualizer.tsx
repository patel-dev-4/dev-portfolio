"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Activity, SkipForward, SkipBack } from "lucide-react";

const SAMPLE_AUDIO = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

export default function SoundVisualizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const draw = useCallback(() => {
    if (!canvasRef.current || !analyserRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const renderFrame = () => {
      animationIdRef.current = requestAnimationFrame(renderFrame);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;

        // Gradient color based on frequency
        const hue = (i / bufferLength) * 360;
        ctx.fillStyle = `hsla(${hue}, 70%, 60%, 0.8)`;
        
        // Draw bars with rounded corners (simulated)
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);

        x += barWidth;
      }
    };

    renderFrame();
  }, []);

  useEffect(() => {
    if (isPlaying && !audioContextRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      
      const source = audioContext.createMediaElementSource(audioRef.current!);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      sourceRef.current = source;
    }

    if (isPlaying) {
      draw();
    } else {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    }

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
  }, [isPlaying, draw]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Set playing state immediately for UI responsiveness
        setIsPlaying(true);
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Playback failed or was interrupted:", error);
            setIsPlaying(false);
          });
        }
      }
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-center gap-12 py-8">
      <div className="text-center">
        <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter flex items-center justify-center gap-3">
           <Activity className="text-primary" /> Dynamic Sound Visualizer
        </h2>
        <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
           Experience real-time frequency mapping through the Web Audio API
        </p>
      </div>

      <div className="relative w-full max-w-4xl h-64 bg-secondary/20 rounded-[3rem] border border-border overflow-hidden group">
        <canvas 
          ref={canvasRef}
          width={800}
          height={256}
          className="w-full h-full"
        />
        
        {/* Playback Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm transition-all">
             <motion.button
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9 }}
               onClick={togglePlay}
               className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/40"
             >
                <Play size={32} fill="currentColor" />
             </motion.button>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-6 w-full max-w-md">
         <div className="flex items-center gap-8">
            <button className="text-muted-foreground hover:text-primary transition-colors">
               <SkipBack size={24} />
            </button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-primary transition-all"
            >
               {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
            </motion.button>
            <button className="text-muted-foreground hover:text-primary transition-colors">
               <SkipForward size={24} />
            </button>
         </div>
         
         <div className="w-full flex flex-col gap-2">
            <div className="flex justify-between items-center">
               <span className="text-[10px] font-black uppercase tracking-widest text-primary">Now Playing</span>
               <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Ambient Flow .mp3</span>
            </div>
            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
               <motion.div 
                 animate={{ x: isPlaying ? ["-100%", "0%"] : "0%" }}
                 transition={{ duration: 180, ease: "linear", repeat: Infinity }}
                 className="h-full bg-primary w-full"
               />
            </div>
         </div>
      </div>

      <audio 
        ref={audioRef}
        src={SAMPLE_AUDIO}
        crossOrigin="anonymous"
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}
