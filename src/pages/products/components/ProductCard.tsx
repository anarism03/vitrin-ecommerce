import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Tag } from "antd";
import {
  EyeOutlined,
  InboxOutlined,
  PictureOutlined,
  SearchOutlined,
  TagFilled,
} from "@ant-design/icons";
import type { Product } from "../../../types/product.type";
import {
  formatPrice,
  getCategoryName,
  getProductImage,
} from "../../../utils/productHelpers";
import {
  hashAccentKey,
  PRODUCT_ACCENT_PALETTE,
} from "../productCatalog.constants";

type Props = {
  product: Product;
  onView?: (product: Product) => void;
};

export default function ProductCard({ product, onView }: Props) {
  const navigate = useNavigate();
  const image = getProductImage(product);
  const [isImageVisible, setIsImageVisible] = useState(Boolean(image));
  const inStock = product.stock > 0;
  const hasImage = Boolean(image) && isImageVisible;

  const accentKey = product.categoryId || product.category?.id || product.id;
  const accent =
    PRODUCT_ACCENT_PALETTE[
      hashAccentKey(String(accentKey)) % PRODUCT_ACCENT_PALETTE.length
    ];

  useEffect(() => {
    setIsImageVisible(Boolean(image));
  }, [image]);

  const handleView = () => {
    if (onView) {
      onView(product);
    } else {
      navigate(`/products/${product.id}`);
    }
  };

  return (
    <article
      className={`product-card group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 ${accent.border} bg-white shadow-[0_2px_8px_-2px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_-26px_rgba(15,23,42,0.35)] ${accent.ring}`}
    >
      <span
        aria-hidden
        className={`absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r ${accent.badge}`}
      />

      <div
        className={`relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br ${accent.imageBg}`}
      >
        {hasImage ? (
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain p-3 transition duration-500 group-hover:scale-[1.04]"
            onError={() => setIsImageVisible(false)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-400">
            <span
              className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${accent.badge} text-white shadow-lg`}
            >
              <PictureOutlined className="text-2xl" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Şəkil yoxdur
            </span>
          </div>
        )}

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold shadow-sm backdrop-blur ${
              inStock
                ? "bg-emerald-500/95 text-white"
                : "bg-rose-500/95 text-white"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            {inStock ? "Stokda" : "Bitib"}
          </span>
        </div>

        <div
          className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold text-slate-900 shadow-sm ring-1 ring-slate-200 backdrop-blur"
        >
          {formatPrice(product.price)}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start gap-2">
          <h3 className="m-0 line-clamp-2 min-h-[44px] flex-1 text-[15px] font-bold leading-snug text-slate-950">
            {product.name}
          </h3>
        </div>

        <p className="m-0 line-clamp-2 min-h-[40px] text-sm leading-5 text-slate-500">
          {product.description?.trim() || "Məhsul haqqında təsvir yoxdur."}
        </p>

        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <Tag
            className={`!m-0 !max-w-full !truncate !rounded-full !px-2.5 !py-0.5 !font-semibold ${accent.chip}`}
            icon={<InboxOutlined />}
          >
            {getCategoryName(product)}
          </Tag>
          <Tag className="!m-0 !rounded-full !border-slate-200 !bg-slate-50 !font-semibold !text-slate-600">
            <TagFilled className="mr-1 text-slate-400" />
            {product.stock} ədəd
          </Tag>
        </div>

        <div className="mt-auto grid grid-cols-[1fr_44px] gap-2 pt-1">
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleView}
            className={`!h-10 !rounded-xl !border-0 !bg-gradient-to-r ${accent.price} !font-semibold !shadow-[0_10px_24px_-12px_rgba(15,23,42,0.4)]`}
          >
            Ətraflı bax
          </Button>
          <Button
            aria-label="Məhsula bax"
            icon={<EyeOutlined />}
            onClick={handleView}
            className="!h-10 !rounded-xl !border-slate-200 hover:!border-slate-400"
          />
        </div>
      </div>
    </article>
  );
}

