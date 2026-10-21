import React from "react";
import { colors } from "@d4/design-system";

export class RemoteErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to load remote "${this.props.label}":`, error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: 32,
            color: colors.textMuted,
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          <p style={{ color: colors.text, fontWeight: 600, marginBottom: 4 }}>
            Couldn't load the {this.props.label} micro-frontend.
          </p>
          <p>
            Make sure its dev server is running on port {this.props.port} (
            <code>npm start</code> inside <code>{this.props.folder}</code>),
            then refresh.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
