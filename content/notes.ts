import type { StudyNote } from "@/lib/types";

// Short study notes written for this app.
export const notes: StudyNote[] = [
  {
    id: "note-strategy",
    competencyId: null,
    title: "How to approach DRE questions",
    sort: 0,
    tags: ["strategy"],
    bodyMd: `The exam samples the whole field, so most questions are **plain applications of a rule**. Wrong answers are usually *partly* true.

1. Identify the topic area and the roles.
2. Circle the operative word (BEST, FIRST, NOT).
3. Predict before reading options.
4. Cut absolutes and options that benefit the agent over the client.
5. Re-check math in reverse.

The exam is **150 questions in 3 hours; 70% passes**. DRE says the topic list is not exhaustive, so study the concepts and not just the outline headings.`,
  },
  {
    id: "note-math",
    competencyId: "iii-b",
    title: "Math cheat sheet",
    sort: 1,
    tags: ["math"],
    bodyMd: `- **Commission** = price × rate. To get the price, **divide** commission by rate.
- **Monthly interest** = loan × annual rate ÷ 12.
- **LTV** uses the **lower** of price and appraisal.
- **Point** = 1% of the loan.
- **Cap rate**: value = NOI ÷ rate. NOI excludes debt service and income taxes.
- **GRM**: price ÷ gross rent. Match monthly or annual.
- **Prorations**: 30-day months, 360-day year.
- **Area**: length × width; acre = 43,560 sq ft.
- **Undo a percent**: divide by (1 + rate).`,
  },
  {
    id: "note-sources",
    competencyId: null,
    title: "About this content",
    sort: 2,
    tags: ["about"],
    bodyMd: `The topic weights come from the California Department of Real Estate's published salesperson exam content outline. All questions, lessons and notes in this app are original and were written without access to any exam bank. They are a study aid, not legal advice. California law (security deposits, notice periods, disclosure forms) changes, so verify details against the DRE reference book and current statutes before test day.`,
  },
];
