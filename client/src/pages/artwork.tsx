import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowLeft, Download, Share2, ShoppingCart, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ArtworkDetail {
  id: string;
  src: string;
  title: string;
  category: string;
  year: string;
  medium: string;
  dimensions: string;
  description: string;
  price: string;
  available: boolean;
}

const artworksData: ArtworkDetail[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=1500",
    title: "Stellar Genesis",
    category: "Digital Sculpture",
    year: "2024",
    medium: "3D Render",
    dimensions: "4000 x 5000 px",
    description: "Stellar Genesis captures the primordial moment of cosmic creation through an intricate blend of mathematical precision and artistic intuition. The piece explores themes of emergence, infinity, and the delicate balance between chaos and order that governs the universe. Created using advanced procedural generation techniques, each element within the composition reflects the underlying algorithms that shape reality itself.",
    price: "$250",
    available: true,
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=1500",
    title: "Quantum Threads",
    category: "Interactive Installation",
    year: "2024",
    medium: "Generative",
    dimensions: "Infinite Resolution",
    description: "Quantum Threads is an exploration of interconnectedness at the subatomic level, visualized through organic flowing forms that respond to mathematical principles. The piece represents the invisible bonds that connect all matter in the universe, rendered in luminescent threads that seem to pulse with cosmic energy.",
    price: "$180",
    available: true,
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=1500",
    title: "Celestial Fragments",
    category: "Digital Painting",
    year: "2024",
    medium: "Digital Painting",
    dimensions: "6000 x 4000 px",
    description: "Celestial Fragments captures the ethereal beauty of cosmic debris floating through infinite space. Each fragment tells a story of ancient stellar explosions, carrying within it the seeds of future worlds. The interplay of light and shadow creates a meditative experience that invites contemplation of our place in the vast cosmos.",
    price: "$320",
    available: true,
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=1500",
    title: "Aurora Fields",
    category: "Generative Art",
    year: "2024",
    medium: "Generative",
    dimensions: "8K Resolution",
    description: "Aurora Fields is a generative masterpiece that captures the dancing lights of polar auroras translated into pure mathematical form. The piece constantly evolves, offering endless variations of ethereal energy patterns that shift and flow like cosmic rivers across the digital canvas.",
    price: "$410",
    available: true,
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=1500",
    title: "Neon Metropolis",
    category: "3D Render",
    year: "2024",
    medium: "3D Render",
    dimensions: "5000 x 3000 px",
    description: "Neon Metropolis envisions a futuristic cityscape where technology and nature have merged into a harmonious whole. The hyperreal rendering showcases dynamic lighting systems that illuminate towering structures, creating a vision of urban life transformed by advanced consciousness.",
    price: "$290",
    available: true,
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=1500",
    title: "Sacred Geometry",
    category: "Mathematical Art",
    year: "2024",
    medium: "Generative",
    dimensions: "4000 x 4000 px",
    description: "Sacred Geometry reveals the hidden mathematical patterns that underlie all creation. From the Fibonacci spiral to the golden ratio, this piece weaves together ancient knowledge and modern computation to create a visual representation of universal harmony and cosmic order.",
    price: "$570",
    available: false,
  },
];

export default function ArtworkPage({ params }: { params: { id: string } }) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const artwork = artworksData.find(a => a.id === params.id);

  if (!artwork) {
    return (
      <div className="min-h-screen bg-background text-foreground fractal-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-accent mb-4">Artifact Not Found</h1>
          <p className="text-muted-foreground mb-8">This cosmic artifact has not been discovered yet.</p>
          <motion.button
            onClick={() => setLocation("/")}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Gallery
          </motion.button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    toast({
      title: "Artifact Added",
      description: `${artwork.title} has been added to your collection.`,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Artifact link has been copied to your quantum clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground fractal-bg">
      {/* Back navigation */}
      <motion.div
        className="fixed top-6 left-6 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          onClick={() => setLocation("/")}
          className="bg-card/50 backdrop-blur-xl border border-border rounded-full px-6 py-3 flex items-center gap-2 text-foreground hover:text-accent transition-colors glow-border"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Gallery
        </motion.button>
      </motion.div>

      <div className="container mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Artwork Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="artwork-glow rounded-xl overflow-hidden">
              <img
                src={artwork.src}
                alt={artwork.title}
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Action buttons */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <motion.button
                className="w-12 h-12 bg-card/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-foreground hover:text-accent transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={handleShare}
                className="w-12 h-12 bg-card/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-foreground hover:text-accent transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
              <motion.button
                className="w-12 h-12 bg-card/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-foreground hover:text-accent transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Download className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Artwork Details */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <span className="text-xs font-mono text-accent uppercase tracking-wider mb-2 block">
                ARTIFACT.{artwork.id.padStart(3, '0')}
              </span>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-4 glow-text">
                {artwork.title}
              </h1>
              <div className="flex flex-wrap gap-3">
                <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">
                  {artwork.medium}
                </span>
                <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm">
                  {artwork.category}
                </span>
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                  {artwork.year}
                </span>
              </div>
            </div>

            <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-border">
              <h3 className="text-lg font-serif font-bold text-accent mb-4">About this Artifact</h3>
              <p className="text-muted-foreground leading-relaxed">
                {artwork.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card/30 backdrop-blur-sm rounded-xl p-4 border border-border">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Dimensions</span>
                <p className="text-foreground font-medium mt-1">{artwork.dimensions}</p>
              </div>
              <div className="bg-card/30 backdrop-blur-sm rounded-xl p-4 border border-border">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Medium</span>
                <p className="text-foreground font-medium mt-1">{artwork.medium}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 border border-accent/30">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Price</span>
                  <p className="text-3xl font-bold text-foreground">{artwork.price}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  artwork.available 
                    ? "bg-green-500/20 text-green-400" 
                    : "bg-red-500/20 text-red-400"
                }`}>
                  {artwork.available ? "Available" : "Sold"}
                </span>
              </div>
              
              <motion.button
                onClick={handleAddToCart}
                disabled={!artwork.available}
                className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground py-4 rounded-lg font-semibold transition-all duration-300 animate-glow-pulse flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: artwork.available ? 1.02 : 1 }}
                whileTap={{ scale: artwork.available ? 0.98 : 1 }}
              >
                <ShoppingCart className="w-5 h-5" />
                {artwork.available ? "ACQUIRE ARTIFACT" : "SOLD OUT"}
              </motion.button>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Shopify integration ready - connect your store to enable checkout
            </p>
          </motion.div>
        </div>

        {/* Related Artworks */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-serif font-bold text-accent mb-8 text-center">
            Related Artifacts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {artworksData
              .filter(a => a.id !== artwork.id)
              .slice(0, 3)
              .map((related, index) => (
                <motion.div
                  key={related.id}
                  className="group relative overflow-hidden rounded-xl fractal-border cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setLocation(`/artwork/${related.id}`)}
                >
                  <img
                    src={related.src}
                    alt={related.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-serif font-bold text-accent">{related.title}</h3>
                      <p className="text-sm text-muted-foreground">{related.price}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
