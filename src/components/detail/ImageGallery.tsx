type Props = {
  images: string[];
};

export default function ImageGallery({ images }: Props) {
  return (
    <section className="w-full">
      <div className="grid md:grid-cols-1 grid-cols-1 gap-2 rounded-2xl overflow-hidden">
        {images.slice(0, 4).map((img, i) => (
          <img
            key={i}
            src={img}
            className="md:h-80 h-full md:w-100 w-full object-cover"
          />
        ))}
      </div>
    </section>
  );
}
