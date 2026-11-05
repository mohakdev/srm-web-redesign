/**
 * Homepage content.
 *
 * Everything the page says lives here so copy and figures can be updated
 * without touching layout. Values marked PLACEHOLDER are stand-ins and must
 * be replaced with verified figures before launch.
 */

export const nav = [
  { label: "Study", href: "/study" },
  { label: "Research", href: "/research" },
  { label: "Campus", href: "/campus" },
  { label: "Innovation", href: "/innovation" },
  { label: "About", href: "/about" },
];

export const quickLinks = [
  { label: "B.Tech admissions", href: "/study#programmes" },
  { label: "Fees and scholarships", href: "/study#scholarships" },
  { label: "Hostel life", href: "/campus#hostels" },
];

export const facts = [
  { value: "11th", label: "NIRF ranking among universities" },
  { value: "A++", label: "NAAC accreditation" },
  { value: "14th", label: "NIRF ranking in engineering" },
  // PLACEHOLDER: confirm the current programme count with the Registrar.
  { value: "300+", label: "Programmes across nine colleges" },
];

/**
 * Recruiters. Add `logo` (a path under /public) to show an image instead of
 * the name; the chip keeps the same height either way.
 */
/**
 * Recruiters shown in the marquee. `logo` is a file in /public/logos (from
 * Simple Icons or Wikimedia Commons); `withName` adds the name beside marks
 * that are symbols rather than wordmarks. No logo falls back to the name.
 */
export type Recruiter = { name: string; logo?: string; withName?: boolean };

const L = (name: string, file?: string, withName = false): Recruiter => ({
  name,
  logo: file ? `/logos/${file}.svg` : undefined,
  withName,
});

export const recruiters: Recruiter[] = [
  L("Google", "google", true),
  L("Microsoft", "microsoft", true),
  L("Amazon", "amazon"),
  L("Adobe", "adobe"),
  L("Meta", "meta", true),
  L("Oracle", "oracle"),
  L("Deloitte", "deloitte"),
  L("Samsung", "samsung", true),
  L("IBM", "ibm"),
  L("Qualcomm", "qualcomm", true),
  L("Infosys", "infosys", true),
  L("Cognizant", "cognizant"),
  L("Morgan Stanley", "morgan-stanley"),
  L("Flipkart"),
  L("Dell", "dell", true),
  L("HP", "hp", true),
  L("Bosch", "bosch", true),
  L("Siemens", "siemens", true),
  L("TCS", "tcs", true),
];

// Career Centre: companies visiting every year (srmist.edu.in/about-us).
export const recruiterCount = "625";

export type College = {
  name: string;
  description: string;
  programmes: number; // PLACEHOLDER counts
};

export const colleges: College[] = [
  {
    name: "Engineering and Technology",
    description: "Computing, core engineering and the applied sciences.",
    programmes: 112,
  },
  {
    name: "Medicine and Health Sciences",
    description: "A medical college with its own teaching hospital on campus.",
    programmes: 48,
  },
  {
    name: "Dentistry",
    description: "Undergraduate and specialist dental training with clinics.",
    programmes: 12,
  },
  {
    name: "Management",
    description: "Business degrees taught with industry practitioners.",
    programmes: 18,
  },
  {
    name: "Science and Humanities",
    description: "Pure sciences, languages, media and the social sciences.",
    programmes: 64,
  },
  {
    name: "Law",
    description: "Integrated and postgraduate law with a moot court.",
    programmes: 9,
  },
  {
    name: "Agricultural Sciences",
    description: "Field-based agriculture with farmland on campus.",
    programmes: 7,
  },
  {
    name: "Pharmacy",
    description: "Pharmaceutical sciences, from formulation to practice.",
    programmes: 11,
  },
  {
    name: "Hotel and Catering Management",
    description: "Hospitality training in working kitchens and front offices.",
    programmes: 6,
  },
];

export type YearOutcome = { year: number; placed: number; eligible: number };

export type Outcome = {
  college: string;
  placementRate: number; // percent
  medianPackage: number; // lakh per year
  employers: number;
  years: YearOutcome[];
};

