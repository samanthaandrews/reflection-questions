import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/browser";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

Sentry.init({ dsn: "https://8f1364d872434313a442dbe9b69b0688@o376128.ingest.sentry.io/5196546" });

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
