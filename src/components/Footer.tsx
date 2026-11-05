import Image from "next/image";
import { footerColumns } from "@/content/site";

export function Footer() {
  return (
    <footer className="footer on-navy">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Image
              src="/brand/srm-logo.jpg"
              alt=""
              width={56}
              height={56}
              className="crest"
              sizes="56px"
            />
            <span className="wordmark-name">
              SRM Institute of Science and Technology
            </span>
            <address>
              SRM Nagar, Kattankulathur
              <br />
              Chengalpattu District, Tamil Nadu{" "}
              <span className="num">603203</span>
            </address>
          </div>
          {footerColumns.map((col) => (
            <nav key={col.heading} aria-labelledby={`footer-${col.heading}`}>
              <h2 id={`footer-${col.heading}`}>{col.heading}</h2>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="footer-base">
          <span>
            Copyright <span className="num">2026</span> SRM Institute of Science
            and Technology. Deemed to be university under section{" "}
            <span className="num">3</span> of the UGC Act,{" "}
            <span className="num">1956</span>.
          </span>
          <a href="/privacy">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
