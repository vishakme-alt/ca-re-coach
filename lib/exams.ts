import { competencyToDomainCode, getCompetenciesByDomain, getDomains, getQuestions } from "@/lib/content";
import { shuffle } from "@/lib/scoring";
import type { DomainCode, Question } from "@/lib/types";

// ─── Exam clusters ───
// Fixed, deterministic papers built from the bank. Full forms A/B/C are mutually
// disjoint while the bank is large enough (each draws sequentially from a per-domain
// deck that puts never-used exam-pool items first), so retaking a different form
// never shows the same paper twice.

export interface ExamDef {
  id: string;
  name: string;
  tagline: string;
  kind: "full" | "gauntlet" | "trap" | "domain" | "sprint";
  length: number; // target — clamped to what the bank can supply
  minutes: number;
  domain?: DomainCode;
}

const MIN_PER_Q = 1.2; // real exam pace: 150 Q in 180 min (DRE salesperson exam)

const AREA_NAMES: Record<DomainCode, string> = {
  I: "Property Ownership & Land Use",
  II: "Agency & Fiduciary Duties",
  III: "Valuation & Financial Analysis",
  IV: "Financing",
  V: "Transfer of Property",
  VI: "Practice & Disclosures",
  VII: "Contracts",
};

export const EXAM_DEFS: ExamDef[] = [
  { id: "form-a", name: "Full Mock · Form A", tagline: "150 questions in 3 hours, weighted like the DRE outline. Pass = 70%.", kind: "full", length: 150, minutes: 180 },
  { id: "form-b", name: "Full Mock · Form B", tagline: "Second 150-question draw from the bank — different order, partial overlap with Form A.", kind: "full", length: 150, minutes: 180 },
  { id: "half", name: "Half Mock", tagline: "75 questions in 90 minutes — a quick calibration check.", kind: "full", length: 75, minutes: 90 },
  { id: "gauntlet", name: "Hard Gauntlet", tagline: "40 questions, every one rated ★★★.", kind: "gauntlet", length: 40, minutes: Math.round(40 * MIN_PER_Q) },
  { id: "trap-lab", name: "Trap Lab", tagline: "30 questions that each carry a named trap. Spot the bait.", kind: "trap", length: 30, minutes: Math.round(30 * MIN_PER_Q) },
  ...(["I", "II", "III", "IV", "V", "VI", "VII"] as DomainCode[]).map((code): ExamDef => ({
    id: "deep-" + code.toLowerCase(),
    name: "Area " + code + " · " + AREA_NAMES[code],
    tagline: "20 questions across every competency in this exam area.",
    kind: "domain",
    domain: code,
    length: 20,
    minutes: Math.round(20 * MIN_PER_Q),
  })),
];

export function getExamDef(id: string): ExamDef | undefined {
  return EXAM_DEFS.find((d) => d.id === id);
}

const POOL_SEED = 20261030;

function isFreshPool(q: Question): boolean {
  return q.id.startsWith("e-");
}

function domainSeed(code: DomainCode): number {
  return POOL_SEED + code.charCodeAt(0) * 131 + code.length * 17;
}

// Per-domain deck: fresh exam-pool items first, then the rest — each seeded-shuffled
// so the order is stable across devices and sessions.
function domainDeck(code: DomainCode): Question[] {
  const qs = getQuestions().filter((q) => competencyToDomainCode(q.competencyId) === code);
  const fresh = qs.filter(isFreshPool);
  const rest = qs.filter((q) => !isFreshPool(q));
  return [...shuffle(fresh, domainSeed(code)), ...shuffle(rest, domainSeed(code) * 3 + 7)];
}

// Blueprint-proportional per-domain counts summing exactly to `length`.
function blueprintCounts(length: number): Record<DomainCode, number> {
  const domains = getDomains();
  const weights = domains.map((d) => (d.minQ + d.maxQ) / 2);
  const totalW = weights.reduce((s, w) => s + w, 0);
  const raw = weights.map((w) => (length * w) / totalW);
  const counts = raw.map((r) => Math.floor(r));
  let remainder = length - counts.reduce((s, c) => s + c, 0);
  const order = raw
    .map((r, i) => ({ i, frac: r - Math.floor(r) }))
    .sort((a, b) => b.frac - a.frac);
  for (const { i } of order) {
    if (remainder <= 0) break;
    counts[i]++;
    remainder--;
  }
  const out = {} as Record<DomainCode, number>;
  domains.forEach((d, i) => (out[d.code] = counts[i]));
  return out;
}

function takeFromDeck(deck: Question[], cursor: { i: number }, n: number, inForm: Set<string>): Question[] {
  const out: Question[] = [];
  let scanned = 0;
  while (out.length < n && scanned < deck.length * 2 && deck.length > 0) {
    const q = deck[cursor.i % deck.length];
    cursor.i++;
    scanned++;
    if (!inForm.has(q.id)) {
      out.push(q);
      inForm.add(q.id);
    }
  }
  return out;
}

