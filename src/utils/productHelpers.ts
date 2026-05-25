import type { Product, ProductSort } from "../types/product.type";
import { resolveAssetUrl } from "./assetUrl";

export const getProductPrice = (product: Product) => Number(product.price || 0);

const PRICE_FORMATTER = new Intl.NumberFormat("az-AZ", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatPrice = (value: string | number) =>
  `${PRICE_FORMATTER.format(Number(value || 0))} ₼`;


export const getProductGalleryImages = (product: Product) => {
  const productImages = (product.images ?? [])
    .map((image, index) => ({
      id: image.id || `${image.url}-${index}`,
      url: resolveAssetUrl(image.url),
      isMain: image.isMain,
      sortOrder: image.sortOrder ?? index,
    }))
    .filter((image) => Boolean(image.url));

  const mainImage = productImages.find((image) => image.isMain);
  const imageUrl = resolveAssetUrl(product.imageUrl);
  const standaloneImage = imageUrl
    ? {
        id: "product-image-url",
        url: imageUrl,
        isMain: !mainImage,
        sortOrder: -1,
      }
    : null;

  const candidates = [
    ...(mainImage ? [mainImage] : []),
    ...(standaloneImage ? [standaloneImage] : []),
    ...productImages
      .filter((image) => image !== mainImage)
      .sort((a, b) => a.sortOrder - b.sortOrder),
  ];

  const seenUrls = new Set<string>();

  return candidates.filter((image) => {
    if (seenUrls.has(image.url)) return false;
    seenUrls.add(image.url);
    return true;
  });
};

export const getProductImage = (product: Product) =>
  getProductGalleryImages(product)[0]?.url || "";

export const getCategoryName = (product: Product) =>
  product.category?.name || "Kateqoriyasız";

export function sortProducts(products: Product[], sortBy: ProductSort) {
  const list = [...products];

  switch (sortBy) {
    case "nameAsc":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case "nameDesc":
      return list.sort((a, b) => b.name.localeCompare(a.name));
    case "priceAsc":
      return list.sort((a, b) => getProductPrice(a) - getProductPrice(b));
    case "priceDesc":
      return list.sort((a, b) => getProductPrice(b) - getProductPrice(a));
    case "stockDesc":
      return list.sort((a, b) => b.stock - a.stock);
    case "newest":
    default:
      return list.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }
}
