import { photos } from "@/content/photos";
import { colleges } from "@/content/site";
import { Gallery } from "./Photo";
import { Section } from "./Section";

export function Colleges() {
  return (
    <Section
      id="colleges"
      surface="white"
      noteTitle="Where you would study"
      note="Each college admits separately and teaches on the same campus."
      heading="Breadth is the point, not a by-product."
    >
      <ul className="ruled">
        {colleges.map((college) => (
          <li key={college.name} className="college">
            <span className="college-name">{college.name}</span>
            <span className="college-desc">{college.description}</span>
            <span className="college-count">
              <span className="num">{college.programmes}</span> programmes
            </span>
          </li>
        ))}
      </ul>
      <Gallery
        layout="lead"
        items={[
          photos.lakeAerial,
          photos.universityBuilding,
          photos.vendharSquare,
        ]}
      />
    </Section>
  );
}
