import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-slate-600 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 font-bold text-white">
              V
            </span>
            <span className="font-bold text-slate-950">Vitrin</span>
          </div>
          <p className="m-0 mt-2 max-w-md">
            Məhsullara baxmaq və əlaqə saxlamaq üçün sadə vitrin.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <NavLink to="/products" className="text-slate-600 no-underline hover:text-emerald-600">
            Məhsullar
          </NavLink>
          <NavLink to="/about" className="text-slate-600 no-underline hover:text-emerald-600">
            Haqqımızda
          </NavLink>
          <a
            href="tel:+994504496536"
            className="inline-flex items-center gap-2 text-slate-600 no-underline hover:text-emerald-600"
          >
            <PhoneOutlined />
            +994 (50) 449 65 36
          </a>
          <a
            href="mailto:ismayilzadeanar310@gmail.com"
            className="inline-flex items-center gap-2 text-slate-600 no-underline hover:text-emerald-600"
          >
            <MailOutlined />
            Email
          </a>
        </div>
      </div>

      <div className="border-t border-slate-100">
        <div className="mx-auto flex w-full max-w-7xl justify-between px-5 py-4 text-xs text-slate-500 sm:px-8 lg:px-10">
          <span>© {new Date().getFullYear()} Vitrin</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="border-0 bg-transparent p-0 text-slate-500 hover:text-slate-900"
          >
            Yuxarıya qayıt
          </button>
        </div>
      </div>
    </footer>
  );
}
