import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Masthead } from "@/components/Masthead";
import {
  EntryList,
  PageHero,
  Prose,
  Stats,
  SubHeading,
} from "@/components/PageParts";
import { Gallery } from "@/components/Photo";
import { Section } from "@/components/Section";
import { clubs, hostels, sportFacilities } from "@/content/campus";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "Campus life at SRM",
  description:
    "Hostels, sport, clubs, the library and getting around the Kattankulathur campus.",
};

export default function CampusPage() {
  return (
    <>
      <Masthead active="/campus" />
      <main id="main">
        <PageHero
          title="Two hundred and fifty acres, two lakes, forty-two blocks."
          lede="Kattankulathur is a green campus meant to be walked or cycled, with round-the-clock security and emergency services, and enough space that the medical college, the agricultural college and the tech park share a single address."
          photo={photos.techPark}
          facts={[
            { value: "250", label: "Acres at Kattankulathur" },
            { value: "42", label: "Academic blocks" },
            { value: "11,500", label: "Hostel places" },
            { value: "2", label: "Lakes on campus" },
          ]}
        />

        <Section
          id="hostels"
          surface="white"
          noteTitle="Where you would live"
          note="First-year students book through the student portal once admission formalities are complete."
          heading="Hostels for every budget, with food at subsidised rates."
        >
          <Prose>
            <p>
              Dining halls sit beside the hostels and serve North Indian and
              South Indian menus. Residents can use the gymnasium, playgrounds
              and indoor games rooms.
            </p>
          </Prose>
          <EntryList entries={hostels} />
          <dl className="contact">
            <div>
              <dt>Director of Hostels</dt>
              <dd>Dr. E. Poovammal</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a
                  className="text-link"
                  href="mailto:director.hostels@srmist.edu.in"
                >
                  director.hostels@srmist.edu.in
                </a>
              </dd>
            </div>
          </dl>
          <Gallery items={[photos.vendharSquare, photos.schoolOfLaw]} />
        </Section>

        <Section
          id="sport"
          surface="navy"
          noteTitle="Directorate of Sports"
          note="Talented athletes can be admitted through the sports quota and supported with scholarships."
          heading="Floodlit, and open into the evening."
        >
          <Stats items={sportFacilities} />
        </Section>

        <Section
          id="clubs"
          surface="white"
          noteTitle="What students run"
          note="These are the clubs registered with the Directorate of Student Affairs. Departmental and technical teams keep their own pages."
          heading="Learning that happens outside the classroom."
        >
          <EntryList entries={clubs} />
        </Section>

        <Section
          id="library"
          surface="mist"
          noteTitle="University Central Library"
          note="Members also reach DELNET, MALIBNET and other national library networks."
          heading="Open until midnight on weekdays."
        >
          <table className="data-table">
            <caption className="visually-hidden">Central Library hours</caption>
            <thead>
              <tr>
                <th scope="col">Period</th>
                <th scope="col">Open</th>
                <th scope="col">Issue and return</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Monday to Friday</td>
                <td className="num">8 am to midnight</td>
                <td className="num">8 am to 11.30 pm</td>
              </tr>
              <tr>
                <td>Saturday and Sunday</td>
                <td className="num">9 am to 7 pm</td>
                <td className="num">9 am to 6.30 pm</td>
              </tr>
              <tr>
                <td>Summer holidays</td>
                <td className="num">9 am to 6 pm</td>
                <td className="num">9 am to 5.30 pm</td>
              </tr>
            </tbody>
          </table>
        </Section>

        <Section
          id="transport"
          surface="white"
          noteTitle="Getting here"
          note="Bookings and payment are made through the student portal. Seats are allotted subject to availability."
          heading="Air-conditioned buses from across Chennai."
        >
          <SubHeading>Kattankulathur engineering buses</SubHeading>
          <table className="data-table">
            <caption className="visually-hidden">Bus timings</caption>
            <thead>
              <tr>
                <th scope="col">Service</th>
                <th scope="col">Arrives</th>
                <th scope="col">Departs</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>First spell</td>
                <td className="num">7.40 am</td>
                <td className="num">4.20 pm</td>
              </tr>
              <tr>
                <td>Second spell</td>
                <td className="num">8.30 am</td>
                <td className="num">5.15 pm</td>
              </tr>
              <tr>
                <td>Science and Humanities, Law and Management</td>
                <td className="num">7.50 am</td>
                <td className="num">4.00 pm</td>
              </tr>
              <tr>
                <td>Medical, Dental and Health Sciences</td>
                <td className="num">7.50 am</td>
                <td className="num">4.10 pm</td>
              </tr>
            </tbody>
          </table>
          <Prose>
            <p>
              The bus fee is <span className="num">75,000</span> rupees a year
              and is not refundable once paid.
            </p>
          </Prose>
        </Section>
      </main>
      <Footer />
    </>
  );
}
