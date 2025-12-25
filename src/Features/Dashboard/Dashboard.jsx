import { useState } from "react";

import { Menu, Calendar } from "lucide-react";

import SummaryCard from "./Component/SummaryCard";
import CategoryPieChart from "../../Components/CategoryPieChart";
import BudgetStatus from "./Component/BudgetStatus";
import RecentTransactions from "./Component/RecentTransactions";
import AddBudgetModel from "./Component/AddBudgetModel";
import AddTransactionModel from "../../Components/AddTransactionModel";
import Sidebar from "../../Components/Sidebar";
import AddTransactionBtn from "../../Components/AddTransactionBtn";

import DateFilters from "../../Components/DateFilter";

const Dashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700 px-4 sm:px-6 py-3 sm:py-4">
          <div className="max-w-7xl mx-auto">
            {/* Layout: column on xs, row on sm+ */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              {/* Left: menu + title */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Sidebar menu (visible on small screens) */}
                <button
                  aria-label="Open sidebar"
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-slate-300 p-2 rounded-md hover:bg-slate-700 transition"
                >
                  <Menu className="w-6 h-6" />
                </button>

                <div className="min-w-0">
                  <h1 className="text-lg sm:text-2xl font-bold text-white truncate">
                    Dashboard
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 truncate">
                    Welcome back, John!
                  </p>
                </div>
              </div>

              {/* Right: controls (stacked on xs, inline on sm+) */}
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                {/* Mobile: compact controls row (visible on xs) */}
                <div className="flex items-center gap-2 w-full sm:hidden">
                  {/* Compact calendar button to open a mobile date picker / modal */}
                  <button
                    aria-label="Open date filter"
                    onClick={() => {
                      /* TODO: open mobile date modal/drawer */
                    }}
                    className="flex items-center gap-2 bg-slate-700 text-white px-3 py-2 rounded-lg font-medium w-full justify-center"
                  >
                    <Calendar className="w-4 h-4 text-slate-300" />
                    <span className="text-sm">Filter</span>
                  </button>
                </div>
                {/* Desktop / Tablet: full select (hidden on xs) */}
                <DateFilters
                  // dateFilter={dateFilter}
                  // setDateFilter={setDateFilter}
                  allVarientColor="slate"
                />

                {/* Add button: full on all sizes but responsive padding & text */}
                <AddTransactionBtn setShowAddModal={setShowAddModal} />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content - Grid Layout */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="h-full grid grid-cols-12 gap-6">
            {/* Top Row - Summary Cards */}
            <SummaryCard />

            {/* Middle Row - Pie Chart and Budget Status */}
            {/* Stack on small screens: both take full width; on lg screens they split 8/4 */}
            {/* Category-wise Expenses — improved: hover % + tighter alignment */}
            <CategoryPieChart />

            {/* Budget Status */}
            <BudgetStatus setShowBudgetModal={setShowBudgetModal} />
            {/* Bottom Row - Recent Transactions */}
            <RecentTransactions />
          </div>
        </div>
      </main>

      {/* Add Transaction Modal */}
      {/* Add Transaction Modal */}
      <AddTransactionModel
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
      />

      {/* Add Budget Modal */}
      <AddBudgetModel
        showBudgetModal={showBudgetModal}
        setShowBudgetModal={setShowBudgetModal}
      />
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default Dashboard;

// harsh is doing lookmaxing plz gave him a guide for doing things correctly or it also in a budget.
