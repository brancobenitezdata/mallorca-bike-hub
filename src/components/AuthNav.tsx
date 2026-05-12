"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AuthNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setIsLoggedIn(Boolean(user));
  }

  checkUser();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setIsLoggedIn(Boolean(session?.user));
  });

  return () => {
    subscription.unsubscribe();
  };
}, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    window.location.href = "/";
  }

  if (!isLoggedIn) {
    return (
      <Link href="/login" className="transition hover:text-cyan-300">
        Login
      </Link>
    );
  }

  return (
    <>
      <Link href="/profile" className="transition hover:text-cyan-300">
        Profile
      </Link>

      <button
        type="button"
        onClick={handleLogout}
        className="transition hover:text-red-400"
      >
        Logout
      </button>
    </>
  );
}