/** Content for /study, taken from srmist.edu.in. */
// Source: srmist.edu.in/admission-india
export type ProgrammeGroup = {
  name: string;
  description: string;
  entry?: string;
};

export const programmeGroups: ProgrammeGroup[] = [
  {
    name: "Engineering and Technology",
    description:
      "B.Tech and integrated M.Tech, M.Tech, B.Arch and B.Des, M.Arch and M.Des, lateral-entry B.Tech after a diploma, flexible-timing M.Tech, and a PG diploma in genetic counselling.",
    entry: "SRMJEEE",
  },
  {
    name: "Medicine and Health Sciences",
    description:
      "MBBS, BDS, MD and MS, MDS, super-speciality programmes, undergraduate and postgraduate health sciences, and doctoral research in the Division of Medical Research.",
    entry: "NEET and SRMJEEH",
  },
  {
    name: "Management",
    description: "BBA, MBA and a part-time MBA for working professionals.",
    entry: "SRMJEEM",
  },
  {
    name: "Liberal Arts and Business Studies",
    description:
      "Formerly Science and Humanities. B.A., B.Sc., B.Com, BCA, B.S. (Hons) and B.Ed; M.A., M.Sc., M.Com, MCA, M.S. and MSW; diplomas in music teacher training and journalism.",
  },
  {
    name: "Law",
    description:
      "Five-year integrated law, LL.B (Hons), LL.M, B.A. (Hons), M.A., and certificate and diploma programmes.",
    entry: "SRMJEEL",
  },
  {
    name: "Agricultural Sciences",
    description:
      "Undergraduate and postgraduate agriculture, accredited by ICAR.",
  },
  {
    name: "Hotel and Catering Management",
    description: "Undergraduate, postgraduate and diploma programmes.",
  },
  {
    name: "Doctoral study",
    description: "Ph.D. admissions across every school and faculty.",
  },
];

// Source: srmist.edu.in/college/college-of-engineering-technology
export const departments = [
  "Aerospace Engineering",
  "Architecture and Interior Design",
  "Automobile Engineering",
  "Biomedical Engineering",
  "Biotechnology",
  "Chemical Engineering",
  "Chemistry",
  "Civil Engineering",
  "Computational Intelligence",
  "Computing Technologies",
  "Data Science and Business Systems",
  "Electrical and Electronics Engineering",
  "Electronics and Communication Engineering",
  "Electronics and Instrumentation Engineering",
  "Food Technology",
  "Genetic Engineering",
  "Language, Culture and Society",
  "Mathematics",
  "Mechanical Engineering",
  "Mechatronics Engineering",
  "Networking and Communications",
  "Physics and Nanotechnology",
];

// Source: srmist.edu.in/admission-india/engineering/scholarships (Kattankulathur)
export const scholarships = [
  { name: "Founder's Scholarship", share: "100", ranks: "1 to 40" },
  { name: "Merit Scholarship", share: "100", ranks: "41 to 115" },
  { name: "Rank-based Scholarship", share: "75", ranks: "116 to 215" },
  { name: "Rank-based Scholarship", share: "50", ranks: "216 to 340" },
  { name: "Rank-based Scholarship", share: "25", ranks: "341 to 490" },
];

export const otherScholarships = [
  "Chancellor Constituency",
  "Socio-Economic",
  "Unnat Bharat Abhiyan",
  "Differently Abled",
  "Arts and Culture",
  "Employee Ward",
  "Alumni",
  "Performance Based",
  "Defence",
  "Sponsored",
];
