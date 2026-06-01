export const HOME_CATEGORY_TILES = [
  {
    title: "Aksesuarlar",
    helper: "Telefon və cihaz aksesuarları",
    image:
      "https://images.unsplash.com/photo-1601524909162-ae8725290836?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Apple",
    helper: "Apple məhsulları və aksesuarları",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Avtomobil aksesuarları",
    helper: "Avtomobil üçün praktik seçimlər",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Ayaqqabılar",
    helper: "Gündəlik və rahat modellər",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
];

const CATEGORY_TILE_PRESETS = [
  {
    keywords: [
      "avtomobil",
      "avto",
      "auto",
      "car",
      "masin",
      "maşın",
      "vehicle",
    ],
    helper: "Avtomobil üçün praktik seçimlər",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: [
      "ayaqqabi",
      "ayaqqabı",
      "shoe",
      "shoes",
      "sneaker",
      "sneakers",
    ],
    helper: "Gündəlik və rahat modellər",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["apple", "iphone", "ipad", "mac", "macbook"],
    helper: "Apple məhsulları və aksesuarları",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
  },
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
    keywords: ["audio", "qulaqliq", "qulaqlıq", "səs", "speaker"],
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
