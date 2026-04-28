import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { supabase } from "./Supabase-Client";

// Lazy imports
const Dashboard = lazy(() => import("./Features/Dashboard/Dashboard"));
const TransactionsPage = lazy(
  () => import("./Features/Transaction/Transaction"),
);
const Analytics = lazy(() => import("./Features/Analytics/Analytics"));
const Debt = lazy(() => import("./Features/Debt/Debt"));
const SignUp = lazy(() => import("./Features/Authentication/SignUp"));
const LoginPage = lazy(() => import("./Features/Authentication/Login"));

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    getSession();

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
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {!session && (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}

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
    </Suspense>
  );
}

export default App;
