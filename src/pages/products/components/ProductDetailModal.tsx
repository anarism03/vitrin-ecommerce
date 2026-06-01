import { useEffect, useMemo, useState } from "react";
import { Button, Modal } from "antd";
import {
  AppstoreOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  InboxOutlined,
  TagsFilled,
} from "@ant-design/icons";
import type { Product } from "../../../types/product.type";
import {
  formatPrice,
  getCategoryName,
  getProductGalleryImages,
} from "../../../utils/productHelpers";

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

  const galleryImages = useMemo(
    () => (product ? getProductGalleryImages(product) : []),
    [product],
  );
  const visibleImages = useMemo(
    () => galleryImages.filter((image) => !failedUrls.includes(image.url)),
    [failedUrls, galleryImages],
  );

  useEffect(() => {
    setFailedUrls([]);
    setSelectedImage(galleryImages[0]?.url || "");
  }, [galleryImages, open]);

  useEffect(() => {
    if (!visibleImages.length) {
      if (selectedImage) setSelectedImage("");
      return;
    }

    if (!visibleImages.some((image) => image.url === selectedImage)) {
      setSelectedImage(visibleImages[0].url);
    }
  }, [selectedImage, visibleImages]);

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
        <p className="m-0 text-base font-bold text-slate-950">
          Məhsul detalları
        </p>
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
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-3"
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
                          ? "border-emerald-400 ring-2 ring-emerald-100"
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
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700"
            >
              <AppstoreOutlined />
              {getCategoryName(product)}
            </span>
          </div>

          <h2 className="m-0 break-words text-3xl font-bold leading-tight text-slate-950">
            {product.name}
          </h2>

          <div className="mt-4 inline-flex items-baseline rounded-2xl bg-emerald-500 px-5 py-3 shadow-sm">
            <span className="text-3xl font-bold text-white">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
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

          <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="m-0 flex items-center gap-2 text-sm font-bold text-emerald-700">
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
