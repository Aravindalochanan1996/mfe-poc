import React from "react";
import { Card, colors } from "@d4/design-system";
import { useAuth, hasPermission } from "@d4/auth";

export function RequirePermission({ permission, label, children }) {
  const { user } = useAuth();

  if (!hasPermission(user, permission)) {
    return (
      <Card title="Access restricted">
        <p style={{ margin: 0, color: colors.textMuted, fontSize: 14, lineHeight: 1.6 }}>
          Your account ({user?.role}) doesn't have access to {label}. Contact an
          administrator if you believe this is a mistake.
        </p>
      </Card>
    );
  }

  return children;
}
