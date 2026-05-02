"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileCode, Copy, Check, AlertCircle, Upload } from "lucide-react";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const process = (val: string, currentMode: "encode" | "decode") => {
    setInput(val);
    if (!val) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      if (currentMode === "encode") {
        setOutput(btoa(val));
      } else {
        setOutput(atob(val));
      }
      setError(null);
    } catch (e: unknown) {
      setError(currentMode === "decode" ? "Invalid Base64 string" : (e instanceof Error ? e.message : "Error"));
      setOutput("");
    }
  };

  const handleModeChange = (newMode: "encode" | "decode") => {
    setMode(newMode);
    process(input, newMode);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const base64 = result.split(",")[1];
      setInput(file.name);
      setOutput(base64);
      setMode("encode");
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Mode Toggle */}
      <div className="flex justify-center">
        <div className="bg-secondary/50 p-2 rounded-2xl border border-border flex gap-1">
          <button
            onClick={() => handleModeChange("encode")}
            className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
              mode === "encode" ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:bg-background"
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => handleModeChange("decode")}
            className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
              mode === "decode" ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:bg-background"
            }`}
          >
            Decode
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full min-h-[400px]">
        {/* Input */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
             <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <FileCode size={14} /> {mode === "encode" ? "Raw Text" : "Base64 String"}
             </label>
             <div className="relative group">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <span className="text-[10px] font-bold text-primary uppercase flex items-center gap-1 cursor-pointer">
                  <Upload size={12} /> Upload File
                </span>
             </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => process(e.target.value, mode)}
            placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
            className="flex-1 w-full bg-secondary/30 rounded-3xl p-8 font-mono text-sm border border-border focus:border-primary/50 focus:outline-none resize-none transition-all"
          />
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase"
            >
              <AlertCircle size={14} /> {error}
            </motion.div>
          )}
        </div>

        {/* Output */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
             <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Result
             </label>
             {output && (
               <button onClick={handleCopy} className="text-[10px] font-bold text-primary uppercase flex items-center gap-1">
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? "Copied" : "Copy"}
               </button>
             )}
          </div>
          <div className="flex-1 w-full bg-black/20 rounded-3xl p-8 font-mono text-sm border border-border overflow-auto custom-scrollbar relative">
             <AnimatePresence mode="wait">
               {output ? (
                 <motion.pre 
                   key="output"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="text-emerald-400 break-all whitespace-pre-wrap"
                 >
                   {output}
                 </motion.pre>
               ) : (
                 <div className="h-full flex items-center justify-center text-muted-foreground italic">
                   Result will appear here...
                 </div>
               )}
             </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
