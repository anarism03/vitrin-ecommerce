import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import {
  AppstoreOutlined,
  BarcodeOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  InboxOutlined,
  PictureOutlined,
  ShoppingCartOutlined,
  TagsFilled,
  ThunderboltFilled,
} from "@ant-design/icons";
import type { Product } from "../../../types/product.type";
import {
  formatPrice,
  getCategoryName,
  getProductGalleryImages,
} from "../../../utils/productHelpers";
import {
  hashAccentKey,
  PRODUCT_DETAIL_ACCENT_PALETTE,
} from "../productCatalog.constants";

type Props = {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onOpenChange?: (open: boolean) => void;
};

export default function ProductDetailModal({
  product,
  open,
  onClose,
  onOpenChange,
}: Props) {
  const [selectedImage, setSelectedImage] = useState("");
  const [failedUrls, setFailedUrls] = useState<string[]>([]);

  const galleryImages = product ? getProductGalleryImages(product) : [];
  const visibleImages = galleryImages.filter(
    (image) => !failedUrls.includes(image.url),
  );

  useEffect(() => {
    setFailedUrls([]);
    setSelectedImage(galleryImages[0]?.url || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, open]);

  useEffect(() => {
    if (!visibleImages.length) {
      if (selectedImage) setSelectedImage("");
      return;
    }

    if (!visibleImages.some((image) => image.url === selectedImage)) {
      setSelectedImage(visibleImages[0].url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, failedUrls, selectedImage]);

  const accentKey = product
    ? product.categoryId || product.category?.id || product.id
    : "";
  const accent = product
    ? PRODUCT_DETAIL_ACCENT_PALETTE[
        hashAccentKey(String(accentKey)) % PRODUCT_DETAIL_ACCENT_PALETTE.length
      ]
    : PRODUCT_DETAIL_ACCENT_PALETTE[0];

  if (!product) {
    return null;
  }

  const currentImage =
    visibleImages.find((image) => image.url === selectedImage)?.url ||
    visibleImages[0]?.url ||
    "";
  const hasImages = Boolean(currentImage);
  const inStock = product.stock > 0;

  return (
    <Modal
      title={
        <div className="flex items-center gap-3">
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${accent.badge} text-white shadow-md`}
          >
            <ThunderboltFilled />
          </span>
          <div>
            <p className="m-0 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Məhsul detalları
            </p>
            <p className="m-0 text-base font-bold text-slate-950">
              Premium baxış
            </p>
          </div>
        </div>
      }
      width="min(1080px, calc(100vw - 32px))"
      open={open}
      onCancel={onClose}
      afterOpenChange={onOpenChange}
      focusTriggerAfterClose={false}
      centered
      className="product-detail-modal"
      wrapClassName="product-detail-modal-wrap"
      footer={[
        <Button
          key="close"
          onClick={onClose}
          className="!h-11 !rounded-xl !border-slate-200 !px-5 !font-semibold hover:!border-slate-400"
        >
          Bağla
        </Button>,
        <Button
          key="primary"
          type="primary"
          icon={<ShoppingCartOutlined />}
          className={`!h-11 !rounded-xl !border-0 !bg-gradient-to-r ${accent.badge} !px-6 !font-semibold !shadow-[0_12px_28px_-14px_rgba(15,23,42,0.45)]`}
          onClick={onClose}
        >
          Anladım
        </Button>,
      ]}
      destroyOnClose
    >
      <div
        className={
          hasImages
            ? "grid gap-6 pt-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]"
            : "mx-auto max-w-3xl pt-1"
        }
      >
        {hasImages ? (
          <div className="min-w-0 space-y-3">
            <div
              className={`relative overflow-hidden rounded-2xl border border-slate-200/70 bg-gradient-to-br ${accent.soft} p-3 shadow-inner`}
            >
              <img
                src={currentImage}
                alt={product.name}
                className="h-[min(54vh,460px)] min-h-[260px] w-full rounded-xl object-contain"
                onError={() =>
                  setFailedUrls((urls) =>
                    urls.includes(currentImage) ? urls : [...urls, currentImage],
                  )
                }
              />
              <div className="absolute left-5 top-5 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-700 shadow-sm backdrop-blur">
                <PictureOutlined className={accent.text} />
                {visibleImages.length} şəkil
              </div>
            </div>

            {visibleImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                {visibleImages.slice(0, 5).map((image, index) => {
                  const isSelected = image.url === currentImage;

                  return (
                    <button
                      key={image.id || `${image.url}-${index}`}
                      type="button"
                      aria-label={`${product.name} şəkli ${index + 1}`}
                      className={`aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border bg-slate-50 p-0 transition hover:-translate-y-0.5 ${
                        isSelected
                          ? `border-transparent ring-2 ${accent.ring} shadow-md`
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                      onClick={() => setSelectedImage(image.url)}
                    >
                      <img
                        src={image.url}
                        alt=""
                        className="h-full w-full object-cover"
                        onError={() =>
                          setFailedUrls((urls) =>
                            urls.includes(image.url)
                              ? urls
                              : [...urls, image.url],
                          )
                        }
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : null}

        <div className="min-w-0">
          <div className="mb-4 flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${
                inStock
                  ? "bg-emerald-500 text-white"
                  : "bg-rose-500 text-white"
              }`}
            >
              {inStock ? <CheckCircleFilled /> : <CloseCircleFilled />}
              {inStock ? "Stokda" : "Bitib"}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${accent.chip}`}
            >
              <AppstoreOutlined />
              {getCategoryName(product)}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${
                product.isActive
                  ? "border-slate-200 bg-slate-50 text-slate-700"
                  : "border-slate-200 bg-slate-50 text-slate-400"
              }`}
            >
              <ThunderboltFilled />
              {product.isActive ? "Aktiv" : "Passiv"}
            </span>
          </div>

          <h2 className="m-0 break-words text-3xl font-black leading-tight tracking-tight text-slate-950">
            {product.name}
          </h2>

          <div
            className={`mt-4 inline-flex items-baseline gap-2 rounded-2xl bg-gradient-to-r ${accent.badge} px-5 py-3 shadow-[0_14px_30px_-16px_rgba(15,23,42,0.45)]`}
          >
            <span className="text-3xl font-black text-white">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
              vitrin qiyməti
            </span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                <BarcodeOutlined />
                SKU
              </div>
              <div className="mt-2 break-words text-base font-bold text-slate-950">
                {product.sku || "-"}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                <InboxOutlined />
                Stok
              </div>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-base font-bold text-slate-950">
                  {product.stock}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  ədəd
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200/70 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm">
            <h3
              className={`m-0 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] ${accent.text}`}
            >
              <TagsFilled />
              Təsvir
            </h3>
            <p className="m-0 mt-3 whitespace-pre-line leading-7 text-slate-700">
              {product.description?.trim() ||
                "Məhsul haqqında təsvir yoxdur."}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
