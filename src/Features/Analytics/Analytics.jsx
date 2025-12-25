import React, { useEffect, useState } from "react";

import Sidebar from "../../Components/Sidebar";

import AnalyticsHeader from "./Component/Responsive/AnalyticsHeader";
import AnalyticsSummaryCard from "./Component/Responsive/AnalyticsSummaryCard";
import AnalyticsCategory from "./Component/Responsive/AnalyticsCategory";
import CategoryPieChart from "../../Components/CategoryPieChart";
import AnalyticsSpendingTrends from "./Component/AnalyticsSpendingTrends";
const Analytics = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("analytics");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("Nov 2024");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // responsive chart sizes (adjust for very small screens)
  const [chartHeight, setChartHeight] = useState(280);
  const [pieRadius, setPieRadius] = useState(80);

  const updateSizes = () => {
    const w = window.innerWidth;
    if (w <= 340) {
      setChartHeight(140);
      setPieRadius(50);
    } else if (w <= 380) {
      setChartHeight(160);
      setPieRadius(60);
    } else if (w <= 480) {
      setChartHeight(200);
      setPieRadius(70);
    } else if (w <= 768) {
      setChartHeight(220);
      setPieRadius(80);
    } else {
      setChartHeight(280);
      setPieRadius(80);
    }
  };

  useEffect(() => {
    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  // All months data
  const allMonthsData = {
    "Jan 2024": {
      total: 2650,
      Food: 700,
      Transport: 380,
      Shopping: 550,
      Housing: 1200,
      Entertainment: 150,
      Healthcare: 100,
    },
    "Feb 2024": {
      total: 2580,
      Food: 680,
      Transport: 370,
      Shopping: 520,
      Housing: 1200,
      Entertainment: 140,
      Healthcare: 90,
    },
    "Mar 2024": {
      total: 2800,
      Food: 750,
      Transport: 400,
      Shopping: 600,
      Housing: 1200,
      Entertainment: 160,
      Healthcare: 110,
    },
    "Apr 2024": {
      total: 2900,
      Food: 780,
      Transport: 420,
      Shopping: 650,
      Housing: 1200,
      Entertainment: 170,
      Healthcare: 100,
    },
    "May 2024": {
      total: 2750,
      Food: 720,
      Transport: 390,
      Shopping: 580,
      Housing: 1200,
      Entertainment: 155,
      Healthcare: 105,
    },
    "Jun 2024": {
      total: 2800,
      Food: 750,
      Transport: 380,
      Shopping: 650,
      Housing: 1200,
      Entertainment: 150,
      Healthcare: 100,
    },
    "Jul 2024": {
      total: 3200,
      Food: 820,
      Transport: 400,
      Shopping: 700,
      Housing: 1200,
      Entertainment: 180,
      Healthcare: 120,
    },
    "Aug 2024": {
      total: 2900,
      Food: 780,
      Transport: 390,
      Shopping: 620,
      Housing: 1200,
      Entertainment: 160,
      Healthcare: 110,
    },
    "Sep 2024": {
      total: 3450,
      Food: 850,
      Transport: 420,
      Shopping: 680,
      Housing: 1200,
      Entertainment: 180,
      Healthcare: 120,
    },
    "Oct 2024": {
      total: 3100,
      Food: 800,
      Transport: 410,
      Shopping: 640,
      Housing: 1200,
      Entertainment: 170,
      Healthcare: 115,
    },
    "Nov 2024": {
      total: 3450,
      Food: 850,
      Transport: 420,
      Shopping: 680,
      Housing: 1200,
      Entertainment: 180,
      Healthcare: 120,
    },
  };

  const monthsList = Object.keys(allMonthsData);
  const currentMonthIndex = monthsList.indexOf(selectedMonth);
  const previousMonth =
    currentMonthIndex > 0 ? monthsList[currentMonthIndex - 1] : null;
  const currentData = allMonthsData[selectedMonth];
  const previousData = previousMonth ? allMonthsData[previousMonth] : null;
  console.log(previousData);
  const categories = [
    { name: "Food", color: "#fb923c", icon: "🍔" },
    { name: "Transport", color: "#3b82f6", icon: "🚗" },
    { name: "Shopping", color: "#a855f7", icon: "🛍️" },
    { name: "Housing", color: "#10b981", icon: "🏠" },
    { name: "Entertainment", color: "#ec4899", icon: "🎬" },
    { name: "Healthcare", color: "#ef4444", icon: "⚕️" },
  ];

  const chartData = monthsList
    .slice(-6)
    .map((month) => ({ month: month.split(" ")[0], ...allMonthsData[month] }));
  const pieData = categories.map((cat) => ({
    name: cat.name,
    value: currentData[cat.name],
    color: cat.color,
  }));
  const highestCategory = categories.reduce(
    (max, cat) => (currentData[cat.name] > currentData[max.name] ? cat : max),
    categories[0]
  );
  const totalIncome = 5000;
  const savings = totalIncome - currentData.total;
  const savingsRate = ((savings / totalIncome) * 100).toFixed(1);

  const getAIInsights = async () => {
    setAiLoading(true);
    try {
      const expenseData = {
        selectedMonth,
        previousMonth,
        currentData,
        previousData,
        totalIncome,
        savings,
        savingsRate,
        allMonthsData: chartData,
      };
      const prompt = userQuestion
        ? `Based on this expense data for ${selectedMonth}: ${JSON.stringify(
            expenseData
          )}, answer this question: ${userQuestion}. Be specific and use actual numbers in Indian Rupees (₹).`
        : `Analyze this expense data for ${selectedMonth}: ${JSON.stringify(
            expenseData
          )}. Provide clear, actionable insights.`;

      // NOTE: keep your API key secure & handle CORS
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await response.json();
      const insights =
        data.content?.find((item) => item.type === "text")?.text ||
        data?.completion ||
        "Unable to generate insights.";
      setAiInsights(insights);
      setUserQuestion("");
    } catch (error) {
      setAiInsights("Error generating insights. Please try again.");
      console.error("AI Error:", error);
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileSidebarOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col md:flex-row">
      {/* Mobile Topbar || header for mobile device only */}
      {/* <MobileHeader
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        setShowMonthPicker={setShowMonthPicker}
        showMonthPicker={showMonthPicker}
        monthsList={monthsList}
        setSidebarOpen={setSidebarOpen}
      /> */}
      {/* Sidebar - md+ */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main */}
      <main className="flex-1 p-3 md:p-6 overflow-auto">
        {/* Header md+ */}
        <AnalyticsHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Summary cards */}
        <AnalyticsSummaryCard
          currentData={currentData}
          previousData={previousData}
          previousMonth={previousMonth}
          savingsRate={savingsRate}
          highestCategory={highestCategory}
          savings={savings}
        />

        {/* Category cards */}
        <AnalyticsCategory
          categories={categories}
          currentData={currentData}
          previousData={previousData}
        />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
          <AnalyticsSpendingTrends
            totalIncome={totalIncome}
            chartData={chartData}
            chartHeight={chartHeight}
          />

          <CategoryPieChart
            withoutLegend={true}
            pieRadius={pieRadius}
            pieData={pieData}
            chartHeight={chartHeight}
          />
        </div>

        {/* AI Advisor */}
        {/* <section className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-3 md:p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base md:text-xl font-semibold text-white">
                AI Financial Advisor
              </h3>
              <p className="text-indigo-100 text-xs">
                Get personalized insights for {selectedMonth}
              </p>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-2 mb-3 backdrop-blur-sm">
            <label className="text-sm text-indigo-100 mb-1 block">
              Ask a question (optional)
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                placeholder="e.g., How can I save more money?"
                className="flex-1 bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                onKeyPress={(e) => e.key === "Enter" && getAIInsights()}
              />
              <button
                onClick={getAIInsights}
                disabled={aiLoading}
                className="bg-white text-indigo-600 px-3 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm whitespace-nowrap"
              >
                {aiLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Get Insights
                  </>
                )}
              </button>
            </div>
          </div>

          {aiInsights ? (
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> AI Insights & Recommendations
              </h4>
              <div className="text-indigo-50 whitespace-pre-wrap leading-relaxed text-sm">
                {aiInsights}
              </div>
            </div>
          ) : (
            !aiLoading && (
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
                <Sparkles className="w-8 h-8 text-white/50 mx-auto mb-2" />
                <p className="text-indigo-100 text-sm">
                  Click "Get Insights" to receive AI-powered analysis of your
                  spending for {selectedMonth}
                </p>
              </div>
            )
          )}
        </section> */}
      </main>
    </div>
  );
};

export default Analytics;
