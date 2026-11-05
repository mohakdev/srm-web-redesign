import { admissions } from "@/content/site";

export function Admissions() {
  const [day, month, year] = admissions.deadline.split(" ");
  return (
    <section
      id="apply"
      className="section on-white admissions"
      aria-labelledby="apply-heading"
    >
      <div className="container section-grid">
        <aside className="margin-note">
          <strong>Admissions</strong>
          One form covers every college and every scholarship.
        </aside>
        <div>
          <span className="section-rule" aria-hidden="true" />
          <h2 id="apply-heading">Applications for the 2027 intake are open.</h2>
          <p>
            Apply by{" "}
            <time dateTime={admissions.deadlineIso}>
              <span className="num">{day}</span> {month}{" "}
              <span className="num">{year}</span>
            </time>
            . Scholarships are awarded from the same form, so there is nothing
            separate to apply for.
          </p>
          <div className="actions">
            <a className="btn btn-blue" href="/apply">
              Start your application
            </a>
            <a className="btn btn-outline" href="/admissions/prospectus">
              Download the prospectus
            </a>
            <a className="text-link" href="/admissions/contact">
              Talk to the admissions office
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
