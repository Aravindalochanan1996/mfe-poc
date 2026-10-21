export const PERMISSIONS = {
  FINANCE_VIEW: "finance:view",
  RECRUITMENT_VIEW: "recruitment:view",
  RECRUITMENT_KPI_VIEW_ALL: "recruitment:kpi:view_all",
};

export function hasPermission(user, permission) {
  return !!user && Array.isArray(user.permissions) && user.permissions.includes(permission);
}
