"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { routes } from "@/data/routes";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
});

export default function MapPage() {
  const [activeRouteId, setActiveRouteId] = useState<string | null>(null);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [search, setSearch] = useState("");

  const selectedRoute = routes.find((route) => route.id === selectedRouteId);

  const filteredRoutes = routes
  .filter((route) => {
    if (difficultyFilter === "All") return true;
    return route.difficulty === difficultyFilter;
  })
  .filter((route) =>
    route.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-10">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-neutral-500">
            Mallorca cycling map
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-neutral-950">
            Explore routes on map
          </h1>

          <p className="mt-3 max-w-2xl text-neutral-600">
            Browse cycling routes and explore them visually across Mallorca.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-neutral-950">
              Routes
            </h2>
            <div className="mb-4 flex flex-wrap gap-2">
  {["All", "Easy", "Medium", "Hard"].map((level) => (
    <button
      key={level}
      type="button"
      onClick={() => setDifficultyFilter(level)}
      className={`rounded-full px-3 py-1 text-xs font-medium transition ${
        difficultyFilter === level
          ? "bg-black text-white"
          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
      }`}
    >
      {level}
    </button>
  ))}
</div>

<div className="mb-4">
  <input
    type="text"
    value={search}
    onChange={(event) => setSearch(event.target.value)}
    placeholder="Search routes..."
    className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
  />
</div>

<div className="max-h-[600px] space-y-3 overflow-y-auto pr-1">
              {filteredRoutes.map((route) => (
                <button
                  key={route.id}
                  type="button"
                  onClick={() => setSelectedRouteId(route.id)}
                  onMouseEnter={() => setActiveRouteId(route.id)}
                  onMouseLeave={() => setActiveRouteId(null)}
                  className={`block w-full rounded-2xl border p-4 text-left transition ${
                    activeRouteId === route.id || selectedRouteId === route.id
                      ? "border-neutral-950 bg-neutral-50 shadow-sm"
                      : "border-neutral-200 hover:bg-neutral-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-medium text-neutral-950">
                        {route.name}
                      </h3>

                      <p className="mt-1 text-sm text-neutral-500">
                        {route.distance} • {route.duration}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        route.difficulty === "Easy"
                          ? "bg-green-100 text-green-700"
                          : route.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {route.difficulty}
                    </span>
                  </div>
                </button>
                
              ))}
              {filteredRoutes.length === 0 && (
                <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-6 text-center text-sm text-neutral-500">
                  No routes found.
                </div>
              )}
            </div>
          </aside>

          <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
            <MapView
  activeRouteId={activeRouteId}
  setActiveRouteId={setActiveRouteId}
  setSelectedRouteId={setSelectedRouteId}
/>
          </div>
        </div>

{selectedRoute && (
  <div className="fixed inset-0 z-[1000]">
    <button
      type="button"
      aria-label="Close route preview"
      onClick={() => setSelectedRouteId(null)}
      className="absolute inset-0 bg-black/40"
    />

    <div className="absolute inset-y-0 right-0 w-full max-w-md border-l border-neutral-200 bg-white p-6 shadow-2xl">            <button
              type="button"
              onClick={() => setSelectedRouteId(null)}
              className="mb-6 text-sm text-neutral-500 hover:underline"
            >
              Close
            </button>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                selectedRoute.difficulty === "Easy"
                  ? "bg-green-100 text-green-700"
                  : selectedRoute.difficulty === "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {selectedRoute.difficulty}
            </span>

            <h2 className="mt-4 text-3xl font-bold text-neutral-950">
              {selectedRoute.name}
            </h2>

            <p className="mt-4 text-neutral-600">
              {selectedRoute.description}
            </p>

            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl bg-neutral-50 p-4">
                <p className="text-sm text-neutral-500">Distance</p>
                <p className="font-semibold">{selectedRoute.distance}</p>
              </div>

              <div className="rounded-2xl bg-neutral-50 p-4">
                <p className="text-sm text-neutral-500">Duration</p>
                <p className="font-semibold">{selectedRoute.duration}</p>
              </div>

              <div className="rounded-2xl bg-neutral-50 p-4">
                <p className="text-sm text-neutral-500">Elevation</p>
                <p className="font-semibold">{selectedRoute.elevation}</p>
              </div>
            </div>

            <Link
              href={`/route/${selectedRoute.id}`}
              className="mt-8 block rounded-xl bg-black px-5 py-3 text-center font-medium text-white transition hover:bg-neutral-800"
            >
              Open full route
            </Link>
             </div>
  </div>
)}
      </section>
    </main>
  );
}