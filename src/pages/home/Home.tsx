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
import {
  getHomeCategoryTile,
  HOME_CATEGORY_ACCENTS,
  HOME_CATEGORY_TILES,
  HOME_FEATURES,
  HOME_HERO_CHIPS,
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
  const categoryTiles = HOME_CATEGORY_TILES.map((tile, index) =>
    getHomeCategoryTile(categories[index]?.name || tile.title, index),
  );

  const recentProducts = products.slice(0, 3);

  return (
    <div className="space-y-12">
      {/* HERO */}
      <section className="py-10 sm:py-14">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
            <ThunderboltFilled />
            Yeni vitrin
          </span>

        </div>

        <div className="max-w-3xl">
          <div className="mb-7 flex flex-wrap items-center gap-2.5">
            {HOME_HERO_CHIPS.map((chip) => (
              <span
                key={chip.label}
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${chip.className}`}
              >
                <StarFilled className="text-[9px]" />
                {chip.label}
              </span>
            ))}
          </div>
          <h1 className="m-0 text-4xl font-black leading-[1.15] tracking-tight text-slate-900 sm:text-6xl sm:leading-[1.1] lg:text-7xl">
            Seçilmiş məhsullar,
            <br className="hidden sm:inline" />{" "}
            <span className="text-emerald-500">
              rahat alış-veriş
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Göz oxşayan vitrin, zövqlü seçimlər və hər cihazda rahat məhsul
            baxışı. Yeni kolleksiyalar həftəlik yenilənir.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button
              type="primary"
              size="large"
              icon={<ShoppingOutlined />}
              onClick={() => navigate("/products")}
              className="!h-12 !rounded-full !border-0 !bg-emerald-500 !px-6 !font-semibold !text-white hover:!bg-emerald-600"
            >
              Məhsullara bax
            </Button>
            <Button
              size="large"
              icon={<ArrowRightOutlined />}
              onClick={() => navigate("/products")}
              className="!h-12 !rounded-full !border-slate-300 !bg-transparent !px-6 !font-semibold !text-slate-700 hover:!border-emerald-400 hover:!text-emerald-600"
            >
              Kolleksiyanı aç
            </Button>
          </div>
        </div>

        <div className="mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          {HOME_HERO_STATS.map((item) => (
            <div
              key={item.value}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-teal-300 hover:shadow-md"
            >
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-50 to-sky-50 text-base text-teal-600 border border-teal-100">
                {item.icon}
              </div>
              <p className="m-0 text-lg font-extrabold text-slate-900">
                {item.value}
              </p>
              <p className="m-0 mt-0.5 text-xs font-medium text-slate-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>
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
          {categoryTiles.map((tile, idx) => (
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
                  className="absolute inset-0 bg-emerald-500 mix-blend-multiply opacity-0 transition duration-500 group-hover:opacity-100"
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
      <section className="rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-12 sm:py-14">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-teal-700">
              <GiftFilled />
              Xüsusi təklif
            </span>
            <h3 className="m-0 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Vitrinin yeniliklərini{" "}
              <span className="text-emerald-500">
                ilk siz öyrənin
              </span>
            </h3>
            <p className="m-0 mt-3 text-sm leading-6 text-slate-500 sm:text-base">
              Yeni gələn məhsullar, kampaniyalar və endirimlər haqqında ilk
              məlumat almaq üçün vitrini izləyin.
            </p>
          </div>

          <Button
            type="primary"
            size="large"
            icon={<ShoppingOutlined />}
            onClick={() => navigate("/products")}
            className="!h-12 !rounded-full !border-0 !bg-emerald-500 !px-7 !font-semibold !text-white hover:!bg-emerald-600"
          >
            İndi alış-verişə başla
          </Button>
        </div>
      </section>

    </div>
  );
}
