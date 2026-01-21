"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import Navbar from "@/components/inside/Navbar";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

type MarkerData = {
  id: string;
  lat: number;
  lng: number;
  title: string;
  category: string;
  type: "event" | "place" | "plan";
};

const MAP_STYLES = {
  night: "mapbox://styles/mapbox/dark-v11",
  dusk: "mapbox://styles/mapbox/navigation-night-v1",
  dawn: "mapbox://styles/mapbox/navigation-day-v1",
  day: "mapbox://styles/mapbox/streets-v12",
};

function getMapStyleByTime(): keyof typeof MAP_STYLES {
  const hour = new Date().getHours();
  if (hour >= 22 || hour < 5) return "night";
  if (hour >= 18) return "dusk";
  if (hour >= 5 && hour < 8) return "dawn";
  return "day";
}

export default function MapPage() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const [activeType, setActiveType] = useState<
    "all" | "event" | "place" | "plan"
  >("all");

  /* MOCK DATA — sostituisci con API /map */
  const markers: MarkerData[] = [
    {
      id: "1",
      lat: 45.4642,
      lng: 9.19,
      title: "Techno Night",
      category: "Music",
      type: "event",
    },
    {
      id: "2",
      lat: 45.468,
      lng: 9.182,
      title: "Rooftop Bar",
      category: "Bar",
      type: "place",
    },
  ];

  const filteredMarkers =
    activeType === "all"
      ? markers
      : markers.filter((m) => m.type === activeType);

  /* MAP INIT */
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: MAP_STYLES[getMapStyleByTime()],
      center: [9.19, 45.4642],
      zoom: 12,
      pitch: 65,
      bearing: -30,
      antialias: true,
    });

    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("load", () => {
      map.resize();

      /* TERRAIN */
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });

      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.4 });

      /* 3D BUILDINGS */
      const layers = map.getStyle().layers;
      const labelLayerId = layers?.find(
        (l) => l.type === "symbol" && l.layout?.["text-field"]
      )?.id;

      if (labelLayerId) {
        map.addLayer(
          {
            id: "3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 15,
            paint: {
              "fill-extrusion-color": "#aaa",
              "fill-extrusion-opacity": 0.6,
              "fill-extrusion-height": ["get", "height"],
              "fill-extrusion-base": ["get", "min_height"],
            },
          },
          labelLayerId
        );
      }
    });

    return () => {
      markersRef.current.forEach((m) => m.remove());
      map.remove();
      mapRef.current = null;
    };
  }, []);

  /* MARKERS */
  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    filteredMarkers.forEach((item) => {
      const el = document.createElement("div");
      el.className =
        "w-3 h-3 rounded-full bg-white shadow-md cursor-pointer";

      const marker = new mapboxgl.Marker(el)
        .setLngLat([item.lng, item.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 12 }).setHTML(
            `<strong>${item.title}</strong><br/><span>${item.category}</span>`
          )
        )
        .addTo(mapRef.current!);

      markersRef.current.push(marker);
    });
  }, [filteredMarkers]);

  return (
    <main className="h-screen w-screen overflow-hidden bg-black">
      <Navbar />

      {/* FILTER BAR */}
      <div className="
        fixed top-28 left-1/2 -translate-x-1/2 z-40
        bg-black/60 backdrop-blur-xl
        border border-white/10
        rounded-full
        px-2 py-2
        flex gap-2
      ">
        {[
          { key: "all", label: "All" },
          { key: "event", label: "Events" },
          { key: "place", label: "Places" },
          { key: "plan", label: "Journeys" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveType(f.key as any)}
            className={`
              px-4 py-2 rounded-full text-sm transition
              ${
                activeType === f.key
                  ? "bg-white text-black"
                  : "bg-white/10 text-white hover:bg-white/20"
              }
            `}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* MAP */}
      <div
        ref={mapContainerRef}
        className="absolute inset-0"
      />
    </main>
  );
}
