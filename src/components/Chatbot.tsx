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
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 40, scale: 0.8, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="mb-6"
          >
            <Card className="w-[400px] border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] glass-card overflow-hidden rounded-[2rem]">
              <CardHeader className="bg-primary/90 backdrop-blur-md p-6 text-white flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Bot size={24} />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-black tracking-widest uppercase">
                      Dev&apos;s Assistant
                    </CardTitle>
                    <p className="text-[10px] opacity-70 font-bold uppercase tracking-widest">Online • Ready to help</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 hover:bg-white/20 rounded-xl text-white transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={20} />
                </Button>
              </CardHeader>
              <CardContent className="p-0 bg-transparent">
                <ScrollArea className="h-[400px] p-6">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-10">
                      <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary animate-pulse">
                        <Sparkles size={32} />
                      </div>
                      <div className="space-y-2">
                        <p className="text-lg font-black tracking-tight">
                          How can I help you?
                        </p>
                        <p className="text-sm text-muted-foreground px-6 leading-relaxed font-medium">
                          Ask me about Dev&apos;s tech stack, his internship at SSBI, or his MSME financial projects.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-6">
                      {messages.map((m) => (
                        <div
                          key={m.id}
                          className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                        >
                          <Avatar className="h-10 w-10 border-2 border-background shadow-sm shrink-0">
                            <AvatarFallback
                              className={
                                m.role === "user"
                                  ? "bg-primary text-white font-bold"
                                  : "bg-secondary text-foreground font-bold"
                              }
                            >
                              {m.role === "user" ? "ME" : "AI"}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`rounded-2xl px-5 py-3 max-w-[85%] text-sm font-medium shadow-sm leading-relaxed ${
                              m.role === "user"
                                ? "bg-primary text-white rounded-tr-none"
                                : "bg-secondary/80 text-foreground rounded-tl-none border border-border/50 backdrop-blur-sm"
                            }`}
                          >
                            {getMessageText(m.parts)}
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex gap-3">
                          <div className="h-10 w-10 rounded-full bg-secondary animate-pulse border-2 border-background" />
                          <div className="rounded-2xl rounded-tl-none px-5 py-3 bg-secondary/50 text-xs font-bold text-muted-foreground border border-border/50 animate-pulse">
                            Thinking...
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-4 border-t border-border/30 bg-background/50 backdrop-blur-md">
                <form onSubmit={handleSubmit} className="flex w-full gap-3">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question..."
                    className="flex-1 bg-secondary/50 border-none rounded-xl h-12 px-5 focus-visible:ring-2 focus-visible:ring-primary/20"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="h-12 w-12 rounded-xl bg-primary hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    disabled={isLoading || !input.trim()}
                  >
                    <Send size={20} />
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
          className={`flex items-center gap-3 px-6 h-16 rounded-3xl shadow-2xl transition-all duration-500 border-4 border-background group ${
            isOpen ? "bg-foreground text-background" : "bg-primary text-white"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <>
              <X size={24} strokeWidth={3} />
              <span className="font-black uppercase tracking-widest text-xs">Close</span>
            </>
          ) : (
            <>
              <MessageCircle size={24} strokeWidth={3} className="group-hover:rotate-12 transition-transform" />
              <span className="font-black uppercase tracking-widest text-xs">Chat with AI</span>
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
}
