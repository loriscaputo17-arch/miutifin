import { Navbar } from "@/components/layout/Navbar";
import { Hero2 } from "@/components/sections/Hero2";
import { Footer } from "@/components/layout/Footer";
import { FeatureShowcase } from "@/components/sections/FeatureShowcase";
import { FeatureMatrix } from "@/components/sections/MatrixRedCircuit";
import { FeatureGlass } from "@/components/sections/FeatureGlass";
import { FeatureCurve } from "@/components/sections/FeatureCurve";
import { FeatureLogosMarquee } from "@/components/sections/FeatureLogosMarquee";

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white ">
      <Navbar />
      <section id="hero">
        <Hero2 />
      </section>
      <section id="companies">
        <FeatureLogosMarquee />
      </section>
      <section id="features">
        <FeatureShowcase />
      </section>
      <section id="solutions">
        <FeatureMatrix />
      </section>
      <section id="products">
        <FeatureGlass />
      </section>
      <section id="how">
        <FeatureCurve />
      </section>
      <section id="resources">
        <Footer />
      </section>
    </main>
  );
}
