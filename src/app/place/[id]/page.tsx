import { notFound } from "next/navigation";
import Navbar from "@/components/inside/Navbar";

import HeroHeader from "@/components/detail/HeroHeader";
import ImageGallery from "@/components/detail/ImageGallery";
import DescriptionSection from "@/components/detail/DescriptionSection";
import ReviewsSection from "@/components/detail/ReviewSection";
import MapSectionMini from "@/components/detail/MapSectionMini";
import InfoSidebar from "@/components/detail/InfoSidebar";

async function getPlace(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/places/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ FIX Next.js
  const place = await getPlace(id);

  if (!place) notFound();

  return (
    <main className="min-h-screen bg-[#050505] pb-32">
      <Navbar />

      {/* HERO */}
      <HeroHeader
        title={place.name}
        category={place.category}
        location={place.city ?? "Milano"}
        rating={place.rating ?? 4.6}
        reviews={place.reviews_count ?? 0}
      />

      {/* IMAGES */}
      <ImageGallery
        images={place.images ?? [place.cover_image]}
      />

      {/* CONTENT + SIDEBAR */}
      <div className="mt-10 px-6 max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
        <DescriptionSection text={place.description} />

        <InfoSidebar
          address={place.address}
          priceLevel={place.price_level}
          openHours={place.open_hours}
        />
      </div>

      {/* REVIEWS */}
      <ReviewsSection reviews={place.reviews ?? []} />

      {/* MAP */}
      <MapSectionMini
        lat={place.lat}
        lng={place.lng}
        title={place.name}
      />
    </main>
  );
}
