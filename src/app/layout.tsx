import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import AuthNav from "@/components/AuthNav";
import { Menu } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mallorca Bike Hub",
  description: "The ultimate cycling experience in Mallorca",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full bg-neutral-950 text-white">
        <nav className="sticky top-0 z-[1000] border-b border-white/5 bg-black/60 backdrop-blur-2xl">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
            <Link
              href="/"
              className="text-2xl font-black tracking-tight text-white"
            >
              Mallorca Bike Hub
            </Link>

            <div className="hidden items-center gap-6 text-sm font-medium text-neutral-400 md:flex">
              <Link href="/" className="transition hover:text-cyan-300">
                Home
              </Link>

              <Link
                href="/routes"
                className="transition hover:text-cyan-300"
              >
                Routes
              </Link>

              <Link href="/map" className="transition hover:text-cyan-300">
                Map
                
              </Link>

              <Link
                href="/places"
                className="transition hover:text-cyan-300"
              >
                Places
              </Link>

              <Link
                href="/explore"
                className="transition hover:text-cyan-300"
              >
                Explore
              </Link>
              <AuthNav />
              <Link
                href="/about"
                className="transition hover:text-cyan-300"
              >
                About
              </Link>
            </div>
            <button
  type="button"
  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
>
  <Menu size={20} />
</button>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}