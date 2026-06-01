import { useNavigate } from "react-router-dom";

export function useAboutNavigation() {
  const navigate = useNavigate();

  return {
    goHome: () => navigate("/"),
    goProducts: () => navigate("/products"),
  };
}