// Build the three full forms together so they share the decks sequentially
// (A takes the front of each deck, B the next slice, C the next).
function buildFullForms(): Record<string, Question[]> {
  const decks = {} as Record<DomainCode, Question[]>;
  const cursors = {} as Record<DomainCode, { i: number }>;
  for (const d of getDomains()) {
    decks[d.code] = domainDeck(d.code);
    cursors[d.code] = { i: 0 };
  }
  const forms: Record<string, Question[]> = {};
  for (const formId of ["form-a", "form-b", "half"]) {
    const length = getExamDef(formId)!.length;
    const counts = blueprintCounts(length);
    const inForm = new Set<string>();
    const picked: Question[] = [];
    for (const d of getDomains()) {
      picked.push(...takeFromDeck(decks[d.code], cursors[d.code], counts[d.code], inForm));
    }
    // top up from the whole bank if any domain ran dry
    if (picked.length < length) {
      const all = shuffle(getQuestions(), POOL_SEED + formId.length);
      for (const q of all) {
        if (picked.length >= length) break;
        if (!inForm.has(q.id)) {
          picked.push(q);
          inForm.add(q.id);
        }
      }
    }
    forms[formId] = picked;
  }
  return forms;
}

// Proportional pick over a filtered pool (gauntlet / trap lab).
function buildFiltered(pool: Question[], length: number, seed: number): Question[] {
  const want = Math.min(length, pool.length);
  const counts = blueprintCounts(want);
  const picked: Question[] = [];
  const inForm = new Set<string>();
  for (const d of getDomains()) {
    const dq = pool.filter((q) => competencyToDomainCode(q.competencyId) === d.code);
    const deck = [...shuffle(dq.filter(isFreshPool), seed + d.code.charCodeAt(0)), ...shuffle(dq.filter((q) => !isFreshPool(q)), seed * 5 + d.code.charCodeAt(0))];
    picked.push(...takeFromDeck(deck, { i: 0 }, counts[d.code], inForm));
  }
  if (picked.length < want) {
    for (const q of shuffle(pool, seed + 99)) {
      if (picked.length >= want) break;
      if (!inForm.has(q.id)) {
        picked.push(q);
        inForm.add(q.id);
      }
    }
  }
  return picked;
}

// Round-robin across a domain's competencies so a deep-dive covers all of them.
function buildDomainExam(code: DomainCode, length: number): Question[] {
  const domain = getDomains().find((d) => d.code === code);
  if (!domain) return [];
  const comps = getCompetenciesByDomain(domain.id);
  const decks = comps.map((c) => {
    const qs = getQuestions().filter((q) => q.competencyId === c.id);
    return [...shuffle(qs.filter(isFreshPool), domainSeed(code) + c.id.length), ...shuffle(qs.filter((q) => !isFreshPool(q)), domainSeed(code) * 11 + c.id.length)];
  });
  const picked: Question[] = [];
  const idx = decks.map(() => 0);
  while (picked.length < length && decks.some((d, i) => idx[i] < d.length)) {
    for (let i = 0; i < decks.length && picked.length < length; i++) {
      if (idx[i] < decks[i].length) picked.push(decks[i][idx[i]++]);
    }
  }
  return picked;
}

const examCache = new Map<string, Question[]>();
let fullFormsCache: Record<string, Question[]> | null = null;

export function getExamQuestions(defId: string): Question[] {
  if (examCache.has(defId)) return examCache.get(defId)!;
  const def = getExamDef(defId);
  if (!def) return [];
  let qs: Question[] = [];
  if (def.kind === "full") {
    if (!fullFormsCache) fullFormsCache = buildFullForms();
    qs = fullFormsCache[defId] ?? [];
  } else if (def.kind === "gauntlet") {
    qs = buildFiltered(getQuestions().filter((q) => q.difficulty === 3), def.length, POOL_SEED + 555);
  } else if (def.kind === "trap") {
    qs = buildFiltered(getQuestions().filter((q) => q.trapType !== "none"), def.length, POOL_SEED + 777);
  } else if (def.kind === "domain" && def.domain) {
    qs = buildDomainExam(def.domain, def.length);
  }
  examCache.set(defId, qs);
  return qs;
}

export interface ExamStats {
  total: number;
  d3: number;
  multi: number;
  ordering: number;
  fresh: number; // exam-pool items
  perDomain: Partial<Record<DomainCode, number>>;
}

export function getExamStats(defId: string): ExamStats {
  const qs = getExamQuestions(defId);
  const perDomain: Partial<Record<DomainCode, number>> = {};
  for (const q of qs) {
    const dc = competencyToDomainCode(q.competencyId);
    if (dc) perDomain[dc] = (perDomain[dc] ?? 0) + 1;
  }
  return {
    total: qs.length,
    d3: qs.filter((q) => q.difficulty === 3).length,
    multi: qs.filter((q) => q.isMultiselect).length,
    ordering: qs.filter((q) => q.type === "ordering").length,
    fresh: qs.filter(isFreshPool).length,
    perDomain,
  };
}

// Random daily sprint: least-seen questions first (variety engine). Not deterministic
// on purpose — every run is different.
export function buildSprint(seenCount: Map<string, number>, length = 20): Question[] {
  const bank = shuffle(getQuestions());
  return bank
    .sort((a, b) => (seenCount.get(a.id) ?? 0) - (seenCount.get(b.id) ?? 0))
    .slice(0, Math.min(length, bank.length));
}

export const SPRINT_DEF: ExamDef = {
  id: "sprint",
  name: "Random Sprint",
  tagline: "20 questions you have seen least — different every time.",
  kind: "sprint",
  length: 20,
  minutes: Math.round(20 * MIN_PER_Q),
};
