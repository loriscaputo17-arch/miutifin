type Props = {
  text: string;
};

export default function DescriptionSection({ text }: Props) {
  return (
    <section className="py-6 max-w-8xl mr-auto">
      <h2 className="text-xl text-white mb-4">About</h2>
      <p className="text-white/70 leading-relaxed">{text}</p>
    </section>
  );
}
