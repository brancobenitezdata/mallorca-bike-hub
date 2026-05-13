"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import AuthNav from "@/components/AuthNav";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
      >
        <Menu size={20} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[2000] bg-black/70 backdrop-blur-sm">
          <div className="absolute right-4 top-4 w-[calc(100%-2rem)] rounded-[32px] border border-white/10 bg-neutral-950 p-6 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-lg font-bold">Mallorca Bike Hub</p>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-4 text-lg font-medium text-neutral-200">
              <Link onClick={() => setOpen(false)} href="/">
                Home
              </Link>

              <Link onClick={() => setOpen(false)} href="/routes">
                Routes
              </Link>

              <Link onClick={() => setOpen(false)} href="/explore">
                Explore
              </Link>

              <Link onClick={() => setOpen(false)} href="/places">
                Places
              </Link>

              <Link onClick={() => setOpen(false)} href="/map">
                Map
              </Link>

              <div className="border-t border-white/10 pt-4">
                <AuthNav />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}