import Image from "next/image";
import { facts, quickLinks } from "@/content/site";
import { Depth } from "./Depth";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading" data-depth>
      <Depth />
      <div className="container">
        <div className="hero-grid">
          <div>
            <h1 id="hero-heading">
              <span>Learn.</span>
              <span>Leap.</span>
              <span className="lead-line">Lead.</span>
            </h1>
            <p className="hero-lede">
              One of India&apos;s largest campuses, a 250-acre green township
              near Chennai where students from every state learn, live and build
              together.
            </p>

            <search>
              <form className="search" action="/search" method="get">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="10.5"
                    cy="10.5"
                    r="6.75"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  />
                  <path
                    d="M15.5 15.5L20.5 20.5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                </svg>
                <label htmlFor="site-search" className="visually-hidden">
                  Search programmes, people and pages
                </label>
                <input
                  id="site-search"
                  name="q"
                  type="search"
                  placeholder="Search programmes, fees, people"
                  autoComplete="off"
                />
                <button type="submit" className="btn btn-gold">
                  Search
                </button>
              </form>
            </search>

            <nav className="quick-links" aria-label="Popular">
              {quickLinks.map((link) => (
                <a key={link.href} className="text-link" href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <figure className="portrait">
            {/* Any transparent 4:5-ish cut-out works here; it is bottom-anchored at 95% height. */}
            <Image
              src="/people/student.png"
              alt="A student carrying books and a backpack"
              width={1028}
              height={720}
              sizes="(max-width: 960px) 340px, 392px"
              priority
            />
          </figure>
        </div>

        <ul className="facts">
          {facts.map((fact) => (
            <li key={fact.label} className="fact">
              <span className="num">{fact.value}</span>
              <span className="fact-label">{fact.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
