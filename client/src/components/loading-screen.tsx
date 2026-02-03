import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOADING_PHRASES = [
  "ENTERING THE VOID...",
  "CONSCIOUSNESS LOADING...",
  "SANITY IS IN RARE SUPPLY...",
  "REALITY FRAGMENTING...",
  "DISSOLVING BOUNDARIES...",
  "AWAKENING THE STORM...",
];

const PARTICLE_COUNT = 30;
const MIN_DISPLAY_TIME = 1500;

function EyeSymbol({ progress }: { progress: number }) {
  const eyeOpen = Math.min(progress / 100, 1);
  
  return (
    <motion.div
      className="relative w-32 h-32 flex items-center justify-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="eyeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(185, 100%, 55%)" />
            <stop offset="50%" stopColor="hsl(330, 100%, 60%)" />
            <stop offset="100%" stopColor="hsl(280, 100%, 50%)" />
          </linearGradient>
        </defs>
        
        <motion.ellipse
          cx="50"
          cy="50"
          rx="40"
          initial={{ ry: 0 }}
          animate={{ ry: 25 * eyeOpen }}
          fill="none"
          stroke="url(#eyeGradient)"
          strokeWidth="2"
          filter="url(#glow)"
        />
        
        <motion.ellipse
          cx="50"
          cy="50"
          rx="40"
          initial={{ ry: 0 }}
          animate={{ ry: 25 * eyeOpen }}
          fill="none"
          stroke="hsl(185, 100%, 55%)"
          strokeWidth="0.5"
          opacity={0.5}
          style={{ transform: "translate(-2px, 0)" }}
        />
        <motion.ellipse
          cx="50"
          cy="50"
          rx="40"
          initial={{ ry: 0 }}
          animate={{ ry: 25 * eyeOpen }}
          fill="none"
          stroke="hsl(330, 100%, 60%)"
          strokeWidth="0.5"
          opacity={0.5}
          style={{ transform: "translate(2px, 0)" }}
        />
        
        <motion.circle
          cx="50"
          cy="50"
          initial={{ r: 0 }}
          animate={{ r: 12 * eyeOpen }}
          fill="hsl(280, 100%, 50%)"
          filter="url(#glow)"
        />
        
        <motion.circle
          cx="50"
          cy="50"
          initial={{ r: 0 }}
          animate={{ r: 5 * eyeOpen }}
          fill="hsl(235, 80%, 5%)"
        />
        
        <motion.circle
          cx="47"
          cy="47"
          initial={{ r: 0, opacity: 0 }}
          animate={{ r: 2 * eyeOpen, opacity: eyeOpen }}
          fill="white"
        />
      </svg>
      
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(330, 100%, 60%, 0.3) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

function GeometricShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        >
          {i % 3 === 0 && (
            <div
              className="w-16 h-16 border border-[hsl(185,100%,55%,0.4)]"
              style={{
                clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                boxShadow: "0 0 20px hsl(185, 100%, 55%, 0.3)",
              }}
            />
          )}
          {i % 3 === 1 && (
            <div
              className="w-12 h-12 border border-[hsl(330,100%,60%,0.4)]"
              style={{
                boxShadow: "0 0 20px hsl(330, 100%, 60%, 0.3)",
              }}
            />
          )}
          {i % 3 === 2 && (
            <div
              className="w-14 h-14 border border-[hsl(280,100%,50%,0.4)] rounded-full"
              style={{
                boxShadow: "0 0 20px hsl(280, 100%, 50%, 0.3)",
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

function Particles() {
  const particles = useMemo(() => 
    [...Array(PARTICLE_COUNT)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 2,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: particle.id % 3 === 0 
              ? "hsl(185, 100%, 55%)" 
              : particle.id % 3 === 1 
                ? "hsl(330, 100%, 60%)" 
                : "hsl(280, 100%, 50%)",
            boxShadow: `0 0 ${particle.size * 3}px currentColor`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(particle.id) * 20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}

function ScanLines() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-20"
      aria-hidden="true"
      style={{
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.15) 2px, rgba(0, 0, 0, 0.15) 4px)",
      }}
      animate={{
        backgroundPosition: ["0 0", "0 10px"],
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

function GlitchText({ text }: { text: string }) {
  return (
    <div className="relative">
      <motion.span
        className="absolute inset-0 text-[hsl(185,100%,55%)] opacity-80"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)" }}
        animate={{
          x: [-2, 3, -2, 1, -3, 2, -2],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        {text}
      </motion.span>
      
      <motion.span
        className="absolute inset-0 text-[hsl(330,100%,60%)] opacity-80"
        style={{ clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)" }}
        animate={{
          x: [2, -3, 2, -1, 3, -2, 2],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        {text}
      </motion.span>
      
      <span className="relative text-white">{text}</span>
    </div>
  );
}

function ArtisticProgressBar({ progress }: { progress: number }) {
  return (
    <div className="relative w-64 h-1 mt-8">
      <div className="absolute inset-0 bg-[hsl(235,40%,15%)] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, hsl(185, 100%, 55%), hsl(330, 100%, 60%), hsl(280, 100%, 50%))",
            backgroundSize: "200% 100%",
          }}
          initial={{ width: 0 }}
          animate={{ 
            width: `${progress}%`,
            backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
          }}
          transition={{
            width: { duration: 0.3 },
            backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" },
          }}
        />
      </div>
      
      <motion.div
        className="absolute -left-1 -right-1 h-3 -top-1"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(185, 100%, 55%, 0.5), transparent)",
        }}
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: `0 0 20px hsl(330, 100%, 60%, ${progress / 200}), 0 0 40px hsl(185, 100%, 55%, ${progress / 300})`,
        }}
      />
    </div>
  );
}

function FragmentedExit({ onComplete }: { onComplete: () => void }) {
  const fragments = useMemo(() => 
    [...Array(20)].map((_, i) => ({
      id: i,
      x: (i % 5) * 20,
      y: Math.floor(i / 5) * 25,
      targetX: (Math.random() - 0.5) * 400,
      targetY: (Math.random() - 0.5) * 400,
      rotate: (Math.random() - 0.5) * 180,
      delay: Math.random() * 0.2,
    })), []
  );

  useEffect(() => {
    const timer = setTimeout(onComplete, 800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {fragments.map((fragment) => (
        <motion.div
          key={fragment.id}
          className="absolute fever-dream"
          style={{
            left: `${fragment.x}%`,
            top: `${fragment.y}%`,
            width: "20%",
            height: "25%",
          }}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          animate={{
            x: fragment.targetX,
            y: fragment.targetY,
            rotate: fragment.rotate,
            opacity: 0,
            scale: 0.5,
          }}
          transition={{
            duration: 0.6,
            delay: fragment.delay,
            ease: "easeOut",
          }}
        />
      ))}
      
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(185, 100%, 55%, 0.8), transparent)",
        }}
        initial={{ x: "-100%", skewX: -15 }}
        animate={{ x: "200%" }}
        transition={{ duration: 0.4 }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(330, 100%, 60%, 0.8), transparent)",
        }}
        initial={{ x: "-100%", skewX: 15 }}
        animate={{ x: "200%" }}
        transition={{ duration: 0.4, delay: 0.1 }}
      />
    </div>
  );
}

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % LOADING_PHRASES.length);
    }, 800);

    return () => clearInterval(phraseInterval);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    
    const checkReady = () => {
      const elapsed = Date.now() - startTime;
      const documentReady = document.readyState === "complete";
      const progressValue = Math.min((elapsed / MIN_DISPLAY_TIME) * 100, 100);
      
      setProgress(progressValue);
      
      if (documentReady && elapsed >= MIN_DISPLAY_TIME) {
        setIsExiting(true);
      } else {
        requestAnimationFrame(checkReady);
      }
    };
    
    requestAnimationFrame(checkReady);
  }, []);

  const handleExitComplete = () => {
    setIsLoading(false);
    setShowContent(true);
  };

  if (showContent) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <>
          {isExiting && <FragmentedExit onComplete={handleExitComplete} />}
          
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center fever-dream scan-lines"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.1,
              filter: "blur(10px)",
            }}
            transition={{ duration: 0.3 }}
            role="status"
            aria-label="Loading page"
            aria-live="polite"
          >
            <span className="sr-only">Loading...</span>
            <ScanLines />
            <GeometricShapes />
            <Particles />
            
            <motion.div
              className="relative z-10 flex flex-col items-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <EyeSymbol progress={progress} />
              
              <motion.div
                className="mt-8 font-mono text-xl tracking-widest"
                style={{
                  textShadow: "0 0 10px hsl(330, 100%, 60%), 0 0 20px hsl(185, 100%, 55%), 0 0 40px hsl(280, 100%, 50%)",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={phraseIndex}
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <GlitchText text={LOADING_PHRASES[phraseIndex]} />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              
              <ArtisticProgressBar progress={progress} />
              
              <motion.div
                className="mt-6 text-xs font-mono text-[hsl(200,50%,70%)] tracking-wider"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {Math.floor(progress)}% REALITY ASSEMBLED
              </motion.div>
            </motion.div>
            
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(185, 100%, 55%), hsl(330, 100%, 60%), hsl(280, 100%, 50%), transparent)",
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scaleX: [0.8, 1, 0.8],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(280, 100%, 50%), hsl(330, 100%, 60%), hsl(185, 100%, 55%), transparent)",
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scaleX: [0.8, 1, 0.8],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
