import { useEffect, useState, type ReactNode } from "react";
import { Layout as AntLayout } from "antd";
import {
  AppstoreOutlined,
  DownOutlined,
  HomeOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { NavLink, Outlet } from "react-router-dom";
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
  const [categories, setCategories] = useState<CategoryOption[]>([]);

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

  return (
    <AntLayout className="min-h-screen !bg-transparent">
      <Header className="!sticky !top-0 !z-30 !h-auto !border-b !border-slate-200/70 !bg-white/90 !px-0 !leading-normal !backdrop-blur-md">
        <div className="relative mx-auto flex min-h-16 w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <NavLink
            to="/"
            className="flex flex-none items-center gap-2.5 text-left no-underline"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 via-emerald-500 to-sky-500 text-base font-extrabold text-white shadow-[0_8px_22px_-10px_rgba(13,148,136,0.7)]">
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
              <div key={item.to} className="group relative">
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className="no-underline"
                >
                  {({ isActive }) => (
                    <span
                      className={`inline-flex h-10 items-center gap-2 rounded-full px-3.5 text-sm font-semibold transition sm:px-4 ${
                        isActive
                          ? "bg-slate-950 text-white shadow-[0_6px_18px_-10px_rgba(2,6,23,0.6)]"
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

                {item.to === "/products" && (
                  <div className="invisible absolute left-1/2 top-full z-40 w-[min(360px,calc(100vw-32px))] -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_22px_70px_-35px_rgba(15,23,42,0.45)]">
                      <div className="border-b border-slate-100 bg-slate-50/80 px-4 py-3">
                        <p className="m-0 text-sm font-extrabold text-slate-950">
                          Kateqoriyalar
                        </p>
                        <p className="m-0 mt-0.5 text-xs font-medium text-slate-500">
                          Kateqoriyaya görə məhsulları süzün.
                        </p>
                      </div>

                      <div className="max-h-[320px] overflow-y-auto p-2">
                        <NavLink
                          to="/products"
                          className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 no-underline transition hover:bg-slate-100 hover:text-slate-950"
                        >
                          <AppstoreOutlined />
                          Bütün məhsullar
                        </NavLink>

                        {categories.map((category) => (
                          <NavLink
                            key={category.id}
                            to={`/products?category=${encodeURIComponent(category.id)}`}
                            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 no-underline transition hover:bg-emerald-50 hover:text-emerald-700"
                          >
                            <span className="h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                            <span className="min-w-0 truncate">
                              {category.name}
                            </span>
                          </NavLink>
                        ))}

                        {!categories.length && (
                          <p className="m-0 px-3 py-3 text-sm font-medium text-slate-500">
                            Kateqoriya tapılmadı.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-2 text-xs font-semibold text-slate-500 md:flex">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.18)]" />
            Onlayn vitrin
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
