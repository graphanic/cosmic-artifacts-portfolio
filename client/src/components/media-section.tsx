import { motion } from "framer-motion";
import { useState } from "react";
import { Play, MousePointer, X } from "lucide-react";

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  quality: string;
  type: string;
  embedUrl?: string;
  thumbnail?: string;
}

export default function MediaSection() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const featuredVideos: Video[] = [
    {
      id: "1",
      title: "Digital Genesis Process",
      description: "Watch as cosmic visions materialize through digital brushstrokes and algorithmic precision.",
      duration: "12:45",
      quality: "4K Resolution",
      type: "Time-lapse",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
    },
    {
      id: "2",
      title: "Reactive Constellation",
      description: "An interactive experience where your presence shapes the cosmic dance of light and form.",
      duration: "∞",
      quality: "WebGL Enabled",
      type: "Interactive",
      thumbnail: "https://images.unsplash.com/photo-1518818419601-72c8673f5852?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
    },
    {
      id: "3",
      title: "Fractal Dreams",
      description: "Dive deep into infinite mathematical beauty as fractals unfold in mesmerizing patterns.",
      duration: "8:30",
      quality: "4K Resolution",
      type: "Animation",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
    },
    {
      id: "4",
      title: "Behind the Void",
      description: "A glimpse into the creative process behind the Cosmic Artifacts collection.",
      duration: "15:22",
      quality: "4K Resolution",
      type: "Behind-the-scenes",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
    },
  ];

  const filters = ["all", "Time-lapse", "Animation", "Behind-the-scenes", "Interactive"];

  const filteredVideos = activeFilter === "all"
    ? featuredVideos
    : featuredVideos.filter(v => v.type === activeFilter);

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

        {/* Filter buttons */}
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
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-accent text-accent-foreground"
                  : "bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground border border-border"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid={`video-filter-${filter}`}
            >
              {filter === "all" ? "All Videos" : filter}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              className="group relative"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              layout
            >
              <div className="relative overflow-hidden rounded-xl fractal-border bg-card">
                {/* Video player with fractal particle hover effects */}
                <div className="aspect-video bg-gradient-to-br from-muted/50 to-background flex items-center justify-center relative group-hover:bg-gradient-to-br group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-500 overflow-hidden">
                  {video.thumbnail && (
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                  <motion.button
                    className={`relative z-10 w-20 h-20 ${
                      video.type === "Interactive" ? "bg-secondary/40" : "bg-primary/40"
                    } backdrop-blur-sm rounded-full flex items-center justify-center text-accent hover:bg-primary/50 transition-all duration-300 animate-glow`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedVideo(video)}
                    data-testid={`video-play-${video.id}`}
                  >
                    {video.type === "Interactive" ? (
                      <MousePointer className="w-8 h-8" />
                    ) : (
                      <Play className="w-8 h-8 ml-1" />
                    )}
                  </motion.button>
                  <div className="absolute top-4 left-4 text-xs text-muted-foreground font-mono">
                    // {video.type.toUpperCase()}_0{video.id}.{video.embedUrl ? "MP4" : "DEMO"}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                      {video.type}
                    </span>
                  </div>
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
                className="absolute -top-12 right-0 text-foreground hover:text-accent z-10"
                onClick={() => setSelectedVideo(null)}
                data-testid="video-modal-close"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="aspect-video bg-card rounded-xl overflow-hidden">
                {selectedVideo.embedUrl ? (
                  <iframe
                    src={selectedVideo.embedUrl}
                    title={selectedVideo.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <div className="text-center text-foreground">
                      <MousePointer className="w-12 h-12 mb-4 mx-auto opacity-50" />
                      <p className="text-lg">{selectedVideo.title}</p>
                      <p className="text-sm text-muted-foreground mt-2">Interactive experience - Coming soon</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-serif font-bold text-accent">{selectedVideo.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{selectedVideo.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
