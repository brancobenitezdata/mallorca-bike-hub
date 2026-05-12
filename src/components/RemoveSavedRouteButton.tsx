"use client";

import { supabase } from "@/lib/supabase";

type Props = {
  routeId: string;
};

export default function RemoveSavedRouteButton({ routeId }: Props) {
  async function handleRemove() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      return;
    }

    const { error } = await supabase
      .from("saved_routes")
      .delete()
      .match({
        route_id: routeId,
        user_id: user.id,
      });

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = "/profile";
  }

  return (
    <button
      type="button"
      onClick={handleRemove}
      className="text-sm text-neutral-500 transition hover:text-red-400"
    >
      Remove
    </button>
  );
}