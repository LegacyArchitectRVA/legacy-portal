import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convex redacts the .message on any thrown error to a generic "Server
 * Error" in production, regardless of whether it was a plain Error or a
 * ConvexError. The actual custom text passed to `throw new ConvexError(...)`
 * only survives on the `.data` property, not `.message`. Use this wherever
 * a Convex action or mutation's error gets shown to a user, instead of
 * reading `err.message` directly, or the specific reason a call failed
 * (wrong email, missing scope, whatever it is) never reaches the screen.
 */
export function getErrorMessage(err: unknown, fallback: string): string {
  const data = (err as any)?.data;
  if (typeof data === "string" && data.trim()) return data;
  const message = (err as any)?.message;
  if (
    typeof message === "string" &&
    message.trim() &&
    message !== "Server Error"
  ) {
    return message;
  }
  return fallback;
}
