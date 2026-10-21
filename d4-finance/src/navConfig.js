// Owned by the Finance team, exposed to the host shell via Module Federation
// (`financeMfe/navConfig`) so the shell's single sidebar can render Finance's
// sub-menu without the host needing to hardcode Finance's route structure.
export default [
  { key: "dashboard", label: "Dashboard", path: "" },
  { key: "reports", label: "Reports", path: "reports" },
  { key: "invoices", label: "Invoices", path: "invoices" },
  { key: "billing", label: "Client Billing", path: "billing" },
  { key: "clients", label: "Clients", path: "clients" },
  { key: "bench", label: "Bench Analysis", path: "bench" },
];
