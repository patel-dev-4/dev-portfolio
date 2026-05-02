"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Search, ExternalLink, Globe } from "lucide-react";

const statusCodes = [
  { code: 200, name: "OK", description: "The request has succeeded.", type: "Success" },
  { code: 201, name: "Created", description: "The request has succeeded and a new resource has been created.", type: "Success" },
  { code: 204, name: "No Content", description: "The server successfully processed the request, but is not returning any content.", type: "Success" },
  { code: 301, name: "Moved Permanently", description: "The URL of the requested resource has been changed permanently.", type: "Redirection" },
  { code: 302, name: "Found", description: "This response code means that the URI of requested resource has been changed temporarily.", type: "Redirection" },
  { code: 400, name: "Bad Request", description: "The server could not understand the request due to invalid syntax.", type: "Client Error" },
  { code: 401, name: "Unauthorized", description: "The client must authenticate itself to get the requested response.", type: "Client Error" },
  { code: 403, name: "Forbidden", description: "The client does not have access rights to the content.", type: "Client Error" },
  { code: 404, name: "Not Found", description: "The server cannot find the requested resource.", type: "Client Error" },
  { code: 405, name: "Method Not Allowed", description: "The request method is known by the server but has been disabled.", type: "Client Error" },
  { code: 409, name: "Conflict", description: "The request conflicts with the current state of the server.", type: "Client Error" },
  { code: 429, name: "Too Many Requests", description: "The user has sent too many requests in a given amount of time.", type: "Client Error" },
  { code: 500, name: "Internal Server Error", description: "The server has encountered a situation it doesn't know how to handle.", type: "Server Error" },
  { code: 502, name: "Bad Gateway", description: "The server, while acting as a gateway or proxy, received an invalid response from the upstream server.", type: "Server Error" },
  { code: 503, name: "Service Unavailable", description: "The server is not ready to handle the request.", type: "Server Error" },
  { code: 504, name: "Gateway Timeout", description: "The server, while acting as a gateway or proxy, did not get a response in time from the upstream server.", type: "Server Error" },
];

export default function HttpStatusExplorer() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof statusCodes[0] | null>(null);

  const filtered = statusCodes.filter(s => 
    s.code.toString().includes(search) || 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Success": return "text-emerald-500 bg-emerald-500/10";
      case "Redirection": return "text-blue-500 bg-blue-500/10";
      case "Client Error": return "text-amber-500 bg-amber-500/10";
      case "Server Error": return "text-rose-500 bg-rose-500/10";
      default: return "text-muted-foreground bg-secondary/30";
    }
  };

  return (
    <div className="flex h-[600px] gap-8">
      {/* List */}
      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text"
            placeholder="Search code or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-secondary/30 border border-border rounded-2xl focus:outline-none focus:border-primary/50 transition-all font-medium"
          />
        </div>

        <div className="flex-1 overflow-auto grid grid-cols-1 md:grid-cols-2 gap-3 pr-2 custom-scrollbar">
          {filtered.map(s => (
            <motion.div
              key={s.code}
              layoutId={s.code.toString()}
              onClick={() => setSelected(s)}
              className={`p-5 rounded-2xl cursor-pointer border transition-all flex items-center justify-between group ${
                selected?.code === s.code ? "bg-primary/10 border-primary/30" : "bg-secondary/10 border-transparent hover:bg-secondary/20"
              }`}
            >
              <div className="flex items-center gap-4">
                 <span className={`text-xl font-black ${
                   s.code >= 200 && s.code < 300 ? "text-emerald-500" : 
                   s.code >= 300 && s.code < 400 ? "text-blue-500" :
                   s.code >= 400 && s.code < 500 ? "text-amber-500" : "text-rose-500"
                 }`}>
                   {s.code}
                 </span>
                 <div className="flex flex-col">
                   <span className="font-bold text-sm uppercase tracking-tight">{s.name}</span>
                   <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full w-fit mt-1 ${getTypeColor(s.type)}`}>
                     {s.type}
                   </span>
                 </div>
              </div>
              <Info size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="w-96 flex flex-col gap-6">
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected.code}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-secondary/20 border border-border rounded-[2.5rem] p-10 h-full flex flex-col"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-8">
                   <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <Globe size={32} />
                   </div>
                   <span className="text-5xl font-black text-primary/20">{selected.code}</span>
                </div>
                
                <h3 className="text-3xl font-black uppercase tracking-tight mb-4">{selected.name}</h3>
                <span className={`inline-block text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl mb-8 ${getTypeColor(selected.type)}`}>
                  {selected.type}
                </span>

                <p className="text-muted-foreground font-medium leading-relaxed mb-8">
                  {selected.description}
                </p>

                <div className="space-y-4">
                   <div className="p-4 rounded-2xl bg-black/20 border border-border">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Standard Reference</p>
                      <p className="text-xs font-mono text-emerald-400">RFC 9110 Section 15</p>
                   </div>
                </div>
              </div>

              <a 
                href={`https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${selected.code}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
              >
                Documentation <ExternalLink size={16} />
              </a>
            </motion.div>
          ) : (
            <div className="bg-secondary/10 border border-dashed border-border rounded-[2.5rem] h-full flex flex-col items-center justify-center text-center p-10 opacity-50">
               <Info size={40} className="text-muted-foreground mb-6" />
               <h4 className="text-lg font-black uppercase tracking-tight mb-2">Select a code</h4>
               <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Details will appear here</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
