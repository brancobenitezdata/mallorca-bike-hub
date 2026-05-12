"use client";

import { useEffect, useState } from "react";
import { routes } from "@/data/routes";
import { places } from "@/data/places";
import { supabase } from "@/lib/supabase";
import RemoveSavedRouteButton from "@/components/RemoveSavedRouteButton";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [savedRouteIds, setSavedRouteIds] = useState<string[]>([]);
  const [savedPlaceIds, setSavedPlaceIds] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function loadSavedRoutes() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
  router.push("/login");
  
  return;
}
const { data: placesData } = await supabase
  .from("saved_places")
  .select("place_id")
  .eq("user_id", user.id);

setSavedPlaceIds(placesData?.map((item) => item.place_id) ?? []);

      const { data } = await supabase
        .from("saved_routes")
        .select("route_id")
        .eq("user_id", user.id);

      setSavedRouteIds(data?.map((item) => item.route_id) ?? []);
    }

    loadSavedRoutes();
 }, [router]);

  const savedRoutes = routes.filter((route) =>
    savedRouteIds.includes(route.id)
  );
  const savedPlaces = places.filter((place) =>
  savedPlaceIds.includes(place.id)
);

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[40px] border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
            Rider profile
          </p>

          <h1 className="mt-4 text-4xl font-bold">Your cycling dashboard</h1>

          <p className="mt-3 max-w-2xl text-neutral-400">
            Track your saved routes, favorite places, bike setup and cycling
            activity in Mallorca.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-400/20 text-3xl font-bold text-cyan-300">
                B
              </div>

              <div>
                <h2 className="text-2xl font-bold">Branco Benitez</h2>
                <p className="text-sm text-neutral-400">
                  Mallorca road cyclist
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl bg-black/20 p-4">
                <p className="text-sm text-neutral-500">Bike</p>
                <p className="mt-1 font-semibold">Canyon Ultimate CF SL</p>
              </div>

              <div className="rounded-2xl bg-black/20 p-4">
                <p className="text-sm text-neutral-500">Favorite climb</p>
                <p className="mt-1 font-semibold">Sa Calobra</p>
              </div>

              <div className="rounded-2xl bg-black/20 p-4">
                <p className="text-sm text-neutral-500">Level</p>
                <p className="mt-1 font-semibold text-cyan-300">
                  Advanced rider
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { value: "2,480", label: "Kilometers ridden" },
              { value: "18", label: "Routes completed" },
              { value: "6", label: "Events joined" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-[32px] border border-white/10 bg-white/5 p-6"
              >
                <p className="text-4xl font-bold">{stat.value}</p>
                <p className="mt-2 text-sm text-neutral-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
              Saved routes
            </p>

            <h2 className="mt-2 text-3xl font-bold">Your favorite rides</h2>
          </div>

          {savedRoutes.length === 0 ? (
            <div className="rounded-[32px] border border-dashed border-white/10 bg-white/5 p-8 text-center text-neutral-400">
              No saved routes yet.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {savedRoutes.map((route) => (
                <div
                  key={route.id}
                  className="group rounded-[32px] border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/20 hover:bg-white/10"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                      Saved
                    </span>

                    <RemoveSavedRouteButton routeId={route.id} />
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold">
                    {route.name}
                  </h3>

                  <p className="mt-3 text-sm text-neutral-400">
                    {route.distance} • {route.elevation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
<div className="mt-10">
  <div className="mb-6">
    <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
      Saved places
    </p>

    <h2 className="mt-2 text-3xl font-bold">Your favorite cycling spots</h2>
  </div>

  {savedPlaces.length === 0 ? (
    <div className="rounded-[32px] border border-dashed border-white/10 bg-white/5 p-8 text-center text-neutral-400">
      No saved places yet.
    </div>
  ) : (
    <div className="grid gap-6 md:grid-cols-3">
      {savedPlaces.map((place) => (
        <div
          key={place.id}
          className="group rounded-[32px] border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/20 hover:bg-white/10"
        >
          <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
            {place.category}
          </span>

          <h3 className="mt-6 text-2xl font-semibold">{place.name}</h3>

          <p className="mt-3 text-sm text-neutral-400">{place.location}</p>
        </div>
      ))}
    </div>
  )}
</div>
        <div className="mt-10">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
              Recent activity
            </p>

            <h2 className="mt-2 text-3xl font-bold">Latest rides</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                ride: "Sa Calobra Morning Ride",
                date: "2 days ago",
                stats: "92 km • 2300 m elevation",
              },
              {
                ride: "Formentor Sunset Spin",
                date: "5 days ago",
                stats: "64 km • 1200 m elevation",
              },
              {
                ride: "Palma Recovery Ride",
                date: "1 week ago",
                stats: "38 km • 250 m elevation",
              },
            ].map((activity) => (
              <div
                key={activity.ride}
                className="flex items-center justify-between rounded-[28px] border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/20 hover:bg-white/10"
              >
                <div>
                  <h3 className="text-lg font-semibold">{activity.ride}</h3>

                  <p className="mt-1 text-sm text-neutral-400">
                    {activity.stats}
                  </p>
                </div>

                <div className="text-sm text-neutral-500">
                  {activity.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
              Achievements
            </p>

            <h2 className="mt-2 text-3xl font-bold">Your rider badges</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                badge: "Climber",
                description: "Completed 5 mountain routes.",
                icon: "⛰️",
              },
              {
                badge: "Explorer",
                description: "Saved routes across the island.",
                icon: "🧭",
              },
              {
                badge: "Coffee Rider",
                description: "Visited cycling cafés.",
                icon: "☕",
              },
              {
                badge: "Mallorca Local",
                description: "Rode in 4 different regions.",
                icon: "🌴",
              },
            ].map((item) => (
              <div
                key={item.badge}
                className="rounded-[28px] border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/20 hover:bg-white/10"
              >
                <div className="text-4xl">{item.icon}</div>

                <h3 className="mt-5 text-xl font-semibold">{item.badge}</h3>

                <p className="mt-3 text-sm leading-6 text-neutral-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
              Upcoming rides
            </p>

            <h2 className="mt-2 text-3xl font-bold">Planned sessions</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                route: "Sa Calobra Challenge",
                date: "Sunday • 07:00",
                type: "Climbing session",
              },
              {
                route: "Formentor Sunrise Ride",
                date: "Tuesday • 06:30",
                type: "Endurance ride",
              },
            ].map((ride) => (
              <div
                key={ride.route}
                className="flex items-center justify-between rounded-[28px] border border-white/10 bg-white/5 p-5 transition duration-300 hover:border-cyan-400/20 hover:bg-white/10"
              >
                <div>
                  <h3 className="text-xl font-semibold">{ride.route}</h3>

                  <p className="mt-1 text-sm text-neutral-400">
                    {ride.type}
                  </p>
                </div>

                <div className="rounded-full bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
                  {ride.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
              Bike garage
            </p>

            <h2 className="mt-2 text-3xl font-bold">Your setup</h2>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-white/5 to-transparent p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-medium text-cyan-300">
                  Primary bike
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  Canyon Ultimate CF SL
                </h3>

                <p className="mt-3 max-w-xl text-neutral-400">
                  Lightweight road setup for climbs, endurance rides and fast
                  coastal routes.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Groupset", value: "Shimano 105" },
                  { label: "Wheels", value: "Carbon 45mm" },
                  { label: "Use", value: "Road / Climb" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <p className="text-sm text-neutral-500">{item.label}</p>
                    <p className="mt-1 font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}