"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  routeId: string;
};

export default function SaveRouteButton({ routeId }: Props) {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
useEffect(() => {
  async function checkSaved() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("saved_routes")
      .select("id")
      .match({
        route_id: routeId,
        user_id: user.id,
      })
      .single();

    if (data) {
      setSaved(true);
    }
  }

  checkSaved();
}, [routeId]);
  async function handleSave() {
  setLoading(true);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    setLoading(false);
    alert("Please login first");
    return;
  }
const { data: existingRoute } = await supabase
  .from("saved_routes")
  .select("id")
  .match({
    route_id: routeId,
    user_id: user.id,
  })
  .single();

if (existingRoute) {
  setLoading(false);
  setSaved(true);
  return;
}
  const { error } = await supabase.from("saved_routes").insert({
    route_id: routeId,
    user_id: user.id,
  });

  setLoading(false);

  if (!error) {
    setSaved(true);
  } else {
    alert(error.message);
    console.error("Supabase error:", error);
  }
}

  return (
    <button
      type="button"
      onClick={handleSave}
      disabled={loading || saved}
      className={`rounded-full px-6 py-3 font-medium transition ${
        saved
          ? "bg-emerald-400 text-black"
          : "bg-cyan-400 text-black hover:bg-cyan-300"
      }`}
    >
      {loading ? "Saving..." : saved ? "Route saved" : "Save route"}
    </button>
  );
}