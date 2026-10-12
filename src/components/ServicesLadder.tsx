const TIERS = [
  {
    title: "Free teardown",
    body: "I check your funnel from the outside, the way a buyer meets it: ads, landing page, WhatsApp, follow-up. You get three findings, ordered by how much money they're likely costing you, in a 4 to 6 minute video.",
    price: "Free",
    terms: "Ready within 3 working days",
  },
  {
    title: "Tracking build",
    body: "GA4 and Tag Manager rebuilt around qualified leads. Meta Pixel and Conversions API without double counting. Click-to-WhatsApp events. CRM stages sent back to Meta and Google. A cost per qualified lead dashboard. Ad permit checks on every creative.",
    price: "From USD 900",
    terms: "Fixed price, 2 to 3 weeks",
  },
  {
    title: "Ads management",
    body: "Meta and Google run on the tracking from step 2, with a weekly cost per qualified lead report, creative direction and landing page fixes.",
    price: "From USD 1,200 a month",
    terms: "Only after a tracking build",
  },
] as const;

export default function ServicesLadder() {
  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="wrap">
        <h2 id="services-title">How working with me goes</h2>
        <p className="lede">
          Tracking comes first. Running ads on broken tracking is how three months of budget disappears without
          anyone knowing why.
        </p>

        <ol className="ladder">
          {TIERS.map((t) => (
            <li key={t.title}>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
              <p className="price">
                {t.price}
                <small>{t.terms}</small>
              </p>
            </li>
          ))}
        </ol>
        <p className="aside-line">
          <strong>For agencies:</strong> I can be the tracking layer behind your delivery, with no contact with your
          clients. Priced per project.
        </p>
      </div>
    </section>
  );
}
