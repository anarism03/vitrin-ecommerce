import { ArrowRightOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Button } from "antd";

type Props = {
  onHomeClick: () => void;
  onProductsClick: () => void;
};

export default function AboutActions({ onHomeClick, onProductsClick }: Props) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <Button
        type="primary"
        size="large"
        icon={<ShoppingOutlined />}
        onClick={onProductsClick}
        className="!h-12 !rounded-full !border-0 !bg-emerald-500 !px-6 !font-semibold !text-white hover:!bg-emerald-600"
      >
        Məhsullara bax
      </Button>
      <Button
        size="large"
        icon={<ArrowRightOutlined />}
        onClick={onHomeClick}
        className="!h-12 !rounded-full !border-slate-300 !bg-white !px-6 !font-semibold !text-slate-700 hover:!border-emerald-400 hover:!text-emerald-600"
      >
        Ana səhifə
      </Button>
    </div>
  );
}
