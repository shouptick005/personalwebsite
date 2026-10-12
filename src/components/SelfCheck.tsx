"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { track } from "@/lib/tracking";
import { useCheckResult } from "./CheckResultProvider";

type Stage = "click" | "reply" | "deal";
type Answer = "yes" | "no" | "unsure";
/** true = every answer for the stage is yes, false = at least one is not, null = still unanswered */
type StageState = boolean | null;

const STAGES: readonly Stage[] = ["click", "reply", "deal"];

const QUESTIONS: ReadonlyArray<{ id: string; stage: Stage; legend: string; hint: string }> = [
  {
    id: "q1",
    stage: "click",
    legend: "When someone starts a WhatsApp chat from an ad, do you store the click ID, campaign and ad?",
    hint: "Without it, a chat can't be matched to the ad later.",
  },
  {
    id: "q2",
    stage: "click",
    legend: "Does your landing page fire a tracked event when someone taps the WhatsApp button?",
    hint: "If it doesn't, those leads are invisible in your ad account.",
  },
  {
    id: "q3",
    stage: "reply",
    legend: "Are you on the WhatsApp Business Platform (API), not only the free app?",
    hint: "The free app can't send conversation data back to Meta.",
  },
  {
    id: "q4",
    stage: "deal",
    legend: "Can your CRM name the ad behind a closed deal, without asking the agent?",
    hint: "Agent memory isn't attribution.",
  },
  {
    id: "q5",
    stage: "deal",
    legend: "Do qualified leads or booked viewings get sent back to Meta and Google?",
    hint: "This is how the platforms learn what a buyer looks like.",
  },
];

const OPTIONS: ReadonlyArray<{ value: Answer; label: string }> = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unsure", label: "Not sure" },
];

const NAMES: Record<Stage, string> = {
  click: "the ad click",
  reply: "the WhatsApp reply",
  deal: "the closed deal",
};

const WHY: Record<Stage, string> = {
  click:
    "The ad and the chat are never connected, so every later step is guesswork. This is the cheapest break to fix and the one to fix first.",
  reply: "You can see chats arrive, but Meta and Google never learn which of them were real buyers.",
  deal: "Leads are tracked, but closed deals never get back to the ad platforms. You are judging ads on lead volume, not sales.",
};

const INITIAL_TITLE = "Answer the questions to see where your trail breaks.";
const INITIAL_SAY = "Most setups I look at break early, at the first WhatsApp tap.";

type Evaluation = {
  answered: number;
  yes: number;
  stageOk: Record<Stage, StageState>;
  firstBad: Stage | null;
  title: string;
  say: string;
  result: string;
};

function evaluate(answers: Partial<Record<string, Answer>>): Evaluation {
  let answered = 0;
  let yes = 0;
  const stageOk: Record<Stage, StageState> = { click: true, reply: true, deal: true };

  for (const q of QUESTIONS) {
    const a = answers[q.id];
    if (!a) {
      // An unanswered question leaves the stage open, unless it has already failed.
      if (stageOk[q.stage] !== false) stageOk[q.stage] = null;
      continue;
    }
    answered++;
    if (a === "yes") yes++;
    else stageOk[q.stage] = false;
  }

  const firstBad = STAGES.find((s) => stageOk[s] === false) ?? null;

  let title = INITIAL_TITLE;
  let say = INITIAL_SAY;
  let result = "";
  if (answered > 0) {
    if (firstBad) {
      title = `Your trail breaks at ${NAMES[firstBad]}.`;
      say = WHY[firstBad];
      result = `My self-check says the trail breaks at ${NAMES[firstBad]} (${yes} of 5 yes).`;
    } else if (answered < QUESTIONS.length) {
      title = "No break so far. Keep going.";
      say = "Answer the rest to check the whole trail.";
    } else {
      title = "Your trail looks complete.";
      say = "A teardown can still check that the numbers in your ad accounts match what your agents see.";
      result = "My self-check came out 5 of 5 yes.";
    }
  }

  return { answered, yes, stageOk, firstBad, title, say, result };
}

function nodeClass(state: StageState): string | undefined {
  if (state === true) return "ok";
  if (state === false) return "bad";
  return undefined;
}

export default function SelfCheck() {
  const [answers, setAnswers] = useState<Partial<Record<string, Answer>>>({});
  const reported = useRef(false);
  const { setCheckResult } = useCheckResult();
  const v = evaluate(answers);

  const answer = (id: string, value: Answer) => {
    const next = { ...answers, [id]: value };
    setAnswers(next);
    const e = evaluate(next);
    setCheckResult(e.result);
    if (e.answered === QUESTIONS.length && !reported.current) {
      reported.current = true;
      track({ event: "self_check_complete", break_stage: e.firstBad ?? "none", yes_count: e.yes });
    }
  };

  return (
    <section className="section" id="check" aria-labelledby="check-title">
      <div className="wrap">
        <h2 id="check-title">Where does your trail break?</h2>
        <p className="lede">Five questions about your own setup. Your answers stay in your browser.</p>

        <div className="check">
          <form aria-describedby="check-title" onSubmit={(e) => e.preventDefault()}>
            {QUESTIONS.map((q) => (
              <fieldset className="q" key={q.id} data-stage={q.stage}>
                <legend>{q.legend}</legend>
                <p className="hint">{q.hint}</p>
                <div className="seg">
                  {OPTIONS.map((o) => (
                    <label key={o.value}>
                      <input
                        type="radio"
                        name={q.id}
                        value={o.value}
                        checked={answers[q.id] === o.value}
                        onChange={() => answer(q.id, o.value)}
                      />
                      <span>{o.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </form>

          <aside className="verdict" aria-live="polite">
            <p className="count">
              {v.answered} of {QUESTIONS.length} answered
            </p>
            <div className="mini" aria-hidden="true">
              <i className={nodeClass(v.stageOk.click)} />
              <b className={v.stageOk.click === true && v.stageOk.reply === true ? "ok" : undefined} />
              <i className={nodeClass(v.stageOk.reply)} />
              <b className={v.stageOk.reply === true && v.stageOk.deal === true ? "ok" : undefined} />
              <i className={nodeClass(v.stageOk.deal)} />
            </div>
            <div className="mini-labels" aria-hidden="true">
              <span>Ad click</span>
              <span>WhatsApp reply</span>
              <span>Closed deal</span>
            </div>
            <h3>{v.title}</h3>
            <p className="say">{v.say}</p>
            <Link className="btn btn-primary" href="#teardown">
              Get a free teardown
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
