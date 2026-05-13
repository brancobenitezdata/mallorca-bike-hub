import { routes } from "@/data/routes";
import { notFound } from "next/navigation";
import RouteMapClient from "@/components/RouteMapClient";
import SaveRouteButton from "@/components/SaveRouteButton";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RouteDetailPage({ params }: Props) {
  const { id } = await params;

  const route = routes.find((item) => item.id === id);

  if (!route) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="relative min-h-[520px] overflow-hidden md:h-[60vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000&auto=format&fit=crop')",
          }}
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative mx-auto flex h-full max-w-7xl items-end px-6 pb-10 md:pb-16">
          <div>
            <span className="rounded-full bg-red-400/15 px-3 py-1 text-sm font-medium text-red-300">
              {route.difficulty}
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
              {route.name}
            </h1>

            <p className="mt-4 text-lg text-neutral-300">
              {route.distance} • {route.duration} • {route.elevation}
            </p>
            <div className="mt-8">
  <SaveRouteButton routeId={route.id} />
</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            {
              label: "Distance",
              value: route.distance,
            },
            {
              label: "Duration",
              value: route.duration,
            },
            {
              label: "Elevation",
              value: route.elevation,
            },
            {
              label: "Difficulty",
              value: route.difficulty,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[32px] border border-white/10 bg-white/5 p-6"
            >
              <p className="text-sm text-neutral-500">
                {item.label}
              </p>

              <p className="mt-3 text-3xl font-bold">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
            Route overview
          </p>

          <h2 className="mt-3 text-3xl md:text-4xl font-bold">
            About this ride
          </h2>

          <p className="mt-6 text-lg leading-8 text-neutral-400">
            {route.description}
          </p>
        </div>
        <section className="mt-20">
  <div className="mb-8">
    <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
      Highlights
    </p>

    <h2 className="mt-3 text-3xl md:text-4xl font-bold">
      What makes this route special
    </h2>
  </div>

  <div className="grid gap-6 md:grid-cols-4">
    {[
      {
        title: "Epic climbs",
        text: "Long mountain ascents with legendary cycling segments.",
      },
      {
        title: "Sea views",
        text: "Ride coastal roads with panoramic Mediterranean scenery.",
      },
      {
        title: "Coffee stops",
        text: "Discover cyclist-friendly cafés across the route.",
      },
      {
        title: "Perfect training",
        text: "Ideal terrain for endurance and climbing sessions.",
      },
    ].map((item) => (
      <div
        key={item.title}
        className="group rounded-[32px] border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/20 hover:bg-white/10"
      >
        <h3 className="text-2xl font-semibold">
          {item.title}
        </h3>

        <p className="mt-4 leading-7 text-neutral-400">
          {item.text}
        </p>
      </div>
    ))}
  </div>
</section>
<section className="mt-20">
  <div className="mb-8">
    <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
      Route map
    </p>

    <h2 className="mt-3 text-3xl md:text-4xl font-bold">
      Explore the route
    </h2>
  </div>

  <div className="overflow-hidden rounded-[40px] border border-white/10 bg-white/5 p-4">
    <RouteMapClient route={route} />
  </div>
</section>
<section className="mt-20">
  <div className="mb-8">
    <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
      Elevation profile
    </p>

    <h2 className="mt-3 text-3xl md:text-4xl font-bold">
      Climbing analysis
    </h2>
  </div>

  <div className="overflow-hidden rounded-[40px] border border-white/10 bg-white/5 p-8">
    <div className="relative h-[240px] w-full overflow-hidden rounded-[28px] bg-gradient-to-b from-cyan-400/10 to-transparent">
      <svg
        viewBox="0 0 1000 240"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0 220
             C120 210, 180 120, 260 130
             C340 140, 380 40, 460 60
             C540 80, 620 200, 700 180
             C780 160, 840 70, 920 90
             C960 100, 1000 40, 1000 40
             L1000 240 L0 240 Z"
          className="fill-cyan-400/30"
        />

        <path
          d="M0 220
             C120 210, 180 120, 260 130
             C340 140, 380 40, 460 60
             C540 80, 620 200, 700 180
             C780 160, 840 70, 920 90
             C960 100, 1000 40, 1000 40"
          className="stroke-cyan-300"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute bottom-4 left-6 right-6 flex justify-between text-xs text-neutral-500">
        <span>0 km</span>
        <span>25 km</span>
        <span>50 km</span>
        <span>75 km</span>
        <span>100 km</span>
      </div>
    </div>

    <div className="mt-8 grid gap-6 md:grid-cols-3">
      <div className="rounded-2xl bg-black/20 p-5">
        <p className="text-sm text-neutral-500">
          Total elevation
        </p>

        <p className="mt-2 text-3xl font-bold">
          {route.elevation}
        </p>
      </div>

      <div className="rounded-2xl bg-black/20 p-5">
        <p className="text-sm text-neutral-500">
          Avg gradient
        </p>

        <p className="mt-2 text-3xl font-bold">
          6.4%
        </p>
      </div>

      <div className="rounded-2xl bg-black/20 p-5">
        <p className="text-sm text-neutral-500">
          Max altitude
        </p>

        <p className="mt-2 text-3xl font-bold">
          1,240m
        </p>
      </div>
    </div>
  </div>
</section>
      </section>
    </main>
  );
}