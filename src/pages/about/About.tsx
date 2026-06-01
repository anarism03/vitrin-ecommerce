import {
  ArrowRightOutlined,
  CheckCircleFilled,
  MailOutlined,
  PhoneOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ABOUT_CONTACTS, ABOUT_IMAGE, ABOUT_POINTS } from "./about.constants";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 py-10">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[320px] bg-slate-100 lg:min-h-[560px]">
            <img
              src={ABOUT_IMAGE}
              alt="Vitrin haqqında"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/20" />
            <div className="absolute bottom-8 left-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-2xl font-bold text-white">
              V
            </div>
          </div>

          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-14">
            <p className="m-0 text-sm font-semibold text-emerald-700">
              Haqqımızda
            </p>
            <h1 className="m-0 mt-2 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
              Vitrin haqqında
            </h1>

            <div className="mt-6 space-y-4 text-base leading-7 text-slate-600 sm:text-lg">
              <p className="m-0">
                Vitrin məhsulları sadə formada göstərmək üçün hazırlanmış
                müştəri səhifəsidir. Burada əsas məqsəd məhsula baxmağı,
                qiyməti görməyi və əlaqə saxlamağı rahat etməkdir.
              </p>
              <p className="m-0">
                Məhsullar kateqoriyalar üzrə bölünür. Hər məhsulda şəkil,
                qiymət, stok və təsvir məlumatı göstərilir.
              </p>
            </div>

            <div className="mt-7 space-y-3 border-y border-slate-200 py-5">
              {ABOUT_POINTS.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircleFilled className="mt-1 text-emerald-500" />
                  <span className="text-sm font-semibold leading-6 text-slate-700 sm:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
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
                onClick={() => navigate("/")}
                className="!h-12 !rounded-full !border-slate-300 !bg-white !px-6 !font-semibold !text-slate-700 hover:!border-emerald-400 hover:!text-emerald-600"
              >
                Ana səhifə
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="m-0 text-2xl font-bold text-slate-950">
              Əlaqə
            </h2>
            <p className="m-0 mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Məhsul və sifarişlə bağlı sualınız varsa, əlaqə saxlaya
              bilərsiniz.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {ABOUT_CONTACTS.map((contact) => (
              <a
                key={contact.href}
                href={contact.href}
                className="inline-flex h-12 items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-5 text-sm font-bold text-slate-700 no-underline transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {contact.type === "phone" ? <PhoneOutlined /> : <MailOutlined />}
                {contact.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
