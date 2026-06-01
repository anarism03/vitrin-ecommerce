import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryService from "../../../services/CategoryService";
import ProductService from "../../../services/ProductService";
import type { CategoryOption } from "../../../types/category.type";
import type {
  Product,
  ProductFilters,
  ProductSort,
} from "../../../types/product.type";
import { getErrorMessage, unwrap } from "../../../utils/getErrorMessage";
import { sortProducts } from "../../../utils/productHelpers";
import {
  DEFAULT_PRODUCT_FILTERS,
  PRODUCT_PAGE_SIZE,
} from "../productCatalog.constants";

type FetchOverrides = Partial<ProductFilters> & {
  page?: number;
  pageSize?: number;
  append?: boolean;
};

function normalizeCategories(responseData: unknown): CategoryOption[] {
  const data = unwrap<unknown>(responseData);

  if (Array.isArray(data)) return data as CategoryOption[];

  if (data && typeof data === "object" && "data" in data) {
    const nested = (data as { data?: unknown }).data;
    if (Array.isArray(nested)) return nested as CategoryOption[];
  }

  return [];
}

function normalizeProductList(responseData: unknown) {
  if (Array.isArray(responseData)) {
    return { list: responseData as Product[], totalCount: responseData.length };
  }

  if (!responseData || typeof responseData !== "object") {
    return { list: [], totalCount: 0 };
  }

  const data = (responseData as { data?: unknown; totalCount?: number }).data;

  if (Array.isArray(data)) {
    return {
      list: data as Product[],
      totalCount:
        (responseData as { totalCount?: number }).totalCount ?? data.length,
    };
  }

  if (data && typeof data === "object") {
    const nested = data as { data?: unknown; totalCount?: number };

    if (Array.isArray(nested.data)) {
      return {
        list: nested.data as Product[],
        totalCount: nested.totalCount ?? nested.data.length,
      };
    }
  }

  return { list: [], totalCount: 0 };
}

export function useProductCatalog() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo<ProductFilters>(() => ({
    searchText: searchParams.get("search") || DEFAULT_PRODUCT_FILTERS.searchText,
    categoryId: searchParams.get("category") || DEFAULT_PRODUCT_FILTERS.categoryId,
    minPrice: searchParams.has("minPrice")
      ? Number(searchParams.get("minPrice"))
      : DEFAULT_PRODUCT_FILTERS.minPrice,
    maxPrice: searchParams.has("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : DEFAULT_PRODUCT_FILTERS.maxPrice,
    sortBy: (searchParams.get("sortBy") as ProductSort) || DEFAULT_PRODUCT_FILTERS.sortBy,
  }), [searchParams]);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(PRODUCT_PAGE_SIZE);
  const [totalCount, setTotalCount] = useState(0);

  const requestIdRef = useRef(0);
  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  const runFetch = async (overrides: FetchOverrides = {}) => {
    const nextPage = overrides.page ?? 1;
    const nextPageSize = overrides.pageSize ?? pageSize;
    const append = Boolean(overrides.append);
    const nextFilters = {
      ...filtersRef.current,
      ...overrides,
    };

    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    setError("");

    const requestId = ++requestIdRef.current;

    try {
      const productResponse = await ProductService.getAll({
        page: nextPage,
        pageSize: nextPageSize,
        name: nextFilters.searchText.trim() || undefined,
        categoryId: nextFilters.categoryId || undefined,
        minPrice: nextFilters.minPrice,
        maxPrice: nextFilters.maxPrice,
      });

      if (requestId !== requestIdRef.current) return;

      const { list, totalCount: nextTotalCount } = normalizeProductList(
        productResponse.data,
      );

      setProducts((prev) => (append ? [...prev, ...list] : list));
      setTotalCount(nextTotalCount);
      setPage(nextPage);
    } catch (err) {
      if (requestId === requestIdRef.current) {
        setError(getErrorMessage(err, "Məhsullar yüklənmədi."));
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
        setLoadingMore(false);
      }
    }
  };

  const fetchCatalog = (overrides: FetchOverrides = {}) =>
    runFetch({ ...overrides, page: 1 });

  const loadMore = () => {
    if (loading || loadingMore) return;
    if (products.length >= totalCount) return;
    void runFetch({ page: page + 1, append: true });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryResponse = await CategoryService.getOptions();
        setCategories(normalizeCategories(categoryResponse.data));
      } catch {
        setCategories([]);
      }
    };

    void fetchCategories();
  }, []);

  useEffect(() => {
    void runFetch({ page: 1 });
  }, [
    filters.searchText,
    filters.categoryId,
    filters.minPrice,
    filters.maxPrice,
  ]);

  const visibleProducts = sortProducts(products, filters.sortBy);

  const updateFilters = (patch: Partial<ProductFilters>) => {
    const next = { ...filters, ...patch };
    const newParams = new URLSearchParams(searchParams);

    if (next.searchText) newParams.set("search", next.searchText);
    else newParams.delete("search");

    if (next.categoryId) newParams.set("category", next.categoryId);
    else newParams.delete("category");

    if (next.minPrice !== undefined && next.minPrice !== null) {
      newParams.set("minPrice", next.minPrice.toString());
    } else {
      newParams.delete("minPrice");
    }

    if (next.maxPrice !== undefined && next.maxPrice !== null) {
      newParams.set("maxPrice", next.maxPrice.toString());
    } else {
      newParams.delete("maxPrice");
    }

    if (next.sortBy && next.sortBy !== DEFAULT_PRODUCT_FILTERS.sortBy) {
      newParams.set("sortBy", next.sortBy);
    } else {
      newParams.delete("sortBy");
    }

    setSearchParams(newParams, { replace: true });
  };

  const resetFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const hasMore = products.length < totalCount;

  return {
    categories,
    error,
    fetchCatalog,
    filters,
    hasMore,
    loading,
    loadingMore,
    loadMore,
    page,
    pageSize,
    products: visibleProducts,
    rawTotalCount: totalCount,
    resetFilters,
    totalCount,
    updateFilters,
  };
}
