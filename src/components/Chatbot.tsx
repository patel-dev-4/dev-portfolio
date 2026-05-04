"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Send, X, Bot, Sparkles, RefreshCcw, AlertCircle } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  const { 
    messages, 
    sendMessage, 
    status,
    // Note: In this version of the SDK, error and reload might be handled differently
  } = useChat();

  const isLoading = status === "submitted" || status === "streaming";

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input;
    setInput("");
    try {
      await sendMessage({ text });
    } catch (err) {
      console.error("Chatbot Error:", err);
    }
  };

  /** Extract text content from a UIMessage's parts array */
  const getMessageText = (parts: any[]): string => {
    return parts
      .filter((p) => p.type === "text" && typeof p.text === "string")
      .map((p) => p.text)
      .join("");
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="mb-6 md:mb-8"
          >
            <Card className="w-[90vw] md:w-[420px] border border-white/10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] bg-card/60 backdrop-blur-4xl overflow-hidden rounded-[2.5rem]">
              <CardHeader className="bg-primary p-6 md:p-8 text-white flex flex-row items-center justify-between space-y-0 relative overflow-hidden">
                <div className="absolute inset-0 noise opacity-10" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                    <Bot size={28} strokeWidth={2.5} />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-display font-black tracking-tighter uppercase leading-none mb-1.5">
                      Core Intel
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full animate-pulse bg-green-400" />
                      <p className="text-[9px] opacity-70 font-black uppercase tracking-[0.2em]">
                        Online
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 hover:bg-white/10 rounded-xl text-white transition-all relative z-10"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={20} />
                </Button>
              </CardHeader>

              <CardContent className="p-0 bg-transparent">
                <ScrollArea ref={scrollRef} className="h-[400px] md:h-[450px] p-6 md:p-8">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-12">
                      <div className="w-20 h-20 rounded-[2rem] bg-primary/5 border border-primary/10 flex items-center justify-center text-primary/40">
                        <Sparkles size={32} />
                      </div>
                      <div className="space-y-3">
                        <p className="text-2xl font-display font-black tracking-tighter uppercase">Query Input Required</p>
                        <p className="text-xs text-muted-foreground/60 px-8 font-medium uppercase tracking-widest leading-loose">
                          Inquire about technical architecture, system design, or professional trajectory.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-6 md:gap-8">
                      {messages.map((m) => (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          key={m.id}
                          className={`flex gap-3 md:gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                        >
                          <Avatar className="h-10 w-10 border border-white/5 shadow-xl shrink-0">
                            <AvatarFallback
                              className={
                                m.role === "user"
                                  ? "bg-foreground text-background font-black text-[10px]"
                                  : "bg-primary text-white font-black text-[10px]"
                              }
                            >
                              {m.role === "user" ? "USR" : "SYS"}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`rounded-2xl px-5 py-3.5 text-sm font-medium shadow-xl leading-relaxed ${
                              m.role === "user"
                                ? "bg-foreground text-background rounded-tr-none"
                                : "bg-secondary/40 text-foreground rounded-tl-none border border-white/5 backdrop-blur-xl"
                            }`}
                          >
                            {/* @ts-ignore - Handle parts from UIMessage */}
                            {m.parts ? getMessageText(m.parts) : (m as any).content}
                          </div>
                        </motion.div>
                      ))}
                      
                      {isLoading && (
                        <div className="flex gap-4 items-center">
                          <div className="h-10 w-10 rounded-xl bg-primary/10 animate-pulse border border-primary/20 flex items-center justify-center">
                            <Bot size={18} className="text-primary animate-bounce" />
                          </div>
                          <div className="text-[9px] font-black uppercase tracking-[0.2em] text-primary animate-pulse">
                            Processing Data...
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>

              <CardFooter className="p-4 md:p-6 border-t border-white/5 bg-background/60 backdrop-blur-4xl">
                <form onSubmit={handleSubmit} className="flex w-full gap-3 md:gap-4">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="ENTER QUERY..."
                    disabled={isLoading}
                    className="flex-1 bg-background/50 border border-white/10 rounded-xl h-14 md:h-16 px-5 font-display font-black text-base md:text-lg tracking-tight focus-visible:ring-primary/20 transition-all uppercase placeholder:opacity-20"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="h-14 w-14 md:h-16 md:w-16 rounded-xl bg-primary hover:bg-primary/90 transition-all shadow-2xl active:scale-95"
                    disabled={isLoading || !input.trim()}
                  >
                    <Send size={24} />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
 
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="flex justify-end"
      >
        <button
          className={`flex items-center gap-4 px-8 md:px-10 h-16 md:h-20 rounded-full shadow-2xl transition-all duration-500 border-2 border-background group relative overflow-hidden ${
            isOpen ? "bg-foreground text-background" : "bg-primary text-white"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-[-20deg]" />
          {isOpen ? (
            <>
              <X size={24} strokeWidth={3} className="relative z-10" />
              <span className="font-black uppercase tracking-[0.3em] text-[10px] relative z-10 hidden md:inline">Shutdown</span>
            </>
          ) : (
            <>
              <MessageCircle size={24} strokeWidth={3} className="group-hover:rotate-12 transition-transform relative z-10" />
              <span className="font-black uppercase tracking-[0.3em] text-[10px] relative z-10 hidden md:inline">Core Dialog</span>
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
}
