"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Gamepad2, 
  Wrench, 
  Brain, 
  Search, 
  ArrowLeft,
  Sparkles,
  Terminal,
  Cpu,
  Zap,
  Code2,
  Key,
  Globe,
  Palette,
  FileCode,
  Layout,
  Calculator,
  Hash,
  Fingerprint,
  Table,
  Save,
  Layers,
  Info,
  MousePointer2,
  Shield,
  Keyboard,
  Timer,
  Grid3X3,
  Music,
  Activity,
  Clock,
  Zap as ZapIcon
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";

// Types
type Category = "games" | "tools" | "logic";

interface PlaygroundItem {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: Category;
  color: string;
  component: React.ComponentType;
}

// Lazy Load Components
const DualTaskChallenge = dynamic(() => import("@/components/playground/games/DualTaskChallenge"), { ssr: false });
const TrajectoryShooter = dynamic(() => import("@/components/playground/games/TrajectoryShooter"), { ssr: false });
const SpeedTypingCombat = dynamic(() => import("@/components/playground/games/SpeedTypingCombat"), { ssr: false });
const LogicCircuitBuilder = dynamic(() => import("@/components/playground/games/LogicCircuitBuilder"), { ssr: false });
const BinaryConversionRace = dynamic(() => import("@/components/playground/games/BinaryConversionRace"), { ssr: false });
const GravityFlipRunner = dynamic(() => import("@/components/playground/games/GravityFlipRunner"), { ssr: false });
const PrimeNumberHunter = dynamic(() => import("@/components/playground/games/PrimeNumberHunter"), { ssr: false });
const SudokuLite = dynamic(() => import("@/components/playground/games/SudokuLite"), { ssr: false });
const AngleMatchingGame = dynamic(() => import("@/components/playground/games/AngleMatchingGame"), { ssr: false });
const PatternSpeedBuilder = dynamic(() => import("@/components/playground/games/PatternSpeedBuilder"), { ssr: false });

const RegexTester = dynamic(() => import("@/components/playground/tools/RegexTester"), { ssr: false });
const JWTDecoder = dynamic(() => import("@/components/playground/tools/JWTDecoder"), { ssr: false });
const ApiRequestBuilder = dynamic(() => import("@/components/playground/tools/ApiRequestBuilder"), { ssr: false });
const Base64Tool = dynamic(() => import("@/components/playground/tools/Base64Tool"), { ssr: false });
const HashGenerator = dynamic(() => import("@/components/playground/tools/HashGenerator"), { ssr: false });
const UuidGenerator = dynamic(() => import("@/components/playground/tools/UuidGenerator"), { ssr: false });
const JsonToTable = dynamic(() => import("@/components/playground/tools/JsonToTable"), { ssr: false });
const SnippetSaver = dynamic(() => import("@/components/playground/tools/SnippetSaver"), { ssr: false });
const GradientGenerator = dynamic(() => import("@/components/playground/tools/GradientGenerator"), { ssr: false });
const HttpStatusExplorer = dynamic(() => import("@/components/playground/tools/HttpStatusExplorer"), { ssr: false });

// Legacy Components (Keeping for scale)
const DrumKit = dynamic(() => import("@/components/playground/DrumKit"), { ssr: false });
const ReflexGrid = dynamic(() => import("@/components/playground/ReflexGrid"), { ssr: false });
const SequenceMemory = dynamic(() => import("@/components/playground/SequenceMemory"), { ssr: false });
const AimTrainer = dynamic(() => import("@/components/playground/AimTrainer"), { ssr: false });
const UtilityTools = dynamic(() => import("@/components/playground/UtilityTools"), { ssr: false });
const ClickSpeed = dynamic(() => import("@/components/playground/ClickSpeed"), { ssr: false });
const ColorMatch = dynamic(() => import("@/components/playground/ColorMatch"), { ssr: false });
const DodgeGame = dynamic(() => import("@/components/playground/DodgeGame"), { ssr: false });
const KeyboardSimulator = dynamic(() => import("@/components/playground/KeyboardSimulator"), { ssr: false });
const PrecisionClick = dynamic(() => import("@/components/playground/PrecisionClick"), { ssr: false });
const ReactionGame = dynamic(() => import("@/components/playground/ReactionGame"), { ssr: false });
const SlidingPuzzle = dynamic(() => import("@/components/playground/SlidingPuzzle"), { ssr: false });
const SoundVisualizer = dynamic(() => import("@/components/playground/SoundVisualizer"), { ssr: false });
const SpeedSort = dynamic(() => import("@/components/playground/SpeedSort"), { ssr: false });
const TapCombo = dynamic(() => import("@/components/playground/TapCombo"), { ssr: false });
const TimePrediction = dynamic(() => import("@/components/playground/TimePrediction"), { ssr: false });

