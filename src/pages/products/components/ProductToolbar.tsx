import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Divider,
  Drawer,
  Input,
  InputNumber,
  Popover,
  Select,
} from "antd";
import {
  CloseOutlined,
  FilterOutlined,
  ReloadOutlined,
  SearchOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import type { CategoryOption } from "../../../types/category.type";
import type { ProductFilters, ProductSort } from "../../../types/product.type";
import { PRODUCT_SORT_OPTIONS } from "../productCatalog.constants";

type Props = {
  categories: CategoryOption[];
  filters: ProductFilters;
  loading: boolean;
  onChange: (patch: Partial<ProductFilters>) => void;
  onReset: () => void;
};

const MOBILE_BREAKPOINT = 768;

const getNumberValue = (value: string | number | null) =>
  typeof value === "number" ? value : undefined;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isMobile;
}

export default function ProductToolbar({
  categories,
  filters,
  loading,
  onChange,
  onReset,
}: Props) {
  const [filterOpen, setFilterOpen] = useState(false);
  const isMobile = useIsMobile();

  const activeFilterCount = [
    filters.categoryId,
    filters.minPrice !== undefined,
    filters.maxPrice !== undefined,
  ].filter(Boolean).length;

  const handleReset = () => {
    onReset();
    setFilterOpen(false);
  };

  const sortOptions = PRODUCT_SORT_OPTIONS.map((option) => ({
    label: option.label,
    value: option.value,
  }));

  const filterFields = (
    <div className="space-y-4">
      <div>
        <p className="m-0 mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Kateqoriya
        </p>
        <Select
          allowClear
          className="w-full"
          size="large"
          placeholder="Kateqoriya seçin"
          value={filters.categoryId}
          onChange={(value) => onChange({ categoryId: value })}
          options={categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
        />
      </div>

      <div>
        <p className="m-0 mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Qiymət aralığı
        </p>
        <div className="grid grid-cols-2 gap-2">
          <InputNumber
            className="w-full"
            size="large"
            min={0}
            placeholder="Min"
            value={filters.minPrice}
            onChange={(value) => onChange({ minPrice: getNumberValue(value) })}
          />
          <InputNumber
            className="w-full"
            size="large"
            min={0}
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(value) => onChange({ maxPrice: getNumberValue(value) })}
          />
        </div>
      </div>
    </div>
  );

  const popoverContent = (
    <div className="w-[min(340px,calc(100vw-32px))]">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="m-0 text-sm font-bold text-slate-950">Filtr</p>
          <p className="m-0 mt-1 text-xs text-slate-500">
            Kateqoriya və qiymət aralığı.
          </p>
        </div>
        <Button size="small" type="link" onClick={handleReset}>
          Sıfırla
        </Button>
      </div>

      {filterFields}

      <Divider className="!my-3" />

      <p className="m-0 text-xs leading-5 text-slate-500">
        Axtarış adı yuxarıdakı inputdan serverə göndərilir.
      </p>
    </div>
  );

  const filterTrigger = (
    <Badge
      count={activeFilterCount}
      size="small"
      offset={[-6, 6]}
      className="!block w-full sm:!inline-block sm:!w-auto"
    >
      <Button
        icon={<FilterOutlined />}
        loading={loading}
        size="large"
        block
        onClick={isMobile ? () => setFilterOpen(true) : undefined}
        className="!h-12 !rounded-xl !border-slate-200 !bg-white !font-semibold !text-slate-700 !shadow-sm hover:!border-teal-400 hover:!text-teal-700 sm:!w-auto sm:!px-4"
      >
        Filtr
      </Button>
    </Badge>
  );

  return (
    <section className="product-toolbar relative border-b border-slate-200 bg-gradient-to-r from-white via-teal-50/40 to-sky-50/40 px-4 py-4 sm:px-6 sm:py-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-3">
        <Input
          allowClear
          prefix={
            <span className="mr-2 flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 text-white shadow-sm">
              <SearchOutlined className="text-xs" />
            </span>
          }
          placeholder="Məhsul adı axtar..."
          value={filters.searchText}
          onChange={(event) => onChange({ searchText: event.target.value })}
          size="large"
          className="!w-full !min-w-0 !flex-1 !rounded-xl !border-slate-200 !bg-white !shadow-sm hover:!border-teal-300"
        />

        <div className="flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-stretch lg:w-auto lg:flex-nowrap">
          <div className="flex h-12 min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 shadow-sm sm:flex-initial sm:basis-[220px] lg:basis-auto">
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 text-white shadow-sm">
              <SortAscendingOutlined />
            </span>
            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Sıralama
              </span>
              <Select<ProductSort>
                variant="borderless"
                value={filters.sortBy}
                onChange={(value) => onChange({ sortBy: value })}
                options={sortOptions}
                popupMatchSelectWidth={false}
                className="!w-full !font-semibold !text-slate-900"
              />
            </div>
          </div>

          <div className="grid flex-none grid-cols-2 gap-2 sm:flex sm:items-center">
            {isMobile ? (
              filterTrigger
            ) : (
              <Popover
                content={popoverContent}
                trigger="click"
                placement="bottom"
                arrow={{ pointAtCenter: true }}
                getPopupContainer={() => document.body}
                open={filterOpen}
                onOpenChange={setFilterOpen}
              >
                {filterTrigger}
              </Popover>
            )}
            <Button
              icon={<ReloadOutlined />}
              onClick={handleReset}
              size="large"
              className="!h-12 !w-full !rounded-xl !border-slate-200 !bg-white !font-semibold !text-slate-700 !shadow-sm hover:!border-rose-300 hover:!text-rose-600 sm:!w-auto sm:!px-4"
            >
              Sıfırla
            </Button>
          </div>
        </div>
      </div>

      <Drawer
        title={null}
        open={isMobile && filterOpen}
        onClose={() => setFilterOpen(false)}
        placement="bottom"
        height="auto"
        closable={false}
        styles={{
          body: { padding: 0 },
          content: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            overflow: "hidden",
          },
        }}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-center pt-3">
            <span className="h-1.5 w-12 rounded-full bg-slate-200" />
          </div>

          <div className="flex items-start justify-between gap-3 px-5 pt-4">
            <div>
              <p className="m-0 text-base font-bold text-slate-950">Filtr</p>
              <p className="m-0 mt-0.5 text-xs text-slate-500">
                Kateqoriya və qiymət aralığını seçin.
              </p>
            </div>
            <Button
              type="text"
              shape="circle"
              icon={<CloseOutlined />}
              onClick={() => setFilterOpen(false)}
              aria-label="Bağla"
            />
          </div>

          <div className="px-5 pb-3 pt-5">{filterFields}</div>

          <div className="grid grid-cols-2 gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-4">
            <Button
              size="large"
              onClick={handleReset}
              className="!h-12 !rounded-xl !font-semibold"
            >
              Sıfırla
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={() => setFilterOpen(false)}
              className="!h-12 !rounded-xl !border-0 !bg-gradient-to-r !from-teal-600 !to-emerald-600 !font-semibold"
            >
              Tətbiq et
            </Button>
          </div>
        </div>
      </Drawer>
    </section>
  );
}
