import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import GallerySection from "@/components/gallery-section";
import MediaSection from "@/components/media-section";
import ShopSection from "@/components/shop-section";
import CovenantSection from "@/components/covenant-section";
import JournalSection from "@/components/journal-section";
import ContactSection from "@/components/contact-section";
import LightboxModal from "@/components/lightbox-modal";
import CursorEffects from "@/components/cursor-effects";
import ExistentialWhispers from "@/components/existential-whispers";
import EasterEggs from "@/components/easter-eggs";
import { StormModeToggle, useStormMode } from "@/components/storm-mode-toggle";
import { SoundToggle } from "@/components/sound-controller";
import { useParallax } from "@/hooks/use-parallax";

export default function Home() {
  useParallax();
  const { isStorm } = useStormMode();

  return (
    <div className={`min-h-screen bg-background text-foreground fractal-bg ${!isStorm ? 'calm-mode-container' : ''}`}>
      <ExistentialWhispers />
      <CursorEffects />
      <Navigation />
      <HeroSection />
      <GallerySection />
      <MediaSection />
      <ShopSection />
      <CovenantSection />
      <JournalSection />
      <ContactSection />
      <LightboxModal />
      <StormModeToggle />
      <SoundToggle />
      <EasterEggs />
    </div>
  );
}
