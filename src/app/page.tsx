"use client";

import Link from "next/link";
import { routes } from "@/data/routes";
import { places } from "@/data/places";
import { events } from "@/data/events";
import { Mountain, Waves, Coffee, Dumbbell, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70" />

        <div
          className="min-h-[760px] bg-cover bg-center md:h-[90vh]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2000&auto=format&fit=crop')",
          }}
        />

        <div className="absolute inset-0 flex items-center pt-10 md:pt-0">
          <div className="mx-auto w-full max-w-7xl px-6">
            <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="max-w-3xl"
>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-300">
                Mallorca Bike Hub
              </p>

              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-7xl">
                Discover the best cycling routes in Mallorca
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-300 md:text-lg">
                Explore iconic climbs, coastal roads, cafés, rentals and
                cycling hotspots across the island.
              </p>

              <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
                <Link
                  href="/explore"
                  className="rounded-full bg-white px-6 py-3 text-center font-medium text-black transition hover:bg-neutral-200"
                >
                  Explore map
                </Link>

                <Link
                  href="/routes"
                  className="rounded-full bg-white px-6 py-3 text-center font-medium text-black transition hover:bg-neutral-200"
                >
                  View routes
                </Link>
              </div>

              <motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      },
    },
  }}
  className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3 md:mt-12 md:gap-4"
