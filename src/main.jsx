import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Import the fonts directly
import './index.css';
import "@fontsource/caveat";
import "@fontsource/homemade-apple";
import "@fontsource/dancing-script";
import "@fontsource/pacifico";
import "@fontsource/sacramento";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
