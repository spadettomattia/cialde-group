import React from "react";
import ReactDOM from "react-dom/client";
import { CssVarsProvider } from "@mui/joy";
import App from "./App";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <CssVarsProvider defaultMode="system">
      <App />
    </CssVarsProvider>
  </React.StrictMode>
);
