import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "gallery", "media", "shop", "covenant", "journal", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navItems = [
    { id: "home", label: "HOME" },
    { id: "gallery", label: "GALLERY" },
    { id: "media", label: "MEDIA" },
    { id: "shop", label: "SHOP" },
    { id: "covenant", label: "COVENANT" },
    { id: "journal", label: "JOURNAL" },
    { id: "contact", label: "CONTACT" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 p-6" data-testid="navigation">
      <div className="flex justify-center">
        <motion.div 
          className="flex items-center space-x-8 bg-card/30 backdrop-blur-xl border border-border rounded-full px-8 py-4 glow-border"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`constellation-node text-sm font-medium tracking-wider transition-all duration-300 relative ${
                activeSection === item.id
                  ? "text-accent"
                  : "text-foreground hover:text-accent"
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              data-testid={`nav-${item.id}`}
            >
              {/* Constellation node glow */}
              <motion.span
                className={`absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${
                  activeSection === item.id ? "bg-accent" : "bg-muted-foreground/30"
                }`}
                animate={{
                  scale: activeSection === item.id ? [1, 1.3, 1] : 1,
                  boxShadow: activeSection === item.id 
                    ? ["0 0 5px hsl(195, 100%, 50%)", "0 0 15px hsl(195, 100%, 50%)", "0 0 5px hsl(195, 100%, 50%)"]
                    : "none"
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {item.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </nav>
  );
}
