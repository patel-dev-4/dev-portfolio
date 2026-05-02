"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeTransition() {
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    
    let lastClass = document.documentElement.className;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const currentClass = document.documentElement.className;
          if (currentClass !== lastClass) {
            lastClass = currentClass;
            setIsAnimating(true);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
              setIsAnimating(false);
            }, 800);
          }
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          initial={{ 
            clipPath: `circle(0% at ${mousePos.x}px ${mousePos.y}px)`,
            opacity: 1 
          }}
          animate={{ 
            clipPath: `circle(150% at ${mousePos.x}px ${mousePos.y}px)`,
            opacity: [1, 1, 0]
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeInOut",
            times: [0, 0.8, 1]
          }}
          className="fixed inset-0 z-[9999] pointer-events-none bg-primary/10 backdrop-blur-[1px] will-change-[clip-path,opacity]"
          onAnimationComplete={() => setIsAnimating(false)}
        />
      )}
    </AnimatePresence>
  );
}
