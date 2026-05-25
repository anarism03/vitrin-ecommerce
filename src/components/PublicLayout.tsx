import type { ReactNode } from "react";
import { Layout as AntLayout } from "antd";
import { HomeOutlined, ShoppingOutlined } from "@ant-design/icons";
import { NavLink, Outlet } from "react-router-dom";
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

export default function PublicLayout() {
  return (
    <AntLayout className="min-h-screen !bg-transparent">
      <Header className="!sticky !top-0 !z-30 !h-auto !border-b !border-slate-200/70 !bg-white/90 !px-0 !leading-normal !backdrop-blur-md">
        <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
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

          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
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
                  </span>
                )}
              </NavLink>
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
