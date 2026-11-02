import type { Question } from "@/lib/types";

// Grade a single question. For multiselect: exact set match. For ordering: handled as single-option
// (the option text encodes the full sequence), so it reduces to single-select correctness.
export function isAnswerCorrect(question: Question, chosen: string[]): boolean {
  const correct = question.options.filter((o) => o.isCorrect).map((o) => o.label).sort();
  const picked = [...chosen].sort();
  if (correct.length !== picked.length) return false;
  return correct.every((c, i) => c === picked[i]);
}

export function correctLabels(question: Question): string[] {
  return question.options.filter((o) => o.isCorrect).map((o) => o.label);
}

// California DRE salesperson exam: 150 questions, 3 hours, 70% correct to pass (DRE exam content page).
export const PASS_PCT = 70;

// DRE reports a plain percent, so the "scaled" score is just the rounded percent correct.
export function toScaledScore(correctRate: number): number {
  return Math.round(Math.max(0, Math.min(1, correctRate)) * 100);
}

// Fisher–Yates shuffle (used to randomize option order to prevent memorization).
export function shuffle<T>(arr: T[], seed?: number): T[] {
  const a = [...arr];
  let s = seed ?? Math.floor(Math.random() * 1e9);
  const rand = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
