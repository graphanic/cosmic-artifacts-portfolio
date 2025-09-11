import { motion } from "framer-motion";
import { useState } from "react";

interface Artwork {
  id: string;
  src: string;
  title: string;
  category: string;
  year: string;
}

export default function GallerySection() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const artworks: Artwork[] = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
      title: "Stellar Genesis",
      category: "Digital Sculpture",
      year: "2024",
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
      title: "Quantum Threads",
      category: "Interactive Installation",
      year: "2024",
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
      title: "Celestial Fragments",
      category: "Digital Painting",
      year: "2024",
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
      title: "Aurora Fields",
      category: "Generative Art",
      year: "2024",
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
      title: "Neon Metropolis",
      category: "3D Render",
      year: "2024",
    },
    {
      id: "6",
      src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
      title: "Sacred Geometry",
      category: "Mathematical Art",
      year: "2024",
    },
  ];

  const openLightbox = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedArtwork(null);
    document.body.style.overflow = "auto";
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

        {/* Cinematic dark theme gallery grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              className="group relative overflow-hidden rounded-xl fractal-border cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              onClick={() => openLightbox(artwork)}
              data-testid={`artwork-${artwork.id}`}
            >
              <img
                src={artwork.src}
                alt={artwork.title}
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-serif font-bold text-accent mb-2">{artwork.title}</h3>
                  <p className="text-sm text-muted-foreground">{artwork.category}, {artwork.year}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedArtwork && (
          <motion.div
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            data-testid="lightbox-modal"
          >
            <div className="relative max-w-4xl max-h-[90vh]">
              <button
                className="absolute -top-12 right-0 text-foreground hover:text-accent text-2xl z-10"
                onClick={closeLightbox}
                data-testid="lightbox-close"
              >
                <i className="fas fa-times"></i>
              </button>
              <motion.img
                src={selectedArtwork.src}
                alt={selectedArtwork.title}
                className="max-w-full max-h-full object-contain rounded-xl artwork-glow"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute bottom-4 left-4 right-4 bg-card/80 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-xl font-serif font-bold text-accent mb-1">{selectedArtwork.title}</h3>
                <p className="text-muted-foreground">{selectedArtwork.category}, {selectedArtwork.year}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
