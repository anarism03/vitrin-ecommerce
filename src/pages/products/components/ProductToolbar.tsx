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

  // Local state to hold filter changes before applying
  const [localFilters, setLocalFilters] = useState<ProductFilters>(filters);

  // Sync local state when popover opens/closes or external filters change
  useEffect(() => {
    if (filterOpen) {
      setLocalFilters(filters);
    } else {
      setLocalFilters(filters);
    }
  }, [filterOpen, filters]);

  const activeFilterCount = [
    filters.categoryId,
    filters.minPrice !== undefined,
    filters.maxPrice !== undefined,
    filters.sortBy !== "newest"
  ].filter(Boolean).length;

  const handleApply = () => {
    onChange({
      categoryId: localFilters.categoryId,
      minPrice: localFilters.minPrice,
      maxPrice: localFilters.maxPrice,
      sortBy: localFilters.sortBy,
    });
    setFilterOpen(false);
  };

  const handleReset = () => {
    onReset();
    setFilterOpen(false);
  };

  const sortOptions = PRODUCT_SORT_OPTIONS.map((option) => ({
    label: option.label,
    value: option.value,
  }));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleApply();
    }
  };

  const filterFields = (
    <div className="space-y-4" onKeyDown={handleKeyDown}>
      <div>
        <p className="m-0 mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Sıralama
        </p>
        <Select<ProductSort>
          className="w-full"
          size="large"
          value={localFilters.sortBy}
          onChange={(value) => setLocalFilters({ ...localFilters, sortBy: value })}
          options={sortOptions}
        />
      </div>

      <div>
        <p className="m-0 mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Kateqoriya
        </p>
        <Select
          allowClear
          className="w-full"
          size="large"
          placeholder="Kateqoriya seçin"
          value={localFilters.categoryId}
          onChange={(value) => setLocalFilters({ ...localFilters, categoryId: value })}
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
            value={localFilters.minPrice}
            onChange={(value) => setLocalFilters({ ...localFilters, minPrice: getNumberValue(value) })}
          />
          <InputNumber
            className="w-full"
            size="large"
            min={0}
            placeholder="Max"
            value={localFilters.maxPrice}
            onChange={(value) => setLocalFilters({ ...localFilters, maxPrice: getNumberValue(value) })}
          />
        </div>
      </div>
    </div>
  );

  const popoverContent = (
    <div className="w-[min(340px,calc(100vw-32px))]">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="m-0 text-sm font-bold text-slate-950">Filtr & Sıralama</p>
          <p className="m-0 mt-1 text-xs text-slate-500">
            Sıralama, kateqoriya və qiymət aralığı.
          </p>
        </div>
      </div>

      {filterFields}

      <Divider className="!my-4" />

      <div className="grid grid-cols-2 gap-2">
        <Button onClick={handleReset} size="large" className="!h-10 !rounded-xl !font-semibold text-slate-600">
          Sıfırla
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={handleApply}
          className="!h-10 !rounded-xl !border-0 !bg-gradient-to-r !from-teal-600 !to-emerald-600 !font-semibold"
        >
          Tətbiq et
        </Button>
      </div>
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
        className="!h-12 !rounded-xl !border-slate-200 !bg-white !font-semibold !text-slate-700 !shadow-sm hover:!border-teal-400 hover:!text-teal-700 sm:!w-auto sm:!px-6"
      >
        Filtrlər
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

        <div className="flex flex-none grid-cols-2 gap-2 sm:flex sm:items-center w-full lg:w-auto">
          {isMobile ? (
            filterTrigger
          ) : (
            <Popover
              content={popoverContent}
              trigger="click"
              placement="bottomRight"
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
              <p className="m-0 text-base font-bold text-slate-950">Filtr & Sıralama</p>
              <p className="m-0 mt-0.5 text-xs text-slate-500">
                Sıralama, kateqoriya və qiymət aralığını seçin.
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
              className="!h-12 !rounded-xl !font-semibold text-slate-600"
            >
              Sıfırla
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={handleApply}
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
