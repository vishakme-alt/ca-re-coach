import type { Domain, Competency } from "@/lib/types";

// Source: California DRE salesperson examination content outline
// (https://www.dre.ca.gov/examinees/SalesExamContent.html). Weights are DRE's approximate
// percentages of a 150-question exam; minQ/maxQ are those percentages applied to 150 questions.
// Competency groupings below are this app's own breakdown of each DRE area.

function area(id: string, code: Domain["code"], sort: number, name: string, pct: number, summary: string): Domain {
  const q = Math.round((pct / 100) * 150);
  return { id, code, name, summary, minQ: q, maxQ: q, sort };
}

export const domains: Domain[] = [
  area("area-i", "I", 1, "Property Ownership & Land Use", 15, "Estates, encumbrances, forms of ownership, legal descriptions, government and private land-use controls, environmental rules and water rights."),
  area("area-ii", "II", 2, "Agency & Fiduciary Duties", 17, "How agency is created and ended, the agent's duties to principals and third parties, agency disclosure, and commissions."),
  area("area-iii", "III", 3, "Valuation & Financial Analysis", 14, "Concepts of value, the three appraisal approaches, and the real estate math the exam expects."),
  area("area-iv", "IV", 4, "Financing", 9, "Loan instruments, foreclosure, lending sources, government programs, and the federal and state laws that govern credit."),
  area("area-v", "V", 5, "Transfer of Property", 8, "Deeds, recording, title insurance, escrow, transfer taxes, vesting and special transfers."),
  area("area-vi", "VI", 6, "Practice of Real Estate & Disclosures", 25, "Trust funds, fair housing, advertising, supervision, licensing, discipline, required disclosures and property management."),
  area("area-vii", "VII", 7, "Contracts", 12, "Contract law, listing and buyer agreements, purchase contracts, options, leases and advance fees."),
];

function comp(id: string, domainId: string, code: string, sort: number, name: string, description: string, q: number): Competency {
  return { id, domainId, code, name, description, minQ: q, maxQ: q, sort };
}

export const competencies: Competency[] = [
  comp("i-a", "area-i", "I.A", 1, "Estates, encumbrances & ownership", "Fee and leasehold estates, liens, easements, encroachments, CC&Rs, joint tenancy, tenancy in common and community property.", 10),
  comp("i-b", "area-i", "I.B", 2, "Legal descriptions & land measurement", "Metes and bounds, lot-block-tract, government survey, acreage and measurement.", 5),
  comp("i-c", "area-i", "I.C", 3, "Land use, environment & water", "Police power, eminent domain, zoning, Subdivision Map Act, environmental hazards, riparian and appropriative rights.", 8),
  comp("ii-a", "area-ii", "II.A", 1, "Creating & classifying agency", "Types of agents and agencies, how an agency arises, and who the agent represents.", 8),
  comp("ii-b", "area-ii", "II.B", 2, "Fiduciary duties & agency disclosure", "Duties owed to the principal, disclosure of agency, dual agency and duties to non-clients.", 10),
  comp("ii-c", "area-ii", "II.C", 3, "Ending agency & commissions", "Termination of agency, commission entitlement, sharing and procuring cause.", 7),
  comp("iii-a", "area-iii", "III.A", 1, "Value concepts & appraisal methods", "Kinds of value, principles of value, the three approaches and depreciation.", 11),
  comp("iii-b", "area-iii", "III.B", 2, "Real estate math", "Area, percentages, commissions, interest, prorations, capitalization and GRM.", 10),
  comp("iv-a", "area-iv", "IV.A", 1, "Loan instruments & foreclosure", "Promissory notes, deeds of trust, mortgage clauses, foreclosure and loan types.", 7),
  comp("iv-b", "area-iv", "IV.B", 2, "Lending sources, programs & credit law", "Primary and secondary markets, FHA, VA, Cal-Vet, TILA, RESPA, ECOA and loan originators.", 7),
  comp("v-a", "area-v", "V.A", 1, "Deeds, recording & title insurance", "Valid deed elements, deed types, recording and title insurance coverage.", 7),
  comp("v-b", "area-v", "V.B", 2, "Escrow, taxes, vesting & special transfers", "Escrow, transfer and property tax, adverse possession, wills, intestacy and vesting.", 6),
  comp("vi-a", "area-vi", "VI.A", 1, "Trust funds & records", "Handling, depositing and recording client funds; commingling; record retention.", 8),
  comp("vi-b", "area-vi", "VI.B", 2, "Fair housing & advertising", "Federal and California protected classes, prohibited practices and truthful advertising.", 8),
  comp("vi-c", "area-vi", "VI.C", 3, "Licensing, supervision & discipline", "License rules, broker supervision, unlicensed assistants, the DRE and the Recovery Account.", 7),
  comp("vi-d", "area-vi", "VI.D", 4, "Required disclosures", "Transfer disclosure statement, natural hazards, lead paint and material facts.", 8),
  comp("vi-e", "area-vi", "VI.E", 5, "Property management & specialty areas", "Property manager duties, residential leases and security deposits, commercial and income property.", 7),
  comp("vii-a", "area-vii", "VII.A", 1, "Contract principles", "Essential elements, classifications, statute of frauds, performance and remedies.", 7),
  comp("vii-b", "area-vii", "VII.B", 2, "Listing & buyer agreements", "Listing types, required terms and buyer representation agreements.", 6),
  comp("vii-c", "area-vii", "VII.C", 3, "Offers, options, leases & advance fees", "Purchase contract mechanics, deposits, options, leases and advance fees.", 6),
];
