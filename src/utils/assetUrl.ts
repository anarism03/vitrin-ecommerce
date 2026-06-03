const API_URL =
  import.meta.env.VITE_API_URL || "http://161.97.154.119/intern-api/api";

const getApiOrigin = () => {
  try {
    return new URL(API_URL).origin;
  } catch {
    return "";
  }
};

export function resolveAssetUrl(url?: string | null) {
  const normalizedUrl = url?.trim();

  if (!normalizedUrl || ["null", "undefined"].includes(normalizedUrl)) {
    return "";
  }

  if (/^https?:\/\//i.test(normalizedUrl)) {
    return normalizedUrl;
  }

  const origin = getApiOrigin();
  if (!origin) return normalizedUrl;

  return new URL(normalizedUrl, origin).toString();
}
