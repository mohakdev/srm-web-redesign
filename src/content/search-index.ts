/**
 * Everything the site search can find. Built from the same content modules
 * the pages render, so a change to the copy is a change to search.
 */
import { accreditations, history, nirf } from "./about";
import { clubs, hostels, sportFacilities } from "./campus";
import { grants, policies } from "./innovation";
import { centres, highlights } from "./research";
import {
  clubGroups,
  colleges,
  footerColumns,
  innovationBodies,
  recruiters,
} from "./site";
import {
  departments,
  otherScholarships,
  programmeGroups,
  scholarships,
} from "./study";

export type SearchDoc = {
  title: string;
  text: string;
  url: string;
  /** Where the result lives, shown beside it. */
  page: string;
  /** Kind of result, used to group and to rank pages above details. */
  kind:
    | "Page"
    | "Section"
    | "Programme"
    | "Department"
    | "Research"
    | "Campus"
    | "Club"
    | "Innovation"
    | "About"
    | "Recruiter"
    | "Disclosure";
};

const sections: SearchDoc[] = [
  {
    title: "Study at SRM",
    text: "Programmes, pathways and scholarships across nine colleges. Admissions.",
    url: "/study",
    page: "Study",
    kind: "Page",
  },
  {
    title: "Research",
    text: "Funded projects, research centres and doctoral study. Ph.D.",
    url: "/research",
    page: "Research",
    kind: "Page",
  },
  {
    title: "Campus life",
    text: "Hostels, sport, clubs, library and transport at Kattankulathur.",
    url: "/campus",
    page: "Campus",
    kind: "Page",
  },
  {
    title: "Innovation",
    text: "Entrepreneurship, incubation, start-ups and prototyping.",
    url: "/innovation",
    page: "Innovation",
    kind: "Page",
  },
  {
    title: "About SRM",
    text: "History, rankings, accreditation, NAAC, NIRF and placements.",
    url: "/about",
    page: "About",
    kind: "Page",
  },
  {
    title: "Programmes by college",
    text: "Undergraduate, postgraduate and doctoral programmes and their entrance tests. B.Tech admissions SRMJEEE.",
    url: "/study#programmes",
    page: "Study",
    kind: "Section",
  },
  {
    title: "Engineering pathways",
    text: "Major, major with specialisation, or major with a minor. IDEAL curriculum, seven schools, 22 departments.",
    url: "/study#pathways",
    page: "Study",
    kind: "Section",
  },
  {
    title: "Scholarships and fees",
    text: "Founder's, merit and rank-based scholarships by SRMJEEE rank. Tuition waiver.",
    url: "/study#scholarships",
    page: "Study",
    kind: "Section",
  },
  {
    title: "How to apply",
    text: "Admissions India and Admissions International. Foreign, NRI, OCI and PIO applicants. Apply for 2027.",
    url: "/study#apply",
    page: "Study",
    kind: "Section",
  },
  {
    title: "Research highlights",
    text: "Nature Index, most-cited scientists, grants and collaborations.",
    url: "/research#highlights",
    page: "Research",
    kind: "Section",
  },
  {
    title: "Research centres",
    text: "Central research laboratories and facilities open across the university.",
    url: "/research#centres",
    page: "Research",
    kind: "Section",
  },
  {
    title: "Ph.D. admissions",
    text: "Join as a research scholar. Dean of Research contact.",
    url: "/research#phd",
    page: "Research",
    kind: "Section",
  },
  {
    title: "Hostels",
    text: "Hostel accommodation, dining and booking for men, women and international students. Hostel life.",
    url: "/campus#hostels",
    page: "Campus",
    kind: "Section",
  },
  {
    title: "Sport",
    text: "Directorate of Sports facilities, sports quota and scholarships.",
    url: "/campus#sport",
    page: "Campus",
    kind: "Section",
  },
  {
    title: "Clubs",
    text: "Student clubs registered with the Directorate of Student Affairs.",
    url: "/campus#clubs",
    page: "Campus",
    kind: "Section",
  },
  {
    title: "Library hours",
    text: "University Central Library opening and issue hours.",
    url: "/campus#library",
    page: "Campus",
    kind: "Section",
  },
  {
    title: "Bus routes and transport",
    text: "Air-conditioned buses from Chennai, timings and bus fee. Getting here.",
    url: "/campus#transport",
    page: "Campus",
    kind: "Section",
  },
  {
    title: "Start-up grants",
    text: "Startup India Seed Fund, BIRAC BioNEST and SPARSH funding.",
    url: "/innovation#grants",
    page: "Innovation",
    kind: "Section",
  },
  {
    title: "Rankings",
    text: "NIRF 2025 ranks by category. Eleventh among universities.",
    url: "/about#rankings",
    page: "About",
    kind: "Section",
  },
  {
    title: "Accreditation",
    text: "NAAC A++, UGC Category I, ABET, NBA and ICAR.",
    url: "/about#accreditation",
    page: "About",
    kind: "Section",
  },
  {
    title: "Placements",
    text: "Career Centre offers, roles and average CTC for the 2025 batch.",
    url: "/about#placements",
    page: "About",
    kind: "Section",
  },
  {
    title: "History",
    text: "From a primary school in 1969 to a deemed university in 2002.",
    url: "/about#history",
    page: "About",
    kind: "Section",
  },
  {
    title: "Placement outcomes",
    text: "Placement rate, median package and employers by college, by graduating year.",
    url: "/#outcomes",
    page: "Home",
    kind: "Section",
  },
];

