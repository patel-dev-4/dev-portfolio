"use client";

import { useState } from "react";
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
import { MessageCircle, Send, X, Bot } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4"
          >
            <Card className="w-[380px] shadow-2xl border-primary/20 bg-background/95 backdrop-blur-md overflow-hidden">
              <CardHeader className="bg-primary p-4 text-primary-foreground flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                  <Bot size={20} />
                  <CardTitle className="text-sm font-bold tracking-tight">
                    Dev's AI Assistant
                  </CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-white/20 text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={18} />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[350px] p-4">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-2 mt-10">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <MessageCircle className="text-primary" size={24} />
                      </div>
                      <p className="text-sm font-medium">
                        Hello! I'm Dev's AI.
                      </p>
                      <p className="text-xs text-muted-foreground px-10">
                        Ask me about Dev's experience at SSBI Group or his
                        projects like the MSME Financial System.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {messages.map(
                        (m: { id: string; role: string; content: string }) => (
                          <div
                            key={m.id}
                            className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                          >
                            <Avatar className="h-8 w-8 border">
                              <AvatarFallback
                                className={
                                  m.role === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted"
                                }
                              >
                                {m.role === "user" ? "U" : "AI"}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`rounded-2xl px-3 py-2 max-w-[80%] text-sm shadow-sm ${
                                m.role === "user"
                                  ? "bg-primary text-primary-foreground rounded-tr-none"
                                  : "bg-muted rounded-tl-none border"
                              }`}
                            >
                              {m.content}
                            </div>
                          </div>
                        ),
                      )}
                      {isLoading && (
                        <div className="flex gap-2">
                          <Avatar className="h-8 w-8 animate-pulse">
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                          <div className="rounded-2xl rounded-tl-none px-3 py-2 bg-muted text-sm border animate-pulse">
                            Thinking...
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-3 border-t bg-muted/30">
                <form onSubmit={handleSubmit} className="flex w-full gap-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-background"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || !input}
                  >
                    <Send size={18} />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex justify-end"
      >
        <Button
          size="lg"
          className="rounded-full shadow-2xl h-14 w-14 p-0 bg-primary hover:bg-primary/90 transition-all duration-300 border-4 border-background"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </Button>
      </motion.div>
    </div>
  );
}
