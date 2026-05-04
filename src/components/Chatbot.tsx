"use client";

import { useState, type FormEvent } from "react";
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
import { MessageCircle, Send, X, Bot, Sparkles } from "lucide-react";

/** Extract text content from a UIMessage's parts array */
function getMessageText(parts: Array<{ type: string; text?: string }>): string {
  return parts
    .filter((p) => p.type === "text" && typeof p.text === "string")
    .map((p) => p.text)
    .join("");
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat();

  const isLoading = status === "submitted" || status === "streaming";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input;
    setInput("");
    await sendMessage({ text });
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, rotate: -5, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 50, scale: 0.9, rotate: 5, filter: "blur(20px)" }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className="mb-8"
          >
            <Card className="w-[450px] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] bg-card/40 backdrop-blur-4xl overflow-hidden rounded-[3rem]">
              <CardHeader className="bg-primary p-8 text-white flex flex-row items-center justify-between space-y-0 relative overflow-hidden">
                <div className="absolute inset-0 noise opacity-10" />
                <div className="flex items-center gap-5 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl">
                    <Bot size={32} strokeWidth={2} />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-display font-black tracking-tighter uppercase leading-none mb-1">
                      CORE INTELLIGENCE
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <p className="text-[10px] opacity-60 font-black uppercase tracking-[0.2em]">System Online</p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 hover:bg-white/10 rounded-2xl text-white transition-all relative z-10"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={24} />
                </Button>
              </CardHeader>
              <CardContent className="p-0 bg-transparent">
                <ScrollArea className="h-[450px] p-8">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-8 py-16">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 rounded-[2.5rem] bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-2xl"
                      >
                        <Sparkles size={40} />
                      </motion.div>
                      <div className="space-y-4">
                        <p className="text-3xl font-display font-black tracking-tighter leading-none">
                          QUERY THE SYSTEM.
                        </p>
                        <p className="text-base text-muted-foreground/80 px-10 leading-relaxed font-medium">
                          Ask me about Dev&apos;s architectural patterns, financial systems, or technical trajectory.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-8">
                      {messages.map((m) => (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          key={m.id}
                          className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                        >
                          <Avatar className="h-12 w-12 border-2 border-white/5 shadow-2xl shrink-0">
                            <AvatarFallback
                              className={
                                m.role === "user"
                                  ? "bg-foreground text-background font-black text-xs"
                                  : "bg-primary text-white font-black text-xs"
                              }
                            >
                              {m.role === "user" ? "USR" : "SYS"}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`rounded-3xl px-6 py-4 max-w-[85%] text-base font-medium shadow-2xl leading-relaxed ${
                              m.role === "user"
                                ? "bg-foreground text-background rounded-tr-none"
                                : "bg-card/80 text-foreground rounded-tl-none border border-white/5 backdrop-blur-3xl"
                            }`}
                          >
                            {getMessageText(m.parts)}
                          </div>
                        </motion.div>
                      ))}
                      {isLoading && (
                        <div className="flex gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-primary/20 animate-pulse border-2 border-white/5" />
                          <div className="rounded-3xl rounded-tl-none px-6 py-4 bg-primary/10 text-xs font-black uppercase tracking-[0.2em] text-primary border border-primary/20 animate-pulse">
                            Processing...
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-6 border-t border-white/5 bg-background/40 backdrop-blur-4xl">
                <form onSubmit={handleSubmit} className="flex w-full gap-4">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="ENTER QUERY..."
                    className="flex-1 bg-background/50 border border-white/5 rounded-2xl h-16 px-6 font-display font-black text-lg tracking-tight focus-visible:ring-4 focus-visible:ring-primary/10 transition-all uppercase placeholder:opacity-20"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="h-16 w-16 rounded-2xl bg-primary hover:bg-primary/90 transition-all shadow-2xl shadow-primary/40 active:scale-95"
                    disabled={isLoading || !input.trim()}
                  >
                    <Send size={28} />
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
          className={`flex items-center gap-4 px-10 h-20 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-700 border-4 border-background group relative overflow-hidden ${
            isOpen ? "bg-foreground text-background" : "bg-primary text-white"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-[-20deg]" />
          {isOpen ? (
            <>
              <X size={32} strokeWidth={3} className="relative z-10" />
              <span className="font-black uppercase tracking-[0.3em] text-[11px] relative z-10">Deactivate</span>
            </>
          ) : (
            <>
              <MessageCircle size={32} strokeWidth={3} className="group-hover:rotate-12 transition-transform relative z-10" />
              <span className="font-black uppercase tracking-[0.3em] text-[11px] relative z-10">Initiate Dialogue</span>
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
}
