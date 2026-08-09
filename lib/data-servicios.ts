import { profile } from "@/lib/data";

export const waBase = `https://wa.me/${profile.whatsapp}`;

export const waLink = (message: string) =>
  `${waBase}?text=${encodeURIComponent(message)}`;