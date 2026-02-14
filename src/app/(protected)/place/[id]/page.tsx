import { notFound } from "next/navigation";
import Navbar from "@/components/inside/Navbar";
import { Footer } from "@/components/layout/Footer";

import PlaceHeroHeader from "@/components/detail/PlaceHeroHeader";
import ImageGallery from "@/components/detail/ImageGallery";
import DescriptionSection from "@/components/detail/DescriptionSection";
import MapSectionMini from "@/components/detail/MapSectionMini";

/* --------------------------------------------------
   DATA FETCH
-------------------------------------------------- */
async function getPlace(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/places/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

async function getPlaceEvents(placeId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/places/${placeId}/events`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];
  const data = await res.json();
  return data.events ?? [];
}

/* --------------------------------------------------
   EVENT CARD
-------------------------------------------------- */
function EventCard({ event }: { event: any }) {
  console.log(event)
  return (
    <a
      href={`/event/${event.id}`}
      className="
        w-[260px]
        overflow-hidden
        cursor-pointer
        group
      "
    >

      {/* IMAGE */}
      <div className="relative h-[260px] overflow-hidden">
        {event.cover_image && (
        <img
          src={event.cover_image}
          alt={event.title}
          className="
            w-[260px] h-[260px] object-cover
            transition-transform duration-500
            rounded-2xl
          "
        />
        )}
      </div>

      {/* INFO */}
      <div className="pt-3">
        <h3 className="text-white font-medium text-base leading-tight">
          {event.title}
        </h3>

        <div className="flex items-center justify-between mt-1">
          <span className="text-white/50 text-xs uppercase tracking-wide">
            {event.venue_name}
          </span>
        </div>
      </div>

    </a>
  );
}

/* --------------------------------------------------
   PAGE
-------------------------------------------------- */
export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const place = await getPlace(id);
  
  if (!place) notFound();

  const events = await getPlaceEvents(id);

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;

  return (
    <main className="min-h-screen bg-[#050505] pb-32">
      <Navbar />

      <div className="w-full max-w-8xl mx-auto px-6 pt-28">
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14">
          {/* LEFT */}
          <div className="space-y-14">
            <PlaceHeroHeader
          title={place.name}
          category={place.category}
          location={place.city}
          rating={place.rating ?? undefined}
          reviews={place.reviews_count ?? 0}
        />
            {/* DESCRIPTION */}
            <DescriptionSection
              text={
                place.description ??
                "Questo luogo non ha ancora una descrizione, ma è una meta apprezzata in città."
              }
            />

            {/* EVENTS */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-6">
                Events in this venue
              </h2>

              {events.length === 0 ? (
                <div className="
                  rounded-2xl border border-white/10
                  bg-white/5 p-6
                  text-white/60 text-sm
                ">
                  Nessun evento programmato al momento.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {events.map((event: any) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-6">
            <ImageGallery
              images={
                place.images?.length
                  ? place.images
                  : place.cover_image
                  ? [place.cover_image]
                  : []
              }
            />
            {/* ADDRESS */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-white/60">Indirizzo</p>
              <p className="text-white mt-1">
                {place.address ?? place.city}
              </p>
            </div>

            {/* GET DIRECTIONS */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                block w-full text-center
                rounded-full
                bg-white text-black
                py-3 font-medium
                hover:bg-white/90 transition
              "
            >
              Get directions
            </a>
          </aside>
        </div>

        {/* MAP */}
        <section className="mt-24">
          <h2 className="text-xl font-semibold text-white mb-4">
            Dove si trova
          </h2>

          <MapSectionMini
            lat={place.lat}
            lng={place.lng}
            title={place.name}
          />
        </section>
      </div>

      <div className="mt-8">
        <Footer />
      </div>
    </main>
  );
}
