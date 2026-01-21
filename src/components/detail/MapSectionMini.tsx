"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

type Props = {
  lat: number;
  lng: number;
  title?: string;
};

export default function MapSectionMini({ lat, lng, title }: Props) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [lng, lat],
      zoom: 14,
      interactive: false, // IMPORTANT: mini map
    });

    mapRef.current = map;

    // marker
    new mapboxgl.Marker({ color: "#ffffff" })
      .setLngLat([lng, lat])
      .addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [lat, lng]);

  return (
    <section className="mt-12 px-6 max-w-8xl mx-auto">
      <div className="h-64 rounded-2xl overflow-hidden border border-white/5">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      {title && (
        <p className="mt-3 text-sm text-white/50">
          Location of <span className="text-white">{title}</span>
        </p>
      )}
    </section>
  );
}
