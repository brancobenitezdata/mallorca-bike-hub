"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Props = {
  routeId: string;
};

export default function RemoveSavedRouteButton({ routeId }: Props) {
  const router = useRouter();

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
  .eq("route_id", routeId)
  .eq("user_id", user.id);

    if (error) {
      alert(error.message);
      return;
    }

    router.refresh();
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