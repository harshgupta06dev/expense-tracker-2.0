import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Features/Dashboard/Dashboard";
import TransactionsPage from "./Features/Transaction/Transaction";
import Analytics from "./Features/Analytics/Analytics";
import Debt from "./Features/Debt/Debt";
import SignUp from "./Features/Authentication/SignUp";
import LoginPage from "./Features/Authentication/Login";

import { useEffect, useState } from "react";
import { supabase } from "./Supabase-Client";
function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    getSession();

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <Routes>
      {/* If NOT logged in */}
      {!session && (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}

      {/* If logged in */}
      {session && (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/debt" element={<Debt />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
