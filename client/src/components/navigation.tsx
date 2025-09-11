import { useState, useEffect } from "react";

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home");

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
        <div className="flex items-center space-x-8 bg-card/30 backdrop-blur-xl border border-border rounded-full px-8 py-4 glow-border">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`constellation-node text-sm font-medium tracking-wider transition-all duration-300 ${
                activeSection === item.id
                  ? "text-accent"
                  : "text-foreground hover:text-accent"
              }`}
              data-testid={`nav-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
