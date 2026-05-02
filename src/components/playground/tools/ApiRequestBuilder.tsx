"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Send, Plus, Trash2, AlertCircle } from "lucide-react";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export default function ApiRequestBuilder() {
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/todos/1");
  const [method, setMethod] = useState<Method>("GET");
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([
    { key: "Content-Type", value: "application/json" }
  ]);
  const [body, setBody] = useState("");
  const [response, setResponse] = useState<{
    status: number;
    statusText: string;
    data: unknown;
    headers: Record<string, string>;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addHeader = () => setHeaders([...headers, { key: "", value: "" }]);
  const removeHeader = (index: number) => setHeaders(headers.filter((_, i) => i !== index));
  const updateHeader = (index: number, field: "key" | "value", value: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const sendRequest = async () => {
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const headerObj = headers.reduce((acc, curr) => {
        if (curr.key) acc[curr.key] = curr.value;
        return acc;
      }, {} as Record<string, string>);

      const options: RequestInit = {
        method,
        headers: headerObj,
      };

      if (method !== "GET" && body) {
        options.body = body;
      }

      const res = await fetch(url, options);
      const data = await res.json();
      setResponse({
        status: res.status,
        statusText: res.statusText,
        data,
        headers: Object.fromEntries(res.headers.entries()),
      });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to send request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* URL and Method */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-32">
          <select 
            value={method}
            onChange={(e) => setMethod(e.target.value as Method)}
            className="w-full bg-secondary/30 border border-border rounded-2xl p-4 font-black text-xs appearance-none focus:outline-none focus:border-primary/50"
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
        </div>
        <div className="flex-1 relative">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.example.com/endpoint"
            className="w-full bg-secondary/30 border border-border rounded-2xl pl-12 pr-4 py-4 font-medium focus:outline-none focus:border-primary/50"
          />
        </div>
        <button
          onClick={sendRequest}
          disabled={loading}
          className="bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 shadow-xl shadow-primary/20"
        >
          {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={18} />}
          Send
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Request Configuration */}
        <div className="space-y-8">
          {/* Headers */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Headers</label>
              <button onClick={addHeader} className="text-primary hover:text-primary/80 transition-colors">
                <Plus size={18} />
              </button>
            </div>
            <div className="space-y-2 max-h-40 overflow-auto pr-2 custom-scrollbar">
              {headers.map((h, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={h.key}
                    onChange={(e) => updateHeader(i, "key", e.target.value)}
                    placeholder="Key"
                    className="flex-1 bg-secondary/20 border border-border rounded-xl px-4 py-2 text-xs font-mono focus:outline-none focus:border-primary/30"
                  />
                  <input
                    type="text"
                    value={h.value}
                    onChange={(e) => updateHeader(i, "value", e.target.value)}
                    placeholder="Value"
                    className="flex-1 bg-secondary/20 border border-border rounded-xl px-4 py-2 text-xs font-mono focus:outline-none focus:border-primary/30"
                  />
                  <button onClick={() => removeHeader(i)} className="text-muted-foreground hover:text-rose-500 transition-colors px-1">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Body */}
          {method !== "GET" && (
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Body (JSON)</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder='{ "key": "value" }'
                className="w-full h-48 bg-secondary/30 border border-border rounded-3xl p-6 font-mono text-xs focus:outline-none focus:border-primary/50 resize-none transition-all"
              />
            </div>
          )}
        </div>

        {/* Response */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
             <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Response</label>
             {response && (
               <div className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${
                 response.status >= 200 && response.status < 300 ? "bg-emerald-500/20 text-emerald-500" : "bg-rose-500/20 text-rose-500"
               }`}>
                 Status: {response.status} {response.statusText}
               </div>
             )}
          </div>
          <div className="w-full h-[400px] bg-black/20 border border-border rounded-[2rem] overflow-auto p-8 font-mono text-sm relative">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                >
                  <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Waiting for response...</p>
                </motion.div>
              ) : error ? (
                <motion.div 
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3 text-rose-500"
                >
                  <AlertCircle size={20} />
                  <span className="font-bold">{error}</span>
                </motion.div>
              ) : response ? (
                <motion.div 
                  key="response"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <pre className="text-emerald-400">{JSON.stringify(response.data, null, 2)}</pre>
                </motion.div>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground italic text-sm">
                  Send a request to see the response...
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
