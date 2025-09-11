import { motion } from "framer-motion";
import { useState } from "react";

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  badge: string;
  badgeColor: string;
}

export default function ShopSection() {
  const [cart, setCart] = useState<string[]>([]);

  const products: Product[] = [
    {
      id: "1",
      title: "Stellar Genesis #001",
      description: "Original digital masterpiece capturing the birth of cosmic entities through algorithmic synthesis.",
      price: "2.5 ETH",
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
      badge: "LIMITED",
      badgeColor: "accent",
    },
    {
      id: "2",
      title: "Quantum Threads #007",
      description: "Interactive installation exploring the intersection of mathematics and visual poetry.",
      price: "1.8 ETH",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
      badge: "RARE",
      badgeColor: "secondary",
    },
    {
      id: "3",
      title: "Sacred Geometry #003",
      description: "Mathematical art piece revealing the hidden patterns that govern cosmic harmony.",
      price: "3.2 ETH",
      image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
      badge: "GENESIS",
      badgeColor: "primary",
    },
    {
      id: "4",
      title: "Aurora Fields #012",
      description: "Generative art piece with endless variations of ethereal energy patterns.",
      price: "4.1 ETH",
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
      badge: "ANIMATED",
      badgeColor: "accent",
    },
    {
      id: "5",
      title: "Neon Metropolis #005",
      description: "Futuristic cityscape rendered in hyperreal detail with dynamic lighting systems.",
      price: "2.9 ETH",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
      badge: "EXCLUSIVE",
      badgeColor: "secondary",
    },
    {
      id: "6",
      title: "Celestial Fragments #001",
      description: "Unique crystalline structures formed through computational alchemy and digital precision.",
      price: "5.7 ETH",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
      badge: "1/1",
      badgeColor: "primary",
    },
  ];

  const addToCart = (productId: string) => {
    setCart(prev => [...prev, productId]);
    // Here you would integrate with Shopify Buy SDK
    console.log(`Added product ${productId} to cart`);
  };

  const getBadgeStyles = (color: string) => {
    const styles = {
      accent: "bg-accent/20 text-accent",
      secondary: "bg-secondary/20 text-secondary",
      primary: "bg-primary/20 text-primary",
    };
    return styles[color as keyof typeof styles] || styles.accent;
  };

  const getGradientStyles = (index: number) => {
    const gradients = [
      "from-primary/10 via-transparent to-secondary/10",
      "from-secondary/10 via-transparent to-primary/10",
      "from-accent/10 via-transparent to-primary/10",
      "from-primary/10 via-transparent to-accent/10",
      "from-secondary/10 via-transparent to-accent/10",
      "from-accent/10 via-transparent to-secondary/10",
    ];
    return gradients[index % gradients.length];
  };

  const getButtonGradient = (index: number) => {
    const gradients = [
      "from-primary to-secondary",
      "from-secondary to-primary",
      "from-accent to-secondary",
      "from-primary to-accent",
      "from-secondary to-accent",
      "from-accent to-primary",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section id="shop" className="py-32 parallax-element">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 glow-text" data-testid="shop-title">
            ARTIFACT VAULT
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="shop-description">
            Acquire pieces of the cosmic collection - each artwork comes with blockchain verification and eternal digital ownership
          </p>
        </motion.div>

        {/* Shopify-compatible product listings with animated gradient effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="group bg-card/30 backdrop-blur-sm rounded-xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-500 relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              data-testid={`product-${product.id}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${getGradientStyles(index)} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute top-4 right-4 ${getBadgeStyles(product.badgeColor)} backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold`}>
                  {product.badge}
                </div>
              </div>
              <div className="p-6 relative z-10">
                <h3 className="text-xl font-serif font-bold text-accent mb-2">{product.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-foreground">{product.price}</span>
                  <span className="text-sm text-muted-foreground">+ gas fees</span>
                </div>
                <motion.button
                  className={`w-full bg-gradient-to-r ${getButtonGradient(index)} text-primary-foreground py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 animate-glow`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(product.id)}
                  data-testid={`add-to-cart-${product.id}`}
                >
                  ACQUIRE ARTIFACT
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cart indicator */}
        {cart.length > 0 && (
          <motion.div
            className="fixed bottom-8 right-8 bg-accent text-accent-foreground rounded-full w-16 h-16 flex items-center justify-center text-lg font-bold animate-glow-pulse z-40"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            data-testid="cart-indicator"
          >
            {cart.length}
          </motion.div>
        )}
      </div>
    </section>
  );
}
