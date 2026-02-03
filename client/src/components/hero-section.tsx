import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

const floatingElements = [
  { type: "triangle", size: 40, x: 5, y: 15, delay: 0, duration: 12 },
  { type: "circle", size: 25, x: 85, y: 20, delay: 2, duration: 15 },
  { type: "eye", size: 50, x: 10, y: 70, delay: 1, duration: 18 },
  { type: "diamond", size: 35, x: 90, y: 65, delay: 3, duration: 14 },
  { type: "cross", size: 30, x: 15, y: 45, delay: 0.5, duration: 16 },
  { type: "mystical", size: 45, x: 80, y: 40, delay: 2.5, duration: 13 },
  { type: "glitch-fragment", size: 60, x: 50, y: 10, delay: 1.5, duration: 20 },
  { type: "spiral", size: 55, x: 25, y: 85, delay: 4, duration: 17 },
  { type: "hexagon", size: 30, x: 70, y: 80, delay: 3.5, duration: 14 },
  { type: "star", size: 20, x: 40, y: 30, delay: 1, duration: 11 },
  { type: "eye", size: 35, x: 60, y: 55, delay: 2, duration: 19 },
  { type: "triangle", size: 25, x: 95, y: 35, delay: 0, duration: 13 },
];

function FloatingShape({ type, size, delay, duration }: { type: string; size: number; delay: number; duration: number }) {
  const randomX = useMemo(() => Math.random() * 30 - 15, []);
  const randomY = useMemo(() => Math.random() * 40 - 20, []);
  const randomRotate = useMemo(() => Math.random() * 360, []);

  const shapes: Record<string, JSX.Element> = {
    triangle: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon 
          points="50,10 90,90 10,90" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          className="text-primary/30"
        />
      </svg>
    ),
    circle: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle 
          cx="50" cy="50" r="40" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          strokeDasharray="10 5"
          className="text-secondary/40"
        />
      </svg>
    ),
    eye: (
      <svg viewBox="0 0 100 60" className="w-full h-full">
        <ellipse cx="50" cy="30" rx="45" ry="25" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent/30" />
        <circle cx="50" cy="30" r="15" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/40" />
        <circle cx="50" cy="30" r="5" fill="currentColor" className="text-accent/50" />
      </svg>
    ),
    diamond: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon 
          points="50,5 95,50 50,95 5,50" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          className="text-primary/25"
        />
      </svg>
    ),
    cross: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="3" className="text-secondary/30" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="3" className="text-secondary/30" />
      </svg>
    ),
    mystical: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent/20" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/25" />
        <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" className="text-secondary/30" />
        <polygon points="50,15 60,40 85,45 65,60 70,85 50,70 30,85 35,60 15,45 40,40" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent/25" />
      </svg>
    ),
    "glitch-fragment": (
      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20" 
           style={{ clipPath: "polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)" }} />
    ),
    spiral: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path 
          d="M50,50 m0,-40 a40,40 0 1,1 0,80 a30,30 0 1,0 0,-60 a20,20 0 1,1 0,40 a10,10 0 1,0 0,-20" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5"
          className="text-primary/25"
        />
      </svg>
    ),
    hexagon: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon 
          points="50,5 93,25 93,75 50,95 7,75 7,25" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          className="text-accent/30"
        />
      </svg>
    ),
    star: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon 
          points="50,5 61,40 98,40 68,62 79,97 50,75 21,97 32,62 2,40 39,40" 
          fill="currentColor"
          className="text-secondary/20"
        />
      </svg>
    ),
  };

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ width: size, height: size }}
      initial={{ opacity: 0, rotate: randomRotate }}
      animate={{
        opacity: [0.3, 0.6, 0.3],
        x: [0, randomX, -randomX, 0],
        y: [0, randomY, -randomY / 2, 0],
        rotate: [randomRotate, randomRotate + 180, randomRotate + 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {shapes[type] || shapes.circle}
    </motion.div>
  );
}

function Particle({ index }: { index: number }) {
  const size = useMemo(() => Math.random() * 3 + 1, []);
  const startX = useMemo(() => Math.random() * 100, []);
  const startY = useMemo(() => Math.random() * 100, []);
  const duration = useMemo(() => Math.random() * 10 + 15, []);
  const delay = useMemo(() => Math.random() * 5, []);

  return (
    <motion.div
      className="absolute rounded-full bg-primary/40"
      style={{
        width: size,
        height: size,
        left: `${startX}%`,
        top: `${startY}%`,
      }}
      animate={{
        y: [0, -100, -200],
        x: [0, Math.random() * 50 - 25, Math.random() * 30 - 15],
        opacity: [0, 0.8, 0],
        scale: [0.5, 1, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

function GlitchText({ children, className }: { children: string; className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const triggerGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        triggerGlitch();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span 
      className={`glitch-text ${isGlitching ? 'neon-glow' : ''} ${className || ''}`}
      data-text={children}
    >
      {children}
    </span>
  );
}

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothMouseX, [0, 1], [-20, 20]);
  const bgY = useTransform(smoothMouseY, [0, 1], [-20, 20]);
  const midX = useTransform(smoothMouseX, [0, 1], [-40, 40]);
  const midY = useTransform(smoothMouseY, [0, 1], [-40, 40]);
  const fgX = useTransform(smoothMouseX, [0, 1], [-60, 60]);
  const fgY = useTransform(smoothMouseY, [0, 1], [-60, 60]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth);
      mouseY.set(clientY / innerHeight);
      setMousePosition({ x: clientX / innerWidth, y: clientY / innerHeight });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const artworkImages = [
    "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
  ];

  const particles = useMemo(() => Array.from({ length: 30 }, (_, i) => i), []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden scan-lines">
      <motion.div 
        className="absolute inset-0 fractal-bg"
        style={{ x: bgX, y: bgY }}
      />

      <motion.div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ x: midX, y: midY }}
        aria-hidden="true"
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-radial from-accent/30 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-secondary/30 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-radial from-primary/20 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ x: fgX, y: fgY }}
        aria-hidden="true"
      >
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className="absolute"
            style={{ left: `${element.x}%`, top: `${element.y}%` }}
          >
            <FloatingShape
              type={element.type}
              size={element.size}
              delay={element.delay}
              duration={element.duration}
            />
          </div>
        ))}
      </motion.div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {particles.map((index) => (
          <Particle key={index} index={index} />
        ))}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h1
          className="text-7xl md:text-9xl font-serif font-black mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          data-testid="hero-title"
        >
          <GlitchText className="glow-text pulse-glow">COSMIC</GlitchText>
          <span className="block">
            <GlitchText className="text-gradient neon-glow">ARTIFACTS</GlitchText>
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto font-light pulse-glow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          data-testid="hero-description"
        >
          Transcendent digital art forged in the depths of imagination,
          where light meets shadow and reality bends to artistic will
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          {artworkImages.map((src, index) => (
            <motion.div
              key={index}
              className="artwork-glow rounded-xl overflow-hidden cursor-pointer chromatic-aberration-box fever-dream relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              data-testid={`hero-artwork-${index}`}
              animate={{
                boxShadow: [
                  "0 0 20px hsl(330, 100%, 60%, 0.3), 0 0 40px hsl(185, 100%, 55%, 0.2)",
                  "0 0 40px hsl(330, 100%, 60%, 0.5), 0 0 80px hsl(185, 100%, 55%, 0.4)",
                  "0 0 20px hsl(330, 100%, 60%, 0.3), 0 0 40px hsl(185, 100%, 55%, 0.2)",
                ],
              }}
            >
              <motion.img
                src={src}
                alt={`Cosmic Digital Art ${index + 1}`}
                className="w-full h-64 object-cover"
                animate={{
                  filter: [
                    "saturate(1.2) contrast(1.1)",
                    "saturate(1.4) contrast(1.2) hue-rotate(5deg)",
                    "saturate(1.2) contrast(1.1)",
                  ],
                }}
                transition={{
                  duration: 4,
                  delay: index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-12 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 shimmer-overlay inline-flex items-center gap-2 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            boxShadow: [
              "0 0 20px hsl(330, 100%, 60%, 0.3), 0 0 40px hsl(185, 100%, 55%, 0.2)",
              "0 0 40px hsl(330, 100%, 60%, 0.6), 0 0 80px hsl(185, 100%, 55%, 0.4)",
              "0 0 20px hsl(330, 100%, 60%, 0.3), 0 0 40px hsl(185, 100%, 55%, 0.2)",
            ],
          }}
          transition={{ 
            opacity: { duration: 1, delay: 0.9 },
            y: { duration: 1, delay: 0.9 },
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
          data-testid="hero-cta-button"
        >
          <Sparkles className="w-5 h-5" />
          <span className="relative z-10">ENTER THE VOID</span>
        </motion.button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
    </section>
  );
}
