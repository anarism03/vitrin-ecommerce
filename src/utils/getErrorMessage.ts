import axios from "axios";

type ErrorResponse = {
  message?: string | string[];
  error?: string;
};

export function getErrorMessage(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as ErrorResponse | undefined;

    if (Array.isArray(data?.message)) {
      return data.message.join(", ");
    }

    return data?.message || data?.error || fallback || err.message;
  }

  if (err instanceof Error) {
    return err.message || fallback;
  }

  return fallback;
}

export function unwrap<T = unknown>(responseData: unknown): T {
  if (
    responseData &&
    typeof responseData === "object" &&
    "data" in responseData
  ) {
    return (responseData as { data: T }).data;
  }

  return responseData as T;
}
