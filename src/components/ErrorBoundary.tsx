import { Component, type ErrorInfo, type ReactNode } from "react";
export default class ErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("CodeCrest rendering error", error, info);
  }
  render() {
    if (this.state.failed)
      return (
        <main className="error-screen">
          <div className="error-mark">!</div>
          <h1>We hit a small snag.</h1>
          <p>Your progress is saved. Refresh the page to try again.</p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Refresh CodeCrest
          </button>
        </main>
      );
    return this.props.children;
  }
}
