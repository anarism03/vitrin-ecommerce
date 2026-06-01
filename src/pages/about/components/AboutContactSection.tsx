import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { ABOUT_CONTACT_ITEMS } from "../about.constants";
import type { ContactItem } from "../about.types";

function getContactIcon(type: ContactItem["type"]) {
  return type === "phone" ? <PhoneOutlined /> : <MailOutlined />;
}

export default function AboutContactSection() {
  return (
    <section className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="m-0 text-2xl font-bold text-slate-950">
            Bizimlə əlaqə saxlayın
          </h2>
          <p className="m-0 mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Məhsul və sifarişlə bağlı sualınız varsa, birbaşa əlaqə saxlayın.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {ABOUT_CONTACT_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex h-12 items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-5 text-sm font-bold text-slate-700 no-underline transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            >
              {getContactIcon(item.type)}
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
