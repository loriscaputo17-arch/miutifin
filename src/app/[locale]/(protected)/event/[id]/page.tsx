import { notFound } from "next/navigation";
import Navbar from "@/components/inside/Navbar";
import { Footer } from "@/components/layout/Footer";

import HeroHeader from "@/components/detail/HeroHeader";
import EventActions from "@/components/detail/EventActions";
import QuickRating from "@/components/detail/QuickRating";
import ImageGallery from "@/components/detail/ImageGallery";
import DescriptionSection from "@/components/detail/DescriptionSection";
import HostSection from "@/components/detail/HostSection";
import ReviewsSection from "@/components/detail/ReviewSection";
import MapSectionMini from "@/components/detail/MapSectionMini";
import InfoSidebar from "@/components/detail/InfoSidebar";
import HorizontalSection2 from "@/components/inside/HorizontalSection2";

  async function getEvent(id: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;
    return res.json();
  }

  async function getSimilarEvents(id: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events/${id}/similar`,
      { cache: "no-store" }
    );

    if (!res.ok) return [];
    return res.json();
  }

  async function getPlaceByEvent(eventId: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/places/by-event/${eventId}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;
    const data = await res.json();
    return data.place ?? null;
  }


export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) notFound();

  const place = await getPlaceByEvent(id);

  const similar = await getSimilarEvents(id);

  const cover =
    event.cover_image ||
    (event.images && event.images.length > 0 ? event.images[0] : null);


    return (
  <main className="min-h-screen bg-[#050505] text-white">
    <Navbar />

    <div className="max-w-7xl mx-auto px-6 pt-28 pb-32 lg:pb-20">

      {/* =========================
          GRID
      ========================== */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-14">

        {/* =========================
            LEFT COLUMN – CONTENT
        ========================== */}
        <div className="space-y-14">

          {/* MOBILE COVER */}
          {cover && (
            <div className="lg:hidden w-full aspect-[4/4] rounded-3xl overflow-hidden">
              <img
                src={cover}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* HEADER */}
          <div>
            <HeroHeader
              title={event.title}
              category={event.category}
              start_at={event.start_at}
              end_at={event.end_at}
              location={event.city ?? "Milano"}
              rating={event.rating ?? 4.8}
              reviews={event.reviews_count ?? 0}
              timeBucket={event.timeBucket}
              priceLevel={event.priceLevel}
              dresscode={event.dresscode}
              tags={event.tags}
              place_name={event.place_name}
              place_id={place?.id}
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

          {/* =========================
              SIMILAR EVENTS (LEFT COLUMN)
          ========================== */}
          {similar.length > 0 && (
            <HorizontalSection2
              title="Eventi consigliati per te"
              items={similar.slice(0, 6)}
            />
          )}
        </div>

        {/* =========================
            RIGHT COLUMN – FIXED IMAGE + CTA
        ========================== */}
        <aside className="hidden lg:block sticky top-28 self-start">
          <div className="space-y-4">

            {/* COVER */}
            {cover && (
              <div className="w-full aspect-[4/4] rounded-3xl overflow-hidden">
                <img
                  src={cover}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

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
    </div>

    {/* =========================
        MOBILE CTA
    ========================== */}
    <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 z-50">
      <a
        href={event.source_url}
        target="_blank"
        rel="noopener noreferrer"
        className="
          block w-full py-4 rounded-2xl
          bg-white text-black text-center font-semibold
        "
      >
        Get tickets € {event.price_min}
      </a>
    </div>

    <Footer />
  </main>
);


}
