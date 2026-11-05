import type { Metadata } from "next";
import localFont from "next/font/local";
import { ChatWidget } from "@/components/ChatWidget";
import { MotionController } from "@/components/MotionController";
import { motionGateScript } from "@/lib/motion-gate";
import "./globals.css";

const newsreader = localFont({
  src: "./fonts/Newsreader-Variable.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-serif",
  display: "swap",
});

const instrumentSans = localFont({
  src: "./fonts/InstrumentSans-Variable.woff2",
  weight: "400 600",
  style: "normal",
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  // A concept, not the official site: keep it out of search results.
  robots: { index: false, follow: false },
  title: "SRM Institute of Science and Technology",
  description:
    "Nine colleges on one 250-acre campus at Kattankulathur. Applications for the 2027 intake are open.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${newsreader.variable} ${instrumentSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          // Decides before first paint whether this visitor gets animation.
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static, first-party script.
          dangerouslySetInnerHTML={{ __html: motionGateScript }}
        />
      </head>
      <body>
        {children}
        <ChatWidget />
        <MotionController />
      </body>
    </html>
  );
}
