type Props = {
  images: string[];
};

export default function ImageGallery({ images }: Props) {
  return (
    <section className="mt-8 px-6 max-w-8xl mx-auto">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2 rounded-2xl overflow-hidden">
        {images.slice(0, 4).map((img, i) => (
          <img
            key={i}
            src={img}
            className="md:h-80 h-full md:w-80 w-full object-cover"
          />
        ))}
      </div>
    </section>
  );
}
