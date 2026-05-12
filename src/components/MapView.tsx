"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useRouter } from "next/navigation";
import { routes } from "@/data/routes";
import L from "leaflet";

type MapViewProps = {
  activeRouteId: string | null;
  setActiveRouteId: (id: string | null) => void;
  setSelectedRouteId: (id: string | null) => void;
};

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function MapView({
  activeRouteId,
  setActiveRouteId,
  setSelectedRouteId,
}: MapViewProps) {
  const router = useRouter();

  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden border">
      <MapContainer
        center={[39.6953, 2.9076]}
        zoom={10}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {routes.map((route) => (
          <Polyline
  key={`line-${route.id}-${activeRouteId}`}
  positions={route.path as [number, number][]}
  pathOptions={{
    color:
      route.difficulty === "Easy"
        ? "green"
        : route.difficulty === "Medium"
        ? "orange"
        : "red",
    weight: activeRouteId === route.id ? 8 : 4,
    opacity: activeRouteId === null || activeRouteId === route.id ? 1 : 0.25,
  }}
  eventHandlers={{
    mouseover: () => setActiveRouteId(route.id),
    mouseout: () => setActiveRouteId(null),
    click: () => setSelectedRouteId(route.id),
  }}
/>
        ))}

        {routes.map((route) => (
          <Marker
            key={route.id}
            position={route.coordinates as [number, number]}
          >
            <Popup>
              <div>
                <strong>{route.name}</strong>
                <br />
                {route.distance} • {route.difficulty}
                <br />
                <button
  type="button"
  onClick={() => setSelectedRouteId(route.id)}
  className="text-blue-600 hover:underline"
>
  View route
</button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}