"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Key, AlertCircle, Check, Copy } from "lucide-react";

export default function JWTDecoder() {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState<Record<string, unknown> | null>(null);
  const [payload, setPayload] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setTimeout(() => setNow(Date.now()), 0);
    return () => clearTimeout(timer);
  }, []);

  const decodeToken = (val: string) => {
    setToken(val);
    if (!val) {
      setHeader(null);
      setPayload(null);
      setError(null);
      return;
    }

    try {
      const parts = val.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid JWT format. Must have 3 parts separated by dots.");
      }

      const decodedHeader = JSON.parse(atob(parts[0]));
      const decodedPayload = JSON.parse(atob(parts[1]));

      setHeader(decodedHeader);
      setPayload(decodedPayload);
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to decode token");
      setHeader(null);
      setPayload(null);
    }
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Token Input */}
      <div className="flex flex-col gap-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Key size={14} /> Encoded JWT
        </label>
        <textarea
          value={token}
          onChange={(e) => decodeToken(e.target.value)}
          placeholder="Paste your JWT here..."
          className="w-full h-32 bg-secondary/30 rounded-3xl p-6 font-mono text-sm border border-border focus:border-primary/50 focus:outline-none resize-none transition-all overflow-hidden"
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

      {/* Decoded Sections */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Header
            </label>
            {header && (
              <button 
                onClick={() => handleCopy(JSON.stringify(header, null, 2), "header")}
                className="text-[10px] font-bold text-primary uppercase flex items-center gap-1"
              >
                {copied === "header" ? <Check size={12} /> : <Copy size={12} />}
                {copied === "header" ? "Copied" : "Copy"}
              </button>
            )}
          </div>
          <div className="w-full h-48 bg-black/20 rounded-3xl p-6 border border-border overflow-auto font-mono text-sm">
            {header ? (
              <pre className="text-emerald-400">{JSON.stringify(header, null, 2)}</pre>
            ) : (
              <span className="text-muted-foreground italic">Paste a token to see the header...</span>
            )}
          </div>
        </div>

        {/* Payload */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Payload
            </label>
            {payload && (
              <button 
                onClick={() => handleCopy(JSON.stringify(payload, null, 2), "payload")}
                className="text-[10px] font-bold text-primary uppercase flex items-center gap-1"
              >
                {copied === "payload" ? <Check size={12} /> : <Copy size={12} />}
                {copied === "payload" ? "Copied" : "Copy"}
              </button>
            )}
          </div>
          <div className="w-full h-48 bg-black/20 rounded-3xl p-6 border border-border overflow-auto font-mono text-sm">
            {payload ? (
              <pre className="text-blue-400">{JSON.stringify(payload, null, 2)}</pre>
            ) : (
              <span className="text-muted-foreground italic">Paste a token to see the payload...</span>
            )}
          </div>
        </div>
      </div>

      {/* Expiry Info if exists */}
      {typeof payload?.exp === "number" && (
        <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10 flex items-center justify-between">
           <div>
             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Expiration Time (exp)</h4>
             <p className="text-sm font-medium">
               {new Date((payload.exp as number) * 1000).toLocaleString()}
             </p>
           </div>
           <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase ${
             (payload.exp as number) * 1000 < now ? "bg-rose-500/20 text-rose-500" : "bg-emerald-500/20 text-emerald-500"
           }`}>
             {(payload.exp as number) * 1000 < now ? "Expired" : "Valid"}
           </div>
        </div>
      )}
    </div>
  );
}
