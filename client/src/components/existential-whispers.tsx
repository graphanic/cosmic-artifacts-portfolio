import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const floatingPhrases = [
  "did I lose my MIND?",
  "Sanity is in rare supply",
  "I AM A SPIRITUAL BEING HAVING A HUMAN EXPERIENCE",
  "WHO NEEDS LUCK?",
  "God is dead... and we killed him",
  "HIGHER SELF",
  "divine",
  "The future is not something we survive",
  "It is something we co-compose",
  "CHAOS IS A LADDER",
  "we are all just stardust",
  "TRANSCENDENCE",
  "nothing is real",
  "WAKE UP",
  "the void whispers back",
];

const philosophicalQuotes = [
  "\"The only true wisdom is in knowing you know nothing.\" - Socrates",
  "\"Man is condemned to be free.\" - Jean-Paul Sartre",
  "\"He who has a why to live can bear almost any how.\" - Nietzsche",
  "\"The unexamined life is not worth living.\" - Socrates",
  "\"I think, therefore I am.\" - Descartes",
  "\"Existence precedes essence.\" - Sartre",
  "\"To be is to be perceived.\" - Berkeley",
  "\"The absurd is the essential concept and the first truth.\" - Camus",
  "\"We are what we repeatedly do.\" - Aristotle",
  "\"One must imagine Sisyphus happy.\" - Camus",
];

const scrollRevealTexts = [
  "YOU ARE HERE",
  "THIS MOMENT IS ALL THERE IS",
  "BREATHE",
  "THE OBSERVER AND THE OBSERVED ARE ONE",
  "WHAT LIES BENEATH THE SURFACE?",
];

interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  direction: number;
  color: string;
}

function FloatingTextElement({ text, x, y, size, opacity, duration, direction, color }: Omit<FloatingText, "id">) {
  const endX = direction > 0 ? x + 30 : x - 30;
  const endY = y + (Math.random() * 20 - 10);

  return (
    <motion.div
      className="absolute whitespace-nowrap font-mono"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        fontSize: `${size}px`,
        color: color,
        textShadow: color.includes("cyan") 
          ? "0 0 10px hsl(185, 100%, 55%, 0.5)" 
          : color.includes("pink") 
            ? "0 0 10px hsl(330, 100%, 60%, 0.5)"
            : "0 0 5px rgba(255,255,255,0.3)",
      }}
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{
        opacity: [0, opacity, opacity, 0],
        x: [`0%`, `${(endX - x) * 2}%`],
        y: [`0%`, `${(endY - y)}%`],
      }}
      transition={{
        duration: duration,
        ease: "linear",
        times: [0, 0.1, 0.9, 1],
      }}
    >
      {text}
    </motion.div>
  );
}

function ScrollRevealText({ text, index }: { text: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="fixed left-1/2 -translate-x-1/2 font-mono text-lg md:text-xl tracking-widest"
      style={{
        top: `${25 + index * 20}%`,
        zIndex: 1,
      }}
    >
      <motion.div
        className="glitch-text"
        data-text={text}
        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
        animate={isVisible ? {
          opacity: [0, 0.5, 0.7, 0.3],
          y: 0,
          filter: "blur(0px)",
        } : {}}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        style={{
          color: "hsl(185, 100%, 55%, 0.15)",
          textShadow: "0 0 20px hsl(185, 100%, 55%, 0.1)",
        }}
      >
        {text}
      </motion.div>
    </div>
  );
}

export default function ExistentialWhispers() {
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [randomQuote, setRandomQuote] = useState("");
  const [quoteVisible, setQuoteVisible] = useState(false);
  const idCounter = useRef(0);

  const colors = useMemo(() => [
    "hsl(330, 100%, 60%, 0.15)",
    "hsl(185, 100%, 55%, 0.15)",
    "rgba(255, 255, 255, 0.1)",
    "hsl(320, 100%, 60%, 0.12)",
  ], []);

  useEffect(() => {
    const quote = philosophicalQuotes[Math.floor(Math.random() * philosophicalQuotes.length)];
    setRandomQuote(quote);
    
    const timer = setTimeout(() => setQuoteVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const createFloatingText = () => {
      const text = floatingPhrases[Math.floor(Math.random() * floatingPhrases.length)];
      const newText: FloatingText = {
        id: idCounter.current++,
        text,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        size: Math.random() * 16 + 10,
        opacity: Math.random() * 0.15 + 0.05,
        duration: Math.random() * 20 + 15,
        direction: Math.random() > 0.5 ? 1 : -1,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setFloatingTexts((prev) => [...prev, newText]);

      setTimeout(() => {
        setFloatingTexts((prev) => prev.filter((t) => t.id !== newText.id));
      }, newText.duration * 1000);
    };

    for (let i = 0; i < 5; i++) {
      setTimeout(createFloatingText, i * 2000);
    }

    const interval = setInterval(createFloatingText, 4000);
    return () => clearInterval(interval);
  }, [colors]);

  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      <AnimatePresence>
        {floatingTexts.map((text) => (
          <FloatingTextElement
            key={text.id}
            text={text.text}
            x={text.x}
            y={text.y}
            size={text.size}
            opacity={text.opacity}
            duration={text.duration}
            direction={text.direction}
            color={text.color}
          />
        ))}
      </AnimatePresence>

      {scrollRevealTexts.map((text, index) => (
        <ScrollRevealText key={text} text={text} index={index} />
      ))}

      <motion.div
        className="fixed bottom-8 right-8 max-w-md text-right font-mono text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={quoteVisible ? { 
          opacity: [0, 0.6, 0.4, 0.5],
          y: 0,
        } : {}}
        transition={{
          duration: 1.5,
          ease: "easeOut",
          times: [0, 0.3, 0.6, 1],
        }}
        style={{
          color: "hsl(330, 100%, 60%, 0.4)",
          textShadow: "0 0 15px hsl(330, 100%, 60%, 0.2)",
          zIndex: 1,
        }}
      >
        <div className="glitch-text" data-text={randomQuote}>
          {randomQuote}
        </div>
      </motion.div>

      <motion.div
        className="fixed top-1/4 left-8 font-serif text-6xl md:text-8xl font-bold tracking-tighter"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.03, 0.05, 0.02, 0.04],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          color: "hsl(185, 100%, 55%)",
          textShadow: "0 0 40px hsl(185, 100%, 55%, 0.1)",
          writingMode: "vertical-rl",
          zIndex: 1,
        }}
      >
        TRANSCEND
      </motion.div>

      <motion.div
        className="fixed bottom-1/4 right-1/4 font-mono text-4xl md:text-6xl font-light"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.02, 0.04, 0.01, 0.03],
          rotate: [0, 1, -1, 0.5, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          color: "hsl(330, 100%, 60%)",
          textShadow: "0 0 30px hsl(330, 100%, 60%, 0.1)",
          zIndex: 1,
        }}
      >
        ∞
      </motion.div>
    </div>
  );
}
