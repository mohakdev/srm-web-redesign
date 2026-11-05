import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Masthead } from "@/components/Masthead";
import { EntryList, PageHero, Prose } from "@/components/PageParts";
import { Section } from "@/components/Section";
import { grants, policies } from "@/content/innovation";
import { innovationBodies } from "@/content/site";

export const metadata: Metadata = {
  title: "Innovation at SRM",
  description:
    "Entrepreneurship, incubation and prototyping at SRM Institute of Science and Technology.",
};

export default function InnovationPage() {
  return (
    <>
      <Masthead active="/innovation" />
      <main id="main">
        <PageHero
          title="Start a company while you are still a student."
          lede="An idea can move from a classroom project to a prototype in FAB LAB, to incubation at SIIEC, to its first funding, without leaving the campus."
          facts={[
            { value: "4", label: "Bodies supporting founders" },
            { value: "13", label: "Crore in start-up grants awarded" },
            { value: "2nd", label: "ARIIA innovation ranking, 2020" },
            { value: "11–50", label: "NIRF innovation band, 2025" },
          ]}
        />

        <Section
          id="bodies"
          surface="blue"
          noteTitle="Building something"
          note="Four bodies, one route in. Each keeps its own site; this page is the map."
          heading="Who to go to, and when."
        >
          <EntryList
            entries={innovationBodies.map((b) => ({
              name: b.name,
              description: b.description,
              meta: (
                <a className="text-link" href={`https://${b.domain}`}>
                  {b.domain}
                </a>
              ),
            }))}
          />
        </Section>

        <Section
          id="mission"
          surface="white"
          noteTitle="Directorate of Entrepreneurship and Innovation"
          note="Its vision: an entrepreneurial mindset, innovation across the campus, and a contribution to a self-reliant nation."
          heading="From ideation to product, with the intellectual property protected."
        >
          <Prose>
            <p>
              The Directorate exists to sensitise, engage and support innovators
              from the first idea to a working product; to give them access to
              good infrastructure, mentorship and funding; and to protect the
              intellectual property that comes out of the work.
            </p>
          </Prose>
        </Section>

        <Section
          id="grants"
          surface="navy"
          noteTitle="Money in"
          note="Grants awarded to SRM's incubation bodies, as reported by the Directorate of Research."
          heading="Funding that founders can draw on."
        >
          <EntryList entries={grants} />
        </Section>

        <Section
          id="policies"
          surface="white"
          noteTitle="The rules"
          note="Read these before you file a patent or take outside investment."
          heading="Policies on start-ups, IP and technology transfer."
        >
          <EntryList entries={policies} />
        </Section>
      </main>
      <Footer />
    </>
  );
}
