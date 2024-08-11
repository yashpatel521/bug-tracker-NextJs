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

export function dateToString(date: string) {
  // format dd-MM-yyyy
  const d = new Date(date);
  return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
}

export function generateRandomPassword(): string {
  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%&_?";
  const allChars = upperCaseChars + lowerCaseChars + numberChars + symbolChars;

  const getRandomChar = (chars: string): string =>
    chars[Math.floor(Math.random() * chars.length)];

  let password = [
    getRandomChar(upperCaseChars),
    getRandomChar(lowerCaseChars),
    getRandomChar(numberChars),
    getRandomChar(symbolChars),
  ];

  for (let i = password.length; i < 10; i++) {
    password.push(getRandomChar(allChars));
  }

  // Shuffle the password array to ensure random order
  password = password.sort(() => Math.random() - 0.5);

  // return password.join("");
  return "ChangeMe@123";
}

export function newVersionNumber(versionNumber: string): string {
  const versionParts = versionNumber.split(".");
  const lastPart = versionParts.pop();
  if (lastPart === undefined || isNaN(parseInt(lastPart))) {
    throw new Error("Invalid version number format");
  }
  const incrementedPart = (parseInt(lastPart) + 1).toString();
  versionParts.push(incrementedPart);
  const newVersion = versionParts.join(".");
  return newVersion;
}

export function passwordValidity(password: string) {
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  } else if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  } else if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  } else if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  } else if (!/[!@#$%^&*]/.test(password)) {
    return "Password must contain at least one special character";
  } else {
    return "";
  }
}