// PLACEHOLDER: replace with the Career Centre dataset.
export const outcomes: Outcome[] = [
  {
    college: "All colleges",
    placementRate: 89,
    medianPackage: 7.2,
    employers: 1100,
    years: [
      { year: 2021, placed: 7420, eligible: 8900 },
      { year: 2022, placed: 8110, eligible: 9350 },
      { year: 2023, placed: 8040, eligible: 9620 },
      { year: 2024, placed: 8390, eligible: 9810 },
      { year: 2025, placed: 8820, eligible: 10040 },
      { year: 2026, placed: 9140, eligible: 10270 },
    ],
  },
  {
    college: "Engineering",
    placementRate: 92,
    medianPackage: 8.1,
    employers: 840,
    years: [
      { year: 2021, placed: 5310, eligible: 6100 },
      { year: 2022, placed: 5820, eligible: 6380 },
      { year: 2023, placed: 5700, eligible: 6540 },
      { year: 2024, placed: 5960, eligible: 6650 },
      { year: 2025, placed: 6240, eligible: 6790 },
      { year: 2026, placed: 6480, eligible: 6930 },
    ],
  },
  {
    college: "Management",
    placementRate: 88,
    medianPackage: 7.6,
    employers: 210,
    years: [
      { year: 2021, placed: 480, eligible: 590 },
      { year: 2022, placed: 530, eligible: 610 },
      { year: 2023, placed: 540, eligible: 630 },
      { year: 2024, placed: 560, eligible: 650 },
      { year: 2025, placed: 590, eligible: 670 },
      { year: 2026, placed: 610, eligible: 690 },
    ],
  },
  {
    college: "Science and Humanities",
    placementRate: 74,
    medianPackage: 4.8,
    employers: 160,
    years: [
      { year: 2021, placed: 620, eligible: 960 },
      { year: 2022, placed: 690, eligible: 1010 },
      { year: 2023, placed: 710, eligible: 1040 },
      { year: 2024, placed: 760, eligible: 1060 },
      { year: 2025, placed: 790, eligible: 1080 },
      { year: 2026, placed: 820, eligible: 1100 },
    ],
  },
  {
    college: "Law",
    placementRate: 71,
    medianPackage: 6.0,
    employers: 48,
    years: [
      { year: 2021, placed: 58, eligible: 92 },
      { year: 2022, placed: 66, eligible: 98 },
      { year: 2023, placed: 70, eligible: 101 },
      { year: 2024, placed: 74, eligible: 104 },
      { year: 2025, placed: 79, eligible: 110 },
      { year: 2026, placed: 82, eligible: 115 },
    ],
  },
];

export const outcomesSource = {
  body: "Career Centre",
  batchYear: 2026,
  // PLACEHOLDER date. Machine-readable value drives the <time> element.
  updated: "2026-10-14",
  updatedLabel: "14 October 2026",
  dataset: "/data/outcomes-2026.csv",
};

export type ClubGroup = {
  category: string;
  count: number;
  clubs: { name: string; recruiting?: boolean }[];
};

