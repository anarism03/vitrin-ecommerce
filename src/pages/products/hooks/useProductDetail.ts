import { useCallback, useEffect, useState } from "react";
import type { Product } from "../../../types/product.type";
import ProductService from "../../../services/ProductService";
import { getErrorMessage, unwrap } from "../../../utils/getErrorMessage";

export function useProductDetail(id: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await ProductService.getById(id);
      setProduct(unwrap<Product>(res.data));
    } catch (err) {
      setError(getErrorMessage(err, "Məhsul tapılmadı"));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { product, loading, error, refetch: fetchProduct };
}
