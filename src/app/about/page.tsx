import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Masthead } from "@/components/Masthead";
import {
  EntryList,
  PageHero,
  Prose,
  Stats,
  Timeline,
} from "@/components/PageParts";
import { Section } from "@/components/Section";
import { accreditations, history, nirf, placements } from "@/content/about";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "About SRM",
  description:
    "History, rankings, accreditation and placements at SRM Institute of Science and Technology.",
};

export default function AboutPage() {
  return (
    <>
      <Masthead active="/about" />
      <main id="main">
        <PageHero
          title="A school in 1969, a university since 2002."
          photo={photos.lakeAerial}
          lede="SRM Institute of Science and Technology has more than 60,000 full-time students and 4,460 faculty across its campuses in and around Chennai, Tiruchirappalli, Delhi NCR, Amaravati and Gangtok."
          facts={[
            { value: "1985", label: "Engineering college founded" },
            { value: "60,000", label: "Full-time students" },
            { value: "4,460", label: "Faculty" },
            { value: "A++", label: "NAAC grade, 2024" },
          ]}
        />

        <Section
          id="vision"
          surface="white"
          noteTitle="What we are for"
          note="Core values: excellence, integrity and academic freedom; global vision and local commitment; inclusiveness, diversity, compassion and mutual respect."
          heading="To emerge as a world-class university in creating and sharing knowledge."
        >
          <Prose>
            <p>
              Our vision is to give students a distinctive education in science,
              technology, medicine, management and the other fields of
              scholarship, in ways that best serve the world.
            </p>
            <p>
              We pursue it through international alliances, a rigorous academic
              and research environment, and a workplace that rewards freedom,
              creativity and innovation.
            </p>
          </Prose>
        </Section>

        <Section
          id="rankings"
          surface="navy"
          noteTitle="NIRF 2025"
          note="The government's ranking weighs teaching, research, graduate outcomes, outreach and perception."
          heading="Eleventh among India's universities."
        >
          <Stats items={nirf} />
        </Section>

        <Section
          id="accreditation"
          surface="white"
          noteTitle="Who checks our work"
          note="Accreditation is renewed on a fixed cycle; the dates on the right are when each one runs out."
          heading="Accreditation and recognition."
        >
          <EntryList entries={accreditations} />
        </Section>

        <Section
          id="placements"
          surface="navy"
          noteTitle="Career Centre"
          note="Figures for the 2025 graduating batch, as on 12 June 2026."
          heading="Last year's graduates received over ten thousand offers."
        >
          <Stats items={placements} />
          <Prose>
            <p>
              The highest offer was <span className="num">61</span> lakh a year.
              We report it here, but plan with the average: one exceptional
              offer says little about your own odds.
            </p>
          </Prose>
        </Section>

        <Section
          id="history"
          surface="white"
          noteTitle="How we got here"
          note="Selected dates. The SRM group began with a primary school in Chennai."
          heading="From one primary school to eight campuses."
        >
          <Timeline items={history} />
        </Section>
      </main>
      <Footer />
    </>
  );
}
