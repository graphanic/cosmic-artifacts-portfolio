import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Sparkles, Star, Zap } from "lucide-react";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA"
];

const SECRET_CONSOLE_ART = `
%c
    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║     ★  YOU FOUND THE HIDDEN DIMENSION  ★                  ║
    ║                                                           ║
    ║            ◇ ─────────────── ◇                            ║
    ║                    ◆                                       ║
    ║                   ╱ ╲                                      ║
    ║                  ╱   ╲                                     ║
    ║                 ╱  ●  ╲                                    ║
    ║                ╱   ▲   ╲                                   ║
    ║               ╱    │    ╲                                  ║
    ║              ◇─────┼─────◇                                 ║
    ║                    │                                       ║
    ║                    ▼                                       ║
    ║                                                           ║
    ║     "The curious mind sees what others cannot."           ║
    ║                                                           ║
    ║     You are among the seekers. Welcome, traveler.         ║
    ║                                                           ║
    ║            ═══════════════════════════                    ║
    ║                   COSMIC ARTIFACTS                         ║
    ║            ═══════════════════════════                    ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
`;

function Particle({ x, y, color, delay }: { x: number; y: number; color: string; delay: number }) {
  const angle = Math.random() * Math.PI * 2;
  const distance = 100 + Math.random() * 200;
  const endX = Math.cos(angle) * distance;
  const endY = Math.sin(angle) * distance;

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: 4 + Math.random() * 8,
        height: 4 + Math.random() * 8,
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
      }}
      initial={{ scale: 0, opacity: 1 }}
      animate={{
        x: endX,
        y: endY,
        scale: [0, 1.5, 0],
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: 1 + Math.random() * 0.5,
        delay: delay,
        ease: "easeOut",
      }}
    />
  );
}

function ParticleExplosion({ x, y, count = 50 }: { x: number; y: number; count?: number }) {
  const colors = [
    "hsl(330, 100%, 60%)",
    "hsl(185, 100%, 55%)",
    "hsl(320, 100%, 60%)",
    "hsl(280, 100%, 50%)",
    "hsl(45, 100%, 60%)",
    "hsl(160, 100%, 50%)",
  ];

  const particles = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.2,
    })), [count]
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" aria-hidden="true">
      {particles.map((p) => (
        <Particle key={p.id} x={x} y={y} color={p.color} delay={p.delay} />
      ))}
    </div>
  );
}

