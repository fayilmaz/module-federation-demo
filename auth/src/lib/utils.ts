import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function goTo(path: string) {
  const navigate = useNavigate();
  navigate(path);
}
