import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Edit2, Menu, Trash2 } from "lucide-react";

import Sidebar from "../../Components/Sidebar";
import AddTransactionModel from "../../Components/AddTransactionModel";

import Header from "./Component/Header";
import SummaryCard from "./Component/TransactionSummaryCard";
import TransFilterbar from "./Component/TransFilterbar";
import TransTableHeader from "./Component/TransTableHeader";
import EmptyTransaction from "../../Components/EmptyTransaction";
import TransTableRow from "./Component/TransTableRow";
import TransPagination from "./Component/TransPagination";
import TransMobileList from "./Component/TransMobileList";

// Sample transaction data
const generateSampleData = () => {
  const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Housing",
    "Entertainment",
    "Healthcare",
    "Salary",
    "Freelance",
    "Investment",
  ];
  const names = [
    "Grocery Store",
    "Uber Ride",
    "Amazon",
    "Rent Payment",
    "Netflix",
    "Hospital",
    "Monthly Salary",
    "Project Payment",
    "Dividend",
  ];

  const transactions = [];
  for (let i = 0; i < 50; i++) {
    const type = Math.random() > 0.3 ? "expense" : "income";
    const categoryIndex =
      type === "expense"
        ? Math.floor(Math.random() * 6)
        : Math.floor(Math.random() * 3) + 6;

    transactions.push({
      id: i + 1,
      date: new Date(
        2024,
        10 - Math.floor(Math.random() * 3),
        Math.floor(Math.random() * 28) + 1
      ).toISOString(),
      name: names[categoryIndex],
      type: type,
      amount:
        type === "expense"
          ? Math.floor(Math.random() * 500) + 20
          : Math.floor(Math.random() * 3000) + 500,
      category: categories[categoryIndex],
    });
  }

  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};
const TransactionsPage = () => {
  const [transactions] = useState(generateSampleData());
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);

  const [activeTab, setActiveTab] = useState("transactions");

  const currentTransactions = transactions.slice(0, 11);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Sidebar Navigation - Desktop */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Mobile Sidebar Overlay */}

      {/* Main Content */}
      <div className="flex-1 min-h-screen overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <Header
              setShowAddModal={setShowAddModal}
              setSidebarOpen={setSidebarOpen}
            />
            {/* Summary Cards - responsive, equal height */}
            <SummaryCard />

            {/* Filters + Search - stacked on mobile */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl max-w-6xl mx-auto mb-6">
              <TransFilterbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              {/* Desktop table */}
              <div className="overflow-x-auto">
                <table className="w-full hidden md:table">
                  <TransTableHeader />
                  <tbody>
                    {currentTransactions.length === 0 ? (
                      <EmptyTransaction />
                    ) : (
                      currentTransactions.map((transaction) => (
                        <TransTableRow
                          key={transaction.id}
                          transaction={transaction}
                          formatDate={formatDate}
                        />
                      ))
                    )}
                  </tbody>
                </table>

                {/* Mobile list - shown on small screens */}
                <TransMobileList
                  currentTransactions={currentTransactions}
                  formatDate={formatDate}
                />
              </div>

              {/* Pagination */}
              <TransPagination />
            </div>

            {/* Add Transaction Modal - full screen on mobile */}
            <AddTransactionModel
              showAddModal={showAddModal}
              setShowAddModal={setShowAddModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
