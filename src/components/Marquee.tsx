import Image from "next/image";
import { type Recruiter, recruiterCount, recruiters } from "@/content/site";

function Chip({ recruiter }: { recruiter: Recruiter }) {
  return (
    <li className="chip">
      {recruiter.logo ? (
        <Image
          src={recruiter.logo}
          alt={recruiter.name}
          width={120}
          height={22}
          unoptimized
        />
      ) : (
        recruiter.name
      )}
    </li>
  );
}

export function Marquee() {
  return (
    <section
      className="marquee-band on-white"
      aria-labelledby="recruiters-heading"
    >
      <div className="container">
        <p className="marquee-head">
          <span id="recruiters-heading">Recruiting on campus this season</span>
          <span>
            <span className="num">{recruiterCount}</span> employers
          </span>
        </p>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          <ul className="marquee-list">
            {recruiters.map((r) => (
              <Chip key={r.name} recruiter={r} />
            ))}
          </ul>
          {/* Duplicate for a seamless -50% loop; hidden from assistive tech. */}
          <ul className="marquee-list" aria-hidden="true">
            {recruiters.map((r) => (
              <Chip key={r.name} recruiter={r} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
