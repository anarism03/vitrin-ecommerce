type CategoryTile = {
  title: string;
  helper: string;
  image: string;
};

type CategoryPreset = {
  keywords: string[];
  helper: string;
  image: string;
};

const DEFAULT_CATEGORY_IMAGES: CategoryTile[] = [
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
  {
    title: "Ağıllı ev",
    helper: "Ev üçün smart həllər",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Kitablar",
    helper: "Kitab və dəftər məhsulları",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Geyim",
    helper: "Gündəlik geyimlər",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Elektronika",
    helper: "Elektron cihazlar",
    image:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Mebel",
    helper: "Ev üçün mebel və əşyalar",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Məişət texnikası",
    helper: "Ev texnikası",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Noutbuklar",
    helper: "Noutbuk və kompüterlər",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Smartfonlar",
    helper: "Telefon modelləri",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Saatlar",
    helper: "Saat və zinət əşyaları",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Kosmetika",
    helper: "Baxım məhsulları",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Oyun avadanlıqları",
    helper: "Oyun və konsol məhsulları",
    image:
      "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "İdman",
    helper: "İdman məhsulları",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
  },
];

export const HOME_CATEGORY_TILES = DEFAULT_CATEGORY_IMAGES;

const CATEGORY_TILE_PRESETS: CategoryPreset[] = [
  {
    keywords: ["avtomobil", "avto", "auto", "car", "maşın", "masin"],
    helper: "Avtomobil üçün praktik seçimlər",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["ayaqqabı", "ayaqqabi", "shoe", "sneaker"],
    helper: "Gündəlik və rahat modellər",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["ağıllı ev cihaz", "agilli ev cihaz", "smart home device"],
    helper: "Ev üçün smart cihazlar",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["ağıllı ev", "agilli ev", "smart home"],
    helper: "Ev üçün smart həllər",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["mebel", "ev əşyaları", "ev esyalari", "furniture"],
    helper: "Ev üçün mebel və əşyalar",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["məişət", "meiset", "appliance", "texnika"],
    helper: "Ev texnikası",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["noutbuk", "kompüter", "komputer", "laptop", "computer"],
    helper: "Noutbuk və kompüterlər",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["smartfon", "telefon", "phone"],
    helper: "Telefon modelləri",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["samsung"],
    helper: "Samsung məhsulları",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["apple", "iphone", "ipad", "macbook", "mac"],
    helper: "Apple məhsulları və aksesuarları",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["xiaomi"],
    helper: "Xiaomi məhsulları",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["kitab", "dəftər", "defter", "book", "notebook"],
    helper: "Kitab və dəftər məhsulları",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["kişi geyim", "kisi geyim", "men clothing"],
    helper: "Kişi geyimləri",
    image:
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["qadın geyim", "qadin geyim", "women clothing"],
    helper: "Qadın geyimləri",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["geyim", "paltar", "clothing", "fashion"],
    helper: "Gündəlik geyimlər",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["kosmetika", "baxım", "baxim", "cosmetic", "beauty", "makeup"],
    helper: "Baxım məhsulları",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["uşaq oyuncaq", "usaq oyuncaq", "toy"],
    helper: "Uşaq oyuncaqları",
    image:
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["oyun", "gaming", "console", "konsol"],
    helper: "Oyun və konsol məhsulları",
    image:
      "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["televizor", "tv", "audiotexnika"],
    helper: "Televizor və audio məhsulları",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["səs sistemi", "ses sistemi", "audio", "speaker", "qulaqlıq"],
    helper: "Səs və audio avadanlıqları",
    image:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["saat", "zinət", "zinet", "watch", "jewelry"],
    helper: "Saat və zinət əşyaları",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["idman", "sport", "fitness", "gym"],
    helper: "İdman məhsulları",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["aksesuar", "aksessuar", "accessory", "accessories"],
    helper: "Telefon və cihaz aksesuarları",
    image:
      "https://images.unsplash.com/photo-1601524909162-ae8725290836?auto=format&fit=crop&w=900&q=80",
  },
];

function normalizeCategoryName(value: string) {
  return value
    .toLocaleLowerCase("az-AZ")
    .replace(/ə/g, "e")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c");
}

export function getHomeCategoryTile(
  categoryName: string,
  index: number,
  categoryId?: string,
) {
  const fallback = HOME_CATEGORY_TILES[index % HOME_CATEGORY_TILES.length];
  const normalizedName = normalizeCategoryName(categoryName);
  const preset = CATEGORY_TILE_PRESETS.find((item) =>
    item.keywords.some((keyword) =>
      normalizedName.includes(normalizeCategoryName(keyword)),
    ),
  );

  return {
    ...fallback,
    ...preset,
    title: categoryName || fallback.title,
    categoryId: categoryId ?? null,
  };
}
