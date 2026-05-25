import { Alert, Button, Empty, Skeleton } from "antd";
import {
  ArrowRightOutlined,
  CheckCircleFilled,
  DownOutlined,
  StarFilled,
  ThunderboltFilled,
} from "@ant-design/icons";
import ProductCard from "./components/ProductCard";
import ProductToolbar from "./components/ProductToolbar";
import { useProductCatalog } from "./hooks/useProductCatalog";
import {
  PRODUCT_HERO_CHIPS,
  PRODUCT_HERO_HIGHLIGHTS,
} from "./productCatalog.constants";

export default function Products() {
  const {
    categories,
    error,
    fetchCatalog,
    filters,
    hasMore,
    loading,
    loadingMore,
    loadMore,
    pageSize,
    products,
    resetFilters,
    totalCount,
    updateFilters,
  } = useProductCatalog();
  const shownCount = products.length;

  return (
    <div className="space-y-6">
      <section className="py-10 sm:py-12">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
            <ThunderboltFilled />
            Public vitrin
          </span>
          <span className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 sm:inline-flex">
            <CheckCircleFilled className="text-emerald-500" />
            Stokda olan seçimlər
          </span>
        </div>

        <div className="max-w-3xl">
          <div className="mb-6 flex flex-wrap items-center gap-2.5">
            {PRODUCT_HERO_CHIPS.map((chip) => (
              <span
                key={chip.label}
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${chip.className}`}
              >
                <StarFilled className="text-[9px]" />
                {chip.label}
              </span>
            ))}
          </div>

          <h1 className="m-0 text-3xl font-black leading-[1.15] tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.1] lg:text-6xl">
            Bütün məhsullar
            <br className="hidden sm:inline" />{" "}
            <span className="bg-gradient-to-r from-teal-500 via-emerald-500 to-sky-500 bg-clip-text text-transparent">
              bir vitrində
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Yeni gələn seçimləri, stokda olan təklifləri və kateqoriyaları
            rahat bir vitrində kəşf edin — istədiyinizi axtarın, filtrlə
            daraldın.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            {PRODUCT_HERO_HIGHLIGHTS.map((item, idx) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-1.5"
              >
                <ArrowRightOutlined className={item.color} />
                {item.label}
                {idx < PRODUCT_HERO_HIGHLIGHTS.length - 1 && (
                  <span className="ml-1 text-slate-300">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_10px_40px_-30px_rgba(15,23,42,0.3)]">
        <ProductToolbar
          categories={categories}
          filters={filters}
          loading={loading}
          onChange={updateFilters}
          onReset={resetFilters}
        />

        {error && (
          <div className="px-4 pt-4 sm:px-5">
            <Alert
              type="error"
              showIcon
              message={error}
              action={
                <Button size="small" onClick={() => fetchCatalog()}>
                  Təkrar yoxla
                </Button>
              }
            />
          </div>
        )}

        <div className="p-4 sm:p-6">
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {Array.from({ length: pageSize }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >
                  <Skeleton.Image active className="!h-40 !w-full !rounded-xl" />
                  <Skeleton active paragraph={{ rows: 2 }} className="!mt-4" />
                </div>
              ))}
            </div>
          ) : products.length ? (
            <>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>

              <div className="mt-8 flex flex-col items-center gap-3">
                <p className="m-0 text-sm text-slate-500">
                  <span className="font-semibold text-slate-900">
                    {shownCount}
                  </span>{" "}
                  / {totalCount} məhsul göstərilir
                </p>
                {hasMore ? (
                  <Button
                    size="large"
                    icon={<DownOutlined />}
                    onClick={loadMore}
                    loading={loadingMore}
                    className="!h-12 !rounded-full !border-0 !bg-gradient-to-r !from-teal-600 !to-emerald-600 !px-7 !font-semibold !text-white !shadow-[0_14px_30px_-18px_rgba(13,148,136,0.7)] hover:!from-teal-700 hover:!to-emerald-700"
                  >
                    Daha çox yüklə
                  </Button>
                ) : (
                  <span className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Hamısı yükləndi
                  </span>
                )}
              </div>
            </>
          ) : (
            <div className="flex min-h-[280px] items-center justify-center">
              <Empty description="Məhsul tapılmadı" />
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
