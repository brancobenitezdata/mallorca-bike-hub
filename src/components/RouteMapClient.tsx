"use client";

import dynamic from "next/dynamic";

const RouteMap = dynamic(() => import("./RouteMap"), {
  ssr: false,
});

type RouteMapClientProps = {
  route: {
    name: string;
    difficulty: string;
    coordinates: number[];
    path: number[][];
  };
};

export default function RouteMapClient({ route }: RouteMapClientProps) {
  return <RouteMap route={route} />;
}