"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import Link from "next/link";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

type MarkerData = {
  id: string;
  lat: number;
  lng: number;
  title: string;
  category: string;
  type: "place" | "event" | "activity";
};

type Props = {
  markers?: MarkerData[];
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

export default function MapSection({ markers = [] }: Props) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const container = mapContainerRef.current;

    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      if (!width || !height) return;

      observer.disconnect();

      const map = new mapboxgl.Map({
        container,
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
          l => l.type === "symbol" && l.layout?.["text-field"]
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
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
      markersRef.current.forEach(m => m.remove());
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  /* 👉 MARKERS */
  useEffect(() => {
    if (!mapRef.current) return;

    // cleanup vecchi
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    markers.forEach(item => {
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
  }, [markers]);

  return (
    <section className="pt-6 px-6">
      <div className="mb-2 w-fit ml-auto">
        <Link href="/map">
          <p className="text-sm text-white/60 hover:text-white">
            See more
          </p>
        </Link>
      </div>

      <div className="max-w-8xl mx-auto h-[300px] rounded-3xl border border-white/5 overflow-hidden">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>
    </section>
  );
}
