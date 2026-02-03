import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  const artworkImages = [
    "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative parallax-element">
      {/* Fractal background overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-radial from-accent/20 to-transparent rounded-full blur-3xl"
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-secondary/20 to-transparent rounded-full blur-3xl"
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: -3 }}
        />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h1
          className="text-7xl md:text-9xl font-serif font-black mb-6 glow-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          data-testid="hero-title"
        >
          COSMIC
          <span className="block text-gradient">ARTIFACTS</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          data-testid="hero-description"
        >
          Transcendent digital art forged in the depths of imagination,
          where light meets shadow and reality bends to artistic will
        </motion.p>

        {/* Glowing artwork presentation */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          {artworkImages.map((src, index) => (
            <motion.div
              key={index}
              className="artwork-glow rounded-xl overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              data-testid={`hero-artwork-${index}`}
            >
              <img
                src={src}
                alt={`Cosmic Digital Art ${index + 1}`}
                className="w-full h-64 object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-12 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 shimmer-overlay animate-glow-pulse inline-flex items-center gap-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
          data-testid="hero-cta-button"
        >
          <Sparkles className="w-5 h-5" />
          ENTER THE VOID
        </motion.button>
      </div>
    </section>
  );
}
