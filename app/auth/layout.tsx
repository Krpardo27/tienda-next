import Logo from "@/src/components/ui/Logo";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-zinc-100 px-4 flex flex-col items-center pt-4 pb-12">
      {/* HEADER */}
      <header className="w-full flex justify-center px-6">
        <Link href="/">
          <Logo />
        </Link>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex flex-col items-center justify-between w-full mt-4">
        {children}
      </main>
    </div>
  );
}
