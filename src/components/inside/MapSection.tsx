"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import Link from "next/link";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* --------------------------------------------------
   TYPES
-------------------------------------------------- */
export type MarkerData = {
  id: string;
  lat: number;
  lng: number;
  title: string;
  category: string;
  type: "place" | "event" | "activity";
};

type Props = {
  citySlug: string;
};

/* --------------------------------------------------
   MAP STYLES
-------------------------------------------------- */
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

/* --------------------------------------------------
   COMPONENT
-------------------------------------------------- */
export default function MapSection({ citySlug }: Props) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const fetchTimeout = useRef<NodeJS.Timeout | null>(null);

  const [loading, setLoading] = useState(false);

  /* --------------------------------------------------
     INIT MAP
  -------------------------------------------------- */
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

      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.3 });

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
              "fill-extrusion-opacity": 0.55,
              "fill-extrusion-height": ["get", "height"],
              "fill-extrusion-base": ["get", "min_height"],
            },
          },
          labelLayerId
        );
      }
    });

    return () => {
      markersRef.current.forEach(m => m.remove());
      map.remove();
      mapRef.current = null;
    };
  }, []);

  /* --------------------------------------------------
     FETCH MARKERS (DEBOUNCED)
  -------------------------------------------------- */
  const fetchMarkers = async () => {
  if (!mapRef.current) return;

  const bounds = mapRef.current.getBounds();
  if (!bounds) return;

  const zoom = Math.round(mapRef.current.getZoom());

  const bbox = [
    bounds.getWest(),
    bounds.getSouth(),
    bounds.getEast(),
    bounds.getNorth(),
  ].join(",");

  setLoading(true);

  try {
    const res = await fetch(
      `${API_URL}/map/markers?city=${citySlug}&bbox=${bbox}&zoom=${zoom}`
    );
    const data = await res.json();

    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    (data.markers || []).forEach((item: MarkerData) => {
      const el = document.createElement("div");
      el.className = "map-pin";

      el.innerHTML = `
        <div class="pin-dot"></div>
        <div class="pin-label">${item.title}</div>
      `;

      el.onclick = () => {
        window.location.href = `/place/${item.id}`;
      };

      const marker = new mapboxgl.Marker({
        element: el,
        anchor: "bottom",
      })
        .setLngLat([item.lng, item.lat])
        .addTo(mapRef.current!);

      markersRef.current.push(marker);
    });

  } catch (err) {
    console.error("Map markers error", err);
  } finally {
    setLoading(false);
  }
};


  /* --------------------------------------------------
     MAP EVENTS
  -------------------------------------------------- */
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    const onMoveEnd = () => {
      if (fetchTimeout.current) {
        clearTimeout(fetchTimeout.current);
      }

      fetchTimeout.current = setTimeout(fetchMarkers, 300);
    };

    map.on("moveend", onMoveEnd);

    // initial load
    fetchMarkers();

    return () => {
      map.off("moveend", onMoveEnd);
    };
  }, []);

  /* --------------------------------------------------
     RENDER
  -------------------------------------------------- */
  return (
    <section className="pt-6 px-6">
      <div className="mb-2 w-fit ml-auto">
        <Link href="/map">
          <p className="text-sm text-white/60 hover:text-white">
            See more
          </p>
        </Link>
      </div>

      <div className="relative max-w-8xl mx-auto h-[320px] rounded-3xl border border-white/5 overflow-hidden">
        {loading && (
          <div className="absolute top-3 right-3 z-10 text-xs text-white/70 bg-black/60 px-3 py-1 rounded-full">
            Loading…
          </div>
        )}

        <div ref={mapContainerRef} className="w-full h-full" />
      </div>
    </section>
  );
}
