import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ExternalLink } from "lucide-react";
import { useLocation } from "wouter";

interface Artwork {
  id: string;
  src: string;
  title: string;
  category: string;
  year: string;
  medium: string;
}

const tornClipPaths = [
  "polygon(2% 0%, 98% 1%, 100% 3%, 99% 97%, 97% 100%, 3% 99%, 0% 97%, 1% 2%)",
  "polygon(0% 2%, 3% 0%, 97% 1%, 100% 0%, 99% 98%, 100% 100%, 2% 99%, 0% 100%)",
  "polygon(1% 0%, 100% 2%, 98% 100%, 0% 98%)",
  "polygon(0% 1%, 99% 0%, 100% 99%, 2% 100%)",
  "polygon(3% 0%, 100% 1%, 97% 100%, 0% 98%, 1% 50%)",
  "polygon(0% 2%, 98% 0%, 100% 50%, 99% 100%, 1% 97%)",
];

export default function GallerySection() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [glitchingButton, setGlitchingButton] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  const artworks: Artwork[] = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
      title: "Stellar Genesis",
      category: "Digital Sculpture",
      year: "2024",
      medium: "3D Render",
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
      title: "Quantum Threads",
      category: "Interactive Installation",
      year: "2024",
      medium: "Generative",
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
      title: "Celestial Fragments",
      category: "Digital Painting",
      year: "2024",
      medium: "Digital Painting",
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
      title: "Aurora Fields",
      category: "Generative Art",
      year: "2024",
      medium: "Generative",
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
      title: "Neon Metropolis",
      category: "3D Render",
      year: "2024",
      medium: "3D Render",
    },
    {
      id: "6",
      src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
      title: "Sacred Geometry",
      category: "Mathematical Art",
      year: "2024",
      medium: "Generative",
    },
  ];

  const filters = ["all", "3D Render", "Digital Painting", "Generative"];

  const filteredArtworks = activeFilter === "all" 
    ? artworks 
    : artworks.filter(a => a.medium === activeFilter);

  const openLightbox = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedArtwork(null);
    document.body.style.overflow = "auto";
  };

  const handleFilterClick = (filter: string) => {
    setGlitchingButton(filter);
    setActiveFilter(filter);
    setTimeout(() => setGlitchingButton(null), 300);
  };

  const breathingVariants = {
    animate: (i: number) => ({
      scale: [1, 1.02, 1],
      opacity: [0.95, 1, 0.95],
      transition: {
        duration: 3 + (i * 0.5),
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.3,
      },
    }),
  };

  return (
    <section id="gallery" className="py-32 parallax-element">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 glow-text" data-testid="gallery-title">
            ETHEREAL GALLERY
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="gallery-description">
            Immerse yourself in a cinematic journey through digital realms where each piece tells a story of cosmic wonder
          </p>
        </motion.div>

        {/* Filter buttons with neon glow and glitch effects */}
        <motion.div 
          className="flex justify-center gap-4 mb-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                activeFilter === filter
                  ? "bg-accent text-accent-foreground neon-glow pulse-glow"
                  : "bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground border border-border glitch-border"
              } ${glitchingButton === filter ? "screen-tear active" : ""}`}
              whileHover={{ 
                scale: 1.08,
                boxShadow: "0 0 20px var(--neon-pink), 0 0 40px var(--electric-cyan)",
              }}
              whileTap={{ scale: 0.92 }}
              animate={glitchingButton === filter ? {
                x: [0, -3, 4, -2, 3, 0],
                skewX: [0, -2, 3, -1, 2, 0],
              } : {}}
              transition={{ duration: 0.3 }}
              data-testid={`filter-${filter}`}
            >
              {filter === "all" ? "All Works" : filter}
              {activeFilter === filter && (
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Breathing artwork cards with torn borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              custom={index}
              variants={breathingVariants}
              animate="animate"
              className="group relative overflow-hidden rounded-xl glitch-border cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              onClick={() => openLightbox(artwork)}
              layout
              data-testid={`artwork-${artwork.id}`}
              style={{
                clipPath: tornClipPaths[index % tornClipPaths.length],
              }}
            >
              {/* Chromatic aberration effect on hover */}
              <div className="relative chromatic-aberration-box">
                <img
                  src={artwork.src}
                  alt={artwork.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Scan lines overlay */}
                <div className="absolute inset-0 scan-lines opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Info overlay with fever-dream effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-serif font-bold text-accent mb-2 neon-glow">{artwork.title}</h3>
                  <p className="text-sm text-muted-foreground">{artwork.category}, {artwork.year}</p>
                  <span className="inline-block mt-2 text-xs bg-accent/20 text-accent px-2 py-1 rounded-full pulse-glow">
                    {artwork.medium}
                  </span>
                </div>
              </div>
              
              {/* Torn edge decoration */}
              <div className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover:border-accent/30 transition-colors duration-300" 
                style={{ clipPath: tornClipPaths[index % tornClipPaths.length] }} 
              />
            </motion.div>
          ))}
        </div>

        {/* Dramatic Lightbox Modal with glitch effects */}
        <AnimatePresence>
          {selectedArtwork && (
            <motion.div
              className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 flex items-center justify-center p-4 fever-dream"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              data-testid="lightbox-modal"
            >
              {/* Screen tear effect on open */}
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 screen-tear-horizontal active" />
                <motion.div
                  className="absolute inset-0"
                  initial={{ 
                    background: "linear-gradient(0deg, transparent 0%, var(--electric-cyan) 48%, transparent 50%, var(--neon-pink) 52%, transparent 100%)" 
                  }}
                  animate={{ 
                    y: ["0%", "100%"],
                    opacity: [1, 0]
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.div>

              <div className="relative max-w-4xl max-h-[90vh]">
                <motion.button
                  className="absolute -top-12 right-0 text-foreground hover:text-accent z-10 neon-glow"
                  onClick={closeLightbox}
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  data-testid="lightbox-close"
                >
                  <X className="w-8 h-8" />
                </motion.button>
                
                {/* Main image with glitch animation, scan lines, and chromatic aberration */}
                <motion.div
                  className="relative scan-lines chromatic-aberration-box rounded-xl overflow-hidden"
                  initial={{ scale: 0.5, opacity: 0, skewX: 10 }}
                  animate={{ scale: 1, opacity: 1, skewX: 0 }}
                  exit={{ scale: 0.5, opacity: 0, skewX: -10 }}
                  transition={{ 
                    duration: 0.4,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Glitch layers */}
                  <motion.div
                    className="absolute inset-0 z-10 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0, 0.3, 0, 0.2, 0],
                      x: [0, -5, 3, -2, 0],
                    }}
                    transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.7, 1] }}
                  >
                    <img
                      src={selectedArtwork.src}
                      alt=""
                      className="w-full h-full object-contain"
                      style={{ filter: "hue-rotate(90deg)", mixBlendMode: "screen" }}
                    />
                  </motion.div>
                  
                  <motion.img
                    src={selectedArtwork.src}
                    alt={selectedArtwork.title}
                    className="max-w-full max-h-full object-contain artwork-glow"
                    style={{
                      boxShadow: "0 0 40px var(--neon-pink), 0 0 80px var(--electric-cyan), 0 0 120px var(--hot-magenta)"
                    }}
                  />
                  
                  {/* Enhanced glow border */}
                  <div className="absolute inset-0 rounded-xl pointer-events-none" 
                    style={{
                      boxShadow: "inset 0 0 30px var(--neon-pink), inset 0 0 60px var(--electric-cyan)"
                    }}
                  />
                </motion.div>
                
                {/* Info panel with neon effects */}
                <motion.div 
                  className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-md rounded-lg p-4 glitch-border"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-accent mb-1 neon-glow">{selectedArtwork.title}</h3>
                      <p className="text-muted-foreground">{selectedArtwork.category}, {selectedArtwork.year}</p>
                      <span className="inline-block mt-2 text-xs bg-accent/20 text-accent px-2 py-1 rounded-full pulse-glow">
                        {selectedArtwork.medium}
                      </span>
                    </div>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        closeLightbox();
                        setLocation(`/artwork/${selectedArtwork.id}`);
                      }}
                      className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium neon-glow"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 0 30px var(--electric-cyan), 0 0 60px var(--neon-pink)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Details
                      <ExternalLink className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
