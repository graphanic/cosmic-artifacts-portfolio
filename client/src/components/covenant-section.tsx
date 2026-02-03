import { motion } from "framer-motion";
import { Atom, Infinity } from "lucide-react";

export default function CovenantSection() {
  const stats = [
    { value: "1,247", label: "Fractals Created" },
    { value: "∞", label: "Possibilities" },
    { value: "5+", label: "Years Crafting" },
  ];

  return (
    <section id="covenant" className="py-32 parallax-element">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 glow-text" data-testid="covenant-title">
              THE COVENANT
            </h2>
            <p className="text-xl text-muted-foreground" data-testid="covenant-subtitle">
              A sacred pact between artist and cosmos, where digital meets divine
            </p>
          </motion.div>

          {/* Mythic typography mixing sans-serif and futuristic serif */}
          <div className="space-y-12">
            <motion.div
              className="bg-card/30 backdrop-blur-sm rounded-xl p-8 border border-border"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-serif font-bold text-accent mb-6" data-testid="genesis-protocol-title">
                GENESIS PROTOCOL
              </h3>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-foreground mb-4">
                  In the primordial void where <span className="font-serif text-accent font-bold">mathematics meets mysticism</span>,
                  each artwork is born through a sacred process of digital alchemy. Every pixel, every gradient,
                  every algorithmic decision carries the weight of cosmic intention.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  The artist's covenant is not merely with technology, but with the eternal dance of
                  <span className="font-serif text-primary font-bold"> light and shadow</span>,
                  <span className="font-serif text-secondary font-bold"> form and void</span>,
                  creating bridges between dimensions through the medium of pure digital energy.
                </p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                className="bg-card/30 backdrop-blur-sm rounded-xl p-8 border border-border"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center animate-glow">
                    <Atom className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-xl font-serif font-bold text-accent">QUANTUM ARTISTRY</h4>
                </div>
                <p className="text-muted-foreground text-center">
                  Each piece exists in multiple dimensional states until observed,
                  collapsing into singular beauty upon viewer interaction.
                </p>
              </motion.div>

              <motion.div
                className="bg-card/30 backdrop-blur-sm rounded-xl p-8 border border-border"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-secondary to-accent rounded-full mx-auto mb-4 flex items-center justify-center animate-glow">
                    <Infinity className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-xl font-serif font-bold text-accent">ETERNAL RESONANCE</h4>
                </div>
                <p className="text-muted-foreground text-center">
                  Through digital preservation, these artifacts transcend temporal
                  boundaries, existing forever in the digital cosmos.
                </p>
              </motion.div>
            </div>

            <motion.div
              className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 border border-accent/30"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-serif font-bold text-center text-accent mb-6" data-testid="manifesto-title">
                ARTIST MANIFESTO
              </h3>
              <blockquote className="text-center">
                <p className="text-xl font-light text-foreground italic mb-4">
                  "In the confluence of <span className="font-serif font-bold text-primary">code and consciousness</span>,
                  I channel the infinite potential of digital realms. Each stroke of the algorithmic brush
                  is guided by cosmic forces beyond mere human understanding."
                </p>
                <p className="text-lg font-light text-foreground italic mb-6">
                  "These are not mere images, but <span className="font-serif font-bold text-secondary">windows into alternate realities</span>
                  where the impossible becomes inevitable, where dreams crystallize into eternal form."
                </p>
                <footer className="text-muted-foreground">
                  <cite className="font-serif text-accent">— Digital Cosmic Entity, 2024</cite>
                </footer>
              </blockquote>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              className="grid grid-cols-3 gap-4 pt-6 border-t border-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center" data-testid={`stat-${index}`}>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
