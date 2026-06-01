import { Alert, Button, Empty, Skeleton } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ProductCard from "./components/ProductCard";
import ProductToolbar from "./components/ProductToolbar";
import { useProductCatalog } from "./hooks/useProductCatalog";

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
        <div className="max-w-3xl">
          <h1 className="m-0 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
            Bütün məhsullar
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Məhsullara baxın, kateqoriya seçin və lazım olan məhsulu axtarışla
            daha tez tapın.
          </p>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
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
                    className="!h-12 !rounded-full !border-0 !bg-emerald-500 !px-7 !font-semibold !text-white hover:!bg-emerald-600"
                  >
                    Daha çox yüklə
                  </Button>
                ) : (
                  <span className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold text-slate-500">
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