function KonamiModal({ onClose }: { onClose: () => void }) {
  const [showParticles, setShowParticles] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowParticles(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9998] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      
      {showParticles && (
        <ParticleExplosion x={window.innerWidth / 2} y={window.innerHeight / 2} count={100} />
      )}

      <motion.div
        className="relative z-10 text-center p-12 max-w-2xl"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 100 }}
      >
        <motion.div
          className="mb-8"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Eye className="w-24 h-24 mx-auto text-accent" />
        </motion.div>

        <motion.h2
          className="text-4xl md:text-6xl font-serif font-black mb-6 glow-text"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-gradient-hot">YOU FOUND THE SECRET</span>
        </motion.h2>

        <motion.p
          className="text-2xl md:text-3xl text-primary neon-glow mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          YOU ARE READY.
        </motion.p>

        <motion.div
          className="flex justify-center gap-4 mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, type: "spring" }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Star className="w-8 h-8 text-secondary fill-secondary" />
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          ↑↑↓↓←→←→BA • The Konami Code lives on
        </motion.p>

        <motion.button
          className="mt-8 px-8 py-3 bg-gradient-to-r from-primary to-secondary rounded-full text-primary-foreground font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Continue the Journey
        </motion.button>
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, hsl(330, 100%, 60%, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, hsl(185, 100%, 55%, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, hsl(280, 100%, 50%, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, hsl(330, 100%, 60%, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}

function SecretMessage({ message, x, y, onComplete }: { message: string; x: number; y: number; onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed z-[9999] pointer-events-none px-6 py-3 bg-card/90 backdrop-blur-xl border border-accent rounded-lg"
      style={{ left: x, top: y, transform: "translate(-50%, -100%)" }}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: -10, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.8 }}
    >
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-accent" />
        <span className="text-sm font-medium text-gradient">{message}</span>
        <Sparkles className="w-4 h-4 text-accent" />
      </div>
    </motion.div>
  );
}

function HiddenBottomSection({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 p-8 bg-gradient-to-t from-card via-card/95 to-transparent"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="flex justify-center gap-2 mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-6 h-6 text-primary" />
              <span className="text-sm text-muted-foreground font-mono">SECRET TRANSMISSION DETECTED</span>
              <Zap className="w-6 h-6 text-primary" />
            </motion.div>
            
            <motion.p
              className="text-lg text-foreground/90 font-light italic mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              "You've reached the edge of the known universe. Beyond here lies only imagination."
            </motion.p>
            
            <motion.p
              className="text-xs text-muted-foreground/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Thank you for exploring. The curious always find the hidden doors.
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function EasterEggs() {
  const [konamiProgress, setKonamiProgress] = useState<string[]>([]);
  const [showKonamiModal, setShowKonamiModal] = useState(false);
  const [eyeClicks, setEyeClicks] = useState(0);
  const [secretMessages, setSecretMessages] = useState<Array<{ id: number; message: string; x: number; y: number }>>([]);
  const [showBottomSecret, setShowBottomSecret] = useState(false);
  const [particleExplosions, setParticleExplosions] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [titleClickCount, setTitleClickCount] = useState(0);
  const [lastTitleClick, setLastTitleClick] = useState(0);

  const addSecretMessage = useCallback((message: string, x: number, y: number) => {
    const id = Date.now();
    setSecretMessages(prev => [...prev, { id, message, x, y }]);
  }, []);

  const removeSecretMessage = useCallback((id: number) => {
    setSecretMessages(prev => prev.filter(m => m.id !== id));
  }, []);

  const triggerExplosion = useCallback((x: number, y: number) => {
    const id = Date.now();
    setParticleExplosions(prev => [...prev, { id, x, y }]);
    setTimeout(() => {
      setParticleExplosions(prev => prev.filter(p => p.id !== id));
    }, 2000);
  }, []);

  useEffect(() => {
    console.log(
      SECRET_CONSOLE_ART,
      "color: #00d4ff; font-family: monospace; font-size: 12px; line-height: 1.2;"
    );
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newProgress = [...konamiProgress, e.code];
      
      if (newProgress.length > KONAMI_CODE.length) {
        newProgress.shift();
      }

      setKonamiProgress(newProgress);

      const isMatch = newProgress.every((key, i) => key === KONAMI_CODE[i]);
      
      if (isMatch && newProgress.length === KONAMI_CODE.length) {
        setShowKonamiModal(true);
        setKonamiProgress([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiProgress]);

  useEffect(() => {
    const handleEyeClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isEyeElement = target.closest('[data-easter-eye]') || 
                          target.closest('svg')?.innerHTML?.includes('ellipse') ||
                          target.tagName === 'ellipse' ||
                          (target.closest('svg') && target.closest('[class*="eye"]'));
      
      if (isEyeElement) {
        const newCount = eyeClicks + 1;
        setEyeClicks(newCount);
        
        if (newCount === 5) {
          triggerExplosion(e.clientX, e.clientY);
          addSecretMessage("THE EYE SEES ALL. YOU ARE WITNESSED.", e.clientX, e.clientY);
          setEyeClicks(0);
        } else if (newCount >= 3) {
          addSecretMessage(`${5 - newCount} more...`, e.clientX, e.clientY);
        }
      }
    };

    document.addEventListener("click", handleEyeClick);
    return () => document.removeEventListener("click", handleEyeClick);
  }, [eyeClicks, addSecretMessage, triggerExplosion]);

  useEffect(() => {
    const handleTitleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isTitle = target.closest('h1') || target.closest('[data-testid="hero-title"]');
      
      if (isTitle) {
        const now = Date.now();
        if (now - lastTitleClick < 500) {
          const newCount = titleClickCount + 1;
          setTitleClickCount(newCount);
          
          if (newCount >= 3) {
            triggerExplosion(e.clientX, e.clientY);
            addSecretMessage("TRIPLE CLICK MASTERY UNLOCKED!", e.clientX, e.clientY);
            setTitleClickCount(0);
            
            document.body.style.animation = "rainbow-shift 2s ease-in-out";
            setTimeout(() => {
              document.body.style.animation = "";
            }, 2000);
          }
        } else {
          setTitleClickCount(1);
        }
        setLastTitleClick(now);
      }
    };

    document.addEventListener("click", handleTitleClick);
    return () => document.removeEventListener("click", handleTitleClick);
  }, [titleClickCount, lastTitleClick, addSecretMessage, triggerExplosion]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;
      setShowBottomSecret(isNearBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleSecretShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.code === "KeyS") {
        e.preventDefault();
        setShowBottomSecret(prev => !prev);
        if (!showBottomSecret) {
          triggerExplosion(window.innerWidth / 2, window.innerHeight / 2);
        }
      }
    };

    window.addEventListener("keydown", handleSecretShortcut);
    return () => window.removeEventListener("keydown", handleSecretShortcut);
  }, [showBottomSecret, triggerExplosion]);

  return (
    <>
      <AnimatePresence>
        {showKonamiModal && (
          <KonamiModal onClose={() => setShowKonamiModal(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {secretMessages.map((msg) => (
          <SecretMessage
            key={msg.id}
            message={msg.message}
            x={msg.x}
            y={msg.y}
            onComplete={() => removeSecretMessage(msg.id)}
          />
        ))}
      </AnimatePresence>

      {particleExplosions.map((explosion) => (
        <ParticleExplosion key={explosion.id} x={explosion.x} y={explosion.y} />
      ))}

      <HiddenBottomSection visible={showBottomSecret} />

      <style>{`
        @keyframes rainbow-shift {
          0% { filter: hue-rotate(0deg); }
          25% { filter: hue-rotate(90deg); }
          50% { filter: hue-rotate(180deg); }
          75% { filter: hue-rotate(270deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `}</style>
    </>
  );
}
