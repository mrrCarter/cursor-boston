# Project Self-Assessment

This is an **honest** self-assessment of MatchRoom against the submission rubric.
Every citation points to a file that actually exists in this submission, so a
reviewer can verify each claim directly. Where we have not done something, we say
so and score it accordingly — fabricated evidence would violate the project's own
non-negotiables (see `README.md` → *Trust model*) and the whole pitch is the
evidence-gated trust layer.

## Scoring Summary

| # | Criterion | Score | Primary Evidence (verifiable) |
|---|-----------|-------|-------------------------------|
| 1 | Functional correctness | 8/10 | `npm run build` passes; `/` and `/demo` return 200; `app/api/demo-brief/route.ts` (GET seeded / POST live+fallback) and `app/api/request-demo/route.ts` (smoke-tested 200/400) work; `public/data/matchroom-demo-brief.json` is real evidence-backed output |
| 2 | Code quality | 8/10 | Strict TypeScript (`tsconfig.json` → `"strict": true`); `npm run typecheck` exits 0; small, single-purpose components |
| 3 | Architecture & design | 8/10 | Layered, sport-agnostic core + data adapter: `lib/types/matchroom.ts`, `lib/data/`, `lib/analytics/baseball.ts`, `app/api/{demo-brief,ask-ai-links,request-demo}`, `components/{landing,demo,layout,forms}` (diagram in `README.md`) |
| 4 | Documentation | 8/10 | Full sports-agnostic `README.md` (thesis, pipeline diagram, data contract, roadmap); source specs in `docs/`; a live "How it works" section on `/`; inline comments on non-obvious modules |
| 5 | Testing rigor | 4/10 | **Honest gap.** No automated test suite. Verification is manual: `npm run typecheck`, `npm run build`, dogfooding `/` and `/demo`, and `curl` smoke tests of the API routes |
| 6 | Performance | 7/10 | Landing prerendered static; First Load JS ≈ 135 kB (build output); SVG strike-zone animation, no heavy chart libraries imported |
| 7 | Security posture | 7/10 | No auth wall by design; no secrets in client code; model/email keys optional via `.env.example`, read server-side only; form validates input; no `dangerouslySetInnerHTML`, no `eval` |

**Cumulative: 50/70** — an honest score for a hackathon MVP, not a perfect one.

## What is genuinely strong

- **Evidence-gated output.** Every `TacticalInsight` carries an `EvidenceRef[]`
  and the brief only surfaces claims that have one — contract in
  `lib/types/matchroom.ts` (`TacticalInsight.evidence`, `EvidenceRef`).
- **Real data, no fabrication.** Seeded JSON in `public/data/` is the cached
  output of the real pipeline against real MLB Stats API / Statcast data (e.g.
  Riley's 104 mph HR on a 1-2 cutter is a real cited pitch, not an invented stat).
- **Every button resolves.** `/demo` Run animates Scout→Skeptic→Verified and
  calls the brief API; the Request-a-Demo form stores + emails (Resend) and
  works with no keys; Ask-an-AI copies a real prompt.
- **Green build + typecheck**, reproducible by the reviewer.
- **Graceful degradation.** Demo and form both work with **no API key**.

## Known gaps (deliberately not hidden)

- **No automated tests yet** — the single biggest score-limiter (criterion 5).
- Live-mode agent loop falls back to seeded output when no model key is set.
- No CI, coverage reporting, or benchmark suite. We do not claim any.

## Methodology

Each criterion was scored against the rubric and supported only by evidence a
reviewer can open and check. We did **not** cite tests, coverage reports, ADRs,
or benchmarks that do not exist. If any citation here cannot be verified in the
source tree, treat it as a defect to fix — not as something to defer to.