const items: PlaygroundItem[] = [
  // Games (The Core 10)
  { id: "drum-kit", name: "DRUM KIT - PLAY NOW", description: "Experience high-fidelity percussion with keyboard support.", icon: Music, category: "games", color: "from-emerald-500 to-teal-600", component: DrumKit },
  { id: "dual-task", name: "Dual Task Challenge", description: "Multitask by managing two distinct challenges simultaneously.", icon: Zap, category: "games", color: "from-blue-500 to-cyan-400", component: DualTaskChallenge },
  { id: "trajectory-shooter", name: "Trajectory Shooter", description: "Master physics and angles to hit targets with precision.", icon: TargetIcon, category: "games", color: "from-rose-500 to-orange-400", component: TrajectoryShooter },
  { id: "speed-typing", name: "Speed Typing Combat", description: "Battle against time and enemies with your typing speed.", icon: Terminal, category: "games", color: "from-emerald-500 to-teal-400", component: SpeedTypingCombat },
  { id: "binary-race", name: "Binary Conversion Race", description: "Convert decimals to binary and back as fast as you can.", icon: Code2, category: "games", color: "from-amber-500 to-yellow-400", component: BinaryConversionRace },
  { id: "gravity-flip", name: "Gravity Flip Runner", description: "Defy gravity and dodge obstacles in this high-speed runner.", icon: Layers, category: "games", color: "from-slate-700 to-slate-500", component: GravityFlipRunner },
  { id: "prime-hunter", name: "Prime Number Hunter", description: "Identify prime numbers in a fast-paced mathematical hunt.", icon: Calculator, category: "games", color: "from-green-500 to-emerald-400", component: PrimeNumberHunter },
  { id: "sudoku-lite", name: "Sudoku Lite", description: "A minimalist version of the classic number placement puzzle.", icon: Layout, category: "games", color: "from-blue-600 to-indigo-500", component: SudokuLite },
  { id: "angle-match", name: "Angle Matching Game", description: "Estimate and match angles visually with high precision.", icon: Shapes, category: "games", color: "from-pink-500 to-rose-400", component: AngleMatchingGame },
  { id: "pattern-speed", name: "Pattern Speed Builder", description: "Replicate complex patterns at lightning speed.", icon: Sparkles, category: "games", color: "from-violet-500 to-purple-400", component: PatternSpeedBuilder },
  { id: "reflex-grid", name: "Reflex Grid", description: "A high-speed grid challenge. Hit the targets as they appear.", icon: ZapIcon, category: "games", color: "from-blue-500 to-indigo-600", component: ReflexGrid },
  { id: "dodge-game", name: "Dodge Challenge", description: "Avoid falling obstacles and survive as long as possible.", icon: Shield, category: "games", color: "from-red-600 to-orange-500", component: DodgeGame },
  { id: "sliding-puzzle", name: "Sliding Puzzle", description: "Classic 15-puzzle challenge. Sort the tiles in order.", icon: Grid3X3, category: "games", color: "from-cyan-500 to-blue-600", component: SlidingPuzzle },
  { id: "tap-combo", name: "Tap Combo", description: "Build your combo by tapping in sync with the rhythm.", icon: Activity, category: "games", color: "from-fuchsia-600 to-pink-500", component: TapCombo },
  { id: "aim-trainer", name: "Aim Trainer", description: "Precision clicking challenge. Hit random targets.", icon: TargetIcon, category: "games", color: "from-rose-500 to-red-600", component: AimTrainer },
  { id: "sound-viz", name: "Sound Visualizer", description: "Interactive audio spectrum analysis and visualization.", icon: Activity, category: "games", color: "from-violet-600 to-fuchsia-500", component: SoundVisualizer },
  { id: "keyboard-sim", name: "Keyboard Simulator", description: "A high-fidelity mechanical keyboard sound simulator.", icon: Keyboard, category: "games", color: "from-slate-500 to-slate-700", component: KeyboardSimulator },

  // Tools (The Core 10)
  { id: "dev-utils", name: "Developer Utilities", description: "JSON Formatter, Password Generator, and Color Palette tools.", icon: Wrench, category: "tools", color: "from-slate-600 to-slate-800", component: UtilityTools },
  { id: "regex-tester", name: "Regex Tester", description: "Test and debug regular expressions with real-time feedback.", icon: Search, category: "tools", color: "from-indigo-500 to-blue-400", component: RegexTester },
  { id: "jwt-decoder", name: "JWT Decoder", description: "Decode and inspect JSON Web Tokens safely and easily.", icon: Key, category: "tools", color: "from-purple-500 to-pink-400", component: JWTDecoder },
  { id: "api-builder", name: "API Request Builder", description: "Mock and test API requests with custom headers and bodies.", icon: Globe, category: "tools", color: "from-emerald-500 to-teal-400", component: ApiRequestBuilder },
  { id: "base64", name: "Base64 Tool", description: "Encode and decode strings and files to/from Base64 format.", icon: FileCode, category: "tools", color: "from-blue-600 to-cyan-500", component: Base64Tool },
  { id: "hash-gen", name: "Hash Generator", description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes.", icon: Hash, category: "tools", color: "from-orange-500 to-amber-400", component: HashGenerator },
  { id: "uuid-gen", name: "UUID Generator", description: "Generate bulk version 4 UUIDs for your development needs.", icon: Fingerprint, category: "tools", color: "from-slate-600 to-slate-400", component: UuidGenerator },
  { id: "json-table", name: "JSON to Table", description: "Convert messy JSON data into a clean, readable table format.", icon: Table, category: "tools", color: "from-teal-500 to-green-400", component: JsonToTable },
  { id: "snippet-saver", name: "Snippet Saver", description: "Quickly save and organize code snippets for later use.", icon: Save, category: "tools", color: "from-rose-500 to-pink-400", component: SnippetSaver },
  { id: "gradient-gen", name: "Gradient Generator", description: "Design beautiful CSS gradients with visual controls.", icon: Palette, category: "tools", color: "from-fuchsia-500 to-purple-400", component: GradientGenerator },
  { id: "http-explorer", name: "HTTP Explorer", description: "Explore HTTP status codes and their common meanings.", icon: Info, category: "tools", color: "from-blue-400 to-sky-300", component: HttpStatusExplorer },

  // Logic / Smart
  { id: "logic-circuit", name: "Logic Circuit Builder", description: "Build complex gates and solve logical puzzles.", icon: Cpu, category: "logic", color: "from-purple-500 to-indigo-400", component: LogicCircuitBuilder },
  { id: "sequence-memory", name: "Sequence Memory", description: "An advanced memory test. Follow the growing pattern.", icon: Brain, category: "logic", color: "from-purple-500 to-pink-600", component: SequenceMemory },
  { id: "click-speed", name: "Click Speed Test", description: "How fast can you click in 10 seconds? Test your CPS.", icon: MousePointer2, category: "logic", color: "from-orange-400 to-red-500", component: ClickSpeed },
  { id: "color-match", name: "Color Match", description: "Test your Stroop effect awareness by matching colors and text.", icon: Palette, category: "logic", color: "from-yellow-400 to-orange-500", component: ColorMatch },
  { id: "precision-click", name: "Precision Click", description: "Hit moving targets with absolute precision and timing.", icon: Timer, category: "logic", color: "from-blue-400 to-indigo-500", component: PrecisionClick },
  { id: "reaction-time", name: "Reaction Time", description: "Measure your visual reaction time in milliseconds.", icon: Activity, category: "logic", color: "from-emerald-400 to-green-600", component: ReactionGame },
  { id: "speed-sort", name: "Speed Sort", description: "Categorize items at high speed to test your cognitive sorting.", icon: Layers, category: "logic", color: "from-blue-500 to-cyan-400", component: SpeedSort },
  { id: "time-prediction", name: "Time Prediction", description: "Test your internal clock by predicting exact time intervals.", icon: Clock, category: "logic", color: "from-amber-500 to-orange-600", component: TimePrediction },
];

// Helper for Lucide icons that are missing in the import
function TargetIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function Shapes(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.434 2.1a.7.7 0 0 1 1.132 0l3.76 6.821A.7.7 0 0 1 15.7 10H8.3Z" />
      <rect x="15" y="14" width="7" height="7" rx="1" />
      <circle cx="5" cy="17" r="4" />
    </svg>
  );
}

