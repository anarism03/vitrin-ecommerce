import type {
  CategoryListParams,
  CategoryListResponse,
  CategoryOption,
} from "../types/category.type";
import axiosInstance from "./axiosInstance";

const CategoryService = {
  getAll: (params: CategoryListParams) =>
    axiosInstance.get<CategoryListResponse>("/categories", { params }),

  getOptions: () => axiosInstance.get<CategoryOption[]>("/categories/options"),
};

export default CategoryService;
