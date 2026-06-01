import AboutHeroImage from "./AboutHeroImage";
import AboutIntro from "./AboutIntro";

type Props = {
  onHomeClick: () => void;
  onProductsClick: () => void;
};

export default function AboutHeroSection({
  onHomeClick,
  onProductsClick,
}: Props) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
        <AboutHeroImage />
        <AboutIntro
          onHomeClick={onHomeClick}
          onProductsClick={onProductsClick}
        />
      </div>
    </section>
  );
}