export default function PlaygroundPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("games");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const activeToolData = useMemo(() => {
    return items.find(item => item.id === activeItem);
  }, [activeItem]);

  // Prevent space bar from scrolling when a module is active
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeItem) {
        if (e.key === " ") {
          // Don't prevent if user is typing in an input or textarea
          const target = e.target as HTMLElement;
          if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
            return;
          }
          e.preventDefault();
        } else if (e.key === "Escape") {
          setActiveItem(null);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem]);

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-6 md:px-12 lg:px-24">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {!activeItem && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Header */}
              <header className="mb-16">
                <Link 
                  href="/"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
                >
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Back to Portfolio</span>
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div className="flex flex-col gap-4">
                    <motion.div 
                      className="flex items-center gap-3"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Sparkles className="text-primary" size={24} />
                      </div>
                      <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">
                        Interactive <span className="text-gradient">Playground</span>
                      </h1>
                    </motion.div>
                    <p className="text-muted-foreground max-w-xl text-lg font-medium">
                      A professional suite of developer tools and interactive logic games designed for productivity and cognitive training.
                    </p>
                  </div>

                  {/* Search Bar */}
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input 
                      type="text"
                      placeholder="Search modules..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-secondary/50 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all font-medium"
                    />
                  </div>
                </div>
              </header>

              {/* Sticky Tab Navigation */}
              <nav className="sticky top-24 z-40 mb-12 flex justify-center">
                <div className="bg-background/80 backdrop-blur-xl border border-border p-2 rounded-2xl shadow-2xl flex gap-1">
                  <TabButton 
                    active={activeCategory === "games"} 
                    onClick={() => { setActiveCategory("games"); setActiveItem(null); }}
                    icon={Gamepad2}
                    label="Games"
                  />
                  <TabButton 
                    active={activeCategory === "tools"} 
                    onClick={() => { setActiveCategory("tools"); setActiveItem(null); }}
                    icon={Wrench}
                    label="Developer Tools"
                  />
                  <TabButton 
                    active={activeCategory === "logic"} 
                    onClick={() => { setActiveCategory("logic"); setActiveItem(null); }}
                    icon={Brain}
                    label="Smart / Logic"
                  />
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeItem ? (
            <motion.div
              key="active-item"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="relative py-8 md:py-12"
            >
              <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <button 
                  onClick={() => setActiveItem(null)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group px-6 py-3 bg-secondary/50 rounded-2xl border border-border shadow-sm"
                >
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Back to Playground</span>
                </button>
                
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeToolData?.color} flex items-center justify-center text-white shadow-lg`}>
                    {activeToolData && <activeToolData.icon size={20} />}
                  </div>
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tight">{activeToolData?.name}</h2>
                  </div>
                </div>
              </div>
              
              <div className="glass-card rounded-[2.5rem] overflow-hidden min-h-[700px] border border-primary/20 p-4 md:p-12 shadow-[0_32px_64px_rgba(0,0,0,0.3)] bg-background/40 backdrop-blur-3xl relative">
                <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                <div className="w-full h-full relative z-10">
                  {activeToolData?.component && <activeToolData.component />}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setActiveItem(item.id)}
                  className="group cursor-pointer"
                >
                  <div className="glass-card h-full p-8 rounded-[2.5rem] hover-lift border border-transparent hover:border-primary/30 relative overflow-hidden flex flex-col justify-between min-h-[280px]">
                    {/* Tool Icon */}
                    <div className="mb-8">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                        <item.icon size={28} />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-black mb-3 tracking-tight uppercase group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-medium">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                      Launch Module <ArrowLeft size={12} className="rotate-180" />
                    </div>

                    {/* Decorative Background Icon */}
                    <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                       <item.icon size={160} />
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredItems.length === 0 && (
                <div className="col-span-full py-20 text-center">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2">No modules found</h3>
                  <p className="text-muted-foreground font-medium">Try adjusting your search or category filter</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
}

function TabButton({ active, onClick, icon: Icon, label }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-3 px-8 py-4 rounded-xl transition-all duration-300 ${
        active 
          ? "bg-primary text-white shadow-xl shadow-primary/20" 
          : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
      }`}
    >
      <Icon size={20} className={active ? "animate-pulse" : ""} />
      <span className="text-xs font-black uppercase tracking-widest hidden md:inline">{label}</span>
      {active && (
        <motion.div 
          layoutId="activeTab"
          className="absolute inset-0 bg-primary rounded-xl -z-10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </button>
  );
}
