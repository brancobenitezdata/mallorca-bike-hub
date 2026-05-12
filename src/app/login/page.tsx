"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSignUp() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = "/profile";
  }

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = "/profile";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-white">
      <div className="w-full max-w-md rounded-[40px] border border-white/10 bg-white/5 p-8">
        <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
          Mallorca Bike Hub
        </p>

        <h1 className="mt-4 text-4xl font-bold">
          Welcome back
        </h1>

        <p className="mt-3 text-neutral-400">
          Login or create your cycling account.
        </p>

        <div className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 outline-none transition focus:border-cyan-400/40"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 outline-none transition focus:border-cyan-400/40"
          />
        </div>

        <div className="mt-8 grid gap-3">
          <button
  type="button"
  onClick={handleLogin}
  className="rounded-2xl bg-cyan-400 px-5 py-4 font-semibold text-black transition hover:bg-cyan-300"
>
  Login
</button>

<button
  type="button"
  onClick={handleSignUp}
  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-semibold transition hover:bg-white/10"
>
  Create account
</button>
        </div>
      </div>
    </main>
  );
}