import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Masthead } from "@/components/Masthead";
import { EntryList, PageHero, Prose } from "@/components/PageParts";
import { Section } from "@/components/Section";
import { centres, highlights } from "@/content/research";

export const metadata: Metadata = {
  title: "Research at SRM",
  description:
    "Funded projects, research centres and doctoral study at SRM Institute of Science and Technology.",
};

export default function ResearchPage() {
  return (
    <>
      <Masthead active="/research" />
      <main id="main">
        <PageHero
          title="Research that starts in the teaching lab."
          lede="The Directorate of Research funds work in nanotechnology, bioengineering, energy, the environment, materials and embedded systems, and in projects of public need such as rural healthcare."
          facts={[
            { value: "294", label: "Crore in externally funded projects" },
            { value: "660", label: "Externally funded projects" },
            { value: "58,000", label: "Publications in the overall database" },
            { value: "1,100", label: "Patents" },
          ]}
        />

        <Section
          id="highlights"
          surface="white"
          noteTitle="Recent results"
          note="Figures are as published by the Directorate of Research."
          heading="Where the work has been recognised."
        >
          <EntryList entries={highlights} />
        </Section>

        <Section
          id="centres"
          surface="navy"
          noteTitle="Central facilities"
          note="These centres sit outside any single department so that every school can use them."
          heading="Ten research centres, open across the university."
        >
          <EntryList entries={centres} />
        </Section>

        <Section
          id="phd"
          surface="white"
          noteTitle="Doctoral study"
          note="Ph.D. admissions run across all schools and faculties."
          heading="Join as a research scholar."
        >
          <Prose>
            <p>
              Scholars work inside the same centres listed above, and funding
              follows the project: incentives, awards and seed money are given
              to researchers who show results, and each department sets its own
              research priorities.
            </p>
          </Prose>
          <dl className="contact">
            <div>
              <dt>Dean of Research</dt>
              <dd>Dr. Bernaurdshaw Neppolian</dd>
            </div>
            <div>
              <dt>Office</dt>
              <dd>Room 910, Sir C.V. Raman Block, Kattankulathur</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a
                  className="text-link"
                  href="mailto:dean.research@srmist.edu.in"
                >
                  dean.research@srmist.edu.in
                </a>
              </dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a className="text-link" href="tel:+914427417142">
                  +91 44 2741 7142
                </a>
              </dd>
            </div>
          </dl>
          <div className="actions">
            <a
              className="btn btn-blue"
              href="https://www.srmist.edu.in/admission-india/"
            >
              Apply for a Ph.D.
            </a>
            <a
              className="btn btn-outline"
              href="https://www.srmist.edu.in/research/call-for-proposals/"
            >
              Calls for proposals
            </a>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
