import {
  ArrowRightOutlined,
  CheckCircleFilled,
  MailOutlined,
  PhoneOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const FOCUS_ITEMS = [
  "Məhsulların rahat tapılması və aydın təqdimatı",
  "Sifarişdən əvvəl sadə, başa düşülən məlumat",
  "Müştəri ilə operativ və səmimi əlaqə",
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="py-10">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[320px] overflow-hidden bg-slate-100 lg:min-h-[620px]">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=85"
              alt="Vitrin alış-veriş təcrübəsi"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-slate-950/10 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-2xl font-black text-white shadow-lg shadow-emerald-900/20">
                V
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
            <span className="mb-4 inline-flex w-fit items-center rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 ring-1 ring-emerald-100">
              Haqqımızda
            </span>

            <h1 className="m-0 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
              Vitrin haqqında
            </h1>

            <div className="mt-6 space-y-5 text-base leading-8 text-slate-600 sm:text-lg">
              <p className="m-0">
                Vitrin müştərilərin ehtiyaclarına uyğun məhsulları daha rahat
                tapması üçün hazırlanmış onlayn vitrindir. Burada əsas məqsəd
                sadə seçim, aydın məlumat və xoş alış-veriş təcrübəsi yaratmaqdır.
              </p>
              <p className="m-0">
                Məhsullar təqdim olunarkən istifadəçi rahatlığı, keyfiyyətli
                görünüş və etibarlı əlaqə əsas götürülür. Hər bölmə müştərinin
                vaxt itirmədən düzgün seçim etməsinə kömək etmək üçün qurulub.
              </p>
            </div>

            <div className="mt-8 space-y-3 border-y border-slate-200 py-6">
              {FOCUS_ITEMS.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircleFilled className="mt-1 text-base text-emerald-500" />
                  <span className="text-sm font-semibold leading-6 text-slate-700 sm:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>

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
                onClick={() => navigate("/")}
                className="!h-12 !rounded-full !border-slate-300 !bg-white !px-6 !font-semibold !text-slate-700 hover:!border-emerald-400 hover:!text-emerald-600"
              >
                Ana səhifə
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="m-0 text-2xl font-black tracking-tight text-slate-950">
              Bizimlə əlaqə saxlayın
            </h2>
            <p className="m-0 mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Məhsul və sifarişlə bağlı sualınız varsa, birbaşa əlaqə saxlayın.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="tel:+994504496536"
              className="inline-flex h-12 items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-5 text-sm font-bold text-slate-700 no-underline transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <PhoneOutlined />
              +994 (50) 449 65 36
            </a>
            <a
              href="mailto:ismayilzadeanar310@gmail.com"
              className="inline-flex h-12 items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-5 text-sm font-bold text-slate-700 no-underline transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <MailOutlined />
              Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
