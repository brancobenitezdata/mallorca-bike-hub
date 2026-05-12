export default function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-10">
      <section className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-neutral-950">
          Mallorca Bike Hub
        </h1>

        <p className="mt-6 text-lg text-neutral-600">
          A cycling web app built to explore routes across Mallorca.
        </p>

        <div className="mt-8 space-y-4 text-neutral-700">
          <p>
            This project allows cyclists to discover curated routes,
            visualize them on a map and explore detailed information
            including distance, elevation and difficulty.
          </p>

          <p>
            Built with Next.js, Tailwind CSS and Leaflet.
          </p>
        </div>
      </section>
    </main>
  );
}