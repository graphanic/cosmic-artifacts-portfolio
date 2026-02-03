import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Send, ArrowRight, X } from "lucide-react";

interface JournalEntry {
  id: string;
  transmission: string;
  date: string;
  title: string;
  preview: string;
  tags: string[];
  readTime: string;
}

export default function JournalSection() {
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const journalEntries: JournalEntry[] = [
    {
      id: "1",
      transmission: "TRANSMISSION.001",
      date: "2024.03.15",
      title: "The Mathematics of Wonder",
      preview: "Today I discovered a new fractal equation that seems to mirror the cosmic microwave background. The patterns emerging from pure mathematical relationships continue to astound me with their inherent beauty and unexpected resemblance to natural phenomena.",
      tags: ["mathematics", "fractals", "cosmos"],
      readTime: "5 min read",
    },
    {
      id: "2",
      transmission: "TRANSMISSION.002",
      date: "2024.03.08",
      title: "Digital Shamanism and the NFT Realm",
      preview: "The blockchain has become our modern cave wall, where digital shamans like myself inscribe visions for future civilizations. Each token is a totem, each smart contract a sacred ritual binding creator, artwork, and collector in an eternal triangle of meaning.",
      tags: ["philosophy", "blockchain", "nft"],
      readTime: "7 min read",
    },
    {
      id: "3",
      transmission: "TRANSMISSION.003",
      date: "2024.02.28",
      title: "The Glitch as Divine Intervention",
      preview: "Sometimes the most profound art emerges from computational accidents. A glitch in the rendering pipeline today revealed hidden geometries that no human mind could have conceived. In these moments, I wonder if we are truly creating, or merely discovering what already exists in the digital aether.",
      tags: ["glitch", "serendipity", "creation"],
      readTime: "4 min read",
    },
  ];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubscribing(true);
    try {
      await apiRequest("POST", "/api/newsletter/subscribe", { email });
      toast({
        title: "Quantum Link Established",
        description: "You've been connected to the cosmic network. Expect transmissions soon.",
      });
      setEmail("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      if (message.includes("409")) {
        toast({
          title: "Already Connected",
          description: "This quantum address is already linked to our network.",
        });
      } else {
        toast({
          title: "Connection Failed",
          description: "Unable to establish quantum link. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section id="journal" className="py-32 parallax-element">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 glow-text" data-testid="journal-title">
            COSMIC JOURNAL
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="journal-description">
            Chronicles from the intersection of technology and transcendence
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {journalEntries.map((entry, index) => (
            <motion.article
              key={entry.id}
              className="bg-card/30 backdrop-blur-sm rounded-xl p-8 border border-border hover:border-accent/50 transition-all duration-300 cursor-pointer group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
              onClick={() => setSelectedEntry(entry.id)}
              data-testid={`journal-entry-${entry.id}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-accent uppercase tracking-wider">
                  {entry.transmission}
                </span>
                <time className="text-sm text-muted-foreground">{entry.date}</time>
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                {entry.title}
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {entry.preview}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex space-x-4 text-sm text-muted-foreground">
                  {entry.tags.map((tag) => (
                    <span key={tag} className="hover:text-accent transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>{entry.readTime}</span>
                  <motion.button
                    className="text-accent hover:text-primary transition-colors duration-300 flex items-center space-x-1"
                    whileHover={{ x: 5 }}
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-8 max-w-md mx-auto glow-border">
            <h3 className="text-xl font-semibold text-foreground mb-2" data-testid="newsletter-title">
              Stay Connected
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Get notified when new digital universes are born
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 bg-input border border-border rounded-lg px-4 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                data-testid="newsletter-email-input"
              />
              <motion.button
                type="submit"
                disabled={isSubscribing}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="newsletter-submit"
              >
                {isSubscribing ? (
                  <motion.div
                    className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Journal Entry Modal */}
        {selectedEntry && (
          <motion.div
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEntry(null)}
            data-testid="journal-modal"
          >
            <div className="relative max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <button
                className="absolute -top-12 right-0 text-foreground hover:text-accent text-2xl z-10"
                onClick={() => setSelectedEntry(null)}
                data-testid="journal-modal-close"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="bg-card/90 backdrop-blur-sm rounded-xl p-8 border border-border">
                {(() => {
                  const entry = journalEntries.find(e => e.id === selectedEntry);
                  if (!entry) return null;
                  
                  return (
                    <>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-xs font-mono text-accent uppercase tracking-wider">
                          {entry.transmission}
                        </span>
                        <time className="text-sm text-muted-foreground">{entry.date}</time>
                      </div>
                      <h1 className="text-3xl font-serif font-bold text-foreground mb-6">
                        {entry.title}
                      </h1>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-foreground leading-relaxed mb-4">
                          {entry.preview}
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          This full article would contain the complete exploration of the topic, 
                          with detailed insights, code examples, and philosophical reflections 
                          on the intersection of technology and artistic expression.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          In a real implementation, this content would be fetched from a CMS 
                          or database, allowing for rich formatting, embedded media, and 
                          interactive elements that enhance the reading experience.
                        </p>
                      </div>
                      <div className="flex items-center space-x-4 mt-8 pt-6 border-t border-border">
                        {entry.tags.map((tag) => (
                          <span key={tag} className="text-sm text-accent">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
