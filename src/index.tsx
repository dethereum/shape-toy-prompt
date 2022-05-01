import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { StateInspector } from "reinspect";

import { App } from "./App";

const ROOT = document.getElementById("app-root");

if (!ROOT) {
  throw new Error("app-root div does not exist on the html");
}

ReactDOMClient.createRoot(ROOT).render(
  //@ts-expect-error who cares
  <StateInspector name="App">
    <App />
  </StateInspector>
);
