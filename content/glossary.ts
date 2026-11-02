// Exam glossary — short definitions written for this app. Tags drive the filter chips.

export type GlossaryTag = "Land & ownership" | "Agency & contracts" | "Finance & value" | "Practice & law";

export interface GlossaryTerm {
  term: string;
  def: string;
  tag: GlossaryTag;
}

const g = (term: string, def: string, tag: GlossaryTag): GlossaryTerm => ({ term, def, tag });

export const GLOSSARY: GlossaryTerm[] = [
  g("Accretion", "Gradual addition of land by the natural action of water. Avulsion is sudden loss or gain.", "Land & ownership"),
  g("Adverse possession", "Acquiring title by open, notorious, hostile, continuous possession for 5 years while paying the property taxes.", "Land & ownership"),
  g("Appurtenance", "A right or item that goes with the land, such as an easement.", "Land & ownership"),
  g("CC&Rs", "Covenants, conditions and restrictions: private deed restrictions that run with the land.", "Land & ownership"),
  g("Community property", "Property acquired during marriage by either spouse in California, except gifts and inheritances.", "Land & ownership"),
  g("Easement", "The right to use another's land for a specific purpose. Appurtenant or in gross.", "Land & ownership"),
  g("Eminent domain", "Government power to take private property for public use with just compensation.", "Land & ownership"),
  g("Encroachment", "An improvement that intrudes onto a neighbor's land.", "Land & ownership"),
  g("Escheat", "Reversion of property to the state when an owner dies without a will or heirs.", "Land & ownership"),
  g("Fee simple absolute", "The most complete form of private ownership.", "Land & ownership"),
  g("Joint tenancy", "Co-ownership with equal shares and right of survivorship; requires four unities.", "Land & ownership"),
  g("Nonconforming use", "A lawful use that predates a zoning change and may continue.", "Land & ownership"),
  g("Riparian rights", "Water rights of owners whose land borders a natural watercourse.", "Land & ownership"),
  g("Variance", "Permission to deviate from a zoning standard because of hardship.", "Land & ownership"),
  g("Agent / principal", "The agent acts for the principal. A broker under a listing is a special agent.", "Agency & contracts"),
  g("Dual agency", "Representing both buyer and seller; lawful only with informed consent of both.", "Agency & contracts"),
  g("Fiduciary", "One who owes duties of care, loyalty, obedience, disclosure, confidentiality and accounting.", "Agency & contracts"),
  g("Liquidated damages", "Damages agreed in advance for a breach. Limited to 3% of price for buyer-occupied 1–4 residential units.", "Agency & contracts"),
  g("Net listing", "Seller receives a set amount and the broker keeps the excess. Lawful but risky; disclosure required.", "Agency & contracts"),
  g("Option", "A contract giving a buyer the right, but not the duty, to buy at a set price.", "Agency & contracts"),
  g("Puffing", "Subjective sales opinion that a reasonable buyer would not rely on as fact.", "Agency & contracts"),
  g("Ratification", "After-the-fact approval of an unauthorized act, often by keeping the benefits.", "Agency & contracts"),
  g("Specific performance", "A court order compelling a party to perform a contract, common for unique land.", "Agency & contracts"),
  g("Statute of frauds", "Requires certain contracts, including land sales, to be in writing.", "Agency & contracts"),
  g("Appraisal approaches", "Sales comparison, cost, and income.", "Finance & value"),
  g("Alienation clause", "Due-on-sale: lender may call the loan if the property is transferred.", "Finance & value"),
  g("Cap rate", "NOI ÷ value; used to convert income to value.", "Finance & value"),
  g("Deed of trust", "Security instrument with trustor, trustee and beneficiary.", "Finance & value"),
  g("Functional obsolescence", "Loss of value from outdated design or features inside the property.", "Finance & value"),
  g("GRM", "Gross rent multiplier: price ÷ gross rent.", "Finance & value"),
  g("Point", "One percent of the loan amount, paid up front.", "Finance & value"),
  g("Reconveyance", "Release of a deed of trust after payoff.", "Finance & value"),
  g("Subordination", "Agreement to accept lower lien priority.", "Finance & value"),
  g("Blockbusting", "Inducing panic sales by suggesting protected-class members are moving in.", "Practice & law"),
  g("Commingling", "Mixing client funds with the broker's own funds.", "Practice & law"),
  g("Conversion", "Misusing client funds for the broker's own purposes.", "Practice & law"),
  g("Familial status", "A federal protected class covering families with children under 18.", "Practice & law"),
  g("Material fact", "A fact that affects the value or desirability of property.", "Practice & law"),
  g("Redlining", "Refusing credit or insurance based on neighborhood characteristics.", "Practice & law"),
  g("Steering", "Channeling buyers toward or away from areas by protected class.", "Practice & law"),
  g("Transfer Disclosure Statement", "Seller's disclosure form for 1–4 unit residential sales.", "Practice & law"),
  g("Unlawful detainer", "The court action to evict a tenant.", "Practice & law"),
];
