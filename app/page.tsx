import HeroSection from "@/app/components/hero-section";
import StickyScrollSection from "@/app/components/sticky-scroll-section";
import TechHoverSection from "@/app/components/tech-hover-section";
import CurtainFooter from "@/app/components/curtain-footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StickyScrollSection />
      <TechHoverSection />
      <CurtainFooter />
    </main>
  );
}
