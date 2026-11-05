import { clubGroups } from "@/content/site";
import { Section } from "./Section";

export function Clubs() {
  return (
    <Section
      id="clubs"
      surface="white"
      noteTitle="What students run"
      note="Clubs write and maintain their own entries. An entry untouched for two semesters comes down."
      heading="One hundred and eighty clubs, listed in full."
    >
      <div className="club-index">
        {clubGroups.map((group) => (
          <section
            key={group.category}
            className="club-group"
            aria-label={group.category}
          >
            <header className="club-group-head">
              <h3>{group.category}</h3>
              <span className="num">{group.count}</span>
            </header>
            <ul>
              {group.clubs.map((club) => (
                <li key={club.name}>
                  <span className="club-name">{club.name}</span>
                  {club.recruiting && (
                    <span className="recruiting">recruiting</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  );
}