>
  {[
    { title: "Sa Calobra", label: "Iconic climb", accent: "from-emerald-400/20" },
    { title: "10+ Routes", label: "Curated rides", accent: "from-cyan-400/20" },
    { title: "Bike cafés", label: "Stops & services", accent: "from-fuchsia-400/20" },
  ].map((item) => (
    <motion.div
  key={item.title}
  whileHover={{ y: -10, scale: 1.03 }}
  variants={{
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }}
className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl transition duration-300 hover:border-white/20 hover:bg-white/15"    >
      <div
        className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${item.accent} to-transparent blur-2xl transition duration-500 group-hover:scale-125`}
      />

      <div className="relative">
        <p className="text-lg font-semibold">{item.title}</p>
        <p className="mt-1 text-sm text-neutral-300">{item.label}</p>
      </div>
    </motion.div>
    
    ))}
</motion.div>
</motion.div>
          </div>
        </div>
      </section>

      <motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.7 }}
  className="bg-neutral-950 px-6 py-20"
>
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-4">
          {[
            { value: "10+", label: "Curated cycling routes" },
            { value: "6+", label: "Bike-friendly places" },
            { value: "100%", label: "Mallorca focused" },
            { value: "Live", label: "Interactive map experience" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-4xl font-bold">{stat.value}</p>
              <p className="mt-2 text-sm text-neutral-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.7 }}
  className="bg-neutral-950 px-6 pb-24"
>
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-neutral-500">
                Featured routes
              </p>

              <h2 className="mt-3 text-4xl font-bold tracking-tight">
                Ride Mallorca’s iconic roads
              </h2>
            </div>

            <Link
              href="/routes"
              className="hidden rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/10 sm:block"
            >
              View all routes
            </Link>
          </div>

          <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
 
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }}
  className="grid gap-6 md:grid-cols-3"
>
  {routes.slice(0, 3).map((route) => (
  <motion.div
    key={route.id}
    variants={{
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0 },
    }}
    whileHover={{ y: -10, scale: 1.02 }}
  >
    <Link
    
                
                href={`/route/${route.id}`}
className="group block overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl"              >
                <div
                  className="h-48 bg-cover bg-center transition duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      route.id === "1"
                        ? "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop')"
                        : route.id === "2"
                        ? "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop')"
                        : "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop')",
                  }}
                />

                <div className="p-6">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      route.difficulty === "Easy"
                        ? "bg-green-400/15 text-green-300"
                        : route.difficulty === "Medium"
                        ? "bg-yellow-400/15 text-yellow-300"
                        : "bg-red-400/15 text-red-300"
                    }`}
                  >
                    {route.difficulty}
                  </span>

                  <h3 className="mt-5 text-2xl font-semibold group-hover:underline">
                    {route.name}
                  </h3>

                  <p className="mt-3 text-sm text-neutral-400">
                    {route.distance} • {route.duration} • {route.elevation}
                  </p>

                  <p className="mt-4 text-sm leading-6 text-neutral-300">
                    {route.description}
                  </p>
                </div>
              </Link>
              </motion.div>
            ))}
                    </motion.div>

          <Link
            href="/routes"
            className="mt-8 block rounded-full border border-white/15 px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-white/10 sm:hidden"
          >
            View all routes
          </Link>
        </div>
      </motion.section>

      <section className="bg-neutral-900 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-neutral-500">
                Cycling spots
              </p>

              <h2 className="mt-3 text-4xl font-bold tracking-tight">
                Rentals, cafés and bike services
              </h2>
            </div>

            <Link
              href="/places"
              className="hidden rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/10 sm:block"
            >
              View all places
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {places.slice(0, 3).map((place) => (
              <Link
                key={place.id}
                href="/places"
                className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl"
              >
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-neutral-300">
                  {place.category}
                </span>

                <h3 className="mt-5 text-2xl font-semibold transition group-hover:underline">
                  {place.name}
                </h3>

                <p className="mt-2 text-sm text-neutral-400">
                  {place.location}
                </p>

                <p className="mt-4 text-sm leading-6 text-neutral-300">
                  {place.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
            <section className="relative overflow-hidden bg-neutral-950 px-6 py-24">
<motion.div
  animate={{
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#14532d40,transparent_40%),radial-gradient(circle_at_bottom_right,#0f766e40,transparent_40%)]"
/>
  <div className="relative mx-auto max-w-7xl rounded-[40px] border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
    <div className="mb-10 max-w-3xl">
      <p className="text-sm font-medium uppercase tracking-[0.25em] text-neutral-500">
        Why Mallorca?
      </p>

      <h2 className="mt-3 text-4xl font-bold tracking-tight">
        Built for one of Europe’s cycling capitals
      </h2>

      <p className="mt-4 text-lg text-neutral-400">
        Mallorca combines legendary climbs, coastal roads, cycling cafés,
        bike-friendly towns and year-round training conditions.
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-4">
      {[
  {
    title: "Iconic climbs",
    text: "Ride famous roads like Sa Calobra, Puig Major and Formentor.",
    icon: Mountain,
  },
  {
    title: "Coastal roads",
    text: "Explore scenic routes with sea views and smooth terrain.",
    icon: Waves,
  },
  {
    title: "Cycling culture",
    text: "Find cafés, rentals, shops and services built around riders.",
    icon: Coffee,
  },
  {
    title: "Training island",
    text: "Plan easy spins, endurance days or serious mountain sessions.",
    icon: Dumbbell,
  },
].map((item) => {
  const Icon = item.icon;

  return (
        <div
          key={item.title}
          className="rounded-3xl border border-white/10 bg-black/20 p-6 transition duration-300 hover:-translate-y-2 hover:border-emerald-400/20 hover:bg-white/10"
        >
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
  <Icon size={28} strokeWidth={2.2} />
</div>
          <h3 className="text-xl font-semibold">{item.title}</h3>
          <p className="mt-3 text-sm leading-6 text-neutral-400">
            {item.text}
          </p>
        </div>
      );
})}
    </div>
  </div>
</section>
<section className="bg-neutral-950 px-6 py-24">
  <div className="mx-auto max-w-7xl">
    <div className="mb-10 flex items-end justify-between gap-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-neutral-500">
          Upcoming events
        </p>

        <h2 className="mt-3 text-4xl font-bold tracking-tight">
          Cycling events in Mallorca
        </h2>
      </div>
    </div>

    <div className="grid gap-6 md:grid-cols-3">
      {events.map((event) => (
        <div
  key={event.id}
  className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-cyan-500/10 p-6 transition duration-300 hover:-translate-y-2 hover:border-fuchsia-400/20 hover:bg-white/10"
>
<motion.div
  animate={{
    scale: [1, 1.2, 1],
    opacity: [0.4, 0.8, 0.4],
  }}
  transition={{
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl"
/>
  <div className="relative">
    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-fuchsia-300">
      <CalendarDays size={28} strokeWidth={2.2} />
    </div>

    <p className="text-sm font-medium text-fuchsia-200">
      {event.date}
    </p>

    <h3 className="mt-3 text-2xl font-semibold">
      {event.name}
    </h3>

    <p className="mt-2 text-sm text-neutral-400">
      {event.location}
    </p>

    <p className="mt-5 text-sm leading-6 text-neutral-300">
      {event.description}
    </p>
  </div>
</div>
      ))}
    </div>
  </div>
</section>
      <section className="bg-neutral-950 px-6 py-28">
        <div className="mx-auto max-w-4xl rounded-[40px] border border-white/10 bg-white/5 px-8 py-16 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-500">
            Start exploring
          </p>

          <h2 className="mt-6 text-5xl font-bold tracking-tight">
            Plan your next ride in Mallorca
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400">
            Discover legendary climbs, cycling cafés, bike rentals and curated
            routes across the island.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/explore"
              className="rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-neutral-200"
            >
              Explore map
            </Link>

            <Link
              href="/routes"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-medium text-white transition hover:bg-white/10"
            >
              Browse routes
            </Link>

            <Link
              href="/places"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-medium text-white transition hover:bg-white/10"
            >
              Discover places
            </Link>
          </div>
        </div>
      </section>
      <footer className="border-t border-white/10 bg-neutral-950 px-6 py-10">
  <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
    <div>
      <p className="text-lg font-bold">Mallorca Bike Hub</p>
      <p className="mt-2 text-sm text-neutral-500">
        Built for cyclists exploring Mallorca.
      </p>
    </div>

    <div className="flex flex-wrap gap-4 text-sm text-neutral-400">
      <Link href="/routes" className="transition hover:text-white">
        Routes
      </Link>
      <Link href="/places" className="transition hover:text-white">
        Places
      </Link>
      <Link href="/explore" className="transition hover:text-white">
        Explore
      </Link>
      <Link href="/map" className="transition hover:text-white">
        Map
      </Link>
    </div>
  </div>
</footer>
    </main>
  );
}