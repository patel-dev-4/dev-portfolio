"use client";

import { useState, useEffect } from "react";
import { Hash, Copy, Check } from "lucide-react";

type HashAlgo = "MD5" | "SHA-1" | "SHA-256" | "SHA-512";

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const run = async () => {
      if (!input) {
        setHashes({});
        return;
      }

      const algos: HashAlgo[] = ["SHA-1", "SHA-256", "SHA-512"];
      const newHashes: Record<string, string> = {};

      for (const algo of algos) {
        const msgUint8 = new TextEncoder().encode(input);
        const hashBuffer = await crypto.subtle.digest(algo, msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        newHashes[algo] = hashHex;
      }

      if (isMounted) {
        setHashes(newHashes);
      }
    };

    run();
    return () => { isMounted = false; };
  }, [input]);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-col gap-12 max-w-3xl mx-auto">
      {/* Input Section */}
      <div className="flex flex-col gap-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Hash size={14} /> Input Data
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          className="w-full h-32 bg-secondary/30 rounded-3xl p-8 font-mono text-sm border border-border focus:border-primary/50 focus:outline-none resize-none transition-all"
        />
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        {["SHA-256", "SHA-512", "SHA-1"].map((algo) => (
          <div key={algo} className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-primary">
                 {algo}
               </label>
               {hashes[algo] && (
                 <button 
                   onClick={() => handleCopy(hashes[algo], algo)}
                   className="text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 uppercase"
                 >
                   {copied === algo ? <Check size={12} /> : <Copy size={12} />}
                   {copied === algo ? "Copied" : "Copy"}
                 </button>
               )}
            </div>
            <div className="w-full bg-black/20 rounded-2xl p-6 font-mono text-xs border border-border break-all group relative">
              {hashes[algo] ? (
                <span className="text-emerald-400">{hashes[algo]}</span>
              ) : (
                <span className="text-muted-foreground italic">Enter text to generate hash...</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-500/5 rounded-3xl p-6 border border-amber-500/10">
         <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest mb-2 flex items-center gap-2">
           Security Note
         </p>
         <p className="text-xs text-muted-foreground font-medium leading-relaxed">
           Hashes are generated locally in your browser using the Web Crypto API. Your data never leaves your device.
         </p>
      </div>
    </div>
  );
}
