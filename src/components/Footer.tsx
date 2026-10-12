import { EMAIL, LINKEDIN_URL, whatsappUrl } from "@/lib/site";
import TrackedLink from "./TrackedLink";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <span className="who">Md Mahimul Hoque</span>
        <TrackedLink event="whatsapp_click" where="footer" href={whatsappUrl()}>
          WhatsApp
        </TrackedLink>
        <TrackedLink event="email_click" where="footer" href={`mailto:${EMAIL}`}>
          Email
        </TrackedLink>
        <TrackedLink event="linkedin_click" where="footer" href={LINKEDIN_URL}>
          LinkedIn
        </TrackedLink>
        <small>Paid ads, tracking and attribution for UAE real estate. &copy; 2026 Md Mahimul Hoque.</small>
      </div>
    </footer>
  );
}
