import { useEffect, useRef, useCallback, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  vx: number;
  vy: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
  lineWidth: number;
}

const NEON_COLORS = [
  'hsl(330, 100%, 60%)',  // neon pink
  'hsl(185, 100%, 55%)',  // electric cyan
  'hsl(320, 100%, 60%)',  // hot magenta
  'hsl(280, 100%, 50%)',  // deep purple
];

function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(hover: none)').matches
  );
}

const IS_MOBILE = typeof window !== 'undefined' && isTouchDevice();
const MAX_PARTICLES = IS_MOBILE ? 20 : 80;
const PARTICLE_SPAWN_RATE = IS_MOBILE ? 1 : 3;

export default function CursorEffects() {
  const [isEnabled, setIsEnabled] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (isTouchDevice()) {
      setIsEnabled(false);
    }
  }, []);
  const ripplesRef = useRef<Ripple[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const lastSpawnRef = useRef(0);

  const getRandomColor = useCallback(() => {
    return NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];
  }, []);

  const spawnParticle = useCallback((x: number, y: number) => {
    if (particlesRef.current.length >= MAX_PARTICLES) {
      particlesRef.current.shift();
    }

    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;
    
    particlesRef.current.push({
      x: x + offsetX,
      y: y + offsetY,
      size: Math.random() * 4 + 2,
      color: getRandomColor(),
      alpha: 1,
      decay: Math.random() * 0.02 + 0.015,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
    });
  }, [getRandomColor]);

  const spawnRipple = useCallback((x: number, y: number) => {
    const colors = ['hsl(185, 100%, 55%)', 'hsl(330, 100%, 60%)'];
    
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        ripplesRef.current.push({
          x,
          y,
          radius: 5,
          maxRadius: 120 + i * 30,
          alpha: 0.8 - i * 0.15,
          color: colors[i % 2],
          lineWidth: 3 - i * 0.5,
        });
      }, i * 80);
    }
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.alpha -= particle.decay;
      particle.size *= 0.98;

      if (particle.alpha <= 0 || particle.size < 0.5) {
        return false;
      }

      // Draw particle with glow
      ctx.save();
      ctx.globalAlpha = particle.alpha;
      
      // Outer glow
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 3
      );
      gradient.addColorStop(0, particle.color);
      gradient.addColorStop(0.4, particle.color.replace(')', ', 0.5)').replace('hsl', 'hsla'));
      gradient.addColorStop(1, 'transparent');
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();

      ctx.restore();
      return true;
    });

    // Update and draw ripples
    ripplesRef.current = ripplesRef.current.filter((ripple) => {
      ripple.radius += 4;
      ripple.alpha -= 0.015;

      if (ripple.alpha <= 0 || ripple.radius >= ripple.maxRadius) {
        return false;
      }

      ctx.save();
      ctx.globalAlpha = ripple.alpha;
      
      // Draw ripple with glow
      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
      ctx.strokeStyle = ripple.color;
      ctx.lineWidth = ripple.lineWidth;
      ctx.shadowColor = ripple.color;
      ctx.shadowBlur = 20;
      ctx.stroke();

      // Inner bright ring
      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'white';
      ctx.lineWidth = ripple.lineWidth * 0.5;
      ctx.shadowBlur = 10;
      ctx.stroke();

      ctx.restore();
      return true;
    });

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!isEnabled) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      const now = Date.now();
      if (now - lastSpawnRef.current > 16) {
        for (let i = 0; i < PARTICLE_SPAWN_RATE; i++) {
          spawnParticle(e.clientX, e.clientY);
        }
        lastSpawnRef.current = now;
      }
    };

    const handleClick = (e: MouseEvent) => {
      spawnRipple(e.clientX, e.clientY);
      
      // Reduced burst on mobile, full burst on desktop
      const burstCount = IS_MOBILE ? 5 : 15;
      for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 * i) / burstCount;
        const distance = Math.random() * 30 + 10;
        spawnParticle(
          e.clientX + Math.cos(angle) * distance,
          e.clientY + Math.sin(angle) * distance
        );
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, spawnParticle, spawnRipple, isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ 
        mixBlendMode: 'screen',
      }}
      aria-hidden="true"
    />
  );
}
