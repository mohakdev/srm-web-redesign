import Image from "next/image";
import { nav } from "@/content/site";

export function Masthead({ active }: { active?: string }) {
  return (
    <>
      <p className="concept-note">
        A concept redesign for the SRM Website Design Challenge 2026, not the
        official website. Some figures are illustrative. For admissions, visit{" "}
        <a href="https://www.srmist.edu.in/">srmist.edu.in</a>.
      </p>
      <header className="masthead">
        <div className="container masthead-row">
          <a className="brand" href="/">
            <Image
              src="/brand/srm-logo.jpg"
              alt=""
              width={48}
              height={48}
              className="crest"
              sizes="48px"
              priority
            />
            <span className="wordmark">
              <span className="wordmark-name">SRM</span>
              <span className="wordmark-sub">
                Institute of Science and Technology
              </span>
            </span>
          </a>
          <nav className="nav" aria-label="Main">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={item.href === active ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="masthead-actions">
            <a className="masthead-search" href="/search">
              Search
            </a>
            <a className="btn btn-gold" href="/study#apply">
              Apply for 2027
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