export const searchIndex: SearchDoc[] = [
  ...sections,
  ...programmeGroups.map((g) => ({
    title: g.name,
    text: `${g.description}${g.entry ? ` Entrance: ${g.entry}.` : ""}`,
    url: "/study#programmes",
    page: "Study",
    kind: "Programme" as const,
  })),
  ...colleges.map((c) => ({
    title: `College of ${c.name}`,
    text: c.description,
    url: "/study#colleges",
    page: "Study",
    kind: "Programme" as const,
  })),
  ...departments.map((d) => ({
    title: d,
    text: "Department in the Faculty of Engineering and Technology.",
    url: "/study#pathways",
    page: "Study",
    kind: "Department" as const,
  })),
  ...scholarships.map((s) => ({
    title: `${s.name}, ${s.share} per cent`,
    text: `Tuition waiver for SRMJEEE ranks ${s.ranks} at Kattankulathur.`,
    url: "/study#scholarships",
    page: "Study",
    kind: "Programme" as const,
  })),
  ...otherScholarships.map((s) => ({
    title: `${s} Scholarship`,
    text: "Scholarship category for engineering admissions.",
    url: "/study#scholarships",
    page: "Study",
    kind: "Programme" as const,
  })),
  ...[...highlights, ...centres].map((r) => ({
    title: r.name,
    text: r.description ?? "",
    url: "/research#centres",
    page: "Research",
    kind: "Research" as const,
  })),
  ...hostels.map((h) => ({
    title: h.name,
    text: `${h.description ?? ""}${h.num ? ` ${h.num} places.` : ""}`,
    url: "/campus#hostels",
    page: "Campus",
    kind: "Campus" as const,
  })),
  ...sportFacilities.map((f) => ({
    title: f.label,
    text: `${f.value}. Directorate of Sports.`,
    url: "/campus#sport",
    page: "Campus",
    kind: "Campus" as const,
  })),
  ...clubs.map((c) => ({
    title: c.name,
    text: c.description,
    url: "/campus#clubs",
    page: "Campus",
    kind: "Club" as const,
  })),
  ...clubGroups.flatMap((g) =>
    g.clubs.map((c) => ({
      title: c.name,
      text: `${g.category} club${c.recruiting ? ", recruiting now" : ""}.`,
      url: "/#clubs",
      page: "Home",
      kind: "Club" as const,
    })),
  ),
  ...innovationBodies.map((b) => ({
    title: b.name,
    text: `${b.description} ${b.domain}`,
    url: "/innovation#bodies",
    page: "Innovation",
    kind: "Innovation" as const,
  })),
  ...grants.map((g) => ({
    title: g.name,
    text: g.description,
    url: "/innovation#grants",
    page: "Innovation",
    kind: "Innovation" as const,
  })),
  ...policies.map((p) => ({
    title: p.name,
    text: "Policy document on start-ups, IP and technology transfer.",
    url: "/innovation#policies",
    page: "Innovation",
    kind: "Innovation" as const,
  })),
  ...nirf.map((n) => ({
    title: `NIRF 2025: ${n.label}`,
    text: `Ranked ${n.value} in the ${n.label} category.`,
    url: "/about#rankings",
    page: "About",
    kind: "About" as const,
  })),
  ...accreditations.map((a) => ({
    title: a.name,
    text: a.description ?? "",
    url: "/about#accreditation",
    page: "About",
    kind: "About" as const,
  })),
  ...history.map((h) => ({
    title: h.year,
    text: h.text,
    url: "/about#history",
    page: "About",
    kind: "About" as const,
  })),
  ...recruiters.map((r) => ({
    title: r.name,
    text: "Recruits on campus this season.",
    url: "/#outcomes",
    page: "Home",
    kind: "Recruiter" as const,
  })),
  ...(footerColumns.find((c) => c.heading === "Disclosures")?.links ?? []).map(
    (l) => ({
      title: l.label,
      text: "Statutory disclosure.",
      url: l.href,
      page: "Disclosures",
      kind: "Disclosure" as const,
    }),
  ),
];

/** Shown before anything is typed. */
export const suggestions = [
  "B.Tech admissions",
  "Scholarships",
  "Hostels",
  "NIRF",
  "Ph.D.",
  "Bus routes",
  "Clubs",
  "Incubation",
];
