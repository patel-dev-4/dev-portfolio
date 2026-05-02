"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Lock, 
  Palette, 
  Copy, 
  Check, 
  RefreshCw,
  FileCode,
  ShieldCheck,
  Shapes
} from "lucide-react";

type ToolType = "json" | "password" | "color";

export default function UtilityTools() {
  const [activeTab, setActiveTab] = useState<ToolType>("json");
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full gap-8 py-4">
      {/* Tab Header */}
      <div className="flex justify-center">
        <div className="flex bg-secondary/50 p-2 rounded-2xl border border-border">
          <TabButton 
            active={activeTab === "json"} 
            onClick={() => setActiveTab("json")}
            icon={Code2}
            label="JSON Formatter"
          />
          <TabButton 
            active={activeTab === "password"} 
            onClick={() => setActiveTab("password")}
            icon={Lock}
            label="Password Gen"
          />
          <TabButton 
            active={activeTab === "color"} 
            onClick={() => setActiveTab("color")}
            icon={Palette}
            label="Color Palette"
          />
        </div>
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === "json" && <JsonFormatter key="json" onCopy={handleCopy} copied={copied} />}
          {activeTab === "password" && <PasswordGenerator key="password" onCopy={handleCopy} copied={copied} />}
          {activeTab === "color" && <ColorGenerator key="color" onCopy={handleCopy} copied={copied} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
}

function TabButton({ active, onClick, icon: Icon, label }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
        active 
          ? "bg-primary text-white shadow-lg shadow-primary/20" 
          : "text-muted-foreground hover:bg-background"
      }`}
    >
      <Icon size={18} />
      <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">{label}</span>
    </button>
  );
}

interface SubToolProps {
  onCopy: (text: string) => void;
  copied: boolean;
}

function JsonFormatter({ onCopy, copied }: SubToolProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setOutput("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full min-h-[400px]"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
           <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <FileCode size={14} /> Input JSON
           </span>
           <button onClick={() => setInput("")} className="text-[10px] font-bold text-primary uppercase">Clear</button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"key": "value"}'
          className="flex-1 w-full bg-secondary/30 rounded-2xl p-6 font-mono text-sm border border-border focus:border-primary/50 focus:outline-none resize-none"
        />
        <button 
          onClick={formatJson}
          className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-xl shadow-primary/20"
        >
          Format JSON
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
           <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Check size={14} /> Result
           </span>
           {output && (
             <button onClick={() => onCopy(output)} className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase">
                {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
             </button>
           )}
        </div>
        <div className="flex-1 w-full bg-black/20 rounded-2xl p-6 font-mono text-sm border border-border overflow-auto custom-scrollbar relative">
          {error ? (
            <span className="text-rose-500">{error}</span>
          ) : (
            <pre className="text-emerald-500">{output || "// Output will appear here"}</pre>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function PasswordGenerator({ onCopy, copied }: SubToolProps) {
  const [length, setLength] = useState(16);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generate = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" + (includeSymbols ? "!@#$%^&*()_+" : "");
    let retVal = "";
    for (let i = 0; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(retVal);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col items-center justify-center gap-12 max-w-2xl mx-auto h-full"
    >
      <div className="w-full text-center">
         <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
            <ShieldCheck size={40} />
         </div>
         <h3 className="text-3xl font-black uppercase tracking-tight mb-2">Secure Generator</h3>
         <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Create unbreakable passwords locally</p>
      </div>

      <div className="w-full space-y-8">
        <div className="bg-secondary/30 rounded-3xl p-8 border border-border flex flex-col md:flex-row items-center gap-6 justify-between">
           <div className="text-2xl font-mono font-bold tracking-wider text-primary break-all">
             {password || "••••••••••••••••"}
           </div>
           <div className="flex gap-2">
              <button onClick={generate} className="p-4 bg-background rounded-2xl border border-border hover:border-primary transition-all">
                 <RefreshCw size={20} className="text-primary" />
              </button>
              <button onClick={() => onCopy(password)} className="p-4 bg-primary rounded-2xl text-white shadow-lg shadow-primary/20 hover:scale-110 transition-transform">
                 {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-4">
              <div className="flex justify-between">
                 <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Length: {length}</span>
              </div>
              <input 
                type="range" min="8" max="64" value={length} 
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-1.5 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
              />
           </div>
           <div className="flex items-center justify-between bg-secondary/20 p-4 rounded-2xl border border-border cursor-pointer" onClick={() => setIncludeSymbols(!includeSymbols)}>
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Include Symbols</span>
              <div className={`w-12 h-6 rounded-full transition-all flex items-center px-1 ${includeSymbols ? "bg-primary" : "bg-muted"}`}>
                 <div className={`w-4 h-4 rounded-full bg-white transition-all ${includeSymbols ? "translate-x-6" : "translate-x-0"}`} />
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}

function ColorGenerator({ onCopy, copied }: SubToolProps) {
  const [colors, setColors] = useState<string[]>(["#10b981", "#3b82f6", "#f43f5e", "#f59e0b", "#8b5cf6"]);

  const generate = () => {
    const newColors = Array.from({ length: 5 }, () => 
      "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
    );
    setColors(newColors);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col h-full gap-8"
    >
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
               <Shapes size={20} />
            </div>
            <div>
               <h3 className="text-xl font-black uppercase tracking-tight">Palette Generator</h3>
               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Instant inspiration for your next project</p>
            </div>
         </div>
         <button 
           onClick={generate}
           className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-primary/20"
         >
           <RefreshCw size={14} /> Shuffle
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 flex-1">
        {colors.map((color, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="group relative flex flex-col rounded-3xl overflow-hidden border border-border"
          >
            <div 
              className="flex-1 transition-transform duration-500 group-hover:scale-105" 
              style={{ backgroundColor: color }} 
            />
            <div className="bg-background p-4 flex items-center justify-between border-t border-border">
               <span className="font-mono font-bold uppercase">{color}</span>
               <button 
                 onClick={() => onCopy(color)}
                 className="p-2 hover:text-primary transition-colors"
               >
                 {copied ? <Check size={16} /> : <Copy size={16} />}
               </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
