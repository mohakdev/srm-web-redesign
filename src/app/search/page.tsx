import type { Metadata } from "next";
import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { Masthead } from "@/components/Masthead";
import { SearchApp, SearchHero } from "./SearchApp";

export const metadata: Metadata = {
  title: "Search SRM",
  description:
    "Search programmes, scholarships, research, campus life and disclosures.",
};

export default function SearchPage() {
  return (
    <>
      <Masthead />
      <main id="main">
        {/* The query lives in the URL, so results render on the client. */}
        <Suspense fallback={<SearchHero query="" />}>
          <SearchApp />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
