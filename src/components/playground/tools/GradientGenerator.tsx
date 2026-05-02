"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Palette, RefreshCw, Copy, Check, ArrowRight } from "lucide-react";

export default function GradientGenerator() {
  const [color1, setColor1] = useState("#10b981");
  const [color2, setColor2] = useState("#3b82f6");
  const [angle, setAngle] = useState(135);
  const [copied, setCopied] = useState(false);

  const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
  const cssCode = `background: ${gradient};`;

  const randomize = () => {
    const r = () => "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setColor1(r());
    setColor2(r());
    setAngle(Math.floor(Math.random() * 360));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-12 h-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 flex-1">
        {/* Preview */}
        <div className="flex flex-col gap-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Live Preview</label>
          <div 
            className="flex-1 w-full rounded-[2.5rem] shadow-2xl transition-all duration-700 border border-border"
            style={{ background: gradient }}
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-8 justify-center">
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="flex-1 space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                   Color Start
                 </label>
                 <div className="flex gap-4">
                   <input 
                     type="color" 
                     value={color1}
                     onChange={(e) => setColor1(e.target.value)}
                     className="w-14 h-14 rounded-2xl cursor-pointer bg-transparent border-none"
                   />
                   <input 
                     type="text"
                     value={color1}
                     onChange={(e) => setColor1(e.target.value)}
                     className="flex-1 bg-secondary/30 border border-border rounded-2xl px-6 font-mono text-sm uppercase focus:outline-none focus:border-primary/50"
                   />
                 </div>
              </div>
              <ArrowRight className="text-muted-foreground mt-6" size={20} />
              <div className="flex-1 space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                   Color End
                 </label>
                 <div className="flex gap-4">
                   <input 
                     type="color" 
                     value={color2}
                     onChange={(e) => setColor2(e.target.value)}
                     className="w-14 h-14 rounded-2xl cursor-pointer bg-transparent border-none"
                   />
                   <input 
                     type="text"
                     value={color2}
                     onChange={(e) => setColor2(e.target.value)}
                     className="flex-1 bg-secondary/30 border border-border rounded-2xl px-6 font-mono text-sm uppercase focus:outline-none focus:border-primary/50"
                   />
                 </div>
              </div>
            </div>

            <div className="space-y-4">
               <div className="flex justify-between">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Rotation: {angle}°</label>
               </div>
               <input 
                 type="range" min="0" max="360" value={angle}
                 onChange={(e) => setAngle(parseInt(e.target.value))}
                 className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
               />
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={randomize}
              className="flex-1 py-4 bg-secondary/30 text-foreground border border-border rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-secondary/50 transition-all"
            >
              <RefreshCw size={18} /> Randomize
            </button>
            <button 
              onClick={handleCopy}
              className="flex-[2] py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "CSS Copied" : "Copy CSS"}
            </button>
          </div>

          <div className="bg-black/20 rounded-3xl p-6 border border-border">
             <code className="text-xs font-mono text-primary break-all">{cssCode}</code>
          </div>
        </div>
      </div>
    </div>
  );
}
