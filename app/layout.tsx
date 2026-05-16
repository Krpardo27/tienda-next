import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToastNotification from "@/src/shared/ui/ToastNotification";

const font = Inter({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Quisco Next.js con App Router y Prisma",
  description: "Quisco Next.js con App Router y Prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head />
      <body className={`${font.className} antialiased`}>
        {children}
        <ToastNotification />
      </body>
    </html>
  );
}