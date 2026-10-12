import Image from "next/image";
import portrait from "../../public/assets/portrait.webp";

const EXPERIENCE = [
  { role: "NEXCRO, media buyer and planner", years: "2025 to now" },
  { role: "REBEL 360, media buyer", years: "2024 to 2025" },
  { role: "Freelance tracking and CRO", years: "2024 to 2026" },
] as const;

const TOOLS = [
  "Meta Ads and Google Ads",
  "Google Tag Manager and GA4",
  "Meta Conversions API, enhanced conversions",
  "Looker Studio, Microsoft Clarity",
] as const;

export default function AboutSection() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="wrap about">
        <div className="text">
          <h2 id="about-title">An engineer who runs ads</h2>
          <p className="lede">
            I&apos;m Mahimul. My background is mechatronics engineering, and I still treat marketing like a system:
            find where the signal breaks, then fix it at the source.
          </p>
          <p>
            Since 2024 I&apos;ve run paid media and tracking for lead generation and e-commerce businesses. Today
            I&apos;m a media buyer and planner at NEXCRO, where I lead a small team on paid media, tracking and
            conversion work.
          </p>
          <p>
            I focus on UAE real estate because it has a problem I know how to fix. Buyers convert on WhatsApp, and in
            most ad accounts that conversation never makes it back to Meta or Google. So the ads optimise for cheap
            taps, lead quality slips every week, and the market gets the blame.
          </p>
          <p>
            I work from Bangladesh, two hours ahead of Dubai, so I&apos;m online before your team starts and through
            your whole working day.
          </p>

          <div className="facts">
            <div>
              <h3>Experience</h3>
              <ul>
                {EXPERIENCE.map((e) => (
                  <li key={e.role}>
                    {e.role} <span>{e.years}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Tools I use every week</h3>
              <ul>
                {TOOLS.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="portrait">
          <Image src={portrait} alt="Md Mahimul Hoque" sizes="(max-width: 960px) 360px, 420px" />
        </div>
      </div>
    </section>
  );
}
