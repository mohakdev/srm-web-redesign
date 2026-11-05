import { Admissions } from "@/components/Admissions";
import { Clubs } from "@/components/Clubs";
import { Colleges } from "@/components/Colleges";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Innovation } from "@/components/Innovation";
import { Marquee } from "@/components/Marquee";
import { Masthead } from "@/components/Masthead";
import { Outcomes } from "@/components/Outcomes";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Masthead />
      <main id="main">
        <Hero />
        <Marquee />
        <Colleges />
        <Outcomes />
        <Clubs />
        <Innovation />
        <Admissions />
      </main>
      <Footer />
    </>
  );
}
