import type { Product, ProductListParams, ProductListResponse } from "../types/product.type";
import axiosInstance from "./axiosInstance";

const ProductService = {
  getAll: (params: ProductListParams) =>
    axiosInstance.get<ProductListResponse>("/products", { params }),

  getById: (id: string) => axiosInstance.get<Product>(`/products/${id}`),
};

export default ProductService;
