import { useRef, useState } from "react";
import type { Product } from "../../../types/product.type";

export function useProductDetailModal() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const scrollTopRef = useRef(0);

  const openProduct = (product: Product) => {
    scrollTopRef.current = window.scrollY;
    setSelectedProduct(product);

    const restoreScroll = () => {
      window.scrollTo({ top: scrollTopRef.current, left: 0 });
    };

    requestAnimationFrame(restoreScroll);
    window.setTimeout(restoreScroll, 0);
    window.setTimeout(restoreScroll, 160);
  };

  const closeProduct = () => {
    const restoreScroll = () => {
      window.scrollTo({ top: scrollTopRef.current, left: 0 });
    };

    setSelectedProduct(null);
    requestAnimationFrame(restoreScroll);
    window.setTimeout(restoreScroll, 120);
  };

  const handleModalOpenChange = (isOpen: boolean) => {
    if (!isOpen) return;

    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollTopRef.current, left: 0 });
    });
  };

  return {
    closeProduct,
    handleModalOpenChange,
    isProductModalOpen: Boolean(selectedProduct),
    openProduct,
    selectedProduct,
  };
}
