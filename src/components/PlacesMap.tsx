"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { places } from "@/data/places";

type PlacesMapProps = {
  activePlaceId: string | null;
  setActivePlaceId: (id: string | null) => void;
  setSelectedPlaceId: (id: string | null) => void;
};

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});
function getPlaceIcon(category: string) {
  const icon = category === "Rental"
    ? "🚴"
    : category === "Shop"
    ? "🛠️"
    : category === "Cafe"
    ? "☕"
    : category === "Service"
    ? "📍"
    : "📌";

  return L.divIcon({
    html: `<div style="font-size: 24px;">${icon}</div>`,
    className: "",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}
export default function PlacesMap({
  activePlaceId,
  setActivePlaceId,
  setSelectedPlaceId,
}: PlacesMapProps) {
  return (
    <div className="h-[500px] w-full overflow-hidden rounded-xl border">
      <MapContainer
        center={[39.6953, 2.9076]}
        zoom={9}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {places.map((place) => (
          <Marker
            key={place.id}
            position={place.coordinates as [number, number]}
            icon={getPlaceIcon(place.category)}
            opacity={
              activePlaceId === null || activePlaceId === place.id ? 1 : 0.4
            }
            eventHandlers={{
              mouseover: () => setActivePlaceId(place.id),
              mouseout: () => setActivePlaceId(null),
              click: () => setSelectedPlaceId(place.id),
            }}
          >
            <Popup>
              <div>
                <strong>{place.name}</strong>
                <br />
                {place.category} • {place.location}
                <br />
                <button
                  type="button"
                  onClick={() => setSelectedPlaceId(place.id)}
                  className="text-blue-600 hover:underline"
                >
                  View place
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}