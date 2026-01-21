type Step = {
  title: string;
  type: string;
  duration: string;
};

export default function PlanTimeline({ steps }: { steps: Step[] }) {
  return (
    <section className="mt-12 px-6 max-w-8xl mx-auto space-y-6">
      {steps.map((s, i) => (
        <div key={i} className="flex gap-4">
          <div className="text-white/40 font-bold">{i + 1}</div>
          <div>
            <h3 className="text-white font-medium">{s.title}</h3>
            <p className="text-white/50 text-sm">
              {s.type} • {s.duration}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
