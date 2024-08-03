import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(...inputs: string[]) {
  return inputs.map((str) => str.charAt(0)).join("");
}
