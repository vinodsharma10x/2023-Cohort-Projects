import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Modal from "react-modal";
import { AuthContextProvider } from "auth/auth-context";

Modal.setAppElement("#root");

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
