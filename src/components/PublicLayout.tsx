import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Layout as AntLayout } from "antd";
import {
  AppstoreOutlined,
  DownOutlined,
  HomeOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { NavLink, Outlet, useLocation, useSearchParams } from "react-router-dom";
import CategoryService from "../services/CategoryService";
import type { CategoryOption } from "../types/category.type";
import { unwrap } from "../utils/getErrorMessage";
import Footer from "./Footer";

const { Header, Content } = AntLayout;

const navItems: Array<{
  to: string;
  label: string;
  icon: ReactNode;
}> = [
  { to: "/", label: "Ana səhifə", icon: <HomeOutlined /> },
  { to: "/products", label: "Məhsullar", icon: <ShoppingOutlined /> },
];

const CATEGORY_COLUMN_SIZE = 5;

function normalizeCategories(responseData: unknown): CategoryOption[] {
  const data = unwrap<unknown>(responseData);

  if (Array.isArray(data)) return data as CategoryOption[];

  if (data && typeof data === "object" && "data" in data) {
    const nested = (data as { data?: unknown }).data;
    if (Array.isArray(nested)) return nested as CategoryOption[];
  }

  return [];
}

export default function PublicLayout() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const closeCategoryMenuTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const openCategoryMenu = () => {
    if (closeCategoryMenuTimer.current) {
      clearTimeout(closeCategoryMenuTimer.current);
      closeCategoryMenuTimer.current = null;
    }
    setIsCategoryMenuOpen(true);
  };

  const closeCategoryMenu = () => {
    if (closeCategoryMenuTimer.current) {
      clearTimeout(closeCategoryMenuTimer.current);
    }
    closeCategoryMenuTimer.current = setTimeout(() => {
      setIsCategoryMenuOpen(false);
      closeCategoryMenuTimer.current = null;
    }, 120);
  };

  const categoryColumns = useMemo(() => {
    const allCategories: CategoryOption[] = [
      { id: "", name: "Bütün məhsullar" },
      ...categories,
    ];

    const columns: CategoryOption[][] = [];
    for (let i = 0; i < allCategories.length; i += CATEGORY_COLUMN_SIZE) {
      columns.push(allCategories.slice(i, i + CATEGORY_COLUMN_SIZE));
    }

    return columns;
  }, [categories]);

  const activeCategoryId = searchParams.get("category") || "";
  const isProductsPage = location.pathname.startsWith("/products");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryResponse = await CategoryService.getOptions();
        setCategories(normalizeCategories(categoryResponse.data));
      } catch {
        setCategories([]);
      }
    };

    void fetchCategories();
  }, []);

  useEffect(() => {
    return () => {
      if (closeCategoryMenuTimer.current) {
        clearTimeout(closeCategoryMenuTimer.current);
      }
    };
  }, []);

  return (
    <AntLayout className="min-h-screen !bg-transparent">
      <Header className="!sticky !top-0 !z-30 !h-auto !border-b !border-slate-200/70 !bg-white !px-0 !leading-normal">
        <div className="relative mx-auto flex min-h-16 w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <NavLink
            to="/"
            className="flex flex-none items-center gap-2.5 text-left no-underline"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-base font-bold text-white">
              V
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block text-[15px] font-extrabold tracking-tight text-slate-950">
                Vitrin
              </span>
              <span className="block text-[11px] font-medium text-slate-500">
                Müştəri vitrini
              </span>
            </span>
          </NavLink>

          <nav className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.to}
                className="group relative"
                onMouseEnter={() => {
                  if (item.to === "/products") openCategoryMenu();
                }}
                onMouseLeave={() => {
                  if (item.to === "/products") closeCategoryMenu();
                }}
                onPointerEnter={() => {
                  if (item.to === "/products") openCategoryMenu();
                }}
                onPointerLeave={() => {
                  if (item.to === "/products") closeCategoryMenu();
                }}
                onFocus={() => {
                  if (item.to === "/products") openCategoryMenu();
                }}
              >
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className="no-underline"
                  onClick={(event) => {
                    if (item.to !== "/products") return;

                    if (window.innerWidth < 640) {
                      event.preventDefault();
                      setIsCategoryMenuOpen((open) => !open);
                      return;
                    }

                    setIsCategoryMenuOpen(false);
                  }}
                >
                  {({ isActive }) => (
                    <span
                      className={`inline-flex h-10 items-center gap-2 rounded-full px-3.5 text-sm font-semibold transition sm:px-4 ${
                        isActive
                          ? "bg-emerald-500 text-white"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      <span className="hidden sm:inline">{item.label}</span>
                      {item.to === "/products" && (
                        <DownOutlined className="hidden text-[10px] sm:inline" />
                      )}
                    </span>
                  )}
                </NavLink>
              </div>
            ))}
          </nav>

          <div className="ml-auto hidden md:block" />
        </div>

        <div
          className={`absolute left-0 right-0 top-full z-40 border-t border-slate-200 bg-white shadow-sm transition duration-200 ${
            isCategoryMenuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-1 opacity-0"
          }`}
          onMouseEnter={openCategoryMenu}
          onMouseLeave={closeCategoryMenu}
          onPointerEnter={openCategoryMenu}
          onPointerLeave={closeCategoryMenu}
        >
          <div className="mx-auto max-h-[calc(100vh-90px)] w-full max-w-7xl overflow-y-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="m-0 text-base font-extrabold text-slate-950">
                  Kateqoriyalar
                </p>
                <p className="m-0 mt-0.5 text-xs font-medium text-slate-500">
                  Kateqoriyaya görə məhsulları süzün.
                </p>
              </div>
              <NavLink
                to="/products"
                className="mt-2 inline-flex w-fit items-center gap-2 text-sm font-bold text-emerald-600 no-underline hover:text-emerald-700 sm:mt-0"
                onClick={() => setIsCategoryMenuOpen(false)}
              >
                Hamısına bax
                <DownOutlined className="-rotate-90 text-[10px]" />
              </NavLink>
            </div>

            {categoryColumns.length ? (
              <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {categoryColumns.map((column, columnIndex) => (
                  <div
                    key={columnIndex}
                    className="min-w-0 border-b border-slate-100 pb-4 last:border-b-0 sm:border-b-0 sm:pb-0"
                  >
                    <div className="space-y-1">
                      {column.map((category) => {
                        const isAllProducts = !category.id;
                        const isActiveCategory =
                          isProductsPage &&
                          (isAllProducts
                            ? !activeCategoryId
                            : activeCategoryId === category.id);

                        return (
                          <NavLink
                            key={category.id || "all-products"}
                            to={
                              isAllProducts
                                ? "/products"
                                : `/products?category=${encodeURIComponent(category.id)}`
                            }
                            className={`flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold no-underline transition ${
                              isActiveCategory
                                ? "bg-emerald-50 text-emerald-700"
                                : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                            }`}
                            onClick={() => setIsCategoryMenuOpen(false)}
                          >
                            {isAllProducts ? (
                              <AppstoreOutlined className="flex-none text-base" />
                            ) : (
                              <span className="h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                            )}
                            <span className="min-w-0 truncate">
                              {category.name}
                            </span>
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="m-0 rounded-xl bg-slate-50 px-4 py-4 text-sm font-medium text-slate-500">
                Kateqoriya tapılmadı.
              </p>
            )}
          </div>
        </div>
      </Header>

      <Content className="page-shell min-h-[calc(100vh-64px)] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mx-auto w-full max-w-7xl">
          <Outlet />
        </div>
      </Content>

      <Footer />
    </AntLayout>
  );
}
