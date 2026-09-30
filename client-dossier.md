# Fieldnotes Collective — synthetic client dossier

This is the reference identity for the Planning → Development → QA demo. Everything
here is invented and clearly labeled synthetic. The four roles are played by one
presenter, but each is a distinct named identity (the runtime enforces author ≠
approver and named signers, so the personas must stay separate even when one
person plays them).

## Company

- Name: Fieldnotes Collective, Inc.
- Founded: 2019, worker-owned cooperative (Colorado, USA).
- What it does: a field-research operations platform. Research teams run field
  studies (interviews, site observations, diary studies) and need a shared
  workspace to manage participant profiles, membership, permissions, and data
  isolation across studies.
- Product: "Fieldnotes" — multi-tenant SaaS. Each customer is a tenant
  ("workspace") with its own members, roles, and participant data.
- Maturity: ~40 paying workspaces, a 6-person product/eng org, weekly releases.

## Tooling (the client's real stack, which we mirror in the demo)

- Tracker / backlog / knowledge: Linear (workspace "Fieldnotes", team "FLD").
- Source control + CI: GitHub (org `fieldnotes-collective`, repo `fieldnotes`).
- Preview: GitHub Pages (allowlisted HTTPS origin).
- Evidence store: S3 (mirrored locally with MinIO).

## People (the four roles — distinct identities)

| Role | Persona | Title | Authority in the SDLC |
|---|---|---|---|
| Product owner | Priya Raman | Director of Product | Accepts requirements, settles the "account owner" dispute, signs P1 slice. |
| Planning lead | Daniel Okafor | Head of Delivery | Runs intake, drafts the cited slice, signs P1 slice as planning lead. |
| Engineering approver | Marta Kowalczyk | Staff Engineer | Reviews and merges the P3 change (approver ≠ author), signs the P3 contract. |
| QA signer | Lena Haddad | QA Lead | Reviews findings, selects dispositions, signs the P4 score digest. |

The P3 author is the AI worker (a service identity bound to the model under
`ModelGateway`), not one of the four humans. This keeps the no-self-merge rule
honest: the model writes code, Marta approves.

## The demo slice (one trace, P1 → P3 → P4)

Work item: "Tenant profile save and access-control hardening".

Four acceptance criteria (these exact sentences appear once each in
`fixtures/fieldnotes/interview.txt` so they can be cited as spans):

- AC-1 — The account owner can save the tenant profile.
- AC-2 — Members cannot administer users.
- AC-3 — Tenant data is isolated so an alpha session cannot read a beta record.
- AC-4 — The name field has an accessible name.

## The contested term (the P1 practice record / decision card)

"Account owner". The interview leaves ambiguous whether a workspace *manager*
may save the tenant profile on the owner's behalf. The decision card asks:
"Does AC-1 permit a manager, or only the account owner, to save?"

Settled judgment (Priya, product owner; Daniel concurring): only the account
owner may save; a manager is not the owner. This judgment becomes the
formalized acceptance criterion that travels into P3 (permission predicate) and
P4 (authorization test).

## Knowledge base (git-backed markdown, cited as the P1 document set)

- `docs/workspace-permissions.md` — account owner vs manager vs member.
- `docs/data-isolation.md` — per-workspace data boundaries.
- `docs/accessibility-policy.md` — accessible-name requirement for form fields.

## Demo truth labels

Everything in this dossier is synthetic: the company, people, product, and
metrics are invented. The runtime, adapters, trace, and evidence are real. In
the demo, label the client content "synthetic" and the mechanics "live".
