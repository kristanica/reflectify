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

export const durationFormat = (endedAt: number, startedAt: number): string => {
  const duration = endedAt - startedAt;
  const seconds = Math.floor(duration / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};
