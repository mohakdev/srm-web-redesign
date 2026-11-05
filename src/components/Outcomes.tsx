import { outcomes, outcomesSource } from "@/content/site";
import { OutcomesPanel } from "./OutcomesPanel";
import { Section } from "./Section";

export function Outcomes() {
  return (
    <Section
      id="outcomes"
      surface="navy"
      noteTitle="After you graduate"
      note="Compiled by the Career Centre from verified offer letters, not self-reported surveys."
      heading="What happened to last year's graduates."
    >
      <OutcomesPanel outcomes={outcomes} />

      <div className="source">
        <dl>
          <div>
            <dt>Source</dt>
            <dd>{outcomesSource.body}</dd>
          </div>
          <div>
            <dt>Batch</dt>
            <dd>
              Graduating batch of{" "}
              <span className="num">{outcomesSource.batchYear}</span>
            </dd>
          </div>
          <div>
            <dt>Last updated</dt>
            <dd>
              <time dateTime={outcomesSource.updated}>
                {outcomesSource.updatedLabel}
              </time>
            </dd>
          </div>
        </dl>
        <a className="text-link" href={outcomesSource.dataset} download>
          Download the dataset
        </a>
      </div>
    </Section>
  );
}
