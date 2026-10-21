import { createContext, useContext } from 'react';

export const UserContext = createContext(null);

export function useCurrentUser() {
  return useContext(UserContext);
}

// This remote decides on its own (not via the shared @d4/auth package) how
// to read permissions off the user object — keeps it decoupled from the
// host's auth implementation, only relying on the plain `permissions` array
// contract. A user without `recruitment:kpi:view_all` only sees their own
// row on the Team KPIs page (see pages/TeamKpis.jsx) — a small example of
// the kind of role drill-down (manager vs. lead vs. individual contributor)
// this same check could grow into later.
export function can(user, permission) {
  return !!user && Array.isArray(user.permissions) && user.permissions.includes(permission);
}

// Must match the PERMISSIONS.RECRUITMENT_KPI_VIEW_ALL value the host's
// @d4/auth package assigns to a user — kept as a plain string here (rather
// than importing @d4/auth) so this remote has no dependency on the host's
// auth package, only on the shape of the `user.permissions` array it's handed.
export const KPI_VIEW_ALL = 'recruitment:kpi:view_all';
