import { cssVariables } from "./tokens/colors";

const STYLE_ELEMENT_ID = "d4-design-system-styles";

const css = `
:root {
  ${cssVariables}
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.d4-btn {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.d4-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.d4-btn--primary {
  background: var(--color-primary);
  color: #fff;
}
.d4-btn--primary:hover:not(:disabled) {
  background: var(--color-primary-dark);
}
.d4-btn--secondary {
  background: var(--color-surface);
  color: var(--color-primary);
  border-color: var(--color-primary);
}
.d4-btn--secondary:hover:not(:disabled) {
  background: var(--color-surface-alt);
}
.d4-btn--ghost {
  background: transparent;
  color: var(--color-text);
  border-color: transparent;
}
.d4-btn--ghost:hover:not(:disabled) {
  background: var(--color-surface-alt);
}

.d4-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 20px;
  font-family: var(--font-sans);
}
.d4-card__title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 14px 0;
}

.d4-table-wrap {
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-surface);
}
.d4-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-sans);
  font-size: 14px;
}
.d4-table thead th {
  text-align: left;
  padding: 12px 16px;
  background: var(--color-surface-alt);
  color: var(--color-text-muted);
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  border-bottom: 1px solid var(--color-border);
  white-space: nowrap;
}
.d4-table tbody td {
  padding: 12px 16px;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border);
  white-space: nowrap;
}
.d4-table tbody tr:last-child td {
  border-bottom: none;
}
.d4-table tbody tr:hover {
  background: var(--color-surface-alt);
}

.d4-stat-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 18px 20px;
  font-family: var(--font-sans);
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}
.d4-stat-card__label {
  font-size: 13px;
  color: var(--color-text-muted);
  font-weight: 500;
}
.d4-stat-card__value {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.1;
}
.d4-stat-card__trend {
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
}
.d4-stat-card__trend--up {
  color: #12805c;
}
.d4-stat-card__trend--down {
  color: var(--color-accent);
}

.d4-sidebar {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: var(--font-sans);
  padding: 8px;
}
.d4-sidebar-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 14px;
  border-radius: 999px;
  color: var(--color-text-muted);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  background: transparent;
  text-align: left;
  width: 100%;
  transition: background-color 0.15s ease, color 0.15s ease;
}
.d4-sidebar-item:hover:not(.d4-sidebar-item--disabled) {
  background: var(--color-surface-alt);
  color: var(--color-text);
}
.d4-sidebar-item--active {
  background: var(--color-primary);
  color: #fff;
}
.d4-sidebar-item--active:hover {
  background: var(--color-primary);
  color: #fff;
}
.d4-sidebar-item--disabled {
  color: #c4c9d1;
  cursor: not-allowed;
}
.d4-sidebar-item__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}
.d4-sidebar-item__badge {
  margin-left: auto;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-text-muted);
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 2px 8px;
}
.d4-sidebar-item--sub {
  font-size: 13px;
  padding: 7px 14px;
}
.d4-sidebar-group__chevron {
  margin-left: auto;
  display: inline-flex;
  flex-shrink: 0;
  font-size: 10px;
  transition: transform 0.15s ease;
}
.d4-sidebar-group__chevron--open {
  transform: rotate(90deg);
}
.d4-sidebar-group__children {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-left: 20px;
  margin: 2px 0 4px 0;
}

.d4-badge {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 999px;
  line-height: 1.5;
  white-space: nowrap;
}
.d4-badge--neutral {
  background: var(--color-surface-alt);
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
}
.d4-badge--success {
  background: #e6f4ee;
  color: #12805c;
}
.d4-badge--warning {
  background: #fdf1e3;
  color: #b76e00;
}
.d4-badge--danger {
  background: #fbe9ea;
  color: #c22a30;
}
.d4-badge--info {
  background: #e8f3f5;
  color: var(--color-primary-dark);
}
`;

export function injectStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ELEMENT_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ELEMENT_ID;
  style.textContent = css;
  document.head.appendChild(style);
}
