"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import Navbar from "@/components/inside/Navbar";
import { useCity } from "@/context/CityContext";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

type MarkerData = {
  id: string;
  lat: number;
  lng: number;
  title: string;
  address: string;
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

/* --------------------------------------------------
   COMPONENT
-------------------------------------------------- */
export default function MapPage() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const fetchTimeout = useRef<NodeJS.Timeout | null>(null);
  const { city } = useCity();
  const [visiblePlaces, setVisiblePlaces] = useState<MarkerData[]>([]);
  const [search, setSearch] = useState("");

  const [activeType, setActiveType] = useState<
    "all" | "event" | "place" | "plan"
  >("all");

  const [loading, setLoading] = useState(false);

  const [neighborhood, setNeighborhood] = useState<string>("all");
  const [neighborhoods, setNeighborhoods] = useState<
    { id: string; name: string; slug: string }[]
  >([]);

  const [open, setOpen] = useState(false);
const dropdownRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  const onClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  };

  document.addEventListener("mousedown", onClickOutside);
  return () => document.removeEventListener("mousedown", onClickOutside);
}, []);


  useEffect(() => {
    fetch(`${API_URL}/neighborhoods?city=${city.toLowerCase()}`)
      .then((res) => res.json())
      .then(setNeighborhoods)
      .catch(console.error);
  }, [city]);


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

  /* --------------------------------------------------
     FETCH MARKERS (API + FILTER)
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
      const params = new URLSearchParams({
        city: city.toLowerCase(),
        bbox,
        zoom: zoom.toString(),
        neighborhood,
      });

      const res = await fetch(`${API_URL}/map/markers?${params}`);
      const data = await res.json();

      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      const markers: MarkerData[] =
        activeType === "all"
          ? data.markers
          : data.markers.filter(
              (m: MarkerData) => m.type === activeType
            );

      setVisiblePlaces(markers.filter(m => m.type === "place"));

      markers.forEach((item) => {
        const el = document.createElement("div");
        el.className = "map-pin";

        el.innerHTML = `
          <div class="pin-dot pin-${item.type}"></div>
          ${
            zoom >= 13
              ? `<div class="pin-label">${item.title}</div>`
              : ""
          }
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

  const filteredPlaces = visiblePlaces.filter((p) =>
        `${p.title} ${p.address} ${p.category}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );

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
    fetchMarkers();

    return () => {
      map.off("moveend", onMoveEnd);
    };
  }, [activeType, neighborhood]);


  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.flyTo({ zoom: 13, duration: 600 });
  }, [neighborhood]);

  return (
  <main className="h-screen w-screen bg-black overflow-hidden">
    <Navbar />

    <div className="hidden md:flex h-full pt-24">

      {/* LEFT: PLACES LIST */}
      <div className="w-1/2 h-full overflow-y-auto px-6 pb-10">

        <div
          ref={dropdownRef}
          className="
            sticky top-0 z-50
            bg-black/70 backdrop-blur-xl
            border border-white/10
            rounded-xl
            px-3 py-2
            text-white
            w-full
          "
        >
          {/* TRIGGER */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="
              w-[100%] flex items-center justify-between
              text-sm
            "
          >
            <span className="truncate">
              {neighborhood === "all"
                ? "All neighborhoods"
                : neighborhoods.find((n) => n.slug === neighborhood)?.name}
            </span>

            <svg
              className={`w-4 h-4 transition ${
                open ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* OPTIONS */}
          {open && (
            <div
              className="
                mt-2
                max-h-64 overflow-y-auto
                bg-black/90
                absolute
                border border-white/10
                rounded-xl
                shadow-xl
                
              "
            >
              {/* ALL */}
              <button
                onClick={() => {
                  setNeighborhood("all");
                  setOpen(false);
                }}
                className={`
                  w-full text-left px-4 py-2 text-sm
                  hover:bg-white/10 transition
                  ${neighborhood === "all" ? "bg-white/10" : ""}
                `}
              >
                All neighborhoods
              </button>

              {/* NEIGHBORHOODS */}
              {neighborhoods.map((n) => (
                <button
                  key={n.id}
                  onClick={() => {
                    setNeighborhood(n.slug);
                    setOpen(false);
                  }}
                  className={`
                    w-full text-left px-4 py-2 text-sm
                    hover:bg-white/10 transition
                    ${neighborhood === n.slug ? "bg-white/10" : ""}
                  `}
                >
                  {n.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* SEARCH */}
        <div className="mt-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search places…"
            className="
              w-full
              bg-black/60 backdrop-blur-xl
              border border-white/10
              rounded-xl
              px-4 py-3
              text-sm text-white
              placeholder-white/40
              focus:outline-none focus:border-white/30
            "
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              onClick={() => {
                window.location.href = `/place/${place.id}`;
              }}
              className="
                bg-black/70 backdrop-blur-xl
                border border-white/10
                rounded-2xl
                p-4
                text-white
                cursor-pointer
                hover:bg-black/80
                transition
              "
            >
              <div className="text-sm font-bold truncate">
                {place.title}
              </div>
              <div className="text-sm truncate">
                {place.address}
              </div>
              <div className="text-xs text-white/60 mt-1">
                {place.category}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>

    {/* =========================
        MOBILE LAYOUT
    ========================= */}
    <div className="md:hidden h-full w-full">

        <div
          className="
            fixed bottom-0 left-0 right-0 z-40
            bg-black/80 backdrop-blur-xl
            rounded-t-3xl
            border-t border-white/10
            max-h-[55vh]
            overflow-y-auto
            p-4
          "
        >
          <div className="w-12 h-1.5 bg-white/30 rounded-full mx-auto mb-4" />

            <div
          ref={dropdownRef}
          className="
            sticky top-0 z-50
            bg-black/70 backdrop-blur-xl
            border border-white/10
            rounded-xl
            px-3 py-2
            text-white
            w-full
          "
        >
          {/* TRIGGER */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="
              w-[100%] flex items-center justify-between
              text-sm
            "
          >
            <span className="truncate">
              {neighborhood === "all"
                ? "All neighborhoods"
                : neighborhoods.find((n) => n.slug === neighborhood)?.name}
            </span>

            <svg
              className={`w-4 h-4 transition ${
                open ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* OPTIONS */}
          {open && (
            <div
              className="
                mt-2
                max-h-64 overflow-y-auto
                bg-black/90
                absolute
                border border-white/10
                rounded-xl
                shadow-xl
                
              "
            >
              {/* ALL */}
              <button
                onClick={() => {
                  setNeighborhood("all");
                  setOpen(false);
                }}
                className={`
                  w-full text-left px-4 py-2 text-sm
                  hover:bg-white/10 transition
                  ${neighborhood === "all" ? "bg-white/10" : ""}
                `}
              >
                All neighborhoods
              </button>

              {/* NEIGHBORHOODS */}
              {neighborhoods.map((n) => (
                <button
                  key={n.id}
                  onClick={() => {
                    setNeighborhood(n.slug);
                    setOpen(false);
                  }}
                  className={`
                    w-full text-left px-4 py-2 text-sm
                    hover:bg-white/10 transition
                    ${neighborhood === n.slug ? "bg-white/10" : ""}
                  `}
                >
                  {n.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search places…"
          className="
            mt-3 w-full
            bg-black/60
            border border-white/10
            rounded-xl
            px-4 py-3
            text-sm text-white
            placeholder-white/40
            focus:outline-none
          "
        />

          <div className="flex flex-col gap-3 mt-4">
            {visiblePlaces.map((place) => (
              <div
                key={place.id}
                onClick={() => {
                  window.location.href = `/place/${place.id}`;
                }}
                className="
                  bg-black/60
                  border border-white/10
                  rounded-xl
                  p-4
                  cursor-pointer
                  text-white
                "
              >
                <div className="text-sm font-bold truncate">
                  {place.title}
                </div>
                <div className="text-sm truncate">
                  {place.address}
                </div>
                <div className="text-xs text-white/60 mt-1">
                  {place.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      
    </div>

    <div
      ref={mapContainerRef}
      className="
        fixed inset-0 z-0
        md:top-24 md:right-0 md:left-1/2 md:bottom-0
        md:m-6
        md:rounded-2xl
        md:overflow-hidden
        border border-white/10
      "
    />


    {loading && (
      <div className="fixed top-24 right-6 z-50 text-xs text-white/70 bg-black/60 px-3 py-1 rounded-full">
        Loading…
      </div>
    )}
  </main>
);
}

