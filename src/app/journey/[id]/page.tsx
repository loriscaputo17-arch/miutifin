import PlanHero from "@/components/plan/PlanHero";
import PlanTimeline from "@/components/plan/PlanTimeline";
import PlanBooking from "@/components/plan/PlanBooking";
import Navbar from "@/components/inside/Navbar";

export default function PlanDetailPage() {
  return (
    <main className="min-h-screen bg-[#050505] pb-32">
      <Navbar />
      <PlanHero />

      <PlanTimeline
        steps={[
          { title: "Rooftop Aperitivo", type: "Drink", duration: "60 min" },
          { title: "Italian Dinner", type: "Food", duration: "90 min" },
          { title: "Techno Club", type: "Nightlife", duration: "3h" },
        ]}
      />

      <PlanBooking />
    </main>
  );
}
