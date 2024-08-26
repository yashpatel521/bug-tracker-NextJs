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
  // Split the version number into parts
  let versionParts = versionNumber.split(".");

  // Ensure the version number has three parts
  while (versionParts.length < 3) {
    versionParts.push("0");
  }

  // Get the last part, which will be incremented
  const lastPart = versionParts.pop();

  // Validate that the last part is a number
  if (lastPart === undefined || isNaN(parseInt(lastPart))) {
    throw new Error("Invalid version number format");
  }

  // Increment the last part
  const incrementedPart = (parseInt(lastPart) + 1).toString();

  // Add the incremented part back to the version parts
  versionParts.push(incrementedPart);

  // Join the parts back into a version string
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

export function createBeams(totalNumberOfBeams: number = 20) {
  // const beams = [];
  // for (let i = 0; i < totalNumberOfBeams; i++) {
  //   const randomClassName = `h-${Math.floor(Math.random() * 8) + 5}`;
  //   const initialX = Math.floor(Math.random() * 8000); // Random initial position between -2000 and 6000
  //   const randomDuration = Math.floor(Math.random() * 10) + 5; // Random duration between 5 and 15
  //   const randomDelay = Math.floor(Math.random() * 5) + 1; // Random delay between 1 and 5
  //   const randomRepeatDelay = Math.floor(Math.random() * 5) + 1; // Random repeat delay between 1 and 5
  //   beams.push({
  //     initialX: initialX,
  //     translateX: initialX + 1800,
  //     duration: randomDuration,
  //     repeatDelay: randomRepeatDelay,
  //     delay: randomDelay,
  //     className: randomClassName,
  //     rotate: 135,
  //   });
  // }
  const beams = [
    {
      initialX: 10,
      translateX: 10 + 1800,
      duration: 7,
      repeatDelay: 3,
      delay: 2,
      rotate: 135,
    },
    {
      initialX: 600,
      translateX: 600 + 1800,
      duration: 3,
      repeatDelay: 3,
      rotate: 135,
      delay: 4,
    },
    {
      initialX: 100,
      translateX: 100 + 1800,
      duration: 7,
      repeatDelay: 7,
      className: "h-6",
      rotate: 135,
    },
    {
      initialX: 400,
      translateX: 400 + 1800,
      duration: 5,
      repeatDelay: 14,
      delay: 4,
      rotate: 135,
    },
    {
      initialX: 800,
      translateX: 800 + 1800,
      duration: 11,
      repeatDelay: 2,
      className: "h-20",
      rotate: 135,
    },
    {
      initialX: 1000,
      translateX: 1000 + 1800,
      duration: 4,
      repeatDelay: 2,
      className: "h-12",
      rotate: 135,
    },
    {
      initialX: 1200,
      translateX: 1200 + 1800,
      duration: 6,
      repeatDelay: 4,
      delay: 2,
      className: "h-6",
      rotate: 135,
    },
  ];
  return beams;
}
