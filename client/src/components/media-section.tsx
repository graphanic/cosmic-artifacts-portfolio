import { motion } from "framer-motion";
import { useState } from "react";

export default function MediaSection() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const featuredVideos = [
    {
      id: "1",
      title: "Digital Genesis Process",
      description: "Watch as cosmic visions materialize through digital brushstrokes and algorithmic precision.",
      duration: "12:45",
      quality: "4K Resolution",
      type: "Time-lapse",
    },
    {
      id: "2",
      title: "Reactive Constellation",
      description: "An interactive experience where your presence shapes the cosmic dance of light and form.",
      duration: "∞",
      quality: "WebGL Enabled",
      type: "Interactive",
    },
  ];

  const animations = [
    {
      title: "Particle Genesis",
      description: "Procedural particle systems creating organic flowing forms",
      gradient: "from-primary/30 to-transparent",
    },
    {
      title: "Fractal Morphing",
      description: "Mathematical transformations creating infinite complexity",
      gradient: "from-secondary/30 to-transparent",
    },
    {
      title: "Quantum Ripples",
      description: "Energy waves propagating through digital spacetime",
      gradient: "from-accent/30 to-transparent",
    },
  ];

  return (
    <section id="media" className="py-32 parallax-element">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 glow-text" data-testid="media-title">
            MOTION REALMS
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="media-description">
            Experience the evolution of static art into dynamic narratives through time and motion
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {featuredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              className="group relative"
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden rounded-xl fractal-border bg-card">
                {/* Video player with fractal particle hover effects */}
                <div className="aspect-video bg-gradient-to-br from-muted/50 to-background flex items-center justify-center relative group-hover:bg-gradient-to-br group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-500">
                  <div className="absolute inset-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg opacity-70"></div>
                  <motion.button
                    className={`relative z-10 w-20 h-20 ${
                      index === 0 ? "bg-primary/20" : "bg-secondary/20"
                    } backdrop-blur-sm rounded-full flex items-center justify-center text-accent text-2xl hover:${
                      index === 0 ? "bg-primary/30" : "bg-secondary/30"
                    } transition-all duration-300 animate-glow`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedVideo(video.id)}
                    data-testid={`video-play-${video.id}`}
                  >
                    <i className={index === 0 ? "fas fa-play ml-1" : "fas fa-mouse-pointer"}></i>
                  </motion.button>
                  <div className="absolute top-4 left-4 text-xs text-muted-foreground font-mono">
                    // {video.type.toUpperCase()}_01.{index === 0 ? "MP4" : "DEMO"}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-bold text-accent mb-2">{video.title}</h3>
                  <p className="text-muted-foreground mb-4">{video.description}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Duration: {video.duration}</span>
                    <span>{video.quality}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Particle effects showcase */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-serif font-bold text-center mb-8 text-accent" data-testid="animations-title">
            Featured Animations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {animations.map((animation, index) => (
              <motion.div
                key={index}
                className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border hover:border-accent/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                data-testid={`animation-${index}`}
              >
                <div className={`w-full h-32 bg-gradient-to-br ${animation.gradient} rounded-lg mb-4 relative overflow-hidden`}>
                  <div
                    className="absolute inset-0 shimmer-overlay"
                    style={{ animationDelay: `${-index}s` }}
                  ></div>
                </div>
                <h4 className="font-serif font-bold text-accent mb-2">{animation.title}</h4>
                <p className="text-sm text-muted-foreground">{animation.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Video Modal */}
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
            data-testid="video-modal"
          >
            <div className="relative max-w-4xl w-full">
              <button
                className="absolute -top-12 right-0 text-foreground hover:text-accent text-2xl z-10"
                onClick={() => setSelectedVideo(null)}
                data-testid="video-modal-close"
              >
                <i className="fas fa-times"></i>
              </button>
              <div className="aspect-video bg-card rounded-xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center text-foreground">
                    <i className="fas fa-play text-4xl mb-4 opacity-50"></i>
                    <p className="text-lg">Video player would be implemented here</p>
                    <p className="text-sm text-muted-foreground mt-2">Using React Player or similar component</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
