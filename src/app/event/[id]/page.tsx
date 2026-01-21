import { notFound } from "next/navigation";
import Navbar from "@/components/inside/Navbar";

import HeroHeader from "@/components/detail/HeroHeader";
import EventActions from "@/components/detail/EventActions";
import QuickRating from "@/components/detail/QuickRating";
import ImageGallery from "@/components/detail/ImageGallery";
import DescriptionSection from "@/components/detail/DescriptionSection";
import HostSection from "@/components/detail/HostSection";
import ReviewsSection from "@/components/detail/ReviewSection";
import MapSectionMini from "@/components/detail/MapSectionMini";
import InfoSidebar from "@/components/detail/InfoSidebar";
import HorizontalSection from "@/components/inside/HorizontalSection";

async function getEvent(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/events/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

/* --------------------------------------------------
   PAGE
-------------------------------------------------- */

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) notFound();

  const cover =
    event.cover_image ||
    (event.images && event.images.length > 0 ? event.images[0] : null);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      {/* =========================
          PAGE LAYOUT
      ========================== */}
      <div className="max-w-[1300px] mx-auto px-6 pt-28 grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-16">

        {/* =========================
            LEFT CONTENT
        ========================== */}
        <div className="space-y-14">

          {/* MOBILE COVER */}
          {cover && (
            <div className="lg:hidden w-full rounded-3xl overflow-hidden">
              <img
                src={cover}
                alt={event.title}
                className="w-full aspect-square object-cover"
              />
            </div>
          )}

          {/* HERO */}
          <div>
            <HeroHeader
              title={event.title}
              category={event.category}
              location={event.city ?? "Milano"}
              rating={event.rating ?? 4.8}
              reviews={event.reviews_count ?? 0}
              timeBucket={event.timeBucket}
              priceLevel={event.priceLevel}
              dresscode={event.dresscode}
              tags={event.tags}
            />

            <EventActions
              eventId={event.id}
              title={event.title}
              description={event.description}
              sourceUrl={event.source_url}
            />
          </div>

          {/* GALLERY */}
          {event.images && event.images.length > 1 && (
            <ImageGallery images={event.images} />
          )}

          {/* DESCRIPTION */}
          <DescriptionSection
            text={event.description ?? "No description available."}
          />

          {/* QUICK RATING */}
          <QuickRating eventId={event.id} />

          {/* HOST */}
          {event.host && (
            <HostSection
              name={event.host.name}
              avatar={event.host.avatar}
              bio={event.host.bio}
            />
          )}

          {/* REVIEWS */}
          {event.reviews?.length > 0 && (
            <ReviewsSection reviews={event.reviews} />
          )}

          {/* MAP */}
          {event.lat && event.lng && (
            <MapSectionMini
              lat={event.lat}
              lng={event.lng}
              title={event.title}
            />
          )}

          {/* SIMILAR EXPERIENCES */}
          {event.similar && event.similar.length > 0 && (
            <HorizontalSection
              title="You may also like"
              items={event.similar}
            />
          )}

          <div className="h-24" />
        </div>

        {/* =========================
            RIGHT SIDEBAR (DESKTOP)
        ========================== */}
        <aside className="hidden lg:block sticky top-28 self-start">
          <div className="rounded-3xl overflow-hidden space-y-4">

            {/* COVER */}
            {cover && (
              <img
                src={cover}
                alt={event.title}
                className="w-full aspect-square object-cover rounded-2xl"
              />
            )}

            {/* INFO */}
            <InfoSidebar
              price={event.price_min}
              priceLevel={event.priceLevel}
              date={event.start_at}
              endDate={event.end_at}
              location={event.place_name}
              crowdLevel={event.crowdLevel}
              source_url={event.source_url}
            />
          </div>
        </aside>
      </div>

      {/* =========================
          MOBILE CTA
      ========================== */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 z-50 bg-[#050505]/90 backdrop-blur-xl border-t border-white/10">
        <InfoSidebar
          price={event.price_min}
          priceLevel={event.priceLevel}
          date={event.start_at}
          endDate={event.end_at}
          location={event.place_name}
          source_url={event.source_url}
        />
      </div>
    </main>
  );
}
