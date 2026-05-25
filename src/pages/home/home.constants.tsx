import type { ReactNode } from "react";
import {
  CrownFilled,
  CustomerServiceFilled,
  FireOutlined,
  GiftFilled,
  HeartFilled,
  RocketOutlined,
  SafetyCertificateFilled,
  ShoppingOutlined,
  StarFilled,
  ThunderboltFilled,
  TruckFilled,
} from "@ant-design/icons";

export const HOME_HERO_IMAGE =
  "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1800&q=85";

export const HOME_SHOWCASE_IMAGES = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=900&q=80",
];

export const HOME_CATEGORY_TILES = [
  {
    title: "Elektronika",
    helper: "Smart cihazlar və aksesuarlar",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Apple",
    helper: "Yeni sezon seçimləri",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Audio",
    helper: "Qulaqlıq və səs avadanlıqları",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Gaming",
    helper: "Oyun avadanlıqları",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
  },
];

const CATEGORY_TILE_PRESETS = [
  {
    keywords: [
      "accessories",
      "accesories",
      "accessory",
      "aksesuar",
      "aksessuar",
    ],
    helper: "Telefon və cihaz aksesuarları",
    image:
      "https://images.unsplash.com/photo-1601524909162-ae8725290836?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["apple", "iphone", "ipad", "mac", "macbook"],
    helper: "Yeni sezon seçimləri",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["audio", "qulaqliq", "qulaqlıq", "ses", "səs", "speaker"],
    helper: "Qulaqlıq və səs avadanlıqları",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["gaming", "game", "oyun", "console", "konsol"],
    helper: "Oyun avadanlıqları",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
  },
];

export function getHomeCategoryTile(categoryName: string, index: number) {
  const fallback = HOME_CATEGORY_TILES[index % HOME_CATEGORY_TILES.length];
  const normalizedName = categoryName.toLocaleLowerCase("az-AZ");
  const preset = CATEGORY_TILE_PRESETS.find((item) =>
    item.keywords.some((keyword) => normalizedName.includes(keyword)),
  );

  return {
    ...fallback,
    ...preset,
    title: categoryName || fallback.title,
  };
}

export const HOME_HERO_CHIPS: Array<{ label: string; className: string }> = [
  { label: "Trend", className: "bg-rose-100 text-rose-700 border-rose-200" },
  { label: "Premium", className: "bg-amber-100 text-amber-700 border-amber-200" },
  { label: "24/7", className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
];

export const HOME_HERO_STATS: Array<{
  value: string;
  label: string;
  icon: ReactNode;
}> = [
  { value: "Premium", label: "Vitrin", icon: <StarFilled /> },
  { value: "Sadə", label: "Seçim", icon: <ThunderboltFilled /> },
  { value: "Rahat", label: "Baxış", icon: <RocketOutlined /> },
];

export const HOME_SHOWCASE_LABELS: Array<{
  title: string;
  helper: string;
  icon: ReactNode;
  tag: string;
  tagClass: string;
}> = [
  {
    title: "Yeni kolleksiya",
    helper: "Hər həftə yenilənən vitrin seçimləri",
    icon: <FireOutlined />,
    tag: "Trend",
    tagClass: "bg-rose-500 text-white",
  },
  {
    title: "Seçilmiş məhsullar",
    helper: "Komandamızın bəyəndiyi premium seçimlər",
    icon: <StarFilled />,
    tag: "Premium",
    tagClass: "bg-amber-400 text-amber-950",
  },
  {
    title: "Rahat alış-veriş",
    helper: "Aydın qiymət, sürətli baxış, asan seçim",
    icon: <RocketOutlined />,
    tag: "Yeni",
    tagClass: "bg-emerald-500 text-white",
  },
];

export const HOME_STATS: Array<{
  value: string;
  label: string;
  icon: ReactNode;
  gradient: string;
  bg: string;
  ring: string;
}> = [
  {
    value: "120+",
    label: "Aktiv məhsul",
    icon: <ShoppingOutlined />,
    gradient: "from-teal-500 to-emerald-500",
    bg: "from-teal-50 to-emerald-50",
    ring: "ring-teal-100",
  },
  {
    value: "20+",
    label: "Kateqoriya",
    icon: <CrownFilled />,
    gradient: "from-amber-500 to-orange-500",
    bg: "from-amber-50 to-orange-50",
    ring: "ring-amber-100",
  },
  {
    value: "24/7",
    label: "Onlayn vitrin",
    icon: <ThunderboltFilled />,
    gradient: "from-indigo-500 to-sky-500",
    bg: "from-indigo-50 to-sky-50",
    ring: "ring-indigo-100",
  },
  {
    value: "100%",
    label: "Müştəri məmnuniyyəti",
    icon: <HeartFilled />,
    gradient: "from-rose-500 to-pink-500",
    bg: "from-rose-50 to-pink-50",
    ring: "ring-rose-100",
  },
];

export const HOME_FEATURES: Array<{
  title: string;
  helper: string;
  icon: ReactNode;
  gradient: string;
}> = [
  {
    title: "Pulsuz çatdırılma",
    helper: "Bakı daxilində bütün sifarişlər üçün pulsuz çatdırılma.",
    icon: <TruckFilled />,
    gradient: "from-teal-500 to-emerald-500",
  },
  {
    title: "Təhlükəsiz ödəniş",
    helper: "Bütün ödəniş əməliyyatları şifrələnmiş kanal ilə qorunur.",
    icon: <SafetyCertificateFilled />,
    gradient: "from-indigo-500 to-sky-500",
  },
  {
    title: "Premium dəstək",
    helper: "Suallarınız üçün gündə 24 saat canlı dəstək komandamız.",
    icon: <CustomerServiceFilled />,
    gradient: "from-fuchsia-500 to-purple-500",
  },
  {
    title: "Xüsusi təkliflər",
    helper: "Üzv olun və yalnız sizə xas endirim kuponlarını qazanın.",
    icon: <GiftFilled />,
    gradient: "from-amber-500 to-rose-500",
  },
];

export const HOME_CATEGORY_ACCENTS = [
  "from-rose-500/80 to-pink-500/80",
  "from-amber-500/80 to-orange-500/80",
  "from-indigo-500/80 to-sky-500/80",
  "from-fuchsia-500/80 to-purple-500/80",
];
