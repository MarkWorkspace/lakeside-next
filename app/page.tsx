import { ModalProvider } from "./components/ModalContext";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import GallerySection from "./components/GallerySection";
import InfrastructureSection from "./components/InfrastructureSection";
import FeaturesSection from "./components/FeaturesSection";
import TechSection from "./components/TechSection";
import FloorplansSection from "./components/FloorplansSection";
import FAQSection from "./components/FAQSection";
import LocationSection from "./components/LocationSection";
import Footer from "./components/Footer";

export default function Page() {
  const config = {
    PHONE: process.env.NEXT_PUBLIC_PHONE || "телефон",
    PHONE_LINK: process.env.NEXT_PUBLIC_PHONE_LINK || "tel:#",
    EMAIL: process.env.NEXT_PUBLIC_EMAIL || "электронная почта",
    PHOTO_DRIVE_URL: process.env.NEXT_PUBLIC_PHOTO_DRIVE_URL || "#"
  };

  return (
    <ModalProvider>
      <div className="min-h-screen flex flex-col relative">
        <Header 
          phone={config.PHONE} 
          phoneLink={config.PHONE_LINK} 
          email={config.EMAIL} 
        />
        <main className="flex-grow relative">
          <HeroSection />
          <AboutSection />
          <GallerySection photoDriveUrl={config.PHOTO_DRIVE_URL} />
          <InfrastructureSection />
          <FeaturesSection />
          <TechSection />
          <FloorplansSection />
          <FAQSection />
          <LocationSection />
        </main>
        <Footer 
          phone={config.PHONE} 
          phoneLink={config.PHONE_LINK} 
          email={config.EMAIL} 
        />
      </div>
    </ModalProvider>
  );
}