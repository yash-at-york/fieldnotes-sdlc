# Workspace permissions (Fieldnotes knowledge base, v3)

Roles in a workspace:

- Account owner: holds billing and security responsibility for the workspace.
  Exactly one per workspace. Can save the tenant profile. Can administer users.
- Manager: runs day-to-day work. Can administer users only when the owner has
  explicitly delegated that permission. A manager is never treated as the
  account owner, and cannot save the tenant profile.
- Member: a normal participant. Cannot administer users. Cannot save the
  tenant profile.

Consequence: the profile-save action is owner-only. Delegated administration is
recorded as a per-workspace grant with a scope and expiry, never implied.
