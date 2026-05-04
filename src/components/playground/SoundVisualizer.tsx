"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Pause, Play, Settings2, Sparkles, Info, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

interface AudioState {
  isPlaying: boolean;
  frequencyData: Uint8Array;
  analyzer: AnalyserNode | null;
  audioContext: AudioContext | null;
  source: MediaElementAudioSourceNode | null;
}

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export default function SoundVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<number | null>(null);
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    frequencyData: new Uint8Array(0),
    analyzer: null,
    audioContext: null,
    source: null,
  });

  const [sensitivity, setSensitivity] = useState(1.2);
  const [colorHue, setColorHue] = useState(160);

  const initAudio = useCallback(() => {
    if (!audioRef.current || audioState.audioContext) return;

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContextClass();
      const analyzerNode = ctx.createAnalyser();
      const sourceNode = ctx.createMediaElementSource(audioRef.current);

      sourceNode.connect(analyzerNode);
      analyzerNode.connect(ctx.destination);
      analyzerNode.fftSize = 256;

      const bufferLength = analyzerNode.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      setAudioState((prev) => ({
        ...prev,
        audioContext: ctx,
        analyzer: analyzerNode,
        source: sourceNode,
        frequencyData: dataArray,
      }));
    } catch (error) {
      console.error("Audio Initialization Failed:", error);
    }
  }, [audioState.audioContext]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (!audioState.audioContext) {
      initAudio();
    }

    if (audioState.isPlaying) {
      audioRef.current.pause();
    } else {
      if (audioState.audioContext?.state === "suspended") {
        await audioState.audioContext.resume();
      }
      try {
        await audioRef.current.play();
      } catch (err) {
        console.error("Playback failed:", err);
      }
    }
    setAudioState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const draw = useCallback(function drawFrame() {
    if (!canvasRef.current || !audioState.analyzer) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { analyzer, frequencyData } = audioState;
    // Bypassing strict ArrayBuffer vs ArrayBufferLike mismatch by casting to any
    analyzer.getByteFrequencyData(frequencyData as any); // eslint-disable-line @typescript-eslint/no-explicit-any

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / frequencyData.length) * 2;
    let x = 0;

    for (let i = 0; i < frequencyData.length; i++) {
      const barHeight = (frequencyData[i] / 2) * sensitivity;

      const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
      gradient.addColorStop(0, `hsla(${colorHue}, 80%, 50%, 0.1)`);
      gradient.addColorStop(1, `hsla(${(colorHue + 60) % 360}, 100%, 60%, 1)`);

      ctx.fillStyle = gradient;
      // Draw rounded rect bars
      const radius = 4;
      ctx.beginPath();
      ctx.roundRect(x, canvas.height - barHeight, barWidth - 2, barHeight, [radius, radius, 0, 0]);
      ctx.fill();

      x += barWidth + 2;
    }

    animationRef.current = requestAnimationFrame(drawFrame);
  }, [audioState, sensitivity, colorHue]);

  useEffect(() => {
    if (audioState.isPlaying) {
      animationRef.current = requestAnimationFrame(draw);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [audioState.isPlaying, draw]);

  return (
    <Card className="p-8 bg-card/40 backdrop-blur-3xl border-white/5 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-primary/10 transition-colors pointer-events-none">
        <Activity size={120} strokeWidth={0.5} />
      </div>

      <div className="flex flex-col gap-8 relative z-10">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-display font-black tracking-tighter uppercase">Waveform Intel</h3>
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-muted-foreground">
              <div className={`w-1.5 h-1.5 rounded-full ${audioState.isPlaying ? "bg-primary animate-pulse" : "bg-zinc-700"}`} />
              {audioState.isPlaying ? "Active Processing" : "System Idle"}
            </div>
          </div>
          <Button
            onClick={togglePlay}
            size="icon"
            className="h-16 w-16 rounded-2xl bg-primary hover:bg-primary/90 transition-all shadow-xl active:scale-95"
          >
            {audioState.isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
          </Button>
        </div>

        <div className="relative aspect-video bg-black/40 rounded-3xl border border-white/5 overflow-hidden shadow-inner">
          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            className="w-full h-full object-cover"
          />
          {!audioState.isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Initialize Audio Sequence</p>
            </div>
          )}
        </div>

        <audio
          ref={audioRef}
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          crossOrigin="anonymous"
          onEnded={() => setAudioState(prev => ({ ...prev, isPlaying: false }))}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Settings2 size={12} /> Sensitivity
              </span>
              <span className="text-[10px] font-mono text-primary">{sensitivity.toFixed(1)}x</span>
            </div>
            <Slider
              value={[sensitivity]}
              onValueChange={([val]: number[]) => setSensitivity(val)}
              min={0.5}
              max={2.5}
              step={0.1}
              className="py-4"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Sparkles size={12} /> Spectrum Shift
              </span>
              <span className="text-[10px] font-mono text-primary">{colorHue}°</span>
            </div>
            <Slider
              value={[colorHue]}
              onValueChange={([val]: number[]) => setColorHue(val)}
              min={0}
              max={360}
              step={1}
              className="py-4"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex items-center gap-4 text-muted-foreground">
          <Info size={14} className="text-primary" />
          <p className="text-[9px] font-black uppercase tracking-widest leading-loose">
            Frequency data extracted via Web Audio API. Visualized through low-latency Canvas render loop.
          </p>
        </div>
      </div>
    </Card>
  );
}
