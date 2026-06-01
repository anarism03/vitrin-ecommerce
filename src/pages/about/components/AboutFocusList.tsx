import { CheckCircleFilled } from "@ant-design/icons";
import { ABOUT_FOCUS_ITEMS } from "../about.constants";

export default function AboutFocusList() {
  return (
    <div className="mt-8 space-y-3 border-y border-slate-200 py-6">
      {ABOUT_FOCUS_ITEMS.map((item) => (
        <div key={item} className="flex items-start gap-3">
          <CheckCircleFilled className="mt-1 text-base text-emerald-500" />
          <span className="text-sm font-semibold leading-6 text-slate-700 sm:text-base">
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}
