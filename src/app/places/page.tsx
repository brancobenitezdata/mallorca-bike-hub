"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { places } from "@/data/places";

const PlacesMap = dynamic(() => import("@/components/PlacesMap"), {
  ssr: false,
});

export default function PlacesPage() {
  const [activePlaceId, setActivePlaceId] = useState<string | null>(null);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [favoritePlaces, setFavoritePlaces] = useState<string[]>([]);
  useEffect(() => {
  const savedFavorites = localStorage.getItem("favoritePlaces");

  if (savedFavorites) {
    setFavoritePlaces(JSON.parse(savedFavorites));
  }
}, []);

useEffect(() => {
  localStorage.setItem("favoritePlaces", JSON.stringify(favoritePlaces));
}, [favoritePlaces]);

function toggleFavoritePlace(placeId: string) {
  setFavoritePlaces((currentFavorites) =>
    currentFavorites.includes(placeId)
      ? currentFavorites.filter((id) => id !== placeId)
      : [...currentFavorites, placeId]
  );
}
  const selectedPlace = places.find((place) => place.id === selectedPlaceId);

  const filteredPlaces = places
  
  .filter((place) => {
    if (categoryFilter === "All") return true;
    return place.category === categoryFilter;
  })
  .filter((place) =>
    place.name.toLowerCase().includes(search.toLowerCase()) ||
    place.location.toLowerCase().includes(search.toLowerCase()) ||
    place.category.toLowerCase().includes(search.toLowerCase())
  );
  function getCategoryIcon(category: string) {
  if (category === "Rental") return "🚴";
  if (category === "Shop") return "🛠️";
  if (category === "Cafe") return "☕";
  if (category === "Service") return "📍";

  return "📌";
}
  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-10">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-neutral-500">
            Mallorca cycling spots
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-neutral-950">
            Bike rentals, cafés & shops
          </h1>

          <p className="mt-3 max-w-2xl text-neutral-600">
            Discover cycling-friendly places across Mallorca.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-neutral-950">
              Places
            </h2>
            <div className="mb-4 flex flex-wrap gap-2">
  {["All", "Rental", "Shop", "Cafe", "Service"].map((category) => (
    <button
      key={category}
      type="button"
      onClick={() => setCategoryFilter(category)}
      className={`rounded-full px-3 py-1 text-xs font-medium transition ${
        categoryFilter === category
          ? "bg-black text-white"
          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
      }`}
    >
      {category}
    </button>
    
  ))}
  <div className="mb-4">
  <input
    type="text"
    value={search}
    onChange={(event) => setSearch(event.target.value)}
    placeholder="Search places..."
    className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
  />
</div>
</div>
            <div className="max-h-[600px] space-y-3 overflow-y-auto pr-1">
              {filteredPlaces.map((place) => (
                <button
                  key={place.id}
                  type="button"
                  onClick={() => setSelectedPlaceId(place.id)}
                  onMouseEnter={() => setActivePlaceId(place.id)}
                  onMouseLeave={() => setActivePlaceId(null)}
                  className={`block w-full rounded-2xl border p-4 text-left transition ${
                    activePlaceId === place.id || selectedPlaceId === place.id
                      ? "border-neutral-950 bg-neutral-50 shadow-sm"
                      : "border-neutral-200 hover:bg-neutral-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-medium text-neutral-950">
                        {place.name}
                      </h3>

                      <p className="mt-1 text-sm text-neutral-500">
                        {place.location}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
  {favoritePlaces.includes(place.id) && (
    <span className="rounded-full bg-black px-2 py-1 text-xs font-medium text-white">
      Saved
    </span>
  )}

  <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600">
    {getCategoryIcon(place.category)} {place.category}
  </span>
</div>
                  </div>
                </button>
              ))}
              {filteredPlaces.length === 0 && (
  <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-6 text-center text-sm text-neutral-500">
    No places found.
  </div>
)}
            </div>
          </aside>

          <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
            <PlacesMap
              activePlaceId={activePlaceId}
              setActivePlaceId={setActivePlaceId}
              setSelectedPlaceId={setSelectedPlaceId}
            />
          </div>
        </div>

        {selectedPlace && (
          <div className="fixed inset-0 z-[1000]">
            <button
              type="button"
              aria-label="Close place preview"
              onClick={() => setSelectedPlaceId(null)}
              className="absolute inset-0 bg-black/40"
            />

            <div className="absolute inset-y-0 right-0 w-full max-w-md border-l border-neutral-200 bg-white p-6 shadow-2xl">
              <button
                type="button"
                onClick={() => setSelectedPlaceId(null)}
                className="mb-6 text-sm text-neutral-500 hover:underline"
              >
                Close
              </button>

              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                {getCategoryIcon(selectedPlace.category)} {selectedPlace.category}
              </span>

              <h2 className="mt-4 text-3xl font-bold text-neutral-950">
                {selectedPlace.name}
              </h2>
                
              <p className="mt-2 text-sm text-neutral-500">
                {selectedPlace.location}
              </p>

              <p className="mt-4 text-neutral-600">
                {selectedPlace.description}
              </p>
              <button
  type="button"
  onClick={() => toggleFavoritePlace(selectedPlace.id)}
  className={`mt-6 rounded-xl px-4 py-3 text-sm font-medium transition ${
    favoritePlaces.includes(selectedPlace.id)
      ? "bg-black text-white"
      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
  }`}
>
  {favoritePlaces.includes(selectedPlace.id) ? "Saved" : "Save place"}
</button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}