export type ProductImage = {
  id?: string;
  url: string;
  isMain?: boolean;
  sortOrder?: number;
  createdAt?: string;
};

export type ProductCategoryRef = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: string | number;
  stock: number;
  sku: string;
  imageUrl: string | null;
  images?: ProductImage[];
  isActive: boolean;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category?: ProductCategoryRef;
};

export type ProductListParams = {
  page?: number;
  pageSize?: number;
  name?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
};

export type ProductListResponse = {
  message?: string;
  data: Product[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type ProductSort =
  | "newest"
  | "nameAsc"
  | "nameDesc"
  | "priceAsc"
  | "priceDesc"
  | "stockDesc";

export type ProductFilters = {
  searchText: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy: ProductSort;
};
