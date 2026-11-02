// Scannable reference facts. Numbers and deadlines in California law change; re-verify before test day.

export type FactTag = "Land" | "Agency" | "Money" | "Practice";

const f = (n: number, fact: string, tag: FactTag) => ({ n, fact, tag });

export const FACTS: { n: number; fact: string; tag: FactTag }[] = [
  f(1, "Acre = 43,560 sq ft. Section = 640 acres. Township = 36 sections.", "Land"),
  f(2, "Joint tenancy needs four unities (time, title, interest, possession); tenancy in common only possession.", "Land"),
  f(3, "Adverse possession: 5 years, open and hostile, plus payment of property taxes.", "Land"),
  f(4, "Prop 13: base value = purchase price; assessed value can rise at most 2% a year.", "Money"),
  f(5, "Property tax year: July 1 – June 30.", "Money"),
  f(6, "Documentary transfer tax: $1.10 per $1,000 of value (county).", "Money"),
  f(7, "Commission = price × rate; to find the price, divide.", "Money"),
  f(8, "Value = NOI ÷ cap rate. Debt service is not an operating expense.", "Money"),
  f(9, "GRM = price ÷ gross rent.", "Money"),
  f(10, "1 point = 1% of the loan.", "Money"),
  f(11, "Loan-to-value uses the lower of price or appraisal.", "Money"),
  f(12, "Nonjudicial foreclosure: NOD → ~3 months → NOS (~20 days) → sale. No redemption after the sale.", "Money"),
  f(13, "Closing Disclosure: at least 3 business days before consummation.", "Money"),
  f(14, "Agency disclosure: listing agent before the listing; selling agent before the buyer's offer (1–4 residential units).", "Agency"),
  f(15, "Fiduciary duties: care, obedience, loyalty, disclosure, confidentiality, accounting.", "Agency"),
  f(16, "Exclusive listings need a definite end date and no automatic renewal.", "Agency"),
  f(17, "Commissions are negotiable. A written agreement is required to collect.", "Agency"),
  f(18, "Salesperson: one broker at a time, paid only by that broker.", "Practice"),
  f(19, "License term: 4 years.", "Practice"),
  f(20, "Trust funds: broker deposits within 3 business days of receipt; records kept 3 years; reconcile monthly.", "Practice"),
  f(21, "Pre-1978 housing: lead-based paint disclosure and 10-day inspection opportunity.", "Practice"),
  f(22, "Death on the property more than 3 years ago need not be volunteered; never lie if asked.", "Practice"),
  f(23, "Security deposit returned or itemized within 21 days of move-out.", "Practice"),
  f(24, "Rent increase of 10% or less: 30 days' notice; more than 10%: 90 days (month-to-month).", "Practice"),
  f(25, "Liquidated damages: up to 3% of price for buyer-occupied 1–4 residential units.", "Practice"),
  f(26, "Exam: 150 questions, 3 hours, 70% (105 correct) to pass.", "Practice"),
];

export const DISTINCTIONS: { a: string; b: string; diff: string }[] = [
  { a: "Commingling", b: "Conversion", diff: "Commingling mixes funds; conversion uses them for the broker's own purposes." },
  { a: "Void", b: "Voidable", diff: "Void has no effect; voidable can be canceled by one side." },
  { a: "Police power", b: "Eminent domain", diff: "Police power regulates with no payment; eminent domain takes and pays." },
  { a: "Variance", b: "Nonconforming use", diff: "A variance is requested; a nonconforming use predates the rule." },
  { a: "Riparian", b: "Appropriative", diff: "Riparian needs adjacency; appropriative rests on priority of use." },
  { a: "Exclusive right to sell", b: "Exclusive agency", diff: "In the first the owner still owes commission if the owner sells; in the second the owner can sell alone." },
  { a: "Grant deed", b: "Quitclaim deed", diff: "Grant deed has implied warranties; quitclaim conveys only what exists." },
  { a: "Standard policy", b: "Extended policy", diff: "Extended also covers survey and possession matters." },
  { a: "Functional", b: "External obsolescence", diff: "Functional is inside the property; external comes from outside and is usually incurable." },
  { a: "Assignment", b: "Sublease", diff: "Assignment transfers the whole remaining term; sublease transfers less." },
  { a: "Steering", b: "Blockbusting", diff: "Steering directs buyers; blockbusting induces panic sellers." },
  { a: "Recording", b: "Delivery", diff: "Recording gives notice; delivery with intent is what transfers title." },
];
