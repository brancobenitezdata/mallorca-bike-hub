"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { routes } from "@/data/routes";
import { places } from "@/data/places";
import SaveRouteButton from "@/components/SaveRouteButton";
import SavePlaceButton from "@/components/SavePlaceButton";

const ExploreMap = dynamic(() => import("@/components/ExploreMap"), {
  ssr: false,
});

export default function ExplorePage() {
  const [showRoutes, setShowRoutes] = useState(true);
  const [showPlaces, setShowPlaces] = useState(true);
  const [activeRouteId, setActiveRouteId] = useState<string | null>(null);
  const [activePlaceId, setActivePlaceId] = useState<string | null>(null);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const selectedRoute = routes.find((route) => route.id === selectedRouteId);
  const selectedPlace = places.find((place) => place.id === selectedPlaceId);

  const filteredRoutes = routes.filter((route) =>
    route.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPlaces = places.filter(
    (place) =>
      place.name.toLowerCase().includes(search.toLowerCase()) ||
      place.location.toLowerCase().includes(search.toLowerCase()) ||
      place.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 p-8">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-neutral-500">
              Mallorca cycling explorer
            </p>

            <h1 className="mt-4 text-5xl font-bold tracking-tight">
              Explore Mallorca
            </h1>

            <p className="mt-4 max-w-2xl text-neutral-400">
              Discover cycling routes, bike rentals, cafés, shops and services
              across the island.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setShowRoutes((current) => !current)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  showRoutes
                    ? "bg-cyan-400 text-black"
                    : "border border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10"
                }`}
              >
                Routes
              </button>

              <button
                type="button"
                onClick={() => setShowPlaces((current) => !current)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  showPlaces
                    ? "bg-cyan-400 text-black"
                    : "border border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10"
                }`}
              >
                Places
              </button>
            </div>

            <div className="mt-5 max-w-md">
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search routes and places..."
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-cyan-400/40"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[380px_1fr]">
          <aside className="rounded-[32px] border border-white/10 bg-white/5 p-4">
            <h2 className="mb-4 text-lg font-semibold">Explore</h2>

            <div className="max-h-[700px] space-y-3 overflow-y-auto pr-1">
              {showRoutes && (
                <>
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Routes
                  </p>

                  {filteredRoutes.map((route) => (
                    <button
                      key={route.id}
                      type="button"
                      onClick={() => {
                        setSelectedRouteId(route.id);
                        setSelectedPlaceId(null);
                      }}
                      onMouseEnter={() => setActiveRouteId(route.id)}
                      onMouseLeave={() => setActiveRouteId(null)}
                      className={`block w-full rounded-2xl border p-4 text-left transition duration-300 hover:-translate-y-1 ${
                        activeRouteId === route.id ||
                        selectedRouteId === route.id
                          ? "border-cyan-400/30 bg-cyan-400/10"
                          : "border-white/10 bg-black/20 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="font-medium">{route.name}</h3>

                          <p className="mt-1 text-sm text-neutral-400">
                            {route.distance} • {route.duration}
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            route.difficulty === "Easy"
                              ? "bg-green-400/15 text-green-300"
                              : route.difficulty === "Medium"
                              ? "bg-yellow-400/15 text-yellow-300"
                              : "bg-red-400/15 text-red-300"
                          }`}
                        >
                          {route.difficulty}
                        </span>
                      </div>
                    </button>
                  ))}

                  {filteredRoutes.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-6 text-center text-sm text-neutral-500">
                      No routes found.
                    </div>
                  )}
                </>
              )}

              {showPlaces && (
                <>
                  <p className="pt-4 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Places
                  </p>

                  {filteredPlaces.map((place) => (
                    <button
                      key={place.id}
                      type="button"
                      onClick={() => {
                        setSelectedPlaceId(place.id);
                        setSelectedRouteId(null);
                      }}
                      onMouseEnter={() => setActivePlaceId(place.id)}
                      onMouseLeave={() => setActivePlaceId(null)}
                      className={`block w-full rounded-2xl border p-4 text-left transition duration-300 hover:-translate-y-1 ${
                        activePlaceId === place.id ||
                        selectedPlaceId === place.id
                          ? "border-cyan-400/30 bg-cyan-400/10"
                          : "border-white/10 bg-black/20 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="font-medium">{place.name}</h3>

                          <p className="mt-1 text-sm text-neutral-400">
                            {place.location}
                          </p>
                        </div>

                        <span className="rounded-full bg-white/10 px-2 py-1 text-xs font-medium text-neutral-300">
                          {place.category}
                        </span>
                      </div>
                    </button>
                  ))}

                  {filteredPlaces.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-6 text-center text-sm text-neutral-500">
                      No places found.
                    </div>
                  )}
                </>
              )}
            </div>
          </aside>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-4">
            <ExploreMap
              showRoutes={showRoutes}
              showPlaces={showPlaces}
              activeRouteId={activeRouteId}
              setActiveRouteId={setActiveRouteId}
              activePlaceId={activePlaceId}
              setActivePlaceId={setActivePlaceId}
              selectedRouteId={selectedRouteId}
              selectedPlaceId={selectedPlaceId}
              setSelectedRouteId={setSelectedRouteId}
              setSelectedPlaceId={setSelectedPlaceId}
            />
          </div>
        </div>

        {(selectedRoute || selectedPlace) && (
          <div className="fixed inset-0 z-[1000]">
            <button
              type="button"
              aria-label="Close preview"
              onClick={() => {
                setSelectedRouteId(null);
                setSelectedPlaceId(null);
              }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <div className="absolute inset-y-0 right-0 w-full max-w-md border-l border-white/10 bg-neutral-950 p-6 shadow-2xl">
              <button
                type="button"
                onClick={() => {
                  setSelectedRouteId(null);
                  setSelectedPlaceId(null);
                }}
                className="mb-6 text-sm text-neutral-500 transition hover:text-white"
              >
                Close
              </button>

              {selectedRoute && (
                <>
                  <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                    Route
                  </span>

                  <h2 className="mt-4 text-3xl font-bold">
                    {selectedRoute.name}
                  </h2>

                  <p className="mt-4 text-neutral-400">
                    {selectedRoute.description}
                  </p>

                  <div className="mt-6 grid gap-3">
                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-sm text-neutral-500">Distance</p>
                      <p className="font-semibold">{selectedRoute.distance}</p>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-sm text-neutral-500">Duration</p>
                      <p className="font-semibold">{selectedRoute.duration}</p>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-sm text-neutral-500">Elevation</p>
                      <p className="font-semibold">{selectedRoute.elevation}</p>
                    </div>
                  </div>

                  <Link
                    href={`/route/${selectedRoute.id}`}
                    className="mt-8 block rounded-xl bg-cyan-400 px-5 py-3 text-center font-medium text-black transition hover:bg-cyan-300"
                  >
                    Open full route
                  </Link>

                  <div className="mt-3">
  <SaveRouteButton routeId={selectedRoute.id} />
</div>
                </>
              )}

              {selectedPlace && (
                <>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-neutral-300">
                    {selectedPlace.category}
                  </span>

                  <h2 className="mt-4 text-3xl font-bold">
                    {selectedPlace.name}
                  </h2>

                  <p className="mt-2 text-sm text-neutral-500">
                    {selectedPlace.location}
                  </p>

                  <p className="mt-4 text-neutral-400">
                    {selectedPlace.description}
                  </p>

                  <div className="mt-8">
  <SavePlaceButton placeId={selectedPlace.id} />
</div>
                </>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}