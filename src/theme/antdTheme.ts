import type { ThemeConfig } from "antd";

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: "#0f766e",
    borderRadius: 8,
    colorInfo: "#0ea5e9",
    colorSuccess: "#16a34a",
    colorWarning: "#f59e0b",
    fontFamily:
      "Manrope, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
  },
  components: {
    Button: {
      controlHeight: 42,
      borderRadius: 8,
      fontWeight: 600,
    },
    Card: {
      borderRadiusLG: 8,
    },
    Input: {
      controlHeightLG: 46,
    },
  },
};
