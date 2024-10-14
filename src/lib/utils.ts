import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function themeLoader() {
  const prefersDarkScheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const theme = prefersDarkScheme ? "dark" : "light";

  return { theme };
}

export function formatDate(stringDate: string) {
  if (!stringDate) return null;

  const date = new Date(stringDate);

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export const removeMask = (value: string) => value.replace(/\D/g, "");

export function formatMsisdn(msisdn: string): string | null {
  if (!msisdn) return null;

  if (msisdn.length === 13) {
    return `(${msisdn.substring(2, 4)}) ${msisdn.substring(
      4,
      9
    )}-${msisdn.substring(9, 13)}`;
  } else if (msisdn.length === 11) {
    return `(${msisdn.substring(0, 2)}) ${msisdn.substring(
      2,
      7
    )}-${msisdn.substring(7, 11)}`;
  }

  return msisdn;
}