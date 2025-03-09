import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RouterRoot from "./roots/router/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterRoot />
  </StrictMode>
);
