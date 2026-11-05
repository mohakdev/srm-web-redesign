import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Masthead } from "@/components/Masthead";
import { EntryList, PageHero, Prose, SubHeading } from "@/components/PageParts";
import { Photo } from "@/components/Photo";
import { Section } from "@/components/Section";
import { photos } from "@/content/photos";
import { colleges } from "@/content/site";
import {
  departments,
  otherScholarships,
  programmeGroups,
  scholarships,
} from "@/content/study";

export const metadata: Metadata = {
  title: "Study at SRM",
  description:
    "Programmes, pathways and scholarships across the nine colleges of SRM Institute of Science and Technology.",
};

export default function StudyPage() {
  return (
    <>
      <Masthead active="/study" />
      <main id="main">
        <PageHero
          title="Choose a college, then a path through it."
          lede="Undergraduate, postgraduate and doctoral programmes across nine colleges, all admitted through one Directorate of Admissions at Kattankulathur."
          photo={photos.universityBuilding}
          facts={[
            { value: "9", label: "Colleges on the Kattankulathur campus" },
            { value: "22", label: "Departments in engineering alone" },
            { value: "13", label: "Scholarship categories" },
            {
              value: "100%",
              label: "Tuition waiver for the top 115 SRMJEEE ranks",
            },
          ]}
        />

        <Section
          id="programmes"
          surface="white"
          noteTitle="What you can apply for"
          note="Where a college runs its own entrance test, it is named on the right."
          heading="Programmes, grouped by the college that teaches them."
        >
          <EntryList
            entries={programmeGroups.map((g) => ({
              name: g.name,
              description: g.description,
              meta: g.entry,
            }))}
          />
        </Section>

        <Section
          id="pathways"
          surface="navy"
          noteTitle="How engineering is taught"
          note="The curriculum follows IDEAL: inter-disciplinary, experiential, active learning."
          heading="Seven schools, twenty-two departments, and you choose the shape of the degree."
        >
          <Prose>
            <p>
              Every engineering student picks one of three pathways: a major on
              its own, a major with a specialisation, or a major with a minor
              taken from another department. The choice is yours, not the
              department's, and it can draw on any of the departments below.
            </p>
          </Prose>
          <ul className="tag-index">
            {departments.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </Section>

        <Section
          id="scholarships"
          surface="white"
          noteTitle="Paying for it"
          note="Scholarships apply to academic tuition only, except the Founder's Scholarship. Hostel and transport are charged separately."
          heading="Your SRMJEEE rank sets your scholarship before you arrive."
        >
          <table className="data-table">
            <caption className="visually-hidden">
              Engineering scholarships at Kattankulathur by SRMJEEE rank
            </caption>
            <thead>
              <tr>
                <th scope="col">Scholarship</th>
                <th scope="col">Tuition waived</th>
                <th scope="col">SRMJEEE rank</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.map((s) => (
                <tr key={s.ranks}>
                  <td>{s.name}</td>
                  <td>
                    <span className="num">{s.share}</span> per cent
                  </td>
                  <td className="num">{s.ranks}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <SubHeading>Other categories</SubHeading>
          <ul className="tag-index">
            {otherScholarships.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Section>

        <Section
          id="colleges"
          surface="mist"
          noteTitle="Where you would study"
          note="Each college admits separately and teaches on the same campus."
          heading="The nine colleges."
        >
          <EntryList
            entries={colleges.map((c) => ({
              name: c.name,
              description: c.description,
            }))}
          />
        </Section>

        <section
          id="apply"
          className="section on-navy"
          aria-labelledby="apply-heading"
        >
          <div className="container section-grid">
            <aside className="margin-note">
              <strong>One official channel</strong>
              SRM does not accept cash and does not admit through agents. Only
              srmist.edu.in and admissions.india@srmist.edu.in are official.
            </aside>
            <div>
              <span className="section-rule" aria-hidden="true" />
              <h2 id="apply-heading">Apply for the 2027 intake.</h2>
              <Prose>
                <p>
                  Students from India apply through Admissions India. Foreign,
                  NRI, OCI and PIO applicants apply through Admissions
                  International.
                </p>
              </Prose>
              <div className="actions">
                <a
                  className="btn btn-gold"
                  href="https://www.srmist.edu.in/admission-india/"
                >
                  Admissions India
                </a>
                <a
                  className="btn btn-outline-light"
                  href="https://www.srmist.edu.in/admission-international/"
                >
                  Admissions International
                </a>
              </div>
              <Photo photo={photos.schoolOfLaw} className="photo-wide" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
