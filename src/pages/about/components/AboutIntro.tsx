import AboutActions from "./AboutActions";
import AboutFocusList from "./AboutFocusList";

type Props = {
  onHomeClick: () => void;
  onProductsClick: () => void;
};

export default function AboutIntro({ onHomeClick, onProductsClick }: Props) {
  return (
    <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
      <span className="mb-4 inline-flex w-fit items-center rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
        Haqqımızda
      </span>

      <h1 className="m-0 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
        Vitrin haqqında
      </h1>

      <div className="mt-6 space-y-5 text-base leading-8 text-slate-600 sm:text-lg">
        <p className="m-0">
          Vitrin məhsulları göstərmək və müştərilərlə əlaqə saxlamaq üçün
          hazırlanıb.
        </p>
        <p className="m-0">
          Məhsullar kateqoriyalar üzrə yığılır. Müştəri məhsula baxır, məlumatı
          oxuyur və lazım olsa əlaqə saxlayır.
        </p>
      </div>

      <AboutFocusList />
      <AboutActions
        onHomeClick={onHomeClick}
        onProductsClick={onProductsClick}
      />
    </div>
  );
}
