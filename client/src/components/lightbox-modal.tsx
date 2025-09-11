import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LightboxModalProps {
  isOpen?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  onClose?: () => void;
}

export default function LightboxModal({ 
  isOpen = false, 
  imageSrc = "", 
  imageAlt = "", 
  onClose = () => {} 
}: LightboxModalProps) {
  const [currentImage, setCurrentImage] = useState({ src: imageSrc, alt: imageAlt });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    setCurrentImage({ src: imageSrc, alt: imageAlt });
  }, [imageSrc, imageAlt]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 flex items-center justify-center p-4 lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          data-testid="lightbox-overlay"
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center">
            {/* Close button */}
            <motion.button
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-card/50 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-foreground hover:text-accent hover:bg-card/70 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              onClick={onClose}
              data-testid="lightbox-close-button"
            >
              <i className="fas fa-times text-xl"></i>
            </motion.button>

            {/* Image container */}
            <motion.div
              className="relative max-w-full max-h-full flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {currentImage.src && (
                <img
                  src={currentImage.src}
                  alt={currentImage.alt}
                  className="max-w-full max-h-full object-contain rounded-xl artwork-glow shadow-2xl"
                  data-testid="lightbox-image"
                />
              )}

              {/* Image info overlay */}
              <motion.div
                className="absolute bottom-4 left-4 right-4 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-accent mb-1">
                      {currentImage.alt || "Cosmic Artifact"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Digital Art • 2024 • Ultra High Resolution
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      className="w-10 h-10 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-lg flex items-center justify-center text-primary hover:bg-primary/30 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      data-testid="lightbox-download-button"
                    >
                      <i className="fas fa-download text-sm"></i>
                    </motion.button>
                    <motion.button
                      className="w-10 h-10 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-lg flex items-center justify-center text-secondary hover:bg-secondary/30 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      data-testid="lightbox-share-button"
                    >
                      <i className="fas fa-share text-sm"></i>
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Loading indicator */}
              {!currentImage.src && (
                <div className="flex items-center justify-center w-64 h-64 bg-card/30 rounded-xl border border-border">
                  <div className="text-center">
                    <motion.div
                      className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    ></motion.div>
                    <p className="text-muted-foreground text-sm">Loading cosmic artifact...</p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Navigation hints */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-card/50 backdrop-blur-sm border border-border rounded-full px-4 py-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <p className="text-xs text-muted-foreground font-mono">
                ESC to close • Click outside to exit
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
