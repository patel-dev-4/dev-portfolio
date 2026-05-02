"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Fingerprint, RefreshCw, Copy, Check, Plus, Minus } from "lucide-react";

export default function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>(() => 
    Array.from({ length: 5 }, () => crypto.randomUUID())
  );
  const [copied, setCopied] = useState<number | "all" | null>(null);

  const generate = useCallback(() => {
    const newUuids = Array.from({ length: count }, () => crypto.randomUUID());
    setUuids(newUuids);
  }, [count]);

  useEffect(() => {
    const timer = setTimeout(generate, 0);
    return () => clearTimeout(timer);
  }, [generate]);

  const handleCopy = (text: string, index: number | "all") => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-col gap-12 max-w-2xl mx-auto h-full items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
          <Fingerprint size={40} />
        </div>
        <h3 className="text-3xl font-black uppercase tracking-tight mb-2">Bulk UUID Gen</h3>
        <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Version 4 Universally Unique Identifiers</p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 bg-secondary/30 p-4 rounded-3xl border border-border">
        <div className="flex items-center gap-4 border-r border-border pr-6">
           <button 
             onClick={() => setCount(Math.max(1, count - 1))}
             className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center hover:text-primary transition-colors"
           >
             <Minus size={18} />
           </button>
           <span className="text-xl font-black w-8 text-center">{count}</span>
           <button 
             onClick={() => setCount(Math.min(20, count + 1))}
             className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center hover:text-primary transition-colors"
           >
             <Plus size={18} />
           </button>
        </div>
        <button 
          onClick={generate}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-primary/20"
        >
          <RefreshCw size={14} /> Regenerate
        </button>
      </div>

      {/* List */}
      <div className="w-full space-y-3">
        <div className="flex items-center justify-between px-2">
           <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Generated List</span>
           <button 
             onClick={() => handleCopy(uuids.join("\n"), "all")}
             className="text-[10px] font-bold text-primary uppercase flex items-center gap-1"
           >
             {copied === "all" ? <Check size={12} /> : <Copy size={12} />}
             Copy All
           </button>
        </div>
        <div className="space-y-2">
          {uuids.map((uuid, i) => (
            <motion.div
              key={uuid}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group flex items-center justify-between bg-secondary/20 p-5 rounded-2xl border border-border hover:border-primary/30 transition-all"
            >
              <code className="text-sm font-mono text-primary font-bold">{uuid}</code>
              <button 
                onClick={() => handleCopy(uuid, i)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary"
              >
                {copied === i ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
