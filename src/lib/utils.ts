import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateTopicText(text: string): boolean {
  if (text.trim().length < 15) {
    return false;
  }
  return true;
}