// PLACEHOLDER: names are representative. Load the full roster from the
// Directorate of Student Affairs; counts must match the published list.
export const clubGroups: ClubGroup[] = [
  {
    category: "Technical",
    count: 52,
    clubs: [
      { name: "Next Tech Lab", recruiting: true },
      { name: "Robotics Society" },
      { name: "Formula Student Team", recruiting: true },
      { name: "Aeromodelling Club" },
      { name: "Open Source Collective" },
      { name: "Data Science Community", recruiting: true },
      { name: "Cybersecurity Circle" },
      { name: "Rocketry Team" },
      { name: "Competitive Programming Club" },
      { name: "Hyperloop Team" },
      { name: "Game Development Guild", recruiting: true },
      { name: "Satellite Team" },
    ],
  },
  {
    category: "Entrepreneurship",
    count: 14,
    clubs: [
      { name: "Entrepreneurship Cell", recruiting: true },
      { name: "Product Club" },
      { name: "Venture Investing Society" },
      { name: "Social Enterprise Forum" },
      { name: "Founders' Night" },
      { name: "Design Thinking Studio", recruiting: true },
    ],
  },
  {
    category: "Culture and performance",
    count: 38,
    clubs: [
      { name: "Dramatics Society" },
      { name: "Classical Music Circle", recruiting: true },
      { name: "Western Music Club" },
      { name: "Dance Collective" },
      { name: "Film Society" },
      { name: "Literary Society", recruiting: true },
      { name: "Debating Union" },
      { name: "Photography Club" },
      { name: "Quiz Club" },
      { name: "Fine Arts Society" },
    ],
  },
  {
    category: "Sport and esports",
    count: 26,
    clubs: [
      { name: "Cricket Club" },
      { name: "Football Club", recruiting: true },
      { name: "Basketball Club" },
      { name: "Athletics Squad" },
      { name: "Chess Club" },
      { name: "Esports Society", recruiting: true },
      { name: "Swimming Club" },
      { name: "Mountaineering Club" },
    ],
  },
  {
    category: "Service and community",
    count: 22,
    clubs: [
      { name: "National Service Scheme" },
      { name: "National Cadet Corps" },
      { name: "Rotaract Club", recruiting: true },
      { name: "Blood Donors' Forum" },
      { name: "Teach for Kattankulathur", recruiting: true },
      { name: "Green Campus Initiative" },
      { name: "Animal Welfare Society" },
    ],
  },
  {
    category: "Departmental",
    count: 28,
    clubs: [
      { name: "Association of Computing Students" },
      { name: "Civil Engineering Society" },
      { name: "Biotech Forum", recruiting: true },
      { name: "Physics Society" },
      { name: "Mathematics Circle" },
      { name: "Pharmacy Students' Council" },
      { name: "Moot Court Society", recruiting: true },
      { name: "Agricultural Students' Union" },
    ],
  },
];

// Domains from srmist.edu.in. The Atal Incubation Centre has no address on the
// official site; it points at the innovation hub page until one is confirmed.
export const innovationBodies = [
  {
    name: "Directorate of Entrepreneurship and Innovation",
    description:
      "Sensitises, engages and supports innovators from ideation to product development.",
    domain: "srmdei.com",
  },
  {
    name: "Bootstrappers' Research Council",
    description:
      "Governs the SRM Innovation Incubation and Entrepreneurship Centre, backed by the Startup India Seed Fund.",
    domain: "srmiiec.com",
  },
  {
    name: "Atal Incubation Centre",
    description:
      "Incubation, office space and investor access for early ventures.",
    domain: "srmist.edu.in/research/innovation-incubation",
  },
  {
    name: "FAB LAB and the Innovation and Design Centre",
    description:
      "A multipurpose platform where engineering ideas are made into working prototypes.",
    domain: "fablab.srmiiec.com",
  },
];

// PLACEHOLDER: confirm the 2027 deadline with the Admissions Office.
export const admissions = {
  deadline: "31 March 2027",
  deadlineIso: "2027-03-31",
};

export const footerColumns = [
  {
    heading: "Study",
    links: [
      { label: "Undergraduate", href: "/study#programmes" },
      { label: "Postgraduate", href: "/study#programmes" },
      { label: "Doctoral", href: "/research#phd" },
      { label: "Fees and scholarships", href: "/study#scholarships" },
      { label: "International students", href: "/study#apply" },
    ],
  },
  {
    heading: "Campus",
    links: [
      { label: "Hostels", href: "/campus#hostels" },
      { label: "Clubs", href: "/campus#clubs" },
      { label: "Sport", href: "/campus#sport" },
      { label: "Libraries", href: "/campus#library" },
      { label: "Getting here", href: "/campus#transport" },
    ],
  },
  {
    heading: "Discover",
    links: [
      { label: "Research", href: "/research" },
      { label: "Innovation", href: "/innovation" },
      { label: "History", href: "/about#history" },
      { label: "Placements", href: "/about#placements" },
      { label: "About SRM", href: "/about" },
    ],
  },
  {
    heading: "Disclosures",
    links: [
      { label: "NIRF", href: "/about#rankings" },
      { label: "NAAC and IQAC", href: "/about#accreditation" },
      { label: "UGC self-disclosure", href: "/disclosures/ugc" },
      {
        label: "AICTE",
        href: "https://webstor.srmist.edu.in/web_assets/downloads/2025/flipbook/aicte-mandate-disclosure/",
      },
      { label: "Right to Information", href: "/disclosures/rti" },
      {
        label: "Grievances",
        href: "https://www.srmist.edu.in/life-at-srm/complaints-redressal/",
      },
    ],
  },
];
