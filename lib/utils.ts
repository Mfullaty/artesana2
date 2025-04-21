import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify({
  text,
  separator = "-",
  lowercase = true,
}: {
  text: string;
  separator?: string;
  lowercase?: boolean;
}) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .replace(/ /g, separator)
    .toLowerCase();
}
