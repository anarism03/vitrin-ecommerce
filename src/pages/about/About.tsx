import AboutContactSection from "./components/AboutContactSection";
import AboutHeroSection from "./components/AboutHeroSection";
import { useAboutNavigation } from "./hooks/useAboutNavigation";

export default function About() {
  const { goHome, goProducts } = useAboutNavigation();

  return (
    <div className="py-10">
      <AboutHeroSection
        onHomeClick={goHome}
        onProductsClick={goProducts}
      />
      <AboutContactSection />
    </div>
  );
}
