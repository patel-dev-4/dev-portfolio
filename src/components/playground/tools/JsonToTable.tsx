"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Table, AlertCircle, Trash2, Check, Copy } from "lucide-react";

export default function JsonToTable() {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const parsedData = useMemo(() => {
    if (!jsonInput) {
      setError(null);
      return null;
    }
    try {
      const parsed = JSON.parse(jsonInput);
      setError(null);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (e: any) {
      setError("Invalid JSON format. Please provide an array or object.");
      return null;
    }
  }, [jsonInput]);

  const headers = useMemo(() => {
    if (!parsedData || parsedData.length === 0) return [];
    const allKeys = new Set<string>();
    parsedData.forEach(item => {
      if (typeof item === 'object' && item !== null) {
        Object.keys(item).forEach(key => allKeys.add(key));
      }
    });
    return Array.from(allKeys);
  }, [parsedData]);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 flex-1">
        {/* Input */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Table size={14} /> JSON Input (Array of Objects)
            </label>
            <button onClick={() => setJsonInput("")} className="text-rose-500 hover:text-rose-600 transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='[ { "id": 1, "name": "User 1" }, { "id": 2, "name": "User 2" } ]'
            className="flex-1 w-full bg-secondary/30 rounded-[2rem] p-8 font-mono text-sm border border-border focus:border-primary/50 focus:outline-none resize-none transition-all"
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

        {/* Table View */}
        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="flex items-center justify-between px-2">
             <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Tabular Preview</label>
             {parsedData && (
               <button onClick={handleCopy} className="text-[10px] font-bold text-primary uppercase flex items-center gap-1">
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  Copy Original
               </button>
             )}
          </div>
          <div className="flex-1 w-full bg-black/20 rounded-[2rem] border border-border overflow-auto custom-scrollbar">
            {parsedData && headers.length > 0 ? (
              <table className="w-full text-left border-collapse min-w-full">
                <thead className="sticky top-0 bg-secondary/80 backdrop-blur-md z-10">
                  <tr>
                    {headers.map(header => (
                      <th key={header} className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-primary border-b border-border">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {parsedData.map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      {headers.map(header => (
                        <td key={header} className="px-6 py-4 text-sm font-mono text-muted-foreground whitespace-nowrap">
                          {typeof row[header] === 'object' ? JSON.stringify(row[header]) : String(row[header] ?? "")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground italic text-sm">
                Paste valid JSON to see the table...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
