"use client";

import { useRef, useState, type FormEvent } from "react";
import { EMAIL, WHATSAPP_DISPLAY, whatsappUrl } from "@/lib/site";
import { track } from "@/lib/tracking";
import { useCheckResult } from "./CheckResultProvider";
import TrackedLink from "./TrackedLink";

const SPEND_OPTIONS = [
  "Under AED 10,000",
  "AED 10,000 to 30,000",
  "AED 30,000 to 100,000",
  "Over AED 100,000",
  "I'd rather not say",
] as const;

const SOURCES = ["Meta", "Google", "Property portals", "Other"] as const;
type Source = (typeof SOURCES)[number];
type Method = "whatsapp" | "email";

export default function TeardownForm() {
  const { checkResult } = useCheckResult();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [site, setSite] = useState("");
  const [spend, setSpend] = useState<string>(SPEND_OPTIONS[2]);
  const [sources, setSources] = useState<Source[]>([]);
  const [note, setNote] = useState("");
  const [nameError, setNameError] = useState(false);
  const [siteError, setSiteError] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const siteRef = useRef<HTMLInputElement>(null);

  const toggleSource = (s: Source) =>
    setSources((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : SOURCES.filter((x) => x === s || prev.includes(x))));

  const message = (): string => {
    const lines: Array<string | null> = [
      "Hi Mahimul, I would like a free teardown.",
      "",
      `Name: ${name.trim()}`,
      company.trim() ? `Company: ${company.trim()}` : null,
      `Website: ${site.trim()}`,
      `Monthly ad spend: ${spend}`,
      sources.length ? `Leads come from: ${sources.join(", ")}` : null,
      note.trim() ? `What is going wrong: ${note.trim()}` : null,
      checkResult || null,
    ];
    return lines.filter((l): l is string => l !== null).join("\n");
  };

  const send = (method: Method) => {
    const badName = !name.trim();
    const badSite = !site.trim();
    setNameError(badName);
    setSiteError(badSite);
    if (badName || badSite) {
      (badName ? nameRef : siteRef).current?.focus();
      return;
    }
    track({ event: "teardown_submit", method, ad_spend: spend });
    const text = message();
    if (method === "email") {
      const subject = encodeURIComponent(`Free teardown request: ${site.trim()}`);
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${encodeURIComponent(text)}`;
    } else {
      window.open(whatsappUrl(text), "_blank", "noopener");
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    send("whatsapp");
  };

  return (
    <section className="section" id="teardown" aria-labelledby="teardown-title">
      <div className="wrap teardown">
        <div>
          <h2 id="teardown-title">Get a free teardown</h2>
          <p className="lede">
            Send me your website. You&apos;ll get three specific findings on video, with no call needed and no pitch
            attached.
          </p>
          <ol className="steps">
            <li>
              <b>1</b>
              <span>You send your website and a few details.</span>
            </li>
            <li>
              <b>2</b>
              <span>I go through your ads, landing page and WhatsApp flow as a buyer would.</span>
            </li>
            <li>
              <b>3</b>
              <span>
                Within 3 working days you get a short video with three findings and what each one is likely costing
                you.
              </span>
            </li>
          </ol>
          <p>
            Prefer to talk first?{" "}
            <TrackedLink event="whatsapp_click" where="teardown" href={whatsappUrl()}>
              WhatsApp {WHATSAPP_DISPLAY}
            </TrackedLink>{" "}
            or{" "}
            <TrackedLink event="email_click" where="teardown" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </TrackedLink>
            .
          </p>
        </div>

        <form className="req" noValidate onSubmit={onSubmit}>
          <p className={checkResult ? "carry show" : "carry"}>
            {checkResult ? `${checkResult} This will be included in your request.` : ""}
          </p>
          <div className="two">
            <div className="field">
              <label htmlFor="f-name">Your name</label>
              <input
                ref={nameRef}
                type="text"
                id="f-name"
                name="name"
                autoComplete="name"
                required
                aria-describedby="e-name"
                aria-invalid={nameError}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameError && e.target.value.trim()) setNameError(false);
                }}
              />
              <p className={nameError ? "err show" : "err"} id="e-name">
                Add your name so I know who to reply to.
              </p>
            </div>
            <div className="field">
              <label htmlFor="f-co">
                Company <span className="opt">(optional)</span>
              </label>
              <input
                type="text"
                id="f-co"
                name="company"
                autoComplete="organization"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="f-site">Website</label>
            <input
              ref={siteRef}
              type="url"
              id="f-site"
              name="website"
              inputMode="url"
              placeholder="yourbrokerage.ae"
              required
              aria-describedby="e-site"
              aria-invalid={siteError}
              value={site}
              onChange={(e) => {
                setSite(e.target.value);
                if (siteError && e.target.value.trim()) setSiteError(false);
              }}
            />
            <p className={siteError ? "err show" : "err"} id="e-site">
              Add your website so I know what to check.
            </p>
          </div>
          <div className="field">
            <label htmlFor="f-spend">Monthly ad spend</label>
            <select id="f-spend" name="spend" value={spend} onChange={(e) => setSpend(e.target.value)}>
              {SPEND_OPTIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <span className="label" id="l-src">
              Where your leads come from
            </span>
            <div className="checks seg" role="group" aria-labelledby="l-src">
              {SOURCES.map((s) => (
                <label key={s}>
                  <input
                    type="checkbox"
                    name="source"
                    value={s}
                    checked={sources.includes(s)}
                    onChange={() => toggleSource(s)}
                  />
                  <span>{s}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="field">
            <label htmlFor="f-note">
              What&apos;s going wrong <span className="opt">(optional)</span>
            </label>
            <textarea
              id="f-note"
              name="note"
              placeholder="For example: lots of WhatsApp chats, very few viewings."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className="form-actions">
            <button className="btn btn-primary" type="submit">
              Send on WhatsApp
            </button>
            <button className="linkish" type="button" onClick={() => send("email")}>
              Send by email instead
            </button>
          </div>
          <p className="form-note">
            This opens WhatsApp or your email app with your details filled in. Nothing is stored on this site.
          </p>
        </form>
      </div>
    </section>
  );
}
