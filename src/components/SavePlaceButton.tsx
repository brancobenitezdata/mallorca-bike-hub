"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  placeId: string;
};

export default function SavePlaceButton({ placeId }: Props) {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function checkSaved() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("saved_places")
        .select("id")
        .match({
          place_id: placeId,
          user_id: user.id,
        })
        .single();

      if (data) setSaved(true);
    }

    checkSaved();
  }, [placeId]);

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

    const { data: existingPlace } = await supabase
      .from("saved_places")
      .select("id")
      .match({
        place_id: placeId,
        user_id: user.id,
      })
      .single();

    if (existingPlace) {
      setLoading(false);
      setSaved(true);
      return;
    }

    const { error } = await supabase.from("saved_places").insert({
      place_id: placeId,
      user_id: user.id,
    });

    setLoading(false);

    if (!error) {
      setSaved(true);
    } else {
      alert(error.message);
    }
  }

  return (
    <button
      type="button"
      onClick={handleSave}
      disabled={loading || saved}
      className={`rounded-xl px-5 py-3 font-medium transition ${
        saved
          ? "bg-emerald-400 text-black"
          : "bg-cyan-400 text-black hover:bg-cyan-300"
      }`}
    >
      {loading ? "Saving..." : saved ? "Place saved" : "Save place"}
    </button>
  );
}