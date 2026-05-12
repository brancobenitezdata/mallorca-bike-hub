"use client";
import Link from "next/link";
import { routes } from "@/data/routes";
import { useEffect, useState } from "react";

export default function RoutesPage() {
    const [filter, setFilter] = useState("All");
const [search, setSearch] = useState("");
const [sort, setSort] = useState("default");
const [favorites, setFavorites] = useState<string[]>([]);
useEffect(() => {
  const savedFavorites = localStorage.getItem("favoriteRoutes");

  if (savedFavorites) {
    setFavorites(JSON.parse(savedFavorites));
  }
}, []);

useEffect(() => {
  localStorage.setItem("favoriteRoutes", JSON.stringify(favorites));
}, [favorites]);

function toggleFavorite(routeId: string) {
  setFavorites((currentFavorites) =>
    currentFavorites.includes(routeId)
      ? currentFavorites.filter((id) => id !== routeId)
      : [...currentFavorites, routeId]
  );
}

const filteredRoutes = routes
  .filter((route) => {
    if (filter === "All") return true;
    if (filter === "Saved") return favorites.includes(route.id);
    return route.difficulty === filter;
  })
  .filter((route) =>
    route.name.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => {
    if (sort === "distance") {
      return parseInt(a.distance) - parseInt(b.distance);
    }

    if (sort === "duration") {
      return parseInt(a.duration) - parseInt(b.duration);
    }

    return 0;
  });
  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-10">
        <div className="mb-6 flex gap-2">
  {["All", "Easy", "Medium", "Hard", "Saved"].map((level) => (
    <button
      key={level}
      onClick={() => setFilter(level)}
      className={`px-4 py-2 rounded-full text-sm border ${
        filter === level
          ? "bg-black text-white border-black"
          : "bg-white text-neutral-600 border-neutral-300 hover:bg-neutral-100"
      }`}
    >
      {level}
    </button>
  ))}
</div>
<div className="mb-6">
  <input
    type="text"
    value={search}
    onChange={(event) => setSearch(event.target.value)}
    placeholder="Search routes..."
    className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
  />
  <div className="mb-6">
  <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
    className="rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm"
  >
    <option value="default">Sort by</option>
    <option value="distance">Distance</option>
    <option value="duration">Duration</option>
  </select>
</div>
</div>
      <section className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-neutral-500">
            Mallorca cycling routes
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-neutral-950">
            Explore routes
          </h1>

          <p className="mt-3 max-w-2xl text-neutral-600">
            Discover curated cycling routes across Mallorca, from relaxed coastal rides to legendary climbs.
          </p>
        </div>
        <p className="mt-4 text-sm text-neutral-500">
  {filteredRoutes.length}{" "}
  {filteredRoutes.length === 1 ? "route" : "routes"} found
</p>
        <div className="grid gap-5">
            {filteredRoutes.length === 0 && (
  <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center text-neutral-500">
    No routes found.
  </div>
)}
          {filteredRoutes.map((route) => (
            <Link
              key={route.id}
              href={`/route/${route.id}`}
              className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-neutral-950 group-hover:underline">
                    {route.name}
                  </h2>

                  <p className="mt-2 text-neutral-600">
                    {route.distance} • {route.duration} • {route.elevation}
                  </p>

                  <p className="mt-2 text-sm text-neutral-500">
                    Start: {route.startLocation}
                  </p>
                </div>
<button
  type="button"
  onClick={(event) => {
    event.preventDefault();
    toggleFavorite(route.id);
  }}
  className="rounded-full border border-neutral-200 px-3 py-1 text-sm transition hover:bg-neutral-100"
>
  {favorites.includes(route.id) ? "♥ Saved" : "♡ Save"}
</button>
                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
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
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}