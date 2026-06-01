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
}> = [
  { label: "Yeni məhsullar", value: "newest" },
  { label: "Ad A-Z", value: "nameAsc" },
  { label: "Ad Z-A", value: "nameDesc" },
  { label: "Qiymət artan", value: "priceAsc" },
  { label: "Qiymət azalan", value: "priceDesc" },
  { label: "Stok çox olan", value: "stockDesc" },
];

export const PRODUCT_PAGE_SIZE = 10;
