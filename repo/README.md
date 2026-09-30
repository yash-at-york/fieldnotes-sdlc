# Fieldnotes — tenant profile sample

This is the synthetic client product repo used by the Esidisi Planning →
Development → QA demo. It is deliberately flawed so the QA stage has real,
reproducible defects to find.

Seeded defects (mapped to acceptance criteria):

- AC-1 (functional): the Save button always reports failure.
- AC-2 (authorization): member sessions are shown the "User administration"
  section, which they must not see.
- AC-3 (isolation): a beta-workspace record is rendered into the alpha page.
- AC-4 (accessibility): the name input has no accessible name.

The `.github/workflows/ci.yml` check fails on the baseline and passes only
after AC-4 is fixed, giving the CI stage a real run identity.
