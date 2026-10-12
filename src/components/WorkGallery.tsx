"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronIcon } from "./icons";
import whatsappLeads from "../../public/assets/work/whatsapp-leads.jpg";
import metaDedupe from "../../public/assets/work/meta-dedupe.jpg";
import gtmLeadActions from "../../public/assets/work/gtm-lead-actions.jpg";
import ga4Debugview from "../../public/assets/work/ga4-debugview.jpg";
import phoneHash from "../../public/assets/work/phone-hash.jpg";
import whatsappClickTags from "../../public/assets/work/whatsapp-click-tags.jpg";

type Sample = { src: StaticImageData; alt: string; caption: string };

const SAMPLES: readonly Sample[] = [
  {
    src: whatsappLeads,
    alt: "Google Ads dashboard showing 189 phone call leads and 149 WhatsApp leads over 12 weeks",
    caption: "WhatsApp leads made visible in Google Ads",
  },
  {
    src: metaDedupe,
    alt: "Meta Events Manager test events where the browser copy of each event is marked deduplicated",
    caption: "Meta browser and server events, counted once",
  },
  {
    src: gtmLeadActions,
    alt: "Google Tag Manager tag list with form, phone call and WhatsApp click tags for GA4 and Google Ads",
    caption: "Form, call and WhatsApp click, each sent to GA4 and Google Ads",
  },
  {
    src: ga4Debugview,
    alt: "GA4 DebugView showing six lead events arriving in order during one test session",
    caption: "Six lead events checked in GA4 DebugView",
  },
  {
    src: phoneHash,
    alt: "Google Tag Manager variables that normalise and hash the phone number with a shared event ID",
    caption: "Phone numbers normalised and hashed for Meta matching",
  },
  {
    src: whatsappClickTags,
    alt: "Google Tag Manager workspace where one WhatsApp click trigger feeds Meta, TikTok and a custom tag",
    caption: "One WhatsApp trigger feeding Meta, TikTok and a custom tag",
  },
];

export default function WorkGallery() {
  const rowRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [open, setOpen] = useState<Sample | null>(null);

  const updateNav = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    // Scroll snap can rest a few pixels in from either edge (the row has 4px padding), so allow some slack.
    const SLACK = 8;
    setAtStart(row.scrollLeft <= SLACK);
    setAtEnd(row.scrollLeft + row.clientWidth >= row.scrollWidth - SLACK);
  }, []);

  useEffect(() => {
    updateNav();
    window.addEventListener("resize", updateNav);
    return () => window.removeEventListener("resize", updateNav);
  }, [updateNav]);

  // Show the dialog once a sample is chosen; fall back to a new tab where <dialog> is unsupported.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    if (typeof dialog.showModal === "function") {
      if (!dialog.open) dialog.showModal();
    } else {
      window.open(open.src.src, "_blank", "noopener");
      setOpen(null);
    }
  }, [open]);

  const scrollByStep = (dir: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;
    const figure = row.querySelector("figure");
    const step = figure ? figure.offsetWidth + 20 : 300;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    row.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <div className="work-head">
          <div>
            <h2 id="work-title">Setups I&apos;ve built</h2>
            <p className="lede">
              Screens from real tracking work, cropped so no client can be identified. Select one to see it full
              size.
            </p>
          </div>
          <div className="work-nav">
            <button type="button" aria-label="Previous samples" disabled={atStart} onClick={() => scrollByStep(-1)}>
              <ChevronIcon direction="left" />
            </button>
            <button type="button" aria-label="Next samples" disabled={atEnd} onClick={() => scrollByStep(1)}>
              <ChevronIcon direction="right" />
            </button>
          </div>
        </div>
        <div className="work-row" ref={rowRef} onScroll={updateNav}>
          {SAMPLES.map((s) => (
            <figure key={s.caption}>
              <button type="button" onClick={() => setOpen(s)}>
                <Image src={s.src} alt={s.alt} sizes="(max-width: 720px) 80vw, 340px" />
              </button>
              <figcaption>{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <dialog
        className="viewer"
        ref={dialogRef}
        aria-label="Work sample"
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
      >
        <button className="viewer-close" type="button" aria-label="Close" onClick={() => dialogRef.current?.close()}>
          &times;
        </button>
        {open ? (
          <>
            <Image src={open.src} alt={open.alt} sizes="(max-width: 940px) 92vw, 860px" />
            <p>{open.caption}</p>
          </>
        ) : null}
      </dialog>
    </section>
  );
}
