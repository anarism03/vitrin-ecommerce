import { ABOUT_HERO_IMAGE } from "../about.constants";

export default function AboutHeroImage() {
  return (
    <div className="relative min-h-[320px] overflow-hidden bg-slate-100 lg:min-h-[620px]">
      <img
        src={ABOUT_HERO_IMAGE}
        alt="Vitrin alış-veriş təcrübəsi"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-slate-950/20" />
      <div className="absolute bottom-8 left-8 right-8">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-2xl font-bold text-white">
          V
        </div>
      </div>
    </div>
  );
}
