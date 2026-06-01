export const HOME_CATEGORY_TILES = [
  {
    title: "Aksesuarlar",
    helper: "Telefon və cihaz aksesuarları",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Apple",
    helper: "Apple məhsulları və aksesuarları",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Avtomobil Aksesuarları",
    helper: "Avtomobil üçün praktik seçimlər",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Ayaqqabılar",
    helper: "Gündəlik və rahat modellər",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Elektronika",
    helper: "Müasir elektron cihazlar",
    image:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Qulaqlıqlar",
    helper: "Qulaqlıq və səs avadanlıqları",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Oyun Avadanlıqları",
    helper: "Konsol, joystick və oyunlar",
    image:
      "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Saatlar",
    helper: "Kişi, qadın və smart saatlar",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Geyim",
    helper: "Kişi və qadın geyimləri",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Çantalar",
    helper: "Bel çantası, əl çantası və daha çox",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Ev Əşyaları",
    helper: "Ev üçün praktik məhsullar",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Kosmetika",
    helper: "Qayğı və gözəllik məhsulları",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Kitablar",
    helper: "Bədii, elmi və uşaq kitabları",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "İdman",
    helper: "İdman avadanlıqları və geyimləri",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
  },
];

const CATEGORY_TILE_PRESETS: {
  keywords: string[];
  helper: string;
  image: string;
}[] = [
  {
    keywords: ["avtomobil", "avto", "auto", "car", "masin", "maşın", "vehicle"],
    helper: "Avtomobil üçün praktik seçimlər",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["ayaqqabi", "ayaqqabı", "shoe", "shoes", "sneaker", "sneakers"],
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
    keywords: ["accessories", "accesories", "accessory", "aksesuar", "aksessuar"],
    helper: "Telefon və cihaz aksesuarları",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80",
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
      "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["elektronika", "electronic", "electronics", "cihaz"],
    helper: "Müasir elektron cihazlar",
    image:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["saat", "watch", "clock", "smart watch"],
    helper: "Kişi, qadın və smart saatlar",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["geyim", "paltar", "clothing", "clothes", "fashion"],
    helper: "Kişi və qadın geyimləri",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["çanta", "canta", "bag", "bags", "backpack"],
    helper: "Bel çantası, əl çantası və daha çox",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["ev", "home", "furniture", "mebel", "decor"],
    helper: "Ev üçün praktik məhsullar",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["kosmetika", "cosmetic", "beauty", "makeup", "parfum"],
    helper: "Qayğı və gözəllik məhsulları",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["kitab", "book", "books", "read"],
    helper: "Bədii, elmi və uşaq kitabları",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["idman", "sport", "sports", "fitness", "gym"],
    helper: "İdman avadanlıqları və geyimləri",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
  },
];

export function getHomeCategoryTile(
  categoryName: string,
  index: number,
  categoryId?: string,
) {
  const fallback = HOME_CATEGORY_TILES[index % HOME_CATEGORY_TILES.length];
  const normalizedName = categoryName.toLocaleLowerCase("az-AZ");
  const preset = CATEGORY_TILE_PRESETS.find((item) =>
    item.keywords.some((keyword) => normalizedName.includes(keyword)),
  );

  return {
    ...fallback,
    ...preset,
    title: categoryName || fallback.title,
    categoryId: categoryId ?? null,
  };
}
