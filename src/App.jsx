import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import TransactionsPage from "./Transaction";
import Analytics from "./Analytics";
import Debt from "./Debt";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/transaction" element={<TransactionsPage />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/debt" element={<Debt />} />
    </Routes>
  );
}

export default App;
