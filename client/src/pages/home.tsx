import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import GallerySection from "@/components/gallery-section";
import MediaSection from "@/components/media-section";
import ShopSection from "@/components/shop-section";
import CovenantSection from "@/components/covenant-section";
import JournalSection from "@/components/journal-section";
import ContactSection from "@/components/contact-section";
import LightboxModal from "@/components/lightbox-modal";
import { useParallax } from "@/hooks/use-parallax";

export default function Home() {
  useParallax();

  return (
    <div className="min-h-screen bg-background text-foreground fractal-bg">
      <Navigation />
      <HeroSection />
      <GallerySection />
      <MediaSection />
      <ShopSection />
      <CovenantSection />
      <JournalSection />
      <ContactSection />
      <LightboxModal />
    </div>
  );
}
