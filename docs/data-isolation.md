# Data isolation (Fieldnotes knowledge base, v2)

Every participant record is bound to exactly one workspace (tenant). A session
is bound to one workspace and may read only records belonging to that workspace.

Invariant: an alpha workspace session cannot read a beta workspace record. A
cross-tenant read is a security defect of critical severity and blocks release.

Implementation guidance: tenant predicates are applied in the data layer, not
only at the API boundary. All queries carry the workspace scope from the
authenticated session; a missing scope fails closed.
