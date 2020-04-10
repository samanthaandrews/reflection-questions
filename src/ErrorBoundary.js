import React, { Component } from "react";
import * as Sentry from "@sentry/browser";
import "./App.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false, eventId: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error: true };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId: eventId });
    });
  }

  render() {
    if (this.state.error) {
      return (
        <>
          <h1>Oops, something went wrong!</h1>
          <button onClick={() => Sentry.showReportDialog({ eventId: this.state.eventId })}>Report feedback</button>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
