type Review = {
  user: string;
  text: string;
};

export default function ReviewsSection({ reviews }: { reviews: Review[] }) {
  return (
    <section className="mt-12 px-6 max-w-8xl mx-auto">
      <h2 className="text-xl text-white mb-4">Reviews</h2>

      <div className="space-y-4">
        {reviews.map((r, i) => (
          <div key={i} className="text-white/70 text-sm">
            <span className="text-white font-medium">{r.user}</span>
            <p>{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
