"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Drum, 
  Zap, 
  Keyboard, 
  Activity, 
  Wrench, 
  MousePointerClick, 
  ArrowLeft,
  Sparkles,
  Lock,
  Palette as PaletteIcon,
  Clock,
  ListOrdered,
  ShieldAlert,
  Grid3X3,
  Crosshair
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import DrumKit from "@/components/playground/DrumKit";
import KeyboardSimulator from "@/components/playground/KeyboardSimulator";
import SoundVisualizer from "@/components/playground/SoundVisualizer";
import ClickSpeed from "@/components/playground/ClickSpeed";
import UtilityTools from "@/components/playground/UtilityTools";

// Dynamic imports for tools to keep initial bundle small
const ReflexGrid = dynamic(() => import("@/components/playground/ReflexGrid"), { ssr: false });
const SequenceMemory = dynamic(() => import("@/components/playground/SequenceMemory"), { ssr: false });
const AimTrainer = dynamic(() => import("@/components/playground/AimTrainer"), { ssr: false });
const TimePrediction = dynamic(() => import("@/components/playground/TimePrediction"), { ssr: false });
const SpeedSort = dynamic(() => import("@/components/playground/SpeedSort"), { ssr: false });
const DodgeGame = dynamic(() => import("@/components/playground/DodgeGame"), { ssr: false });
const SlidingPuzzle = dynamic(() => import("@/components/playground/SlidingPuzzle"), { ssr: false });
const ColorMatch = dynamic(() => import("@/components/playground/ColorMatch"), { ssr: false });
const TapCombo = dynamic(() => import("@/components/playground/TapCombo"), { ssr: false });
const PrecisionClick = dynamic(() => import("@/components/playground/PrecisionClick"), { ssr: false });

const tools = [
  {
    id: "drum-kit",
    name: "Drum Kit",
    description: "Experience high-fidelity percussion with keyboard support and real-time animations.",
    icon: Drum,
    component: DrumKit,
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "reflex-grid",
    name: "Reflex Grid",
    description: "A high-speed grid challenge. Hit the targets as they appear to test your response time.",
    icon: Zap,
    component: ReflexGrid,
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "sequence-memory",
    name: "Sequence Memory",
    description: "An advanced memory test. Follow the growing pattern and see how long you can last.",
    icon: Activity,
    component: SequenceMemory,
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "aim-trainer",
    name: "Aim Trainer",
    description: "Precision clicking challenge. Hit random targets of varying sizes to improve your accuracy.",
    icon: MousePointerClick,
    component: AimTrainer,
    color: "from-rose-500 to-red-600",
  },
  {
    id: "time-prediction",
    name: "Time Predictor",
    description: "Stop the clock exactly at the target. A test of internal timing and focus.",
    icon: Clock,
    component: TimePrediction,
    color: "from-amber-400 to-orange-500",
  },
  {
    id: "speed-sort",
    name: "Number Speed Sort",
    description: "Sort ascending numbers at lightning speed. Precision and pace combined.",
    icon: ListOrdered,
    component: SpeedSort,
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "dodge-game",
    name: "Dodge Chaos",
    description: "Survival of the quickest. Dodge falling obstacles and survive as long as possible.",
    icon: ShieldAlert,
    component: DodgeGame,
    color: "from-red-500 to-orange-600",
  },
  {
    id: "sliding-puzzle",
    name: "15 Puzzle",
    description: "Classic sliding tile logic. Organize the numbers in the correct order in minimal moves.",
    icon: Grid3X3,
    component: SlidingPuzzle,
    color: "from-teal-500 to-emerald-600",
  },
  {
    id: "color-match",
    name: "Color Match Chaos",
    description: "The Stroop Effect in action. Match colors to words while your brain tries to trick you.",
    icon: PaletteIcon,
    component: ColorMatch,
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "tap-combo",
    name: "Tap Combo",
    description: "High-intensity key sequence challenge. Build combos and test your finger dexterity.",
    icon: Keyboard,
    component: TapCombo,
    color: "from-indigo-500 to-purple-600",
  },
  {
    id: "precision-click",
    name: "Precision Click",
    description: "Tiny moving targets. A true test of mouse control and steady hands.",
    icon: Crosshair,
    component: PrecisionClick,
    color: "from-slate-600 to-slate-800",
  },
  {
    id: "keyboard-sim",
    name: "Keyboard Sound Sim",
    description: "Satisfying mechanical keyboard sounds with visual feedback for every stroke.",
    icon: Keyboard,
    component: KeyboardSimulator,
    color: "from-gray-500 to-gray-700",
  },
  {
    id: "visualizer",
    name: "Sound Visualizer",
    description: "Watch your audio come to life with dynamic, responsive frequency bars.",
    icon: Activity,
    component: SoundVisualizer,
    color: "from-violet-500 to-purple-600",
  },
  {
    id: "utility-tools",
    name: "Mini Utilities",
    description: "Essential tools for developers: JSON formatter, Password & Color generators.",
    icon: Wrench,
    component: UtilityTools,
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "click-speed",
    name: "Click Speed Test",
    description: "Measure your clicks per second (CPS) and see how fast your fingers really are.",
    icon: MousePointerClick,
    component: ClickSpeed,
    color: "from-emerald-500 to-green-600",
  },
];

export default function PlaygroundPage() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-6 md:px-12 lg:px-24">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">Back to Portfolio</span>
          </Link>

          <div className="flex flex-col gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Sparkles className="text-primary" size={24} />
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">
                Interactive <span className="text-gradient">Playground</span>
              </h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground max-w-2xl text-lg md:text-xl font-medium"
            >
              A collection of mini-tools, experiments, and interactive experiences built with performance and precision.
            </motion.p>
          </div>
        </header>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTool ? (
            <motion.div
              key="active-tool"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="relative"
            >
              <button 
                onClick={() => setActiveTool(null)}
                className="absolute -top-12 left-0 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Back to Grid</span>
              </button>
              
              <div className="glass-card rounded-3xl overflow-hidden min-h-[600px] border border-primary/20 p-8 shadow-2xl shadow-primary/5">
                {tools.find(t => t.id === activeTool)?.component && (
                  <div className="h-full">
                    {(() => {
                      const ToolComponent = tools.find(t => t.id === activeTool)!.component;
                      return <ToolComponent />;
                    })()}
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setActiveTool(tool.id)}
                  className="group cursor-pointer"
                >
                  <div className="glass-card h-full p-8 rounded-[2.5rem] hover-lift border border-transparent hover:border-primary/30 relative overflow-hidden flex flex-col justify-between">
                    {/* Tool Icon & Background Accent */}
                    <div className="mb-8">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white shadow-lg shadow-inherit/20 group-hover:scale-110 transition-transform duration-500`}>
                        <tool.icon size={28} />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-black mb-3 tracking-tight uppercase group-hover:text-primary transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {tool.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                      Explore Experience <ArrowLeft size={12} className="rotate-180" />
                    </div>

                    {/* Subtle decorative elements */}
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                       <tool.icon size={120} />
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Coming Soon Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: tools.length * 0.05 }}
              >
                <div className="glass-card h-full p-8 rounded-[2.5rem] border border-dashed border-border flex flex-col items-center justify-center text-center opacity-60">
                   <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground mb-6">
                      <Lock size={24} />
                   </div>
                   <h3 className="text-lg font-black tracking-tight uppercase mb-2">More Coming Soon</h3>
                   <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">New Experiments Brewing</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}


