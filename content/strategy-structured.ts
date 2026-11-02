import type { QuestionType } from "@/lib/types";

// Technique content for the DRE salesperson exam (150 questions in 180 minutes; 70% to pass).

export const TIME_TILES = [
  { stat: "72s", label: "per question", sub: "150 questions in 180 minutes" },
  { stat: "105", label: "correct to pass", sub: "70% of 150" },
  { stat: "0", label: "blanks", sub: "answer everything; flag and return" },
  { stat: "2", label: "passes", sub: "sure answers first, then flagged" },
];

export const ATTACK_STEPS = [
  { title: "Read the question before the options", desc: "Name the topic area, then who the client is, and whose duty is in play." },
  { title: "Find the operative word", desc: "BEST, MOST, FIRST, NOT, EXCEPT, ALWAYS. The decision hides in one word." },
  { title: "Predict the answer", desc: "Decide what a careful California broker would do before reading A–D." },
  { title: "Eliminate the two worst", desc: "Absolute words, other-state rules, or actions that favor the agent over the client." },
  { title: "Choose protective of the client and the public", desc: "Between the last two, pick the option that discloses more, documents more or protects client money." },
  { title: "Check the math twice", desc: "Rerun the arithmetic in reverse and check units (monthly vs. annual)." },
];

export const TYPE_PLAYBOOK: { type: QuestionType; label: string; move: string; trap: string }[] = [
  { type: "best", label: "Best / Most", move: "Pick the answer that protects the client, discloses fully and follows the written rule.", trap: "Distractors are partly true but incomplete." },
  { type: "not", label: "NOT / Except", move: "Restate it as three true statements and one false. Find the false one.", trap: "You choose a true statement because you forgot the NOT." },
  { type: "ordering", label: "Sequence", move: "Place events along a timeline and check which must precede which.", trap: "Foreclosure steps and disclosure timing are swapped in distractors." },
  { type: "role", label: "Role ID", move: "Name the roles: trustor, trustee, beneficiary, principal, agent, optionor.", trap: "Trustor and beneficiary are easy to swap." },
  { type: "distinction", label: "Distinction", move: "If options are near-neighbors, the question is the difference. Recite each definition.", trap: "Synonym-bait: void/voidable, commingling/conversion, steering/blockbusting." },
  { type: "recall", label: "Recall / Math", move: "Anchor on the known number or formula and compute step by step.", trap: "Wrong units, multiplying instead of dividing, or forgetting the lower-of rule." },
];

export const TRAP_WORDS = {
  wrong: ["always", "never", "only", "all", "must in every case", "guarantee", "automatically", "regardless", "no liability"],
  right: ["disclose", "in writing", "reasonable", "informed consent", "written instructions", "neutral", "diligent", "document"],
};

export const DECISION_RULES = [
  { rule: "Client money is sacred", detail: "Deposit within 3 business days, never commingle, never decide a deposit dispute." },
  { rule: "Disclosure beats silence", detail: "Known material facts get disclosed whether or not the buyer asks." },
  { rule: "Writing wins", detail: "Listings, land sales and commission claims depend on a signed writing." },
  { rule: "Broker is responsible", detail: "Listings belong to the broker and the broker supervises." },
  { rule: "Equal treatment always", detail: "Any action that sorts people by protected class is wrong." },
  { rule: "Courts, not self-help", detail: "Evictions and deposit disputes go through lawful process." },
];
