import { Alert, Button, Skeleton } from "antd";
import {
  ArrowRightOutlined,
  CheckCircleFilled,
  CrownFilled,
  FireOutlined,
  GiftFilled,
  HeartFilled,
  ShoppingOutlined,
  StarFilled,
  ThunderboltFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ProductCard from "../products/components/ProductCard";
import ProductDetailModal from "../products/components/ProductDetailModal";
import { useProductDetailModal } from "../products/hooks/useProductDetailModal";
import {
  getHomeCategoryTile,
  HOME_CATEGORY_ACCENTS,
  HOME_CATEGORY_TILES,
  HOME_FEATURES,
  HOME_HERO_CHIPS,
  HOME_HERO_IMAGE,
  HOME_HERO_STATS,
  HOME_SHOWCASE_IMAGES,
  HOME_SHOWCASE_LABELS,
  HOME_STATS,
} from "./home.constants";
import { useHomeCatalog } from "./hooks/useHomeCatalog";

export default function Home() {
  const navigate = useNavigate();
  const { categories, error, fetchHomeCatalog, loading, products } =
    useHomeCatalog();
  const {
    closeProduct,
    handleModalOpenChange,
    isProductModalOpen,
    openProduct,
    selectedProduct,
  } = useProductDetailModal();

  const categoryTiles = HOME_CATEGORY_TILES.map((tile, index) =>
    getHomeCategoryTile(categories[index]?.name || tile.title, index),
  );

  const recentProducts = products.slice(0, 3);

  return (
    <div className="space-y-12">
      {/* HERO */}
      <section className="relative min-h-[580px] overflow-hidden rounded-3xl bg-slate-950 text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.7)]">
        <img
          src={HOME_HERO_IMAGE}
          alt="Müştəri alış-veriş vitrini"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-teal-950/80 to-sky-900/40" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-teal-500/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-10 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-1/3 top-1/3 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-3xl"
        />

        <div className="relative flex min-h-[580px] flex-col justify-between gap-y-10 px-6 py-10 sm:gap-y-14 sm:px-10 sm:py-12 lg:px-14">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-teal-200 backdrop-blur">
              <ThunderboltFilled />
              Yeni vitrin
            </span>
            <span className="hidden items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur sm:inline-flex">
              <CheckCircleFilled className="text-emerald-300" />
              Stokda olan seçimlər
            </span>
          </div>

          <div className="max-w-3xl">
            <div className="mb-7 flex flex-wrap items-center gap-2.5">
              {HOME_HERO_CHIPS.map((chip) => (
                <span
                  key={chip.label}
                  className={`inline-flex items-center gap-1 rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider backdrop-blur ${chip.className}`}
                >
                  <StarFilled className="text-[9px]" />
                  {chip.label}
                </span>
              ))}
            </div>
            <h1 className="m-0 text-4xl font-black leading-[1.15] tracking-tight sm:text-6xl sm:leading-[1.1] lg:text-7xl">
              Seçilmiş məhsullar,
              <br className="hidden sm:inline" />{" "}
              <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-sky-300 bg-clip-text text-transparent">
                rahat alış-veriş
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-slate-100/90 sm:text-lg sm:leading-8">
              Göz oxşayan vitrin, zövqlü seçimlər və hər cihazda rahat məhsul
              baxışı. Yeni kolleksiyalar həftəlik yenilənir.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                type="primary"
                size="large"
                icon={<ShoppingOutlined />}
                onClick={() => navigate("/products")}
                className="!h-12 !rounded-full !border-0 !bg-gradient-to-r !from-teal-500 !to-emerald-500 !px-6 !font-semibold !text-white !shadow-[0_16px_36px_-18px_rgba(13,148,136,0.9)] hover:!from-teal-600 hover:!to-emerald-600"
              >
                Məhsullara bax
              </Button>
              <Button
                size="large"
                icon={<ArrowRightOutlined />}
                onClick={() => navigate("/products")}
                className="!h-12 !rounded-full !border-white/30 !bg-white/10 !px-6 !font-semibold !text-white !backdrop-blur hover:!border-white/60 hover:!bg-white/20"
              >
                Kolleksiyanı aç
              </Button>
            </div>
          </div>

          <div className="mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {HOME_HERO_STATS.map((item) => (
              <div
                key={item.value}
                className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur transition hover:border-teal-300/50 hover:bg-white/15"
              >
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400/30 to-sky-400/30 text-base text-teal-200">
                  {item.icon}
                </div>
                <p className="m-0 text-lg font-extrabold text-white">
                  {item.value}
                </p>
                <p className="m-0 mt-0.5 text-xs font-medium text-slate-200/80">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HOME_STATS.map((stat) => (
          <div
            key={stat.label}
            className={`group relative overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-br ${stat.bg} p-5 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.45)] ring-1 ${stat.ring} transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(15,23,42,0.45)]`}
          >
            <div
              aria-hidden
              className={`absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br ${stat.gradient} opacity-20 blur-2xl`}
            />
            <div
              className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} text-base text-white shadow-md`}
            >
              {stat.icon}
            </div>
            <p className="m-0 text-3xl font-black tracking-tight text-slate-950">
              {stat.value}
            </p>
            <p className="m-0 mt-1 text-sm font-medium text-slate-600">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      {/* SHOWCASE */}
      <section className="grid gap-4 md:grid-cols-3">
        {HOME_SHOWCASE_IMAGES.map((image, index) => {
          const label = HOME_SHOWCASE_LABELS[index];
          return (
            <button
              key={image}
              type="button"
              onClick={() => navigate("/products")}
              className="group relative min-h-[260px] overflow-hidden rounded-2xl border border-slate-200/70 bg-slate-900 p-0 text-left shadow-[0_14px_40px_-26px_rgba(15,23,42,0.5)] transition hover:-translate-y-1 hover:shadow-[0_24px_55px_-25px_rgba(15,23,42,0.6)]"
            >
              <img
                src={image}
                alt={`Vitrin ${index + 1}`}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              <span
                className={`absolute right-4 top-4 rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider shadow-md ${label.tagClass}`}
              >
                {label.tag}
              </span>

              <div className="absolute bottom-5 left-5 right-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur transition group-hover:bg-white/25">
                  {label.icon}
                </div>
                <p className="m-0 text-lg font-extrabold text-white">
                  {label.title}
                </p>
                <p className="m-0 mt-1 text-sm text-slate-200/90">
                  {label.helper}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-teal-300 opacity-0 transition group-hover:opacity-100">
                  Bax <ArrowRightOutlined />
                </span>
              </div>
            </button>
          );
        })}
      </section>

      {error ? (
        <Alert
          type="error"
          showIcon
          message={error}
          action={
            <Button size="small" onClick={fetchHomeCatalog}>
              Təkrar yoxla
            </Button>
          }
        />
      ) : null}

      {/* CATEGORIES */}
      <section>
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-teal-500/10 to-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-teal-700 ring-1 ring-teal-100">
              <CrownFilled />
              Kateqoriyalar
            </span>
            <h2 className="m-0 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
              Vitrin bölmələri
            </h2>
          </div>
          <Button
            type="link"
            onClick={() => navigate("/products")}
            className="!font-semibold !text-teal-700"
          >
            Hamısına bax →
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categoryTiles.map((tile, idx) => {
            const accent =
              HOME_CATEGORY_ACCENTS[idx % HOME_CATEGORY_ACCENTS.length];

            return (
              <button
                key={tile.title}
                type="button"
                onClick={() => navigate("/products")}
                className="group relative min-h-[240px] overflow-hidden rounded-2xl border border-slate-200/70 bg-slate-900 p-0 text-left shadow-[0_12px_34px_-24px_rgba(15,23,42,0.45)] transition hover:-translate-y-1 hover:shadow-[0_22px_50px_-22px_rgba(15,23,42,0.55)]"
              >
                <img
                  src={tile.image}
                  alt={tile.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${accent} mix-blend-multiply opacity-0 transition duration-500 group-hover:opacity-100`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition group-hover:bg-white/20">
                  <ArrowRightOutlined />
                </span>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="m-0 text-lg font-extrabold text-white">
                    {tile.title}
                  </h3>
                  <p className="m-0 mt-1 text-sm text-slate-200/90">
                    {tile.helper}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* WHY US — FEATURES */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white via-teal-50/30 to-sky-50/30 p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.3)] sm:p-9">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-fuchsia-200/30 blur-3xl"
        />

        <div className="relative mb-7 max-w-2xl">
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-rose-600 ring-1 ring-rose-100">
            <HeartFilled />
            Niyə Vitrin?
          </span>
          <h2 className="m-0 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
            Premium səviyyə müştəri təcrübəsi
          </h2>
          <p className="m-0 mt-2 text-sm text-slate-600">
            Hər təfərrüat müştəri üçün düşünülüb — sürətli, təhlükəsiz və zövqlü.
          </p>
        </div>

        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:bg-white hover:shadow-lg"
            >
              <div
                className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-lg text-white shadow-md transition group-hover:scale-110`}
              >
                {feature.icon}
              </div>
              <p className="m-0 text-[15px] font-bold text-slate-950">
                {feature.title}
              </p>
              <p className="m-0 mt-1.5 text-sm leading-6 text-slate-600">
                {feature.helper}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* RECENT PRODUCTS */}
      <section>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-rose-500/10 to-amber-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-rose-600 ring-1 ring-rose-100">
              <FireOutlined />
              Yeni məhsullar
            </span>
            <h2 className="m-0 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
              Son əlavə olunanlar
            </h2>
            <p className="m-0 mt-2 max-w-xl text-sm text-slate-500">
              Vitrinə ən son qoşulan üç seçim — sürətli baxış üçün ideal.
            </p>
          </div>
          <Button
            onClick={() => navigate("/products")}
            className="!h-11 !rounded-full !border-slate-300 !px-5 !font-semibold !text-slate-900 hover:!border-slate-900 hover:!text-slate-900"
          >
            Bütün məhsullar
          </Button>
        </div>

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
              >
                <Skeleton.Image active className="!h-44 !w-full !rounded-xl" />
                <Skeleton active paragraph={{ rows: 2 }} className="!mt-4" />
              </div>
            ))}
          </div>
        ) : recentProducts.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onView={openProduct}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-500">
            Hələ ki məhsul yoxdur.
          </div>
        )}
      </section>

      {/* CTA STRIP */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-teal-950 to-slate-950 px-6 py-10 text-white shadow-[0_30px_70px_-30px_rgba(15,23,42,0.7)] sm:px-12 sm:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full bg-teal-500/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl"
        />

        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-teal-200 backdrop-blur">
              <GiftFilled />
              Xüsusi təklif
            </span>
            <h3 className="m-0 text-2xl font-black tracking-tight sm:text-4xl">
              Vitrinin yeniliklərini{" "}
              <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-sky-300 bg-clip-text text-transparent">
                ilk siz öyrənin
              </span>
            </h3>
            <p className="m-0 mt-3 text-sm leading-6 text-slate-200/85 sm:text-base">
              Yeni gələn məhsullar, kampaniyalar və endirimlər haqqında ilk
              məlumat almaq üçün vitrini izləyin.
            </p>
          </div>

          <Button
            type="primary"
            size="large"
            icon={<ShoppingOutlined />}
            onClick={() => navigate("/products")}
            className="!h-12 !rounded-full !border-0 !bg-gradient-to-r !from-teal-500 !to-emerald-500 !px-7 !font-semibold !text-white !shadow-[0_16px_36px_-18px_rgba(13,148,136,0.9)] hover:!from-teal-600 hover:!to-emerald-600"
          >
            İndi alış-verişə başla
          </Button>
        </div>
      </section>

      <ProductDetailModal
        product={selectedProduct}
        open={isProductModalOpen}
        onClose={closeProduct}
        onOpenChange={handleModalOpenChange}
      />
    </div>
  );
}
