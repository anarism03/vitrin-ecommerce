import { Alert, Button, Skeleton } from "antd";
import { ArrowRightOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import ProductCard from "../products/components/ProductCard";
import { getHomeCategoryTile, HOME_CATEGORY_TILES } from "./home.constants";
import { useHomeCatalog } from "./hooks/useHomeCatalog";

export default function Home() {
  const navigate = useNavigate();
  const { categories, error, fetchHomeCatalog, loading, products } =
    useHomeCatalog();

  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [dragged, setDragged] = useState(false);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    setDragged(false);
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX.current;
    if (Math.abs(walk) > 4) setDragged(true);
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const categoryTiles = HOME_CATEGORY_TILES.map((tile, index) =>
    getHomeCategoryTile(
      categories[index]?.name || tile.title,
      index,
      categories[index]?.id,
    ),
  );
  const recentProducts = products.slice(0, 3);

  return (
    <div className="space-y-12">
      <section className="py-10 sm:py-14">
        <div className="max-w-3xl">
          <h1 className="m-0 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Məhsullara rahat baxış
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Məhsulları kateqoriyaya görə seçin, qiymətə baxın və əlaqə
            saxlayın.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
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
              className="!h-12 !rounded-full !border-slate-300 !bg-white/60 !px-6 !font-semibold !text-slate-700 hover:!border-emerald-400 hover:!text-emerald-600"
            >
              Kolleksiyaya bax
            </Button>
          </div>
        </div>
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

      <section>
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <p className="m-0 text-sm font-semibold text-emerald-700">
              Kateqoriyalar
            </p>
            <h2 className="m-0 mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Məhsul bölmələri
            </h2>
          </div>
          <Button
            type="link"
            onClick={() => navigate("/products")}
            className="!font-semibold !text-emerald-700"
          >
            Hamısına bax
          </Button>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-3 select-none"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            cursor: isDragging.current ? "grabbing" : "grab",
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {categoryTiles.map((tile) => (
            <button
              key={tile.title}
              type="button"
              onClick={() => {
                if (dragged) return;
                const path = tile.categoryId
                  ? `/products?category=${tile.categoryId}`
                  : "/products";
                navigate(path);
              }}
              className="group w-52 flex-none rounded-2xl border border-slate-200 bg-white p-2 text-left shadow-sm transition hover:border-emerald-200 hover:shadow-md sm:w-60"
              style={{ userSelect: "none" }}
            >
              <div className="relative h-36 overflow-hidden rounded-xl bg-slate-100 sm:h-40">
                <img
                  src={tile.image}
                  alt={tile.title}
                  draggable={false}
                  className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="px-3 pb-3 pt-4">
                <h3 className="m-0 text-base font-bold text-slate-950">
                  {tile.title}
                </h3>
                <p className="m-0 mt-1 text-sm text-slate-500">
                  {tile.helper}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="m-0 text-sm font-semibold text-emerald-700">
              Yeni məhsullar
            </p>
            <h2 className="m-0 mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Son əlavə olunanlar
            </h2>
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
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-500">
            Hələ ki məhsul yoxdur.
          </div>
        )}
      </section>
    </div>
  );
}
