import { useCallback, useEffect, useState } from "react";
import CategoryService from "../../../services/CategoryService";
import ProductService from "../../../services/ProductService";
import type { CategoryOption } from "../../../types/category.type";
import type { Product } from "../../../types/product.type";
import { getErrorMessage, unwrap } from "../../../utils/getErrorMessage";

function normalizeCategories(responseData: unknown): CategoryOption[] {
  const data = unwrap<unknown>(responseData);

  if (Array.isArray(data)) return data as CategoryOption[];

  if (data && typeof data === "object" && "data" in data) {
    const nested = (data as { data?: unknown }).data;
    if (Array.isArray(nested)) return nested as CategoryOption[];
  }

  return [];
}

function normalizeProducts(responseData: unknown): Product[] {
  const payload = unwrap(responseData);

  if (Array.isArray(payload)) return payload as Product[];

  if (payload && typeof payload === "object" && "data" in payload) {
    const list = (payload as { data?: unknown }).data;
    if (Array.isArray(list)) return list as Product[];
  }

  return [];
}

export function useHomeCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchHomeCatalog = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [productResponse, categoryResponse] = await Promise.all([
        ProductService.getAll({ page: 1, pageSize: 3 }),
        CategoryService.getOptions(),
      ]);

      setProducts(normalizeProducts(productResponse.data));
      setCategories(normalizeCategories(categoryResponse.data));
    } catch (err) {
      setError(getErrorMessage(err, "Ana səhifə məlumatları yüklənmədi."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchHomeCatalog();
  }, [fetchHomeCatalog]);

  return {
    categories,
    error,
    fetchHomeCatalog,
    loading,
    products,
  };
}
