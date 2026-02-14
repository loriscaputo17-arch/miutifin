const API_URL = process.env.NEXT_PUBLIC_API_URL;

type LimitedExploreParams = {
  city_slug: string;
  type?: "event" | "place" | "mixed";
  price?: number;
  district?: string;
};

type ExploreSearchParams = {
  city_slug: string;
  type: "event" | "place" | "mixed";
  price?: number;
  district?: string;
};

export async function fetchLimitedExplore(params: LimitedExploreParams) {
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined) as any
  );

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/explore/limited?${qs.toString()}`
  );

  if (!res.ok) throw new Error("Explore failed");
  return res.json();
}

export async function fetchExploreSearch(params: ExploreSearchParams) {
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined) as any
  );

  const res = await fetch(
    `${API_URL}/explore/search?${qs.toString()}`
  );

  if (!res.ok) {
    throw new Error("Explore search failed");
  }

  return res.json();
}


