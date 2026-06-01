import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Skeleton } from "antd";
import {
  AppstoreOutlined,
  ArrowLeftOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  InboxOutlined,
  TagsFilled,
} from "@ant-design/icons";
import {
  formatPrice,
  getCategoryName,
  getProductGalleryImages,
} from "../../utils/productHelpers";

import { useProductDetail } from "./hooks/useProductDetail";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, loading, error, refetch } = useProductDetail(id);
  const [selectedImage, setSelectedImage] = useState("");
  const [failedUrls, setFailedUrls] = useState<string[]>([]);

  const galleryImages = useMemo(
    () => (product ? getProductGalleryImages(product) : []),
    [product],
  );
  const visibleImages = useMemo(
    () => galleryImages.filter((img) => !failedUrls.includes(img.url)),
    [failedUrls, galleryImages],
  );

  useEffect(() => {
    setFailedUrls([]);
    setSelectedImage(galleryImages[0]?.url || "");
  }, [galleryImages]);

  useEffect(() => {
    if (!visibleImages.length) {
      if (selectedImage) setSelectedImage("");
      return;
    }
    if (!visibleImages.some((img) => img.url === selectedImage)) {
      setSelectedImage(visibleImages[0].url);
    }
  }, [selectedImage, visibleImages]);

  const currentImage =
    visibleImages.find((img) => img.url === selectedImage)?.url ||
    visibleImages[0]?.url ||
    "";
  const hasImages = Boolean(currentImage);
  const inStock = product ? product.stock > 0 : false;

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl space-y-8 py-10">
        <div className="flex items-center gap-3">
          <Skeleton.Button active size="large" shape="round" />
        </div>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <Skeleton.Image active className="!h-[420px] !w-full !rounded-2xl" />
          <div className="space-y-4">
            <Skeleton active paragraph={{ rows: 6 }} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <Alert
          type="error"
          showIcon
          message="Məhsul yüklənmədi"
          description={error}
          action={
            <div className="flex gap-2 mt-2">
              <Button size="small" onClick={refetch}>
                Təkrar yoxla
              </Button>
              <Button size="small" onClick={() => navigate("/products")}>
                Geri qayıt
              </Button>
            </div>
          }
        />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-8">
      <div className="flex items-center gap-3">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/products")}
          className="!h-10 !rounded-full !border-slate-200 !px-4 !font-semibold !text-slate-600 hover:!border-slate-400 hover:!text-slate-900"
        >
          Məhsullara qayıt
        </Button>

        <span className="hidden items-center gap-1.5 text-sm text-slate-400 sm:flex">
          <span>/</span>
          <span className="font-semibold text-slate-700 line-clamp-1 max-w-xs">
            {product.name}
          </span>
        </span>
      </div>

      <div
        className={
          hasImages
            ? "grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]"
            : "mx-auto max-w-3xl"
        }
      >
        {hasImages && (
          <div className="space-y-3">
            <div
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <img
                src={currentImage}
                alt={product.name}
                className="h-[min(56vh,500px)] min-h-[280px] w-full rounded-xl object-contain"
                onError={() =>
                  setFailedUrls((urls) =>
                    urls.includes(currentImage) ? urls : [...urls, currentImage],
                  )
                }
              />
            </div>

            {visibleImages.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {visibleImages.slice(0, 5).map((img, index) => {
                  const isSelected = img.url === currentImage;
                  return (
                    <button
                      key={img.id || `${img.url}-${index}`}
                      type="button"
                      aria-label={`${product.name} şəkli ${index + 1}`}
                      className={`aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border bg-slate-50 p-0 transition hover:-translate-y-0.5 ${
                        isSelected
                          ? "border-emerald-400 ring-2 ring-emerald-100"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                      onClick={() => setSelectedImage(img.url)}
                    >
                      <img
                        src={img.url}
                        alt=""
                        className="h-full w-full object-cover"
                        onError={() =>
                          setFailedUrls((urls) =>
                            urls.includes(img.url) ? urls : [...urls, img.url],
                          )
                        }
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <div className="min-w-0 space-y-5">
          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${
                inStock ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
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

          <h1 className="m-0 break-words text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
            {product.name}
          </h1>

          <div className="inline-flex items-baseline rounded-2xl bg-emerald-500 px-6 py-4 shadow-sm">
            <span className="text-3xl font-bold text-white">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <InboxOutlined />
                Stok
              </div>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-base font-bold text-slate-950">
                  {product.stock}
                </span>
                <span className="text-xs font-semibold text-slate-500">ədəd</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="m-0 flex items-center gap-2 text-sm font-bold text-emerald-700">
              <TagsFilled />
              Təsvir
            </h3>
            <p className="m-0 mt-3 whitespace-pre-line leading-7 text-slate-700">
              {product.description?.trim() || "Məhsul haqqında təsvir yoxdur."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <Button
              size="large"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate("/products")}
              className="!h-12 !w-full sm:!w-auto !rounded-xl !border-slate-200 !px-8 !font-semibold !text-slate-700 hover:!border-slate-400"
            >
              Geri qayıt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
