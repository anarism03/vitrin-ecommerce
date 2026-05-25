import { NavLink } from "react-router-dom";
import {
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
  MailOutlined,
  MessageOutlined,
  PhoneOutlined,
  TwitterOutlined,
  YoutubeFilled,
} from "@ant-design/icons";

type FooterLink = { label: string; to: string };

const SOLUTIONS: FooterLink[] = [
  { label: "İdarə olunan vitrin", to: "/products" },
  { label: "Agentliklər", to: "/products" },
  { label: "Kiçik biznes", to: "/products" },
  { label: "Frilanserlər", to: "/products" },
  { label: "Yüksək trafik", to: "/products" },
  { label: "E-ticarət", to: "/products" },
];

const COMPANY: FooterLink[] = [
  { label: "Haqqımızda", to: "/" },
  { label: "Karyera", to: "/" },
  { label: "Müştəri hekayələri", to: "/" },
  { label: "Əlaqə", to: "/" },
  { label: "Hüquqi", to: "/" },
  { label: "Press Kit", to: "/" },
];

const RESOURCES: FooterLink[] = [
  { label: "Bloq", to: "/" },
  { label: "Bələdçilər", to: "/" },
  { label: "Bilik bazası", to: "/" },
  { label: "Rəylər", to: "/" },
  { label: "Tərəfdaşlıq", to: "/" },
  { label: "Strateji partnyorlar", to: "/" },
];

const SOCIAL = [
  { label: "Facebook", icon: <FacebookFilled />, href: "#" },
  { label: "LinkedIn", icon: <LinkedinFilled />, href: "#" },
  { label: "Twitter", icon: <TwitterOutlined />, href: "#" },
  { label: "Instagram", icon: <InstagramFilled />, href: "#" },
  { label: "YouTube", icon: <YoutubeFilled />, href: "#" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div>
      <p className="m-0 mb-5 text-sm font-bold uppercase tracking-[0.18em] text-teal-300">
        {title}
      </p>
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {links.map((link) => (
          <li key={link.label}>
            <NavLink
              to={link.to}
              className="text-sm text-slate-200/90 no-underline transition hover:text-white"
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative mt-12 overflow-hidden bg-[#0b1730] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_0%,rgba(45,212,191,0.12),transparent_60%),radial-gradient(60%_50%_at_100%_100%,rgba(56,189,248,0.08),transparent_55%)]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr_1fr_1fr_auto]">
          <div>
            <a
              href="#chat"
              className="flex items-center gap-2 text-sm font-bold text-teal-300 no-underline hover:text-teal-200"
            >
              <MessageOutlined className="text-base" />
              Satışla əlaqə
            </a>
            <a
              href="tel:+994504496536"
              className="mt-5 flex items-center gap-2 text-sm font-semibold text-white no-underline hover:text-teal-200"
            >
              <PhoneOutlined className="text-base text-teal-300" />
              +994 (50) 449 65 36
            </a>
            <a
              href="mailto:ismayilzadeanar310@gmail.com"
              className="mt-3 flex items-center gap-2 text-sm font-semibold text-white no-underline hover:text-teal-200"
            >
              <MailOutlined className="text-base text-teal-300" />
              ismayilzadeanar310@gmail.com
            </a>

            <p className="mt-6 max-w-xs text-xs leading-6 text-slate-400">
              Müştərilərə zövqlü vitrin və rahat alış-veriş təcrübəsi təqdim
              edirik. Hər zaman yeni seçimlər.
            </p>
          </div>

          <FooterColumn title="Həllər" links={SOLUTIONS} />
          <FooterColumn title="Şirkət" links={COMPANY} />
          <FooterColumn title="Resurslar" links={RESOURCES} />

          <div className="flex flex-row gap-3 lg:flex-col">
            {SOCIAL.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-white no-underline transition hover:bg-teal-500 hover:text-white"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-3 px-5 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white">
              V
            </span>
            <span>© {new Date().getFullYear()} Vitrin. Bütün hüquqlar qorunur.</span>
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="cursor-pointer bg-transparent border-0 p-0 font-semibold text-white no-underline underline-offset-4 hover:underline"
          >
            Yuxarıya qayıt
          </button>
        </div>
      </div>
    </footer>
  );
}
