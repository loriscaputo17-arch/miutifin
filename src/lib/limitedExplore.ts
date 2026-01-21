const API_URL = process.env.NEXT_PUBLIC_API_URL;

type LimitedExploreParams = {
  city: string;
  date?: string;
  people?: number;
  type?: "event" | "place" | "activity" | "journey";
  price?: number;
};

export async function fetchLimitedExplore({
  city,
  date,
  people,
  type,
  price,
}: LimitedExploreParams) {
  const params = new URLSearchParams();

  params.set("city_slug", city);
  if (date) params.set("date", date);
  if (people) params.set("people", String(people));
  if (type) params.set("type", type);
  if (price) params.set("price", String(price));

  const res = await fetch(
    `${API_URL}/limited-explore?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load limited explore");
  }

  return res.json();
}
