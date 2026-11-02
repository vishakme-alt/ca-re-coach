import type { Flashcard } from "@/lib/types";

// Original flashcards. Statute-specific numbers should be re-verified against current California law.
const c = (id: string, competencyId: string, front: string, back: string): Flashcard => ({ id, competencyId, front, back, tags: [] });

export const flashcards: Flashcard[] = [
  c("fc-01", "i-a", "Four unities of joint tenancy?", "Time, Title, Interest, Possession (T-T-I-P). Tenancy in common needs only possession."),
  c("fc-02", "i-a", "Easement appurtenant vs. in gross?", "Appurtenant benefits a parcel and runs with the land. In gross benefits a person or company, such as a utility."),
  c("fc-03", "i-b", "Acre, section, township?", "Acre = 43,560 sq ft. Section = 1 sq mile = 640 acres. Township = 6 × 6 miles = 36 sections."),
  c("fc-04", "i-c", "Police power vs. eminent domain?", "Police power regulates for health, safety and welfare, no compensation. Eminent domain takes property for public use with just compensation."),
  c("fc-05", "i-c", "Riparian vs. appropriative rights?", "Riparian: owners of land bordering water. Appropriative: divert water for beneficial use elsewhere, first in time first in right."),
  c("fc-06", "ii-a", "Universal, general, special agent?", "Universal: anything lawful. General: ongoing business. Special: one act or transaction (a listing broker)."),
  c("fc-07", "ii-a", "Four ways agency is created?", "Express agreement, ratification, implication, estoppel (ostensible agency)."),
  c("fc-08", "ii-b", "Fiduciary duties of an agent?", "Care, obedience, loyalty, disclosure, confidentiality, accounting."),
  c("fc-09", "ii-b", "Agency disclosure timing (1–4 residential units)?", "Listing agent to seller before the listing is signed. Selling agent to buyer before the buyer signs an offer."),
  c("fc-10", "ii-c", "Which listing pays whoever sells, including the owner?", "Exclusive right to sell. Exclusive agency lets the owner sell alone without commission. Open pays only the procuring broker."),
  c("fc-11", "iii-a", "Highest and best use tests?", "Legally permissible, physically possible, financially feasible, maximally productive."),
  c("fc-12", "iii-a", "Three kinds of depreciation?", "Physical deterioration, functional obsolescence (inside), external obsolescence (outside, usually incurable)."),
  c("fc-13", "iii-b", "Capitalization formula?", "Value = NOI ÷ cap rate. NOI = effective gross income − operating expenses (no debt service)."),
  c("fc-14", "iii-b", "GRM formula?", "GRM = price ÷ gross rent (monthly or annual; match the units)."),
  c("fc-15", "iii-b", "Undo a percentage increase?", "Divide by (1 + rate). Do not subtract the percent from the new number."),
  c("fc-16", "iv-a", "Deed of trust parties?", "Trustor = borrower. Beneficiary = lender. Trustee = neutral holder who forecloses and reconveys."),
  c("fc-17", "iv-a", "Nonjudicial foreclosure sequence?", "Notice of default → about 3 months → notice of sale (about 20 days) → trustee's sale. No redemption after the sale."),
  c("fc-18", "iv-b", "FHA vs. VA?", "FHA insures loans made by private lenders. VA guarantees part of a loan for eligible veterans."),
  c("fc-19", "iv-b", "TRID Closing Disclosure timing?", "Received at least 3 business days before consummation."),
  c("fc-20", "v-a", "Valid deed elements?", "Competent grantor, identifiable grantee, words of conveyance, description, grantor's signature, delivery and acceptance. Acknowledgment is for recording."),
  c("fc-21", "v-a", "Grant deed vs. quitclaim?", "Grant deed: implied warranties and after-acquired title. Quitclaim: conveys whatever the grantor has, no warranty."),
  c("fc-22", "v-b", "Adverse possession in California?", "Open, notorious, hostile, continuous for 5 years, and the claimant pays the property taxes."),
  c("fc-23", "v-b", "Prop 13 basics?", "Base value = purchase price. Assessed value can rise at most 2% a year."),
  c("fc-24", "vi-a", "Trust fund timing and records?", "Salesperson gives funds to broker immediately. Broker deposits by end of 3rd business day. Records kept 3 years. Reconcile monthly."),
  c("fc-25", "vi-a", "Commingling vs. conversion?", "Commingling: mixing client and broker funds. Conversion: using client funds for the broker's own purposes."),
  c("fc-26", "vi-b", "Blockbusting, steering, redlining?", "Blockbusting: panic selling. Steering: channeling buyers by protected class. Redlining: refusing credit or insurance by neighborhood."),
  c("fc-27", "vi-c", "Salesperson rules?", "One broker at a time. License valid 4 years. Paid only by the employing broker."),
  c("fc-28", "vi-d", "Pre-1978 housing disclosure?", "Lead-based paint disclosure and a 10-day inspection opportunity (parties may change it by agreement)."),
  c("fc-29", "vi-e", "Evictions and self-help?", "Landlords must use the court process. Lockouts and utility shut-offs are unlawful."),
  c("fc-30", "vii-a", "Void, voidable, unenforceable?", "Void: no effect. Voidable: one party may cancel (a minor). Unenforceable: a court won't enforce (oral land sale)."),
  c("fc-31", "vii-b", "Listing with a definite end date?", "Exclusive listings must have a definite termination date; no automatic renewal."),
  c("fc-32", "vii-c", "Liquidated damages cap?", "Up to 3% of the price for buyer-occupied 1–4 residential units (verify current law)."),
];
