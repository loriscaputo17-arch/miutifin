const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* --------------------------------------------------
   TYPES
-------------------------------------------------- */

export type TimeFilter = "today" | "weekend" | "free" | null;

export type FetchEventsParams = {
  city: string;
  query?: string;
  filter?: TimeFilter | string | null;
};

export type FetchPlansParams = {
  city: string;
  query?: string;
  filter?: string | null;
};

export type FetchSearchParams = {
  city: string;
  query: string;
};

/* --------------------------------------------------
   HOME
-------------------------------------------------- */
export async function fetchHome(city: string) {
  const res = await fetch(`${API_URL}/home?city_slug=${city}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load home");
  }

  return res.json();
}

export async function fetchNeighborhood(city: string) {
  const res = await fetch(`${API_URL}/by_neighborhood?city_slug=${city}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load home");
  }

  return res.json();
}

/* --------------------------------------------------
   EVENTS
-------------------------------------------------- */
export async function fetchEvents({
  city,
  query,
  filter,
}: FetchEventsParams) {
  const params = new URLSearchParams();
  params.append("city_slug", city);

  if (query) {
    params.append("q", query);
  }

  if (filter) {
    params.append("filter", filter);
  }

  const res = await fetch(
    `${API_URL}/events?${params.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to load events");
  }

  return res.json();
}

/* --------------------------------------------------
   PLANS
-------------------------------------------------- */
export async function fetchPlans({
  city,
  query,
  filter,
}: FetchPlansParams) {
  const params = new URLSearchParams();
  params.append("city_slug", city);

  if (query) params.append("q", query);
  if (filter) params.append("filter", filter);

  const res = await fetch(
    `${API_URL}/plans?${params.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to load plans");
  }

  return res.json();
}

/* --------------------------------------------------
   SEARCH
-------------------------------------------------- */
export async function fetchSearch({
  city,
  query,
}: FetchSearchParams) {
  const params = new URLSearchParams();
  params.append("city_slug", city);
  params.append("q", query);

  const res = await fetch(
    `${API_URL}/search?${params.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Search failed");
  }

  return res.json();
}
