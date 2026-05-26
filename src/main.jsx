import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { LanguageProvider } from "./context/LanguageContext.js";
import { MenuProvider } from "./context/MenuContext.js";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <MenuProvider>
          <App />
        </MenuProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
