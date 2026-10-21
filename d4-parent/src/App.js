import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Sidebar, SidebarItem, SidebarGroup, colors } from "@d4/design-system";
import { useAuth, hasPermission, PERMISSIONS } from "@d4/auth";
import { TopBar } from "./components/TopBar";
import { RemoteFallback } from "./components/RemoteFallback";
import { RemoteErrorBoundary } from "./components/RemoteErrorBoundary";
import { RequirePermission } from "./components/RequirePermission";
import { Overview } from "./pages/Overview";
import { ComingSoon } from "./pages/ComingSoon";
import { Login } from "./pages/Login";
import FinanceRemote from "./remotes/FinanceRemote";
import RecruitmentRemote from "./remotes/RecruitmentRemote";

// Fetches a remote's exposed `./navConfig` (a plain array of {key,label,path})
// only once the current user is allowed to see that section at all — so a
// user without finance:view never even requests financeMfe/navConfig.
function useRemoteNavConfig(importRemote, enabled) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!enabled) {
      setItems([]);
      return undefined;
    }
    let cancelled = false;
    importRemote()
      .then((mod) => {
        if (cancelled) return;
        // A remote that's mid-restart (or a stale dev-server connection)
        // can resolve without throwing but without a usable module shape —
        // never trust it to be an array without checking.
        setItems(mod && Array.isArray(mod.default) ? mod.default : []);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return items;
}

function AppSidebar({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openGroup, setOpenGroup] = useState(null);

  const canFinance = hasPermission(user, PERMISSIONS.FINANCE_VIEW);
  const canRecruitment = hasPermission(user, PERMISSIONS.RECRUITMENT_VIEW);

  const financeNav = useRemoteNavConfig(() => import("financeMfe/navConfig"), canFinance);
  const recruitmentNav = useRemoteNavConfig(() => import("recruitmentMfe/navConfig"), canRecruitment);

  const activeGroup = location.pathname.startsWith("/finance")
    ? "finance"
    : location.pathname.startsWith("/recruitment")
    ? "recruitment"
    : null;

  useEffect(() => {
    if (activeGroup) setOpenGroup(activeGroup);
  }, [activeGroup]);

  function toggleGroup(key) {
    setOpenGroup((prev) => (prev === key ? null : key));
  }

  function isSubActive(basePath, itemPath) {
    if (location.pathname !== basePath && !location.pathname.startsWith(`${basePath}/`)) {
      return false;
    }
    const rest = location.pathname.slice(basePath.length).replace(/^\/+/, "");
    return rest === itemPath;
  }

  function goToSub(basePath, itemPath) {
    navigate(itemPath ? `${basePath}/${itemPath}` : basePath);
  }

  return (
    <Sidebar>
      <SidebarItem label="Overview" active={location.pathname === "/"} onClick={() => navigate("/")} />
      <SidebarItem label="People" disabled badge="Soon" />

      {canFinance && (
        <SidebarGroup
          label="Finance"
          active={activeGroup === "finance"}
          expanded={openGroup === "finance"}
          onToggle={() => toggleGroup("finance")}
        >
          {financeNav.map((item) => (
            <SidebarItem
              key={item.key}
              label={item.label}
              className="d4-sidebar-item--sub"
              active={isSubActive("/finance", item.path)}
              onClick={() => goToSub("/finance", item.path)}
            />
          ))}
        </SidebarGroup>
      )}

      {canRecruitment && (
        <SidebarGroup
          label="Recruitment"
          active={activeGroup === "recruitment"}
          expanded={openGroup === "recruitment"}
          onToggle={() => toggleGroup("recruitment")}
        >
          {recruitmentNav.map((item) => (
            <SidebarItem
              key={item.key}
              label={item.label}
              className="d4-sidebar-item--sub"
              active={isSubActive("/recruitment", item.path)}
              onClick={() => goToSub("/recruitment", item.path)}
            />
          ))}
        </SidebarGroup>
      )}

      <SidebarItem label="Timesheets" disabled badge="Soon" />
      <SidebarItem label="Performance" disabled badge="Soon" />
      <SidebarItem label="System" disabled badge="Soon" />
    </Sidebar>
  );
}

export default function App() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    // Brief window while AuthProvider re-validates a stored session against
    // the auth API — avoids flashing the login screen for an already
    // logged-in user just because that check hasn't resolved yet.
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          color: colors.textMuted,
          fontSize: 14,
        }}
      >
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  // Reset to the dashboard on logout so the next person to sign in on this
  // tab (a different demo user, most likely) doesn't land on a page their
  // role can't see — see RequirePermission for the guard this avoids hitting.
  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <div
        style={{
          width: 240,
          flexShrink: 0,
          borderRight: `1px solid ${colors.border}`,
          background: colors.surface,
          overflowY: "auto",
        }}
      >
        <AppSidebar user={user} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <TopBar user={user} onLogout={handleLogout} />
        <main style={{ flex: 1, overflowY: "auto", padding: 24, background: colors.surfaceAlt }}>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route
              path="/finance/*"
              element={
                <RequirePermission permission={PERMISSIONS.FINANCE_VIEW} label="Finance">
                  <RemoteErrorBoundary label="Finance" port={3001} folder="d4-finance">
                    <Suspense fallback={<RemoteFallback label="Finance" />}>
                      <FinanceRemote user={user} />
                    </Suspense>
                  </RemoteErrorBoundary>
                </RequirePermission>
              }
            />
            <Route
              path="/recruitment/*"
              element={
                <RequirePermission permission={PERMISSIONS.RECRUITMENT_VIEW} label="Recruitment">
                  <RemoteErrorBoundary label="Recruitment" port={3002} folder="d4-recruitment">
                    <Suspense fallback={<RemoteFallback label="Recruitment" />}>
                      <RecruitmentRemote user={user} />
                    </Suspense>
                  </RemoteErrorBoundary>
                </RequirePermission>
              }
            />
            <Route path="*" element={<ComingSoon label="Coming soon" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
