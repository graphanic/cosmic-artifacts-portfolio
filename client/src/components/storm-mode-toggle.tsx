import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cloud, Eye } from "lucide-react";

type StormMode = "storm" | "calm";

interface StormModeContextType {
  mode: StormMode;
  toggleMode: () => void;
  isStorm: boolean;
}

const StormModeContext = createContext<StormModeContextType | undefined>(undefined);

export function useStormMode() {
  const context = useContext(StormModeContext);
  if (!context) {
    throw new Error("useStormMode must be used within a StormModeProvider");
  }
  return context;
}

interface StormModeProviderProps {
  children: ReactNode;
}

export function StormModeProvider({ children }: StormModeProviderProps) {
  const [mode, setMode] = useState<StormMode>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("storm-mode");
      return (stored as StormMode) || "storm";
    }
    return "storm";
  });

  useEffect(() => {
    localStorage.setItem("storm-mode", mode);
    if (mode === "calm") {
      document.body.classList.add("calm-mode");
    } else {
      document.body.classList.remove("calm-mode");
    }
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "storm" ? "calm" : "storm"));
  };

  const isStorm = mode === "storm";

  return (
    <StormModeContext.Provider value={{ mode, toggleMode, isStorm }}>
      {children}
    </StormModeContext.Provider>
  );
}

export function StormModeToggle() {
  const { mode, toggleMode, isStorm } = useStormMode();

  return (
    <motion.button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMode();
      }}
      className="fixed bottom-6 left-6 z-[9999] group"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isStorm ? "calm" : "storm"} mode`}
      data-testid="storm-mode-toggle"
      data-mode={mode}
    >
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-full blur-xl opacity-60"
          animate={{
            background: isStorm
              ? [
                  "radial-gradient(circle, hsl(330, 100%, 60%) 0%, transparent 70%)",
                  "radial-gradient(circle, hsl(185, 100%, 55%) 0%, transparent 70%)",
                  "radial-gradient(circle, hsl(320, 100%, 60%) 0%, transparent 70%)",
                  "radial-gradient(circle, hsl(330, 100%, 60%) 0%, transparent 70%)",
                ]
              : "radial-gradient(circle, hsl(200, 50%, 40%) 0%, transparent 70%)",
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ width: "120%", height: "120%", left: "-10%", top: "-10%" }}
        />

        <motion.div
          className={`
            relative w-14 h-14 rounded-full flex items-center justify-center
            border-2 transition-colors duration-500
            ${isStorm 
              ? "bg-gradient-to-br from-[hsl(330,100%,60%,0.2)] via-[hsl(280,100%,50%,0.2)] to-[hsl(185,100%,55%,0.2)] border-[hsl(330,100%,60%,0.6)]" 
              : "bg-[hsl(235,40%,12%)] border-[hsl(200,50%,40%,0.5)]"
            }
          `}
          animate={{
            boxShadow: isStorm
              ? [
                  "0 0 20px hsl(330, 100%, 60%, 0.4), 0 0 40px hsl(185, 100%, 55%, 0.2), inset 0 0 20px hsl(280, 100%, 50%, 0.1)",
                  "0 0 30px hsl(185, 100%, 55%, 0.5), 0 0 60px hsl(330, 100%, 60%, 0.3), inset 0 0 30px hsl(320, 100%, 60%, 0.15)",
                  "0 0 20px hsl(330, 100%, 60%, 0.4), 0 0 40px hsl(185, 100%, 55%, 0.2), inset 0 0 20px hsl(280, 100%, 50%, 0.1)",
                ]
              : "0 0 10px hsl(200, 50%, 40%, 0.2), inset 0 0 10px hsl(200, 50%, 40%, 0.05)",
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <AnimatePresence mode="wait">
            {isStorm ? (
              <motion.div
                key="storm"
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <Cloud className="w-6 h-6 text-[hsl(185,100%,55%)]" />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                  }}
                >
                  <div className="w-1 h-3 bg-[hsl(330,100%,60%)] rounded-full transform translate-y-2" />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="calm"
                initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                <Eye className="w-6 h-6 text-[hsl(200,70%,70%)]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span
            className={`
              text-[10px] font-mono uppercase tracking-widest
              ${isStorm ? "text-[hsl(330,100%,60%)]" : "text-[hsl(200,50%,60%)]"}
            `}
          >
            {mode}
          </span>
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        initial={false}
        whileHover={{
          boxShadow: isStorm
            ? [
                "0 0 0 2px hsl(330, 100%, 60%, 0)",
                "0 0 0 4px hsl(330, 100%, 60%, 0.3)",
                "0 0 0 8px hsl(185, 100%, 55%, 0.1)",
              ]
            : "0 0 0 4px hsl(200, 50%, 40%, 0.2)",
        }}
        transition={{ duration: 0.3 }}
      />

      <div
        className={`
          absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 
          transition-opacity duration-300 pointer-events-none
          ${isStorm ? "storm-glitch-hover" : ""}
        `}
      />
    </motion.button>
  );
}
