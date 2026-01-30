import React, { useState } from "react";

import Sidebar from "../../Components/Sidebar";
import AddTransactionModel from "../addTransactionModel/addTransactionModel";

import Header from "./Component/Header";
import SummaryCard from "./Component/TransactionSummaryCard";
import TransFilterbar from "./Component/TransFilterbar";
import TransTableHeader from "./Component/TransTableHeader";
import EmptyTransaction from "../../Components/EmptyTransaction";
import TransTableRow from "./Component/TransTableRow";
import TransPagination from "./Component/TransPagination";
import TransMobileList from "./Component/TransMobileList";
import { useSelector } from "react-redux";
import { selectTypeFilteredTransactions } from "../addTransactionModel/TransactionSlice";

const TransactionsPage = () => {
  // const [transactions] = useState(generateSampleData());
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);

  const [activeTab, setActiveTab] = useState("transactions");
  const transactions = useSelector(selectTypeFilteredTransactions);
  // const transactions = transactions.slice(0, 11);
  const transPerPage = 8;
  const currentPage = useSelector((state) => state.transactions.currentPage);
  const start = (currentPage - 1) * transPerPage;
  const end = start + transPerPage;

  const paginatedTransactions = transactions.slice(start, end);

  console.log(paginatedTransactions);

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
            <SummaryCard transactions={transactions} />

            {/* Filters + Search - stacked on mobile */}
            <div className="bg-white rounded-2xl  shadow-xl max-w-6xl mx-auto mb-6 overflow-visible">
              <TransFilterbar />

              {/* Desktop table */}
              <div className="overflow-x-auto">
                <table className="w-full hidden md:table">
                  <TransTableHeader />
                  <tbody>
                    {paginatedTransactions.length === 0 ? (
                      <EmptyTransaction />
                    ) : (
                      paginatedTransactions.map((transaction) => (
                        <TransTableRow
                          key={transaction.id}
                          transaction={transaction}
                          formatDate={formatDate}
                          setShowAddModal={setShowAddModal}
                        />
                      ))
                    )}
                  </tbody>
                </table>

                {/* Mobile list - shown on small screens */}
                <TransMobileList
                  setShowAddModal={setShowAddModal}
                  paginatedTransactions={paginatedTransactions}
                  formatDate={formatDate}
                />
              </div>

              {/* Pagination */}
              <TransPagination transactions={transactions} />
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
