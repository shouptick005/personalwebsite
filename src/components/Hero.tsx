import Image from "next/image";
import Link from "next/link";
import { whatsappUrl } from "@/lib/site";
import TraceBlock from "./TraceBlock";
import TrackedLink from "./TrackedLink";
import { WhatsAppIcon } from "./icons";
import heroMetal from "../../public/assets/hero-metal.jpg";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <Image src={heroMetal} alt="" fill priority sizes="(max-width: 1400px) 100vw, 1400px" quality={75} />
      </div>
      <div className="wrap">
        <h1 id="hero-title">Know which ad sold the apartment.</h1>
        <p className="lede">
          I run Meta and Google ads for UAE real estate and wire the tracking behind them. Every WhatsApp
          enquiry and every closed deal traces back to the ad that produced it, so your budget goes to what
          sells.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href="#teardown">
            Get a free teardown
          </Link>
          <TrackedLink
            className="btn btn-ghost"
            event="whatsapp_click"
            where="hero"
            href={whatsappUrl("Hi Mahimul, I found you through your website.")}
          >
            <WhatsAppIcon />
            Message me on WhatsApp
          </TrackedLink>
        </div>
        <p className="hero-note">Based in Bangladesh, two hours ahead of Dubai. Online before your team starts.</p>

        <TraceBlock />
      </div>
    </section>
  );
}
