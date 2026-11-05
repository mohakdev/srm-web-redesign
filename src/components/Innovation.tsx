import { innovationBodies } from "@/content/site";
import { Section } from "./Section";

export function Innovation() {
  return (
    <Section
      id="innovation"
      surface="blue"
      noteTitle="Building something"
      note="Four bodies, one route in. Each keeps its own site; this page is the map."
      heading="Start a company while you are still a student."
    >
      <ul className="ruled">
        {innovationBodies.map((body) => (
          <li key={body.name} className="body-row">
            <span className="body-name">{body.name}</span>
            <span className="body-desc">{body.description}</span>
            <a
              className="body-domain text-link"
              href={`https://${body.domain}`}
            >
              {body.domain}
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
