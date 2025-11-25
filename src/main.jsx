import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import TransactionsPage from "./Transaction.jsx";
import "./index.css";
import Analytics from "./Analytics.jsx";
import DebtTracker from "./Debt.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <TransactionsPage />
    <Analytics />
    <DebtTracker />
  </StrictMode>
);
