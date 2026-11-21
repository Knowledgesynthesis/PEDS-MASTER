# PEDS MASTER

An interactive, guideline-based pediatrics course. Ten modules take a learner from "is this child sick?" to confident management of the most common pediatric emergencies and clinic problems: read the bottom line, use the embedded clinical tools, then lock it in with spaced-repetition questions, flashcards, and branching cases.

Content reviewed **November 2026**. Each recommendation links to the guideline or trial it comes from.

## What's inside

| # | Module | Embedded tools |
|---|--------|----------------|
| 0 | Foundations: the sick child (PAT, vitals, shock, weight) | Vital-sign checker |
| 1 | Neonatal sepsis & the febrile young infant | EOS triage (AAP 2018/2019), febrile infant 8–60 d pathway (AAP 2021) |
| 2 | Congenital heart disease | CCHD pulse-ox screen (AAP 2025 algorithm), Qp:Qs calculator, murmur mapper |
| 3 | Bronchiolitis & RSV prevention | Home/admit/escalate helper, "what helps?" evidence sorter |
| 4 | Stridor: croup, epiglottitis & look-alikes | Westley score, stridor sorter |
| 5 | Otitis media & sore throat | AOM diagnose-and-treat (AAP 2013), McIsaac + IDSA 2025 testing |
| 6 | Growth faltering | Trajectory explorer (plot your own patient), weight velocity, catch-up kcal |
| 7 | Childhood asthma | Severity classifier + step ladder, control → step up/down, PRAM |
| 8 | Dehydration, gastroenteritis & IV fluids | Clinical Dehydration Scale, maintenance (isotonic), ORT/deficit/sodium planner, evidence sorter |
| 9 | Development, delay & autism | CDC 2022 milestone checker, M-CHAT-R/F |

Every module has: bottom line · objectives · "what changed" · sections with tables and tools · myth-vs-evidence pitfalls · 8+ MCQs with explanations · flashcards · numbered sources.

Across the app: **exam builder** (mix modules; tutor or exam mode; target unseen or missed questions), **11 branching cases**, **59-term glossary**, **global search** (Ctrl/⌘ K or `/`), progress with Leitner spaced repetition, light/dark/system theme, and full **offline** use after first load.

## Content standards

- Sources: AAP clinical practice guidelines and reports, NAEPP 2020 + GINA 2026, IDSA, AHA, ACOG, CDC/ACIP/ADDM, AAO-HNSF, NICE, ACMG, and landmark RCTs. Where a newer trial changes practice before a guideline does (e.g. PRoMPT BOLUS 2026, CARE 2025, BeNeDuctus/Baby-OSCAR), both are shown with dates.
- Doses are standard published pediatric doses with the source cited; one line in the footer asks users to check them against the local formulary. There are no other disclaimers.
- All cases are synthetic.
- `plan.md` is the original design brief. Its "no medication dosing" constraint was intentionally superseded to make the material practical.

### Corrections made to v1

v1 contained errors that are now fixed and guarded by tests:

- **AOM** used the outdated 2004 three-criteria definition, and its tool labeled a bulging TM without symptoms as OME (bulging is the defining sign of AOM).
- **Formula case** called "1 scoop per 2 oz" over-dilution — that is the correct standard recipe — and its explanation contradicted itself.
- **Growth patterns:** "weight + height falling → endocrine" was wrong; endocrine causes reduce length first with weight preserved.
- **Bronchiolitis** tool advised oxygen below 94% (AAP threshold is 90%), recommended non-evidence-based positioning, and taught palivizumab as the only prevention (now discontinued; nirsevimab, clesrovimab, and the maternal vaccine were missing).
- **Asthma** mapped moderate persistent asthma to "Step 3–4" and severe to "Step 5–6", lacked age groups, SMART, and control-based adjustment.
- **Croup** recommended cool mist and limited steroids to moderate–severe disease (evidence supports dexamethasone for all severities; mist has no benefit).
- **Neonatal sepsis** recommended cefotaxime (unavailable in the US), omitted IAP adequacy, the EOS calculator, and the AAP 2021 febrile-infant pathway.
- **Dehydration** severity bands overlapped, a "moderate" case had mild findings, isotonic maintenance fluids (AAP 2018) were missing, and a strep question was filed under asthma.
- **CHD** called TGA and TAPVR "right-to-left shunts", and lacked innocent murmurs, CCHD screening, ductal-dependent lesions, and endocarditis-prophylaxis criteria.
- **Development** used pre-2022 milestones and no screening schedule.
- **Technical:** the lint script had no config, the favicon 404'd, deep links broke on static hosts, "offline" was claimed but not implemented, and there were no tests.

## Development

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # Unit + content-integrity tests (Vitest)
npm run lint
npm run build      # type-check + production build to dist/
npm run check      # all of the above
```

The build is fully static (`base: './'`, hash routing), so `dist/` can be served from any static host or sub-path. A generated service worker precaches every asset for offline use.

## Architecture

```
src/
  content/            # all teaching content as typed data
    modules/*.ts      # one file per module (sections, questions, flashcards, pitfalls, references)
    cases.ts          # branching cases
    glossary.ts
    types.ts          # Module / Block / Question / Case schema
    content.test.ts   # integrity tests (ids, answers, citations, tools, banned phrases)
  lib/calc/*.ts       # pure, tested clinical logic (scores, pathways, fluid math)
  tools/*.tsx         # interactive tool UIs, lazy-loaded per group
  components/content/ # block renderer, quiz, flashcards, question card
  pages/              # Home, ModulePage, Assessment, Cases, Glossary, Settings
  store/              # persisted progress (spaced repetition) and theme
```

### Adding or updating content

1. Edit the module file in `src/content/modules/`. Text supports `**bold**`.
2. Every section `refs` id and question `ref` must exist in that module's `references`, and every reference must be cited somewhere — `npm test` enforces this.
3. New tool: add its id to `ToolId` in `types.ts`, put the logic in `src/lib/calc/` with tests, the UI in `src/tools/`, register it in `src/tools/index.tsx`, and embed it with `{ type: 'tool', id: '…' }`.
4. Bump `CONTENT_REVIEWED` in `src/lib/utils.ts` after a content review.
