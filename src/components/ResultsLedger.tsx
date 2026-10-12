type Result = {
  account: string;
  kind: string;
  problem: string;
  action: string;
  result: string;
};

const RESULTS: readonly Result[] = [
  {
    account: "Lead generation",
    kind: "Google Ads, 12 weeks",
    problem: "The account counted calls and form fills. WhatsApp enquiries showed up nowhere.",
    action: "Set up WhatsApp conversion tracking in Google Tag Manager and tested it before changing any bids.",
    result: "338 leads at about USD 6.21 each. 149 were WhatsApp chats nobody had been counting.",
  },
  {
    account: "Real estate landing page",
    kind: "Tracking fix",
    problem: "Conversions weren't recorded reliably, so the page looked worse than it was.",
    action: "Audited it with Tag Assistant, rebuilt the tracking and tested every conversion event end to end.",
    result: "Measured conversion rate up 13%.",
  },
  {
    account: "E-commerce brand",
    kind: "Meta Ads",
    problem: "ROAS stuck at 0.8. The Pixel and Conversions API were broken, so Meta optimised on bad signals.",
    action: "Rebuilt the data flow and checked deduplication in Events Manager before touching the campaigns.",
    result: "Revenue up 17%.",
  },
  {
    account: "Property developer",
    kind: "Three project landing pages",
    problem: "Visitors arrived but enquiries didn't follow, and nobody knew where people dropped off.",
    action: "Audited the pages in Microsoft Clarity and GA4: scroll depth, rage clicks, dead clicks and form friction.",
    result: "A fix list ranked by likely impact, so the team knew what to change first.",
  },
  {
    account: "Cleaning services",
    kind: "Google Search",
    problem: "A new Search campaign that needed every enquiry counted from day one.",
    action: "Built it around high-intent keywords and tested conversion tracking before it scaled.",
    result: "34.29% conversion rate: 24 conversions from 70 clicks.",
  },
];

export default function ResultsLedger() {
  return (
    <section className="section" id="results" aria-labelledby="results-title">
      <div className="wrap">
        <h2 id="results-title">Results from real accounts</h2>
        <p className="lede">
          Each one started with the tracking, because you can&apos;t fix what you can&apos;t see. Client names stay
          private; the numbers come from the account dashboards.
        </p>

        <div className="ledger">
          <div className="ledger-head" aria-hidden="true">
            <span>Account</span>
            <span>What was wrong</span>
            <span>What I did</span>
            <span>Result</span>
          </div>

          {RESULTS.map((r) => (
            <article className="row" key={r.account}>
              <div>
                <h3>{r.account}</h3>
                <p className="kind">{r.kind}</p>
              </div>
              <div>
                <span className="label">What was wrong</span>
                <p>{r.problem}</p>
              </div>
              <div>
                <span className="label">What I did</span>
                <p>{r.action}</p>
              </div>
              <div>
                <span className="label">Result</span>
                <p className="result">{r.result}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="ledger-note">
          Not every result above is from real estate. The problem is the same in every lead business: the platform
          can only learn from what you send back to it.
        </p>
      </div>
    </section>
  );
}
