import { Navigate, Route, Routes } from "react-router-dom";
import PublicLayout from "../components/PublicLayout";
import Home from "../pages/home/Home";
import Products from "../pages/products/Products";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
