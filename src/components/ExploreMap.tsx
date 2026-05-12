"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { routes } from "@/data/routes";
import { places } from "@/data/places";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function getPlaceIcon(category: string) {
  const icon =
    category === "Rental"
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
function ZoomController({
  activeRouteId,
  activePlaceId,
}: {
  activeRouteId: string | null;
  activePlaceId: string | null;
}) {
  const map = useMap();

  if (activeRouteId) {
    const route = routes.find((route) => route.id === activeRouteId);

    if (route) {
      map.fitBounds(route.path as [number, number][], {
        padding: [50, 50],
      });
    }
  }

  if (activePlaceId) {
    const place = places.find((place) => place.id === activePlaceId);

    if (place) {
      map.flyTo(place.coordinates as [number, number], 13);
    }
  }

  return null;
}
type ExploreMapProps = {
  showRoutes: boolean;
  showPlaces: boolean;
  activeRouteId: string | null;
  setActiveRouteId: (id: string | null) => void;
  activePlaceId: string | null;
  setActivePlaceId: (id: string | null) => void;
  selectedRouteId: string | null;
  selectedPlaceId: string | null;
  setSelectedRouteId: (id: string | null) => void;
  setSelectedPlaceId: (id: string | null) => void;
};
export default function ExploreMap({
  showRoutes,
  showPlaces,
  activeRouteId,
  setActiveRouteId,
  activePlaceId,
  setActivePlaceId,
  selectedRouteId,
  selectedPlaceId,
  setSelectedRouteId,
  setSelectedPlaceId,
}: ExploreMapProps) {
  return (
    <div className="h-[700px] w-full overflow-hidden rounded-2xl">
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
        <ZoomController
  activeRouteId={selectedRouteId}
  activePlaceId={selectedPlaceId}
/>

        {showRoutes &&
          routes.map((route) => (
            <Polyline
              key={route.id}
              positions={route.path as [number, number][]}
              pathOptions={{
                color:
                  route.difficulty === "Easy"
                    ? "green"
                    : route.difficulty === "Medium"
                    ? "orange"
                    : "red",
                weight: activeRouteId === route.id ? 8 : 4,
                opacity:
                  activeRouteId === null || activeRouteId === route.id
                    ? 0.8
                    : 0.25,
              }}
              eventHandlers={{
                mouseover: () => setActiveRouteId(route.id),
                mouseout: () => setActiveRouteId(null),
                click: () => {
                  setSelectedRouteId(route.id);
                  setSelectedPlaceId(null);
                },
              }}
            />
          ))}

        {showPlaces &&
          places.map((place) => (
            <Marker
              key={place.id}
              position={place.coordinates as [number, number]}
              icon={getPlaceIcon(place.category)}
              opacity={
                activePlaceId === null || activePlaceId === place.id ? 1 : 0.35
              }
              eventHandlers={{
                mouseover: () => setActivePlaceId(place.id),
                mouseout: () => setActivePlaceId(null),
                click: () => {
                  setSelectedPlaceId(place.id);
                  setSelectedRouteId(null);
                },
              }}
            >
              <Popup>
                <div>
                  <strong>{place.name}</strong>
                  <br />
                  {place.category} • {place.location}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}