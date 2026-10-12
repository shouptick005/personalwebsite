"use client";

import { useEffect, useRef, useState } from "react";
import { BreakIcon } from "./icons";

type TraceState = "before" | "after";

const STEPS = [
  {
    title: "Ad click",
    before: "Meta and Google count the click. That is usually the last thing they hear.",
    after: "The click ID, campaign and ad are saved the moment the chat starts.",
  },
  {
    title: "WhatsApp reply",
    before: "Counted as a button tap. Nobody can tell which chats were real buyers.",
    after: "Qualified leads go back to Meta and Google, matched by a hashed phone number and counted once.",
  },
  {
    title: "Closed deal",
    before: "Lives in the CRM. The ad platforms never find out which ad produced it.",
    after: "The CRM stage is sent back as a conversion. You see cost per closed deal, by ad.",
  },
] as const;

const STATUS: Record<TraceState, string> = {
  before: "the ads learn to find cheap taps, not buyers.",
  after: "the ads learn what a buyer looks like, and you can see which ad sold.",
};

const TOGGLES: ReadonlyArray<{ state: TraceState; label: string }> = [
  { state: "before", label: "Typical setup" },
  { state: "after", label: "After my fix" },
];

export default function TraceBlock() {
  const [state, setState] = useState<TraceState>("before");
  const touched = useRef(false);

  // Play the fix once on load, unless the visitor has already chosen or prefers less motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      if (!touched.current) setState("after");
    }, 2200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="trace-block">
      <div className="trace-head">
        <p id="trace-title">Where a lead goes after someone taps your ad</p>
        <div className="toggle" role="group" aria-label="Compare tracking setups">
          {TOGGLES.map((t) => (
            <button
              key={t.state}
              type="button"
              aria-pressed={state === t.state}
              onClick={() => {
                touched.current = true;
                setState(t.state);
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <ol className="trace" data-state={state} aria-labelledby="trace-title">
        {STEPS.map((step, i) => (
          <li key={step.title}>
            <div className="dot" />
            {i === 0 ? <BreakIcon /> : null}
            <h3>{step.title}</h3>
            <p className="cap">
              <span className="before">{step.before}</span>
              <span className="after">{step.after}</span>
            </p>
          </li>
        ))}
      </ol>
      <p className="trace-status" aria-live="polite">
        <strong>Result:</strong> {STATUS[state]}
      </p>
    </div>
  );
}
