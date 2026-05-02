"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Trash2, Plus, Code2, Copy, Check, Search, Terminal } from "lucide-react";

interface Snippet {
  id: string;
  title: string;
  code: string;
  language: string;
  createdAt: number;
}

export default function SnippetSaver() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [activeSnippet, setActiveSnippet] = useState<Snippet | null>(null);
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("pg_snippets");
    if (saved) setSnippets(JSON.parse(saved));
  }, []);

  const saveToStorage = (updated: Snippet[]) => {
    localStorage.setItem("pg_snippets", JSON.stringify(updated));
    setSnippets(updated);
  };

  const createNew = () => {
    const newSnip: Snippet = {
      id: crypto.randomUUID(),
      title: "Untitled Snippet",
      code: "",
      language: "javascript",
      createdAt: Date.now()
    };
    saveToStorage([newSnip, ...snippets]);
    setActiveSnippet(newSnip);
  };

  const updateActive = (field: keyof Snippet, value: string) => {
    if (!activeSnippet) return;
    const updated = { ...activeSnippet, [field]: value };
    setActiveSnippet(updated);
    const newSnippets = snippets.map(s => s.id === updated.id ? updated : s);
    saveToStorage(newSnippets);
  };

  const deleteSnippet = (id: string) => {
    const newSnippets = snippets.filter(s => s.id !== id);
    saveToStorage(newSnippets);
    if (activeSnippet?.id === id) setActiveSnippet(null);
  };

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const filtered = snippets.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) || 
    s.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-[600px] gap-6 overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 flex flex-col gap-6 border-r border-border pr-6 h-full">
        <div className="flex items-center justify-between">
           <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">My Library</h4>
           <button onClick={createNew} className="text-primary hover:text-primary/80 transition-colors">
              <Plus size={20} />
           </button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
          <input 
            type="text"
            placeholder="Search snippets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-secondary/30 rounded-xl border border-border text-xs focus:outline-none focus:border-primary/50"
          />
        </div>

        <div className="flex-1 overflow-auto space-y-2 custom-scrollbar pr-2">
          {filtered.map(s => (
            <div 
              key={s.id}
              onClick={() => setActiveSnippet(s)}
              className={`group p-4 rounded-2xl cursor-pointer transition-all border ${
                activeSnippet?.id === s.id ? "bg-primary/10 border-primary/30" : "bg-secondary/10 border-transparent hover:bg-secondary/20"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">{s.language}</span>
                 <button 
                   onClick={(e) => { e.stopPropagation(); deleteSnippet(s.id); }}
                   className="opacity-0 group-hover:opacity-100 text-rose-500 hover:text-rose-600 transition-all"
                 >
                   <Trash2 size={12} />
                 </button>
              </div>
              <h5 className="font-bold text-sm truncate">{s.title || "Untitled"}</h5>
              <p className="text-[10px] text-muted-foreground mt-1">
                {new Date(s.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-xs italic">
              No snippets found
            </div>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        {activeSnippet ? (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col h-full gap-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 flex items-center gap-4">
                 <input 
                   type="text"
                   value={activeSnippet.title}
                   onChange={(e) => updateActive("title", e.target.value)}
                   className="bg-transparent text-xl font-black uppercase tracking-tight focus:outline-none w-full"
                   placeholder="Snippet Title..."
                 />
              </div>
              <div className="flex items-center gap-4">
                 <select 
                   value={activeSnippet.language}
                   onChange={(e) => updateActive("language", e.target.value)}
                   className="bg-secondary/30 border border-border rounded-lg px-3 py-1.5 text-[10px] font-black uppercase focus:outline-none"
                 >
                   <option value="javascript">JavaScript</option>
                   <option value="typescript">TypeScript</option>
                   <option value="html">HTML</option>
                   <option value="css">CSS</option>
                   <option value="python">Python</option>
                   <option value="sql">SQL</option>
                 </select>
                 <button 
                   onClick={() => handleCopy(activeSnippet.code, "editor")}
                   className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
                 >
                   {copied === "editor" ? <Check size={14} /> : <Copy size={14} />}
                   {copied === "editor" ? "Copied" : "Copy Code"}
                 </button>
              </div>
            </div>

            <div className="flex-1 relative group">
              <div className="absolute top-4 left-4 text-muted-foreground/30 pointer-events-none">
                 <Terminal size={24} />
              </div>
              <textarea 
                value={activeSnippet.code}
                onChange={(e) => updateActive("code", e.target.value)}
                className="w-full h-full bg-black/30 rounded-[2rem] border border-border p-8 font-mono text-sm text-emerald-400 focus:outline-none focus:border-primary/50 resize-none transition-all"
                placeholder="// Type your code here..."
              />
            </div>
          </motion.div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
             <div className="w-20 h-20 rounded-[2rem] bg-secondary/30 flex items-center justify-center text-muted-foreground opacity-50">
                <Code2 size={40} />
             </div>
             <div>
               <h4 className="text-xl font-black uppercase tracking-tight mb-2">No active snippet</h4>
               <p className="text-sm text-muted-foreground max-w-xs mx-auto">Select a snippet from the library or create a new one to start saving your code.</p>
             </div>
             <button 
               onClick={createNew}
               className="px-8 py-3 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform"
             >
               Create New Snippet
             </button>
          </div>
        )}
      </div>
    </div>
  );
}
