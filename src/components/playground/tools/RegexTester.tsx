"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Info, Check, AlertCircle } from "lucide-react";

export default function RegexTester() {
  const [regex, setRegex] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const { matches, error } = useMemo(() => {
    if (!regex) return { matches: [], error: null };

    try {
      const re = new RegExp(regex, flags);
      const allMatches: RegExpMatchArray[] = [];
      let match;

      if (flags.includes("g")) {
        // Create a copy to not modify original string if needed, though re.exec uses string
        while ((match = re.exec(testString)) !== null) {
          allMatches.push(match);
          if (match.index === re.lastIndex) re.lastIndex++; // Prevent infinite loop for zero-width matches
        }
      } else {
        match = testString.match(re);
        if (match) allMatches.push(match);
      }

      return { matches: allMatches, error: null };
    } catch (e: unknown) {
      return { 
        matches: [], 
        error: e instanceof Error ? e.message : "Invalid regular expression" 
      };
    }
  }, [regex, flags, testString]);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Regex Input */}
        <div className="flex flex-col gap-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Search size={14} /> Regular Expression
          </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">/</span>
              <input
                type="text"
                value={regex}
                onChange={(e) => setRegex(e.target.value)}
                placeholder="([a-z]+)"
                className="w-full bg-secondary/30 rounded-2xl pl-8 pr-12 py-4 font-mono text-sm border border-border focus:border-primary/50 focus:outline-none transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">/</span>
            </div>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="g"
              className="w-16 bg-secondary/30 rounded-2xl px-4 py-4 font-mono text-sm border border-border focus:border-primary/50 focus:outline-none text-center"
            />
          </div>
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

        {/* Info / Quick Tips */}
        <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <Info size={14} className="text-primary" /> Quick Tips
          </h4>
          <ul className="text-xs space-y-2 text-muted-foreground font-medium">
            <li className="flex items-center gap-2"><span className="text-primary font-mono">\d</span> - Any digit</li>
            <li className="flex items-center gap-2"><span className="text-primary font-mono">\w</span> - Any word character</li>
            <li className="flex items-center gap-2"><span className="text-primary font-mono">.</span> - Any character</li>
            <li className="flex items-center gap-2"><span className="text-primary font-mono">+</span> - 1 or more</li>
            <li className="flex items-center gap-2"><span className="text-primary font-mono">*</span> - 0 or more</li>
          </ul>
        </div>
      </div>

      {/* Test String */}
      <div className="flex flex-col gap-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          Test String
        </label>
        <textarea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="Enter text to test your regex against..."
          className="w-full h-40 bg-secondary/30 rounded-3xl p-6 font-mono text-sm border border-border focus:border-primary/50 focus:outline-none resize-none transition-all"
        />
      </div>

      {/* Results */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Matches ({matches.length})
          </label>
          {matches.length > 0 && !error && (
            <span className="text-[10px] font-black uppercase text-emerald-500 flex items-center gap-1">
              <Check size={12} /> Valid Regex
            </span>
          )}
        </div>
        <div className="w-full min-h-[100px] bg-black/20 rounded-3xl p-6 border border-border overflow-auto">
          {matches.length > 0 ? (
            <div className="space-y-4">
              {matches.map((match, i) => (
                <div key={i} className="flex flex-col gap-1 border-l-2 border-primary/30 pl-4 py-1">
                  <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">Match {i + 1}</span>
                  <code className="text-emerald-400 text-sm">&quot;{match[0]}&quot;</code>
                  {match.length > 1 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {Array.from(match).slice(1).map((group, j) => (
                        <span key={j} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                          Group {j + 1}: &quot;{group}&quot;
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground text-sm italic font-medium">No matches found...</span>
          )}
        </div>
      </div>
    </div>
  );
}
