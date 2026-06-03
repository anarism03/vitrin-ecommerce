import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tag } from "antd";
import {
  InboxOutlined,
  PictureOutlined,
  SearchOutlined,
  TagFilled,
} from "@ant-design/icons";
import type { Product } from "../../../types/product.type";
import { formatPrice, getCategoryName, getProductImage } from "../../../utils/productHelpers";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const navigate = useNavigate();
  const image = getProductImage(product);
  const [isImageVisible, setIsImageVisible] = useState(Boolean(image));
  const inStock = product.stock > 0;
  const hasImage = Boolean(image) && isImageVisible;

  useEffect(() => {
    setIsImageVisible(Boolean(image));
  }, [image]);

  return (
    <a
      href={`/products/${product.id}`}
      onClick={(e) => {
        e.preventDefault();
        navigate(`/products/${product.id}`);
      }}
      className="product-card group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-1 bg-emerald-500"
      />

      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50">
        {hasImage ? (
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain p-3"
            onError={() => setIsImageVisible(false)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-400">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white">
              <PictureOutlined className="text-2xl" />
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Şəkil yoxdur
            </span>
          </div>
        )}

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold shadow-sm ${
              inStock
                ? "bg-emerald-500/95 text-white"
                : "bg-rose-500/95 text-white"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            {inStock ? "Stokda" : "Bitib"}
          </span>
        </div>

        <div className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-extrabold text-slate-900 shadow-sm ring-1 ring-slate-200">
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
            className="!m-0 !max-w-full !truncate !rounded-full !border-emerald-100 !bg-emerald-50 !px-2.5 !py-0.5 !font-semibold !text-emerald-700"
            icon={<InboxOutlined />}
          >
            {getCategoryName(product)}
          </Tag>
          <Tag className="!m-0 !rounded-full !border-slate-200 !bg-slate-50 !font-semibold !text-slate-600">
            <TagFilled className="mr-1 text-slate-400" />
            {product.stock} ədəd
          </Tag>
        </div>

        <div className="mt-auto pt-1">
          <span className="flex h-10 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 font-semibold text-emerald-600 transition group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:text-white">
            <SearchOutlined />
            Ətraflı bax
          </span>
        </div>
      </div>
    </a>
  );
}
