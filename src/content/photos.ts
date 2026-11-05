/**
 * Campus photography, upscaled about 2x (Lanczos with light sharpening) from the
 * supplied originals. Dimensions are the source files' own, so next/image
 * never has to guess the aspect ratio. Replace a file in /public/campus with
 * a larger version of the same shot and only the numbers here need updating.
 */
export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

export const photos = {
  techPark: {
    src: "/campus/tech-park.jpg",
    width: 1800,
    height: 1048,
    alt: "Students climbing the steps to SRM Tech Park on a clear day",
    caption: "SRM Tech Park",
  },
  universityBuilding: {
    src: "/campus/university-building.jpg",
    width: 1536,
    height: 1024,
    alt: "The pink, arched-window facade of the University Building above a line of palm trees",
    caption: "The University Building",
  },
  vendharSquare: {
    src: "/campus/vendhar-square.jpg",
    width: 1032,
    height: 1376,
    alt: "White carved staircases and balustrades of Vendhar Square under a blue sky",
    caption: "Vendhar Square",
  },
  schoolOfLaw: {
    src: "/campus/school-of-law.jpg",
    width: 1360,
    height: 902,
    alt: "Six law students in uniform holding textbooks outside the SRM School of Law",
    caption: "Students outside the School of Law",
  },
  lakeAerial: {
    src: "/campus/lake-aerial.jpg",
    width: 1442,
    height: 750,
    alt: "Aerial view of the Kattankulathur campus, its tower blocks and greenery, across a lake",
    caption: "Kattankulathur from across the lake",
  },
} satisfies Record<string, Photo>;
