import type { ProductFilters, ProductSort } from "../../types/product.type";

export const DEFAULT_PRODUCT_FILTERS: ProductFilters = {
  searchText: "",
  categoryId: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  sortBy: "newest",
};

export const PRODUCT_SORT_OPTIONS: Array<{
  label: string;
  value: ProductSort;
  helper: string;
}> = [
  { label: "Yeni məhsullar", value: "newest", helper: "Ən son əlavə olunanlar" },
  { label: "Ad A-Z", value: "nameAsc", helper: "Alfabetik artan" },
  { label: "Ad Z-A", value: "nameDesc", helper: "Alfabetik azalan" },
  { label: "Qiymət artan", value: "priceAsc", helper: "Ucuzdan bahalıya" },
  { label: "Qiymət azalan", value: "priceDesc", helper: "Bahalıdan ucuza" },
  { label: "Stok çox olan", value: "stockDesc", helper: "Mövcudluq üstün" },
];

export const PRODUCT_PAGE_SIZE = 10;

export const PRODUCT_HERO_CHIPS: Array<{ label: string; className: string }> = [
  { label: "Yeni", className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { label: "Trend", className: "bg-rose-100 text-rose-700 border-rose-200" },
  { label: "Filtr", className: "bg-sky-100 text-sky-700 border-sky-200" },
];

export const PRODUCT_HERO_HIGHLIGHTS: Array<{
  label: string;
  color: string;
}> = [
  { label: "Sürətli axtarış", color: "text-teal-600" },
  { label: "Ağıllı filtr", color: "text-emerald-600" },
  { label: "Rahat sıralama", color: "text-sky-600" },
];

export type ProductAccent = {
  badge: string;
  ring: string;
  border: string;
  glow: string;
  chip: string;
  price: string;
  imageBg: string;
};

export const PRODUCT_ACCENT_PALETTE: ProductAccent[] = [
  {
    badge: "from-rose-500 to-pink-500",
    ring: "hover:border-rose-300 hover:shadow-rose-200/50",
    border: "border-rose-200",
    glow: "from-rose-100 via-white to-pink-50",
    chip: "!bg-rose-50 !text-rose-700 !border-rose-100",
    price: "from-rose-500 to-pink-600",
    imageBg: "from-rose-50 via-white to-pink-50",
  },
  {
    badge: "from-teal-500 to-emerald-500",
    ring: "hover:border-teal-300 hover:shadow-teal-200/50",
    border: "border-teal-200",
    glow: "from-teal-100 via-white to-emerald-50",
    chip: "!bg-emerald-50 !text-emerald-700 !border-emerald-100",
    price: "from-teal-500 to-emerald-600",
    imageBg: "from-teal-50 via-white to-emerald-50",
  },
  {
    badge: "from-sky-500 to-indigo-500",
    ring: "hover:border-sky-300 hover:shadow-sky-200/50",
    border: "border-sky-200",
    glow: "from-sky-100 via-white to-indigo-50",
    chip: "!bg-sky-50 !text-sky-700 !border-sky-100",
    price: "from-sky-500 to-indigo-600",
    imageBg: "from-sky-50 via-white to-indigo-50",
  },
  {
    badge: "from-amber-500 to-orange-500",
    ring: "hover:border-amber-300 hover:shadow-amber-200/50",
    border: "border-amber-200",
    glow: "from-amber-100 via-white to-orange-50",
    chip: "!bg-amber-50 !text-amber-700 !border-amber-100",
    price: "from-amber-500 to-orange-600",
    imageBg: "from-amber-50 via-white to-orange-50",
  },
  {
    badge: "from-fuchsia-500 to-purple-500",
    ring: "hover:border-fuchsia-300 hover:shadow-fuchsia-200/50",
    border: "border-fuchsia-200",
    glow: "from-fuchsia-100 via-white to-purple-50",
    chip: "!bg-fuchsia-50 !text-fuchsia-700 !border-fuchsia-100",
    price: "from-fuchsia-500 to-purple-600",
    imageBg: "from-fuchsia-50 via-white to-purple-50",
  },
  {
    badge: "from-cyan-500 to-blue-500",
    ring: "hover:border-cyan-300 hover:shadow-cyan-200/50",
    border: "border-cyan-200",
    glow: "from-cyan-100 via-white to-blue-50",
    chip: "!bg-cyan-50 !text-cyan-700 !border-cyan-100",
    price: "from-cyan-500 to-blue-600",
    imageBg: "from-cyan-50 via-white to-blue-50",
  },
];

export type ProductDetailAccent = {
  badge: string;
  soft: string;
  ring: string;
  chip: string;
  text: string;
};

export const PRODUCT_DETAIL_ACCENT_PALETTE: ProductDetailAccent[] = [
  {
    badge: "from-rose-500 to-pink-500",
    soft: "from-rose-50 via-white to-pink-50",
    ring: "ring-rose-200",
    chip: "bg-rose-50 text-rose-700 border-rose-100",
    text: "text-rose-700",
  },
  {
    badge: "from-teal-500 to-emerald-500",
    soft: "from-teal-50 via-white to-emerald-50",
    ring: "ring-emerald-200",
    chip: "bg-emerald-50 text-emerald-700 border-emerald-100",
    text: "text-emerald-700",
  },
  {
    badge: "from-sky-500 to-indigo-500",
    soft: "from-sky-50 via-white to-indigo-50",
    ring: "ring-sky-200",
    chip: "bg-sky-50 text-sky-700 border-sky-100",
    text: "text-sky-700",
  },
  {
    badge: "from-amber-500 to-orange-500",
    soft: "from-amber-50 via-white to-orange-50",
    ring: "ring-amber-200",
    chip: "bg-amber-50 text-amber-700 border-amber-100",
    text: "text-amber-700",
  },
  {
    badge: "from-fuchsia-500 to-purple-500",
    soft: "from-fuchsia-50 via-white to-purple-50",
    ring: "ring-fuchsia-200",
    chip: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100",
    text: "text-fuchsia-700",
  },
  {
    badge: "from-cyan-500 to-blue-500",
    soft: "from-cyan-50 via-white to-blue-50",
    ring: "ring-cyan-200",
    chip: "bg-cyan-50 text-cyan-700 border-cyan-100",
    text: "text-cyan-700",
  },
];

export function hashAccentKey(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}
