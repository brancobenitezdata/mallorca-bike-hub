"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

type RouteMapProps = {
  route: {
    name: string;
    difficulty: string;
    coordinates: number[];
    path: number[][];
  };
};

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function RouteMap({ route }: RouteMapProps) {
  return (
    <div className="mt-8 h-[350px] w-full rounded-xl overflow-hidden border">
      <MapContainer
        center={route.coordinates as [number, number]}
        zoom={12}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline
          positions={route.path as [number, number][]}
          color={
            route.difficulty === "Easy"
              ? "green"
              : route.difficulty === "Medium"
              ? "orange"
              : "red"
          }
        />

        <Marker position={route.coordinates as [number, number]}>
          <Popup>{route.name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}