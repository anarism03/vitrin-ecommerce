import { Alert, Button, Empty, Skeleton } from "antd";
import {
  ArrowRightOutlined,
  CheckCircleFilled,
  DownOutlined,
  StarFilled,
  ThunderboltFilled,
} from "@ant-design/icons";
import ProductCard from "./components/ProductCard";
import ProductDetailModal from "./components/ProductDetailModal";
import ProductToolbar from "./components/ProductToolbar";
import { useProductCatalog } from "./hooks/useProductCatalog";
import { useProductDetailModal } from "./hooks/useProductDetailModal";
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
  const {
    closeProduct,
    handleModalOpenChange,
    isProductModalOpen,
    openProduct,
    selectedProduct,
  } = useProductDetailModal();

  const shownCount = products.length;

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.7)]">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-teal-950/90 to-sky-900/40" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full bg-teal-500/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-sky-500/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-1/4 top-1/2 h-48 w-48 rounded-full bg-fuchsia-500/15 blur-3xl"
        />

        <div className="relative flex flex-col gap-10 px-6 py-10 sm:gap-12 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-teal-200 backdrop-blur">
              <ThunderboltFilled />
              Public vitrin
            </span>
            <span className="hidden items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur sm:inline-flex">
              <CheckCircleFilled className="text-emerald-300" />
              Stokda olan seçimlər
            </span>
          </div>

          <div className="max-w-3xl">
            <div className="mb-6 flex flex-wrap items-center gap-2.5">
              {PRODUCT_HERO_CHIPS.map((chip) => (
                <span
                  key={chip.label}
                  className={`inline-flex items-center gap-1 rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider backdrop-blur ${chip.className}`}
                >
                  <StarFilled className="text-[9px]" />
                  {chip.label}
                </span>
              ))}
            </div>

            <h1 className="m-0 text-3xl font-black leading-[1.15] tracking-tight sm:text-5xl sm:leading-[1.1] lg:text-6xl">
              Bütün məhsullar
              <br className="hidden sm:inline" />{" "}
              <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-sky-300 bg-clip-text text-transparent">
                bir vitrində
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-100/90 sm:text-lg sm:leading-8">
              Yeni gələn seçimləri, stokda olan təklifləri və kateqoriyaları
              rahat bir vitrində kəşf edin — istədiyinizi axtarın, filtrlə
              daraldın.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2 text-sm text-slate-200/80">
              {PRODUCT_HERO_HIGHLIGHTS.map((item, idx) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1.5"
                >
                  <ArrowRightOutlined className={item.color} />
                  {item.label}
                  {idx < PRODUCT_HERO_HIGHLIGHTS.length - 1 && (
                    <span className="ml-1 text-slate-500">•</span>
                  )}
                </span>
              ))}
            </div>
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
                    onView={openProduct}
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

      <ProductDetailModal
        product={selectedProduct}
        open={isProductModalOpen}
        onClose={closeProduct}
        onOpenChange={handleModalOpenChange}
      />
    </div>
  );
}
