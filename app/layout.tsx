import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://mjtorres.dev"),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}