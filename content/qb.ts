import type { Question, QuestionType, TrapType } from "@/lib/types";

// Compact question builder. `opts` are the answer texts in display order; `correct` is the
// index of the right one; `wrong` explains each incorrect option in display order (skipping the correct one).
export function q(
  id: string,
  competencyId: string,
  type: QuestionType,
  difficulty: 1 | 2 | 3,
  stem: string,
  opts: string[],
  correct: number,
  correctExplanation: string,
  wrong: string[],
  extra: { trap?: TrapType; strategy?: string; ref?: string } = {}
): Question {
  const labels = ["A", "B", "C", "D", "E"];
  if (opts.length - 1 !== wrong.length) throw new Error(`${id}: need ${opts.length - 1} wrong-option notes, got ${wrong.length}`);
  // Authoring skews toward one letter, so permute options deterministically per question id.
  // Notes stay attached to their option text; labels are assigned after the permutation.
  const items = opts.map((text, i) => ({ text, isCorrect: i === correct, note: i === correct ? "" : wrong[i < correct ? i : i - 1] }));
  let seed = 0;
  for (const ch of id) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  for (let i = items.length - 1; i > 0; i--) {
    seed = (Math.imul(seed, 1103515245) + 12345) >>> 0;
    const j = seed % (i + 1);
    [items[i], items[j]] = [items[j], items[i]];
  }
  const whyWrong: Record<string, string> = {};
  items.forEach((it, i) => {
    if (!it.isCorrect) whyWrong[labels[i]] = it.note;
  });
  return {
    id,
    competencyId,
    type,
    difficulty,
    stem,
    isMultiselect: false,
    options: items.map((it, i) => ({ label: labels[i], text: it.text, isCorrect: it.isCorrect, sort: i })),
    correctExplanation,
    whyWrong,
    strategyNote: extra.strategy,
    trapType: extra.trap ?? "none",
    bokRef: extra.ref ?? "DRE salesperson exam outline",
    source: "authored",
  };
}
