# CA Real Estate Coach

A local study app for the **California DRE real estate salesperson exam** (150 questions, 3 hours, 70% to pass).
Practice with explanations for every wrong answer, lessons that teach then test, timed mock exams, a readiness score, and a miss vault.

Runs entirely on your machine. No accounts, no network calls, no API keys. Progress is stored in your browser's `localStorage`.

## Run it

Double-click `start-ca-re-coach.bat`, or:

```bash
npm install
npm run build
npm start
```

Then open http://localhost:3000. The launcher binds to `127.0.0.1` only.

## What is in it

| Area | Content |
|---|---|
| Learn | 41 lessons across the 7 DRE exam areas and 20 competencies |
| Practice | 186 original questions, each with a rationale and a note on why every wrong option fails |
| Mock exams | 150-question Form A and B (180 min), 75-question half mock, hard gauntlet, trap lab, and 20-question deep dives per area |
| Reference | 26 key facts, 12 look-alike pairs, 42-term glossary, math cheat sheet, 32 flashcards |

Exam-area weights come from the DRE's published salesperson content outline: <https://www.dre.ca.gov/examinees/SalesExamContent.html>.

## Read this before trusting it

- **Original content, unverified by a licensed instructor.** Every question and lesson was written for this app from the public DRE outline. None comes from a commercial question bank. They have not been reviewed by a California real estate instructor.
- **Verify numbers against current law.** Security-deposit limits, notice periods, disclosure forms, limitation periods and similar details change. Items most worth re-checking: security deposits (VI.E), rent-increase notices (VI.E), liquidated damages cap (VII.C), statutes of limitation (VII.A), the 3-business-day deposit rule and 3-year record retention (VI.A), and the Recovery Account (VI.C). Use the DRE Reference Book as the authority.
- **Bank size.** Form A and Form B overlap heavily because the bank (186) is only slightly larger than one 150-question paper, and the Contracts deep dive has 19 questions. Add questions to `content/q-area-*.ts` and `content/q-extra.ts`.
- **The readiness score is a heuristic**, not a prediction. The thresholds (pass line + 12 points for "ready") are assumptions.
- Not affiliated with the California Department of Real Estate. Not legal advice.

## Adding questions

Questions use a compact builder in `content/qb.ts`:

```ts
q("r-ia-12", "i-a", "best", 2, "Stem…", ["Option A", "Option B", "Option C", "Option D"], 1, "Why B is right.", ["Why A fails.", "Why C fails.", "Why D fails."])
```

Options are permuted deterministically per id so correct answers do not cluster on one letter. Link new questions to a lesson by adding their ids to `content/topics-index.ts`.

## Provenance

Forked from the MIT-licensed AIGP Coach app (github.com/mahfzal87/aigp-coach). The app shell, scoring and mock-exam engine come from that project; all content here is new. See `LICENSE`.

## Hosting it (share a link)

The app is fully client-side, so `npm run build` produces a static site in `out/` that any static host can serve. Each person's progress stays in their own browser.

```bash
npm run build        # writes ./out
npx vercel out --prod   # or drag the out folder onto app.netlify.com/drop
```

For a GitHub Pages project site, build with `BASE_PATH=/<repo-name> npm run build` and add an empty `out/.nojekyll`.
`npm start` no longer applies once `output: "export"` is on; use `start-ca-re-coach.bat` (it serves `out/` locally) or any static server.
