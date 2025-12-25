import { Routes, Route } from "react-router-dom";
import Dashboard from "./Features/Dashboard/Dashboard";
import TransactionsPage from "./Features/Transaction/Transaction";
import Analytics from "./Features/Analytics/Analytics";
import Debt from "./Features/Debt/Debt";
import NotFound from "./NotFound";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/transactions" element={<TransactionsPage />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/debt" element={<Debt />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
