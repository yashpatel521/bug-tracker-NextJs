import { User } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "@/components/ui/use-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(...inputs: string[]) {
  return inputs.map((str) => str.charAt(0)).join("");
}

export function abbreviateNumber(num: number): string {
  if (num >= 1e15) {
    return (num / 1e15).toFixed(0) + "Q+";
  }
  if (num >= 1e12) {
    return (num / 1e12).toFixed(0) + "T+";
  }
  if (num >= 1e9) {
    return (num / 1e9).toFixed(0) + "B+";
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(0) + "M+";
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(0) + "K+";
  }
  return num.toString();
}

export function truncateWords(str: string) {
  if (str.length > 20) {
    return str.substring(0, 50) + "...";
  } else {
    return str;
  }
}

export function checkRoleAccess(user: User, type: string[]) {
  if (user) {
    if (
      (user.role && type.includes(user.role.name)) ||
      (user.subRole && type.includes(user.subRole.name))
    )
      return true;
    else return false;
  } else return false;
}

export function customToast(
  message: string = "",
  type: "error" | "success" | "default" = "default"
) {
  const variant: any = type == "error" ? "destructive" : type;
  toast({
    variant,
    title: message,
    description: type,
  });
}
